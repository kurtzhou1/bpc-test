import { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    IconButton,
    TextField,
    Checkbox,
    Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import LiabilityQuery from './liabilityQuery';
import LiabilityDataList from './liabilityDataList';
import LiabilityAdd from './liabilityAdd';

// day
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// api
import {
    billMilestoneLiabilityList,
    submarineCableLiabilityList,
    partiesLiabilityList,
    workTitleLiabilityList,
    queryLiability,
    compareLiability,
    addLiabilityapi
} from 'components/apis.jsx';

const LiabilityManage = () => {
    const [listInfo, setListInfo] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false); //新增編輯Liability
    const [dialogAction, setDialogAction] = useState('');

    const [billMilestone, setBillMilestone] = useState(''); //記帳段號
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [partyName, setPartyName] = useState([]); //會員名稱
    const [lbRatio, setLBRatio] = useState(''); //攤分比例
    const [editItem, setEditItem] = useState(NaN); //編輯項目
    const [splitItem, setSplitItem] = useState(NaN); //分段項目
    const [modifyNote, setModifyNote] = useState('');

    const [filterList, setFilterList] = useState(listInfo);

    const [bmStoneList, setBmStoneList] = useState([]); //記帳段號下拉選單
    const [partyList, setPartyList] = useState([]); //會員名稱下拉選單
    const [subCableList, setSubCableList] = useState([]); //海纜名稱下拉選單
    const [workTitleList, setWorkTitleList] = useState([]); //海纜作業下拉選單

    const queryApi = useRef(queryLiability + '/all');

    // const [searched, setSearched] = useState('');

    const parties = [{ name: 'Taiwan' }, { name: 'Vietnam' }, { name: 'Japan' }, { name: 'Korean' }];

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
        setDialogAction('add');
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const itemDetailInitial = () => {
        setBillMilestone('');
        setPartyName([]);
        setLBRatio('');
        setModifyNote('');
    };

    //新增
    const addLiability = (list, setAdd) => {
        console.log('list=>>', list);
        if (list.length > 0) {
            fetch(compareLiability, { method: 'POST', body: JSON.stringify(list) })
                .then((res) => res.json())
                .then((data) => {
                    console.log('compareLiability成功', data, data.compareResult);
                    if (data.compareResult.length > 0) {
                        alert('已經增加過此會員');
                    } else {
                        fetch(addLiabilityapi, { method: 'POST', body: JSON.stringify(list) })
                            .then((res) => res.json())
                            .then(() => {
                                alert('新增成功');
                                setAdd([]);
                            })
                            .catch((e) => console.log('e1=>>', e));
                    }
                })
                .catch((e) => console.log('e1=>>', e));
        }
        // if (list.length > 0) {
        //     let tmpArray = listInfo.map((i) => i);
        //     list.forEach((i) => {
        //         tmpArray.push({
        //             BillMilestone: i.BillMilestone,
        //             PartyName: i.PartyName,
        //             LbRatio: i.LbRatio,
        //             SubmarineCable: i.SubmarineCable,
        //             WorkTitle: i.WorkTitle,
        //             CreateTime: '',
        //             ModifyNote: modifyNote.trim() === '' ? '' : modifyNote
        //         });
        //     });
        //     setListInfo([...tmpArray]);
        //     handleDialogClose();
        //     itemDetailInitial();
        // }
    };

    //終止
    // const updatelistInfoItem = (updateItem) => {
    //     let tmpArray = listInfo.map((i) => i);
    //     tmpArray[updateItem].CreateTime = dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss');
    //     setListInfo([...tmpArray]);
    // };

    //編輯
    const editlistInfoItem = () => {
        let tmpArray = listInfo[editItem];
        if (tmpArray) {
            setBillMilestone(tmpArray?.BillMilestone);
            setPartyName([tmpArray?.PartyName]);
            setLBRatio(tmpArray?.LbRatio);
            setWorkTitle(tmpArray?.WorkTitle);
            setSubmarineCable(tmpArray?.SubmarineCable);
            setModifyNote(tmpArray?.ModifyNote);
        }
    };

    //儲存編輯
    const saveEdit = () => {
        let tmpArray = listInfo.map((i) => i);
        tmpArray[editItem].LbRatio = lbRatio;
        tmpArray[editItem].ModifyNote = modifyNote;
        setListInfo([...tmpArray]);
        setEditItem(NaN);
        handleDialogClose();
        // setIsDialogOpen(false);
        // addLiability();
        // setIsListEdit(false);
        // itemDetailInitial();
    };

    // const cancelSearch = () => {
    //     setSearched('');
    //     requestSearch(searched);
    // };

    const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };

    const searchFunction = (searchedVal) => {
        console.log('requestSearch=>>', searchedVal);
        const filteredRows = listInfo.filter((row) => {
            return row.PartyName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        console.log('filteredRows=>>', filteredRows);
        setFilterList(filteredRows);
        // filterList.current = filteredRows;
    };

    useEffect(() => {
        itemDetailInitial();
        if (editItem >= 0) {
            editlistInfoItem();
            setIsDialogOpen(true);
        }
    }, [editItem]);

    useEffect(() => {
        fetch(billMilestoneLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setBmStoneList(data);
            })
            .catch((e) => console.log('e1=>>', e));
        fetch(submarineCableLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setSubCableList(data);
            })
            .catch((e) => console.log('e1=>>', e));
        fetch(partiesLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setPartyList(data);
            })
            .catch((e) => console.log('e1=>>', e));
        fetch(workTitleLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setWorkTitleList(data);
            })
            .catch((e) => console.log('e1=>>', e));
    }, []);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} display="flex" justifyContent="right">
                <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={handleDialogOpen}>
                    + 新增Liability
                </Button>
                <LiabilityAdd
                    handleDialogClose={handleDialogClose}
                    addLiability={addLiability}
                    saveEdit={saveEdit}
                    partyName={partyName}
                    setPartyName={setPartyName}
                    isDialogOpen={isDialogOpen}
                    billMilestone={billMilestone}
                    setBillMilestone={setBillMilestone}
                    workTitle={workTitle}
                    setWorkTitle={setWorkTitle}
                    submarineCable={submarineCable}
                    setSubmarineCable={setSubmarineCable}
                    dialogAction={dialogAction}
                    lbRatio={lbRatio}
                    setLBRatio={setLBRatio}
                    modifyNote={modifyNote}
                    setModifyNote={setModifyNote}
                    setEditItem={setEditItem}
                />
            </Grid>
            <Grid item xs={12}>
                <LiabilityQuery
                    bmStoneList={bmStoneList}
                    partyList={partyList}
                    subCableList={subCableList}
                    workTitleList={workTitleList}
                    queryApi={queryApi}
                />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="Liability資料列表" search searchFunction={searchFunction} searchTitle={'會員搜尋'}>
                    <LiabilityDataList
                        listInfo={filterList.length > 0 ? filterList : listInfo}
                        setDialogAction={setDialogAction}
                        setIsDialogOpen={setIsDialogOpen}
                        setEditItem={setEditItem}
                        setSplitItem={setSplitItem}
                    />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default LiabilityManage;
