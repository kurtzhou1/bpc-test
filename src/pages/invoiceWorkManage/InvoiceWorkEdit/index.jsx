import { useEffect, useState, useRef } from 'react';
// import dayjs from 'dayjs';

// material-ui
import { Grid, Button } from '@mui/material';
// material-ui
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
// project import
import MainCard from 'components/MainCard';
import InvoiceQuery from './invoiceQuery';
import CreateInvoiceMain from './createInvoiceMain';
import CreateInvoiceDetail from './createInvoiceDetail';
import InvoiceDataList from './invoiceDataList';
import { handleNumber } from 'components/commonFunction';
import ReturnDataList from './returnDataList';
// import { TextField } from '@mui/material/index';

// api
import {
    queryInvoice,
    generateInvoice,
    updateInvoice,
    deleteInvoiceWKMaster,
    deleteInvoiceWKDetail,
    billMilestoneList,
    returnToValidated,
    afterBilled
} from 'components/apis.jsx';

// redux
import { useSelector } from 'react-redux';
import { activeItem } from 'store/reducers/menu';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

import { Link } from 'react-router-dom';
import { DataObjectRounded } from '../../../../node_modules/@mui/icons-material/index';

// ==============================|| SAMPLE PAGE ||============================== //

const InvoiceWorkManage = () => {
    const dispatch = useDispatch();
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
    const [partyName, setPartyName] = useState(''); //會員代號
    const wKMasterID = useRef(); //工作檔ID

    const [bmStoneList, setBmStoneList] = useState([]); //計帳段號下拉選單
    // const [queryBmStoneList, setQueryBmStoneList] = useState([]); //條件查詢的計帳段號下拉選單

    const [billMilestone, setBillMilestone] = useState(''); //計帳段號
    const [feeItem, setFeeItem] = useState(''); //費用項目
    const [feeAmount, setFeeAmount] = useState(''); //費用金額

    const [action, setAction] = useState('');
    const [modifyItem, setModifyItem] = useState('');

    const queryApi = useRef(queryInvoice + '/all');
    const queryApiTemporary = queryInvoice + '/Status=TEMPORARY';

    const { supNmList, subCableList, bmsList } = useSelector((state) => state.dropdown); //供應商下拉選單 + 海纜名稱下拉選單
    const [listInfo, setListInfo] = useState([]);
    const [page, setPage] = useState(0); //分頁Page

    const [isReturnOpen, setIsReturnOpen] = useState(false);
    const returnDataList = useRef([]);

    const actionBack = useRef('');

    const itemInfoInitial = () => {
        wKMasterID.current = 0;
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
        setPartyName('');
        setInvoiceDetailInfo([]);
    };

    const itemDetailInitial = () => {
        setBillMilestone('');
        setFeeItem('');
        setFeeAmount('');
    };

    const orderDate = (data) => {
        data.sort((a, b) => {
            return dayjs(b.InvoiceWKMaster.CreateDate).diff(dayjs(a.InvoiceWKMaster.CreateDate));
        });
    };

    const queryInit = () => {
        fetch(queryApi.current, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setListInfo(data);
            })
            .catch((e) => console.log('e1=>', e));
    };

    const queryInitTemporary = () => {
        fetch(queryApiTemporary, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setListInfo(data);
            })
            .catch((e) => console.log('e1=>', e));
    };

    const firstQueryInit = () => {
        let tmpQuery = queryInvoice + '/Status=TEMPORARY';
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                orderDate(data);
                // data = data.slice(0, 5);
                setListInfo(data);
            })
            .catch((e) => console.log('e1=>', e));
    };

    const createData = (
        WKMasterID,
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
        TotalAmount
    ) => {
        return {
            WKMasterID,
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
            TotalAmount
        };
    };

    const handleLink = () => {
        dispatch(activeItem({ openItem: ['item2'] }));
    };

    useEffect(() => {
        itemInfoInitial();
        setAction('');
        setModifyItem('');
        firstQueryInit();
    }, []);

    useEffect(() => {
        if ((modifyItem !== '' && action === 'Edit') || (modifyItem !== '' && action === 'View')) {
            listInfo.forEach((i) => {
                if (i.InvoiceWKMaster.InvoiceNo === modifyItem) {
                    setSupplierName(i.InvoiceWKMaster.SupplierName);
                    setInvoiceNo(i.InvoiceWKMaster.InvoiceNo);
                    setSubmarineCable(i.InvoiceWKMaster.SubmarineCable);
                    setWorkTitle(i.InvoiceWKMaster.WorkTitle);
                    setContractType(i.InvoiceWKMaster.ContractType);
                    setIssueDate(i.InvoiceWKMaster.IssueDate);
                    setDueDate(i.InvoiceWKMaster.DueDate);
                    setTotalAmount(handleNumber(i.InvoiceWKMaster.TotalAmount));
                    setIsPro(i.InvoiceWKMaster.IsPro);
                    setIsLiability(i.InvoiceWKMaster.IsLiability);
                    setIsRecharge(i.InvoiceWKMaster.IsRecharge);
                    setPartyName(i.InvoiceWKMaster.PartyName);
                    setInvoiceDetailInfo(i.InvoiceWKDetail);
                    wKMasterID.current = i.InvoiceWKMaster.WKMasterID;
                }
            });
        }
    }, [modifyItem, action]);

    useEffect(() => {
        let tmpModifyItem;
        if (action === 'Validate' || action === '作廢' || action === '退回') {
            listInfo.forEach((i) => {
                if (i.InvoiceWKMaster.InvoiceNo === modifyItem) {
                    tmpModifyItem = i.InvoiceWKMaster.WKMasterID;
                }
            });
        }
        if (action === 'Validate') {
            let tmpArray = {
                WKMasterID: tmpModifyItem,
                Status: 'VALIDATED'
            };
            fetch(updateInvoice, { method: 'POST', body: JSON.stringify(tmpArray) })
                .then((res) => res.json())
                .then(() => {
                    dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: 'Validated成功' } }));
                    setPage(0);
                    setAction('');
                    queryInitTemporary();
                })
                .catch((e) => console.log('e1=>', e));
        }
        if (action === '作廢') {
            let tmpArray = {
                WKMasterID: tmpModifyItem
            };
            fetch(afterBilled, { method: 'POST', body: JSON.stringify(tmpArray) })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.ifReturn && data.hasOwnProperty('ifReturn')) {
                        dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '作廢失敗' } }));
                        returnDataList.current = data.BillMaster;
                        setIsReturnOpen(true);
                        actionBack.current = '作廢';
                    } else if (data.ifReturn && data.hasOwnProperty('ifReturn')) {
                        dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '作廢成功' } }));
                    }
                    // setPage(0);
                    // setAction('');
                    // queryInit();
                })
                .catch((e) => console.log('e1=>', e));
        }
        if (action === '退回') {
            let tmpArray = {
                WKMasterID: tmpModifyItem
            };
            fetch(returnToValidated, { method: 'POST', body: JSON.stringify(tmpArray) })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.ifReturn && data.hasOwnProperty('ifReturn')) {
                        dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '退回失敗' } }));
                        returnDataList.current = data.BillMaster;
                        setIsReturnOpen(true);
                        actionBack.current = '退回';
                    } else if (data.ifReturn && data.hasOwnProperty('ifReturn')) {
                        dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '退回成功' } }));
                    }
                })
                .catch((e) => console.log('e1=>', e));
        }
        if (action === 'Delete') {
            let tmpArray = {
                WKMasterID: tmpModifyItem
            };
            fetch(deleteInvoiceWKMaster, { method: 'POST', body: JSON.stringify(tmpArray) })
                .then((res) => res.json())
                .then(() => {
                    console.log('刪除主檔成功');
                    fetch(deleteInvoiceWKDetail, { method: 'POST', body: JSON.stringify(tmpArray) })
                        .then((res) => res.json())
                        .then(() => {
                            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '刪除成功' } }));
                            setPage(0);
                            setAction('');
                            queryInit();
                        })
                        .catch((e) => console.log('e1=>', e));
                })
                .catch((e) => console.log('e1=>', e));
        }
    }, [action]);

    const infoCheck = () => {
        // 金額確認
        let detailAmount = 0;
        invoiceDetailInfo.forEach((i) => {
            detailAmount = detailAmount + i.FeeAmount;
        });
        if (Number(totalAmount.toString().replaceAll(',', '')).toFixed(2) !== Number(detailAmount).toFixed(2)) {
            dispatch(
                setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '總金額不等於費用項目金額加總' } })
            );
            return false;
        }
        if (submarineCable === '') {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請輸入海纜名稱' } }));
            return false;
        }
        if (workTitle === '') {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請輸入海纜作業' } }));
            return false;
        }
        if (supplierName === '') {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請輸入供應商' } }));
            return false;
        }
        if (invoiceNo === '') {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請輸入發票號碼' } }));
            return false;
        }
        if (contractType === '') {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請輸入合約種類' } }));
            return false;
        }
        if (!isLiability && partyName === '') {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請輸入會員名稱' } }));
            return false;
        }
        return true;
    };

    const addInvoiceInfo = () => {
        //防呆
        if (infoCheck()) {
            let tmpArray = createData(
                wKMasterID.current,
                invoiceNo.trim() === '' ? 'No.' + dayjs(new Date()).format('YYYYMMDDHHmmss') : invoiceNo,
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
                Number(totalAmount.toString().replaceAll(',', '')).toFixed(2)
            );
            let combineArray = {
                InvoiceWKMaster: tmpArray,
                InvoiceWKDetail: invoiceDetailInfo
            };
            let tmpModifyItem;
            listInfo.forEach((i) => {
                if (i.InvoiceWKMaster.InvoiceNo === modifyItem) {
                    tmpModifyItem = i.InvoiceWKMaster.WKMasterID;
                }
            });
            let tmpWKMasterID = {
                WKMasterID: tmpModifyItem
            };
            fetch(deleteInvoiceWKMaster, { method: 'POST', body: JSON.stringify(tmpWKMasterID) })
                .then((res) => res.json())
                .then(() => {
                    console.log('刪除主檔成功');
                    fetch(deleteInvoiceWKDetail, { method: 'POST', body: JSON.stringify(tmpWKMasterID) })
                        .then((res) => res.json())
                        .then(() => {
                            console.log('刪除明細成功');
                            fetch(generateInvoice, { method: 'POST', body: JSON.stringify(combineArray) })
                                .then((res) => res.json())
                                .then(() => {
                                    dispatch(
                                        setMessageStateOpen({
                                            messageStateOpen: { isOpen: true, severity: 'success', message: '儲存成功' }
                                        })
                                    );
                                    // 重新query
                                    queryInit();
                                    itemInfoInitial();
                                    setAction('');
                                })
                                .catch((e) => console.log('e3=>>', e));
                        })
                        .catch((e) => console.log('e2=>>', e));
                })
                .catch((e) => console.log('e1=>', e));
        }
    };

    const cancelAdd = () => {
        itemInfoInitial();
        setAction('');
        setModifyItem('');
    };

    const handleReturnClose = () => {
        setIsReturnOpen(false);
        returnDataList.current = {};
        actionBack.current = '';
    };

    useEffect(() => {
        if (workTitle && submarineCable) {
            let bmApi = billMilestoneList + 'SubmarineCable=' + submarineCable + '&WorkTitle=' + workTitle + '&End=false';
            fetch(bmApi, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                    setBmStoneList(data);
                })
                .catch((e) => console.log('e1=>', e));
        }
    }, [workTitle, submarineCable]);

    return (
        <>
            <ReturnDataList
                isReturnOpen={isReturnOpen}
                handleReturnClose={handleReturnClose}
                returnDataList={returnDataList.current}
                actionBack={actionBack.current}
            />
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <MainCard sx={{ width: '100%' }}>
                        <Grid container display="flex" spacing={2}>
                            <Grid item xs={12}>
                                <InvoiceQuery
                                    setListInfo={setListInfo}
                                    queryApi={queryApi}
                                    supNmList={supNmList}
                                    subCableList={subCableList}
                                    bmsList={bmsList}
                                    setAction={setAction}
                                    setPage={setPage}
                                />
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item xs={12}>
                    <MainCard title="發票資料列表" sx={{ width: '100%' }}>
                        <Grid container display="flex" spacing={2}>
                            <Grid item xs={12}>
                                <MainCard>
                                    <InvoiceDataList
                                        listInfo={listInfo}
                                        setAction={setAction}
                                        setModifyItem={setModifyItem}
                                        page={page}
                                        setPage={setPage}
                                    />
                                </MainCard>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
                {action === 'Edit' || action === 'View' ? (
                    <Grid item xs={12}>
                        <MainCard sx={{ width: '100%' }}>
                            <Grid container display="flex" spacing={2}>
                                {/* 左 */}
                                <Grid item xs={6}>
                                    <CreateInvoiceMain
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
                                        partyName={partyName}
                                        setPartyName={setPartyName}
                                        subCableList={subCableList}
                                        action={action}
                                    />
                                </Grid>
                                {/* 右 */}
                                <Grid item xs={6}>
                                    <CreateInvoiceDetail
                                        setInvoiceDetailInfo={setInvoiceDetailInfo}
                                        invoiceDetailInfo={invoiceDetailInfo}
                                        bmStoneList={bmStoneList}
                                        action={action}
                                        itemDetailInitial={itemDetailInitial}
                                        billMilestone={billMilestone}
                                        setBillMilestone={setBillMilestone}
                                        feeItem={feeItem}
                                        setFeeItem={setFeeItem}
                                        feeAmount={feeAmount}
                                        setFeeAmount={setFeeAmount}
                                    />
                                </Grid>
                                {action === 'Edit' ? (
                                    <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                                        <Button variant="contained" onClick={addInvoiceInfo} sx={{ mx: 1 }}>
                                            儲存編輯
                                        </Button>
                                        <Button variant="contained" onClick={cancelAdd} sx={{ mx: 1 }}>
                                            取消編輯
                                        </Button>
                                    </Grid>
                                ) : (
                                    ''
                                )}
                            </Grid>
                        </MainCard>
                    </Grid>
                ) : (
                    ''
                )}
                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                    <Link to="/CreateJournal/CreateJournal" onClick={handleLink} style={{ color: '#262626', textDecoration: 'none' }}>
                        <Button variant="contained">切換至立帳管理</Button>
                    </Link>
                </Grid>
            </Grid>
        </>
    );
};

export default InvoiceWorkManage;
