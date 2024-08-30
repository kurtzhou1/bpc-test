import { useEffect, useRef, useState } from 'react';

// material-ui
import { Grid, Button } from '@mui/material';
// material-ui
import dayjs from 'dayjs';
// project import
import MainCard from 'components/MainCard';
import CreateInvoiceMain from './createInvoiceMain';
import CreateInvoiceDetail from './createInvoiceDetail';
import InvoiceDataList from './invoiceDataList';
import { activeItem } from 'store/reducers/menu';
import ChosePurpose from './chosePurpose';

// api
import {
    supplierNameListForInvoice,
    submarineCableInfoList,
    billMilestoneList,
    generateInvoice,
    supplierNameDropDownUnique,
    getCurrencyData,
} from 'components/apis.jsx';
import { handleNumber } from 'components/commonFunction';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

import { Link } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

const InvoiceWorkManage = () => {
    const [invoiceDetailInfo, setInvoiceDetailInfo] = useState([]);
    const [supplierName, setSupplierName] = useState(''); //供應商
    const [invoiceNo, setInvoiceNo] = useState(''); //發票號碼
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [contractType, setContractType] = useState(''); //合約種類
    const [issueDate, setIssueDate] = useState(new Date()); //發票日期
    const [dueDate, setDueDate] = useState(new Date()); //發票到期日
    const [totalAmount, setTotalAmount] = useState(''); //總金額
    const [isPro, setIsPro] = useState(false); //是否為Pro-forma
    const [isLiability, setIsLiability] = useState(true); //是否需攤分
    const [isRecharge, setIsRecharge] = useState(false); //是否為短腳補收
    const [fromCode, setFromCode] = useState(''); //幣別
    const [partyName, setPartyName] = useState(''); //會員名稱
    const [supNmList, setSupNmList] = useState([]); //供應商下拉選單
    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
    const [bmStoneList, setBmStoneList] = useState([]); //計帳段號下拉選單
    const [codeList, setCodeList] = useState([]);
    const [billMilestone, setBillMilestone] = useState(''); //計帳段號
    const [feeItem, setFeeItem] = useState(''); //費用項目
    const [feeAmount, setFeeAmount] = useState(''); //費用金額
    const isTax = useRef(0);
    const [currencyExgID, setCurrencyExgID] = useState(null);
    const rateInfo = useRef({});

    const [editItem, setEditItem] = useState(NaN);
    const [listInfo, setListInfo] = useState([]);
    const [isListEdit, setIsListEdit] = useState(false);

    const [isPurposeDialogOpen, setIsPurposeDialogOpen] = useState(false);

    const dispatch = useDispatch();

    const itemInfoInitial = () => {
        rateInfo.current = {};
        setSupplierName('');
        setInvoiceNo('');
        setSubmarineCable('');
        setWorkTitle('');
        setContractType('');
        setIssueDate(new Date());
        setDueDate(new Date());
        setTotalAmount('');
        setIsPro(false);
        setIsLiability(true);
        setIsRecharge(false);
        setFromCode('');
        setPartyName('');
        setInvoiceDetailInfo([]);
        itemDetailInitial();
        setCurrencyExgID(null);
    };

    const itemDetailInitial = () => {
        setBillMilestone('');
        setFeeItem('');
        setFeeAmount('');
    };

    const createData = (
        InvoiceNo,
        SupplierName,
        SubmarineCable,
        WorkTitle,
        ContractType,
        IssueDate,
        DueDate,
        PartyName,
        Status,
        IsPro,
        IsRecharge,
        IsLiability,
        TotalAmount,
        CurrencyExgID,
        Purpose,
        fromCode,
        ExgRate,
        ToCode,
    ) => {
        return {
            InvoiceNo,
            SupplierName,
            SubmarineCable,
            WorkTitle,
            ContractType,
            IssueDate,
            DueDate,
            PartyName,
            Status,
            IsPro,
            IsRecharge,
            IsLiability,
            TotalAmount,
            CurrencyExgID,
            Purpose,
            Code: fromCode,
            ExgRate,
            ToCode,
        };
    };

    const infoCheck = () => {
        // 金額確認
        let detailAmount = 0;
        invoiceDetailInfo.forEach((i) => {
            detailAmount = detailAmount + Number(i.FeeAmount);
        });
        console.log(
            'totalAmount=>>',
            typeof totalAmount,
            '2=>>',
            typeof detailAmount,
            '3=>>',
            totalAmount,
            detailAmount,
            Number(totalAmount).toFixed(20),
            Number(detailAmount).toFixed(20),
        );
        if (Number(totalAmount).toFixed(20) !== Number(detailAmount).toFixed(20)) {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '總金額不等於費用項目金額加總',
                    },
                }),
            );
            return false;
        }
        if (submarineCable === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入海纜名稱',
                    },
                }),
            );
            return false;
        }
        if (workTitle === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入海纜作業',
                    },
                }),
            );
            return false;
        }
        if (supplierName === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: { isOpen: true, severity: 'error', message: '請輸入供應商' },
                }),
            );
            return false;
        }
        if (invoiceNo === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入發票號碼',
                    },
                }),
            );
            return false;
        }
        if (contractType === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入合約種類',
                    },
                }),
            );
            return false;
        }
        if (!isLiability && partyName === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入會員名稱',
                    },
                }),
            );
            return false;
        }
        if (fromCode === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請選擇原始幣別',
                    },
                }),
            );
            return false;
        }
        return true;
    };

    //新增發票
    const addInvoiceInfo = () => {
        //防呆
        if (infoCheck()) {
            let tmpList = listInfo.map((i) => i);
            let tmpArray = createData(
                invoiceNo.trim() === ''
                    ? 'No.' + dayjs(new Date()).format('YYYYMMDDHHmmss')
                    : invoiceNo,
                supplierName,
                submarineCable,
                workTitle,
                contractType,
                dayjs(issueDate).format('YYYY-MM-DD HH:mm:ss'),
                dayjs(dueDate).format('YYYY-MM-DD HH:mm:ss'),
                partyName,
                'TEMPORARY',
                isPro === 'true' || isPro === true ? true : false,
                isRecharge === 'true' || isRecharge === true ? true : false,
                isLiability === 'true' || isLiability === true ? true : false,
                // Number(totalAmount.toString().replaceAll(',', '')),
                Number(totalAmount),
                currencyExgID,
                rateInfo.current.Purpose,
                fromCode,
                rateInfo.current.ExgRate,
                rateInfo.current.ToCode,
            );
            console.log('新增發票=>>', tmpArray);
            let combineArray = {
                InvoiceWKMaster: tmpArray,
                InvoiceWKDetail: invoiceDetailInfo,
            };
            tmpList.push(combineArray);
            setListInfo([...tmpList]);
            itemInfoInitial();
        }
    };

    //刪除
    const deletelistInfoItem = (deleteItem) => {
        let tmpArray = listInfo.map((i) => i);
        tmpArray.splice(deleteItem, 1);
        setListInfo([...tmpArray]);
    };

    //編輯
    const editlistInfoItem = () => {
        let tmpArray = listInfo[editItem];
        if (tmpArray) {
            setSupplierName(tmpArray?.InvoiceWKMaster.SupplierName);
            setInvoiceNo(tmpArray?.InvoiceWKMaster.InvoiceNo);
            setSubmarineCable(tmpArray?.InvoiceWKMaster.SubmarineCable);
            setWorkTitle(tmpArray.InvoiceWKMaster.WorkTitle);
            setContractType(tmpArray?.InvoiceWKMaster.ContractType);
            setIssueDate(tmpArray?.InvoiceWKMaster.IssueDate);
            setDueDate(tmpArray?.InvoiceWKMaster.DueDate);
            setTotalAmount(handleNumber(tmpArray?.InvoiceWKMaster.TotalAmount));
            setIsPro(tmpArray?.InvoiceWKMaster.IsPro);
            setIsLiability(tmpArray?.InvoiceWKMaster.IsLiability);
            setIsRecharge(tmpArray?.InvoiceWKMaster.IsRecharge);
            setFromCode(tmpArray?.InvoiceWKMaster.Code);
            setPartyName(tmpArray?.InvoiceWKMaster.PartyName);
            setInvoiceDetailInfo(tmpArray?.InvoiceWKDetail);
            setCurrencyExgID(tmpArray?.InvoiceWKMaster.CurrencyExgID);
            setEditItem(editItem);
            rateInfo.current = {
                Purpose: tmpArray?.InvoiceWKMaster.Purpose,
                ExgRate: tmpArray?.InvoiceWKMaster.ExgRate,
                ToCode: tmpArray?.InvoiceWKMaster.ToCode,
            };
        }
    };

    //儲存編輯
    const saveEdit = () => {
        //防呆
        if (infoCheck()) {
            setEditItem(NaN);
            let tmpArray = listInfo.map((i) => i);
            tmpArray.splice(editItem, 1);
            let tmpAddArray = createData(
                invoiceNo.trim() === ''
                    ? 'No.' + dayjs(new Date()).format('YYYYMMDDHHmmss')
                    : invoiceNo,
                supplierName,
                submarineCable,
                workTitle,
                contractType,
                dayjs(issueDate).format('YYYY-MM-DD HH:mm:ss'),
                dayjs(dueDate).format('YYYY-MM-DD HH:mm:ss'),
                partyName,
                'TEMPORARY',
                isPro === 'true' || isPro === true ? true : false,
                isRecharge === 'true' || isRecharge === true ? true : false,
                isLiability === 'true' || isLiability === true ? true : false,
                Number(totalAmount),
                currencyExgID,
                rateInfo.current.Purpose,
                fromCode,
                rateInfo.current.ExgRate,
                rateInfo.current.ToCode,
            );
            let combineArray = {
                InvoiceWKMaster: tmpAddArray,
                InvoiceWKDetail: invoiceDetailInfo,
            };
            tmpArray.push(combineArray);
            tmpArray.reverse();
            setListInfo([...tmpArray]);
            itemInfoInitial();
            setIsListEdit(false);
        }
    };

    //取消編輯
    const cancelEdit = () => {
        setEditItem(NaN);
        itemInfoInitial();
        setIsListEdit(false);
    };

    //送出
    const sendInvoice = () => {
        console.log('listInfo=>>', listInfo);
        listInfo.forEach((dataInfo) => {
            delete dataInfo.InvoiceWKMaster.ToCode;
            delete dataInfo.InvoiceWKMaster.ExgRate;
            fetch(generateInvoice, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
                },
                body: JSON.stringify(dataInfo),
            })
                .then((res) => res.json())
                .then(() => {
                    dispatch(
                        setMessageStateOpen({
                            messageStateOpen: {
                                isOpen: true,
                                severity: 'success',
                                message: '送出發票成功',
                            },
                        }),
                    );
                    setListInfo([]);
                })
                .catch((e) => console.log('e=>', e));
        });
    };

    const handleLink = () => {
        dispatch(activeItem({ openItem: ['item12'] }));
    };

    const dialogCheck = () => {
        if (submarineCable === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入海纜名稱',
                    },
                }),
            );
            return false;
        }
        if (workTitle === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入海纜作業',
                    },
                }),
            );
            return false;
        }
        if (workTitle === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入海纜作業',
                    },
                }),
            );
            return false;
        }
        if (fromCode === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請選擇原始幣別',
                    },
                }),
            );
            return false;
        }
        return true;
    };

    const handleDialogOpen = () => {
        if (dialogCheck()) {
            setIsPurposeDialogOpen(true);
        }
    };

    const handleDialogClose = () => {
        setIsPurposeDialogOpen(false);
    };

    useEffect(() => {
        if (workTitle && submarineCable) {
            let bmApi =
                billMilestoneList +
                'SubmarineCable=' +
                submarineCable +
                '&WorkTitle=' +
                workTitle +
                '&End=false';
            let snApi =
                supplierNameListForInvoice +
                'SubmarineCable=' +
                submarineCable +
                '&WorkTitle=' +
                workTitle;
            fetch(bmApi, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        setBmStoneList(data);
                    }
                })
                .catch(() => {
                    dispatch(
                        setMessageStateOpen({
                            messageStateOpen: {
                                isOpen: true,
                                severity: 'error',
                                message: '網路異常，請檢查網路連線或與系統窗口聯絡',
                            },
                        }),
                    );
                });
            fetch(snApi, {
                method: 'GET',
                Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
            })
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        setSupNmList(data);
                    }
                })
                .catch(() => {
                    dispatch(
                        setMessageStateOpen({
                            messageStateOpen: {
                                isOpen: true,
                                severity: 'error',
                                message: '網路異常，請檢查網路連線或與系統窗口聯絡',
                            },
                        }),
                    );
                });
        } else {
            setBmStoneList([]);
            setSupNmList([]);
        }
    }, [workTitle, submarineCable]);

    useEffect(() => {
        fetch(submarineCableInfoList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setSubmarineCableList(data);
            })
            .catch(() => {
                dispatch(
                    setMessageStateOpen({
                        messageStateOpen: {
                            isOpen: true,
                            severity: 'error',
                            message: '網路異常，請檢查網路連線或與系統窗口聯絡',
                        },
                    }),
                );
            });
        fetch(supplierNameDropDownUnique, {
            method: 'GET',
            Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
        })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setSupNmList(data);
                }
            })
            .catch(() => {
                dispatch(
                    setMessageStateOpen({
                        messageStateOpen: {
                            isOpen: true,
                            severity: 'error',
                            message: '網路異常，請檢查網路連線或與系統窗口聯絡',
                        },
                    }),
                );
            });
        fetch(getCurrencyData, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setCodeList(data);
            })
            .catch(() => {
                dispatch(
                    setMessageStateOpen({
                        messageStateOpen: {
                            isOpen: true,
                            severity: 'error',
                            message: '網路異常，請檢查網路連線或與系統窗口聯絡',
                        },
                    }),
                );
            });
    }, []);

    useEffect(() => {
        itemInfoInitial();
        if (editItem >= 0) {
            editlistInfoItem();
            setIsListEdit(true);
        }
    }, [editItem]);

    return (
        <>
            <ChosePurpose
                isPurposeDialogOpen={isPurposeDialogOpen}
                handleDialogClose={handleDialogClose}
                submarineCable={submarineCable}
                workTitle={workTitle}
                fromCode={fromCode}
                codeList={codeList}
                currencyExgID={currencyExgID}
                setCurrencyExgID={setCurrencyExgID}
                rateInfo={rateInfo}
            />
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <MainCard sx={{ width: '100%' }}>
                        <Grid container display="flex" spacing={1}>
                            {/* 左 */}
                            <Grid item xs={6}>
                                <CreateInvoiceMain
                                    handleDialogOpen={handleDialogOpen}
                                    supplierName={supplierName}
                                    setSupplierName={setSupplierName}
                                    invoiceNo={invoiceNo}
                                    setInvoiceNo={setInvoiceNo}
                                    submarineCable={submarineCable}
                                    setSubmarineCable={setSubmarineCable}
                                    workTitle={workTitle}
                                    setWorkTitle={setWorkTitle}
                                    contractType={contractType}
                                    setContractType={setContractType}
                                    issueDate={issueDate}
                                    setIssueDate={setIssueDate}
                                    dueDate={dueDate}
                                    setDueDate={setDueDate}
                                    totalAmount={totalAmount}
                                    setTotalAmount={setTotalAmount}
                                    isPro={isPro}
                                    setIsPro={setIsPro}
                                    isLiability={isLiability}
                                    setIsLiability={setIsLiability}
                                    isRecharge={isRecharge}
                                    setIsRecharge={setIsRecharge}
                                    fromCode={fromCode}
                                    setFromCode={setFromCode}
                                    partyName={partyName}
                                    setPartyName={setPartyName}
                                    supNmList={supNmList}
                                    submarineCableList={submarineCableList}
                                    codeList={codeList}
                                    purpose={rateInfo.current.Purpose}
                                />
                            </Grid>
                            {/* 右 */}
                            <Grid item xs={6}>
                                <CreateInvoiceDetail
                                    invoiceDetailInfo={invoiceDetailInfo}
                                    setInvoiceDetailInfo={setInvoiceDetailInfo}
                                    bmStoneList={bmStoneList}
                                    itemDetailInitial={itemDetailInitial}
                                    billMilestone={billMilestone}
                                    setBillMilestone={setBillMilestone}
                                    feeItem={feeItem}
                                    setFeeItem={setFeeItem}
                                    feeAmount={feeAmount}
                                    setFeeAmount={setFeeAmount}
                                    isTax={isTax}
                                />
                            </Grid>
                            {/* 按鈕 */}
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                {isListEdit ? (
                                    <>
                                        <Button
                                            variant="contained"
                                            onClick={saveEdit}
                                            sx={{ mx: 1 }}
                                        >
                                            儲存編輯
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={cancelEdit}
                                            sx={{ mx: 1 }}
                                        >
                                            取消編輯
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="contained"
                                            onClick={addInvoiceInfo}
                                            sx={{ mx: 1 }}
                                        >
                                            新增發票
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={itemInfoInitial}
                                            sx={{ mx: 1 }}
                                        >
                                            全部清除
                                        </Button>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item xs={12}>
                    <MainCard sx={{ width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <MainCard title="發票資料建立列表">
                                    <InvoiceDataList
                                        listInfo={listInfo}
                                        setEditItem={setEditItem}
                                        deletelistInfoItem={deletelistInfoItem}
                                    />
                                </MainCard>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                {listInfo.length > 0 ? (
                                    <Button
                                        variant="contained"
                                        onClick={sendInvoice}
                                        sx={{ mx: 1 }}
                                    >
                                        送出發票
                                    </Button>
                                ) : null}
                                <Link
                                    to="/InvoiceWorkManage/InvoiceWorkEdit"
                                    onClick={handleLink}
                                    style={{ color: '#262626', textDecoration: 'none' }}
                                >
                                    <Button variant="contained" sx={{ mx: 1 }}>
                                        下一頁
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>
        </>
    );
};

export default InvoiceWorkManage;
