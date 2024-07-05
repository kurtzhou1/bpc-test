import { useEffect, useState, useRef } from 'react';
import { Grid, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import CurrencyQuery from './currencyQuery';
import CurrencyDataList from './currencyDataList';
import CurrencyAdd from './currencyAdd';
import CurrencyManage from './currencyManage';

// api
import {
    billMilestoneLiabilityList,
    submarineCableLiabilityList,
    partiesLiabilityList,
    workTitleLiabilityList,
    queryLiability,
    compareLiability,
    addLiabilityapi,
    updateLiability,
    getCurrencyData,
} from 'components/apis.jsx';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const LiabilityManage = () => {
    const dispatch = useDispatch();
    const [listInfo, setListInfo] = useState([]);
    const [dialogAction, setDialogAction] = useState('');
    const [currencyListInfo, setCurrencyListInfo] = useState([]);

    const [billMilestone, setBillMilestone] = useState(''); //計帳段號
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [partyName, setPartyName] = useState([]); //會員名稱
    const [lBRatio, setLBRatio] = useState(0); //攤分比例
    const [editItem, setEditItem] = useState(NaN); //編輯項目
    const [note, setNote] = useState(''); //備註
    const [modifyNote, setModifyNote] = useState(''); //異動原因

    const [filterList, setFilterList] = useState(listInfo);

    const [setBmStoneList] = useState([]); //計帳段號下拉選單
    const [partyList, setPartyList] = useState([]); //會員名稱下拉選單
    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
    const [workTitleList, setWorkTitleList] = useState([]); //海纜作業下拉選單
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [isAddCurrencyOpen, setIsAddCurrencyOpen] = useState(false); //新增編輯Currency
    const lBRawID = useRef(0); //LBRawID

    const queryApi = useRef(queryLiability + '/all');

    const getCurrencyDataFun = () => {
        fetch(getCurrencyData, {
            method: 'GET',
            Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('data=>>', data);
                if (Array.isArray(data)) {
                    setCurrencyListInfo(data);
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    const handleCurrencyManageOpen = () => {
        getCurrencyDataFun();
        setIsCurrencyOpen(true);
    };

    const handleCurrencyManageClose = () => {
        setIsCurrencyOpen(false);
    };

    const handleAddCurrencyOpen = () => {
        getCurrencyDataFun();
        setIsAddCurrencyOpen(true);
        setDialogAction('add');
    };

    const handleAddCurrencyClose = () => {
        setIsAddCurrencyOpen(false);
    };

    const itemDetailInitial = () => {
        setBillMilestone('');
        setPartyName([]);
        setLBRatio('');
        setModifyNote('');
    };

    const apiQuery = () => {
        fetch(queryApi.current, {
            method: 'GET',
            Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('查詢成功=>>', data);
                setListInfo(data);
            })
            .catch((e) => console.log('e1=>', e));
    };

    //新增
    const addLiability = (list, setAdd) => {
        let tmpNumber = 0;
        list.forEach((e) => {
            tmpNumber = Number(e.LBRatio) + Number(tmpNumber);
        });
        console.log(
            'tmpNumber=>>',
            tmpNumber.toFixed(10),
            tmpNumber.toFixed(10) !== '100.0000000000',
        );
        if (tmpNumber.toFixed(10) !== '100.0000000000') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '攤分比例加總須等於100',
                    },
                }),
            );
        }
        if (list.length > 0 && tmpNumber.toFixed(10) === '100.0000000000') {
            fetch(compareLiability, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
                },
                body: JSON.stringify(list),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('compareLiability成功', data, data.compareResult);
                    if (data.compareResult.length > 0) {
                        dispatch(
                            setMessageStateOpen({
                                messageStateOpen: {
                                    isOpen: true,
                                    severity: 'error',
                                    message: '已增加此會員',
                                },
                            }),
                        );
                    } else {
                        fetch(addLiabilityapi, {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                                Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
                            },
                            body: JSON.stringify(list),
                        })
                            .then((res) => res.json())
                            .then(() => {
                                dispatch(
                                    setMessageStateOpen({
                                        messageStateOpen: {
                                            isOpen: true,
                                            severity: 'success',
                                            message: '新增成功',
                                        },
                                    }),
                                );
                                setAdd([]);
                            })
                            .catch((e) => console.log('e1=>', e));
                    }
                })
                .catch((e) => console.log('e1=>', e));
        }
    };

    //編輯
    const editlistInfoItem = () => {
        let tmpArray = listInfo[editItem];
        console.log('', editItem, tmpArray);
        if (tmpArray) {
            setBillMilestone(tmpArray?.BillMilestone);
            setPartyName([tmpArray?.PartyName]);
            setLBRatio(tmpArray?.LBRatio);
            setWorkTitle(tmpArray?.WorkTitle);
            setSubmarineCable(tmpArray?.SubmarineCable);
            setModifyNote(tmpArray?.ModifyNote);
            lBRawID.current = tmpArray?.LBRawID;
        }
    };

    //儲存編輯
    const saveEdit = () => {
        let tmpArray = {
            LBRawID: listInfo[editItem].LBRawID,
            SubmarineCable: listInfo[editItem].SubmarineCable,
            BillMilestone: listInfo[editItem].BillMilestone,
            PartyName: listInfo[editItem].PartyName,
            WorkTitle: listInfo[editItem].WorkTitle,
            LBRatio: Number(lBRatio).toFixed(10),
            Note: note,
            ModifyNote: modifyNote ? modifyNote : '',
        };
        fetch(updateLiability, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
            },
            body: JSON.stringify(tmpArray),
        })
            .then((res) => res.json())
            .then(() => {
                dispatch(
                    setMessageStateOpen({
                        messageStateOpen: {
                            isOpen: true,
                            severity: 'success',
                            message: '儲存成功',
                        },
                    }),
                );
                apiQuery();
                setEditItem(NaN);
                handleAddCurrencyClose();
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        itemDetailInitial();
        if (editItem >= 0) {
            editlistInfoItem();
            setIsAddCurrencyOpen(true);
        }
    }, [editItem]);

    useEffect(() => {
        fetch(billMilestoneLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setBmStoneList(data);
            })
            .catch((e) => console.log('e1=>', e));
        fetch(submarineCableLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setSubmarineCableList(data);
            })
            .catch((e) => console.log('e1=>', e));
        fetch(partiesLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setPartyList(data);
            })
            .catch((e) => console.log('e1=>', e));
        fetch(workTitleLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setWorkTitleList(data);
            })
            .catch((e) => console.log('e1=>', e));
    }, []);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} display="flex" justifyContent="right">
                <Button
                    sx={{ mr: '0.25rem' }}
                    variant="contained"
                    onClick={handleCurrencyManageOpen}
                >
                    $ 貨幣管理
                </Button>
                <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={handleAddCurrencyOpen}>
                    + 新增貨幣與匯率資料
                </Button>
                <CurrencyManage
                    handleCurrencyManageClose={handleCurrencyManageClose}
                    isCurrencyOpen={isCurrencyOpen}
                    currencyListInfo={currencyListInfo}
                    setCurrencyListInfo={setCurrencyListInfo}
                    getCurrencyDataFun={getCurrencyDataFun}
                />
                <CurrencyAdd
                    handleAddCurrencyClose={handleAddCurrencyClose}
                    isAddCurrencyOpen={isAddCurrencyOpen}
                    currencyListInfo={currencyListInfo}
                    addLiability={addLiability}
                    saveEdit={saveEdit}
                    partyName={partyName}
                    setPartyName={setPartyName}
                    billMilestone={billMilestone}
                    setBillMilestone={setBillMilestone}
                    workTitle={workTitle}
                    setWorkTitle={setWorkTitle}
                    submarineCable={submarineCable}
                    setSubmarineCable={setSubmarineCable}
                    dialogAction={dialogAction}
                    lBRatio={lBRatio}
                    setLBRatio={setLBRatio}
                    modifyNote={modifyNote}
                    setModifyNote={setModifyNote}
                    note={note}
                    setNote={setNote}
                    setEditItem={setEditItem}
                    lBRawID={lBRawID}
                    apiQuery={apiQuery}
                />
            </Grid>
            <Grid item xs={12}>
                <CurrencyQuery
                    setListInfo={setListInfo}
                    // bmStoneList={bmStoneList}
                    partyList={partyList}
                    submarineCableList={submarineCableList}
                    workTitleList={workTitleList}
                    queryApi={queryApi}
                />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="貨幣與匯率資料列表">
                    <CurrencyDataList
                        listInfo={filterList.length > 0 ? filterList : listInfo}
                        setDialogAction={setDialogAction}
                        setIsAddCurrencyOpen={setIsAddCurrencyOpen}
                        setEditItem={setEditItem}
                        apiQuery={apiQuery}
                    />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default LiabilityManage;
