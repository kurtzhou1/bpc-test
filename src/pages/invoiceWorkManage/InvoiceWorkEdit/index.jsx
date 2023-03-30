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
// import { TextField } from '@mui/material/index';

// api
import {
    queryInvoice,
    generateInvoice,
    updateInvoice,
    deleteInvoiceWKMaster,
    deleteInvoiceWKDetail,
    billMilestoneList
} from 'components/apis.jsx';

// redux
import { useSelector } from 'react-redux';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

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
    const [isPro, setIsPro] = useState(true); //是否為Pro-forma
    const [isLiability, setIsLiability] = useState(true); //是否需攤分
    const [isRecharge, setIsRecharge] = useState(true); //是否為短腳補收
    const [partyName, setPartyName] = useState(''); //會員代號
    const wKMasterID = useRef(); //工作檔ID

    const [bmStoneList, setBmStoneList] = useState([]); //記帳段號下拉選單
    // const [queryBmStoneList, setQueryBmStoneList] = useState([]); //條件查詢的記帳段號下拉選單

    const [billMilestone, setBillMilestone] = useState(''); //記帳段號
    const [feeItem, setFeeItem] = useState(''); //費用項目
    const [feeAmount, setFeeAmount] = useState(''); //費用金額

    const [action, setAction] = useState('');
    const [modifyItem, setModifyItem] = useState(-1);

    const queryApi = useRef(queryInvoice + '/all');

    const { supNmList, subCableList, bmsList } = useSelector((state) => state.dropdown); //供應商下拉選單 + 海纜名稱下拉選單

    const [listInfo, setListInfo] = useState([]);

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
        setIsPro(true);
        setIsLiability(true);
        setIsRecharge(true);
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
                console.log('查詢資料成功=>>', data);
                setListInfo(data);
            })
            .catch((e) => console.log('e1=>', e));
    };

    const firstQueryInit = () => {
        fetch(queryApi.current, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                orderDate(data);
                data = data.slice(0, 5);
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

    useEffect(() => {
        itemInfoInitial();
        setAction('');
        setModifyItem(-1);
        firstQueryInit();
    }, []);

    useEffect(() => {
        if ((modifyItem >= 0 && action === 'Edit') || (modifyItem >= 0 && action === 'View')) {
            setSupplierName(listInfo[modifyItem].InvoiceWKMaster.SupplierName);
            setInvoiceNo(listInfo[modifyItem].InvoiceWKMaster.InvoiceNo);
            setSubmarineCable(listInfo[modifyItem].InvoiceWKMaster.SubmarineCable);
            setWorkTitle(listInfo[modifyItem].InvoiceWKMaster.WorkTitle);
            setContractType(listInfo[modifyItem].InvoiceWKMaster.ContractType);
            setIssueDate(listInfo[modifyItem].InvoiceWKMaster.IssueDate);
            setDueDate(listInfo[modifyItem].InvoiceWKMaster.DueDate);
            setTotalAmount(handleNumber(listInfo[modifyItem].InvoiceWKMaster.TotalAmount));
            setIsPro(listInfo[modifyItem].InvoiceWKMaster.IsPro);
            setIsLiability(listInfo[modifyItem].InvoiceWKMaster.IsLiability);
            setIsRecharge(listInfo[modifyItem].InvoiceWKMaster.IsRecharge);
            setPartyName(listInfo[modifyItem].InvoiceWKMaster.PartyName);
            setInvoiceDetailInfo(listInfo[modifyItem].InvoiceWKDetail);
            wKMasterID.current = listInfo[modifyItem].InvoiceWKMaster.WKMasterID;
        }
    }, [modifyItem, action]);

    useEffect(() => {
        if (action === 'Validate') {
            let tmpArray = {
                WKMasterID: listInfo[modifyItem].InvoiceWKMaster.WKMasterID,
                Status: 'VALIDATED'
            };
            console.log('=>>', action, tmpArray);
            fetch(updateInvoice, { method: 'POST', body: JSON.stringify(tmpArray) })
                .then((res) => res.json())
                .then(() => {
                    dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: 'Validated成功' } }));
                    queryInit();
                })
                .catch((e) => console.log('e1=>', e));
        }
        if (action === '作廢') {
            let tmpArray = {
                WKMasterID: listInfo[modifyItem].InvoiceWKMaster.WKMasterID,
                Status: 'INVALID'
            };
            fetch(updateInvoice, { method: 'POST', body: JSON.stringify(tmpArray) })
                .then((res) => res.json())
                .then(() => {
                    dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '作廢成功' } }));
                    queryInit();
                })
                .catch((e) => console.log('e1=>', e));
        }
        if (action === 'Delete' && listInfo[modifyItem].InvoiceWKMaster.Status === 'TEMPORARY') {
            let tmpArray = {
                WKMasterID: listInfo[modifyItem].InvoiceWKMaster.WKMasterID
            };
            fetch(deleteInvoiceWKMaster, { method: 'POST', body: JSON.stringify(tmpArray) })
                .then((res) => res.json())
                .then(() => {
                    console.log('刪除主檔成功');
                    fetch(deleteInvoiceWKDetail, { method: 'POST', body: JSON.stringify(tmpArray) })
                        .then((res) => res.json())
                        .then(() => {
                            console.log('刪除明細成功');
                            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '刪除成功' } }));
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
                dayjs(issueDate).format('YYYY-MM-DD hh:mm:ss'),
                dayjs(dueDate).format('YYYY-MM-DD hh:mm:ss'),
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
            let tmpWKMasterID = {
                WKMasterID: listInfo[modifyItem].InvoiceWKMaster.WKMasterID
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
        setModifyItem(-1);
    };

    useEffect(() => {
        if (workTitle && submarineCable) {
            let bmApi = billMilestoneList + 'SubmarineCable=' + submarineCable + '&WorkTitle=' + workTitle;
            fetch(bmApi, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                    setBmStoneList(data);
                })
                .catch((e) => console.log('e1=>', e));
        }
    }, [workTitle, submarineCable]);

    return (
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
                                billmileStoneList={bmsList}
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
                                <InvoiceDataList listInfo={listInfo} setAction={setAction} setModifyItem={setModifyItem} />
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
                                    supNmList={supNmList}
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
                                    <Button variant="contained" sx={{ ml: '0.25rem', mr: '0.25rem' }} onClick={addInvoiceInfo}>
                                        儲存編輯
                                    </Button>
                                    <Button variant="contained" sx={{ ml: '0.25rem', mr: '0.25rem' }} onClick={cancelAdd}>
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
                <Button variant="contained" sx={{ px: '1rem', py: '0.5rem' }} href="/CreateJournal/CreateJournal">
                    下一頁
                </Button>
            </Grid>
        </Grid>
    );
};

export default InvoiceWorkManage;
