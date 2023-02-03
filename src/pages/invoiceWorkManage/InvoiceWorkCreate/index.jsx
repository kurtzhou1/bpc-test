import { useEffect, useState } from 'react';

// material-ui
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';
// material-ui
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
// project import
import MainCard from 'components/MainCard';
import CreateInvoiceMain from './createInvoiceMain';
import CreateInvoiceDetail from './createInvoiceDetail';
import InvoiceDataList from './invoiceDataList';
import { TextField } from '@mui/material/index';

// api
import { supplierNameList, submarineCableList, billMilestoneList, generateInvoice } from 'components/apis.jsx';

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
    const [totalAmount, setTotalAmount] = useState(0); //總金額
    const [isPro, setIsPro] = useState(-1); //是否為Pro-forma
    const [isLiability, setIsLiability] = useState(-1); //是否需攤分
    const [isRecharge, setIsRecharge] = useState(-1); //是否為短腳補收
    const [partyName, setPartyName] = useState(''); //會員代號

    const [supNmList, setSupNmList] = useState([]); //供應商下拉選單
    const [subCableList, setSubCableList] = useState([]); //海纜名稱下拉選單
    const [bmStoneList, setBmStoneList] = useState([]); //記帳段號下拉選單

    const [billMilestone, setBillMilestone] = useState(''); //記帳段號
    const [feeItem, setFeeItem] = useState(''); //費用項目
    const [feeAmount, setFeeAmount] = useState(0); //費用金額

    const [editItem, setEditItem] = useState(NaN);
    const [listInfo, setListInfo] = useState([]);
    const [isListEdit, setIsListEdit] = useState(false);

    const itemInfoInitial = () => {
        setSupplierName('');
        setInvoiceNo('');
        setSubmarineCable('');
        setWorkTitle('');
        setContractType('');
        setIssueDate(new Date());
        setDueDate(new Date());
        setTotalAmount(0);
        setIsPro(-1);
        setIsLiability(-1);
        setIsRecharge(-1);
        setPartyName('');
        setInvoiceDetailInfo([]);
        itemDetailInitial();
    };

    const itemDetailInitial = () => {
        setBillMilestone('');
        setFeeItem('');
        setFeeAmount(0);
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
        TotalAmount
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
            TotalAmount
        };
    };

    const infoCheck = () => {
        // 金額確認
        let detailAmount = 0;
        invoiceDetailInfo.forEach((i) => {
            detailAmount = detailAmount + i.FeeAmount;
        });
        if (Number(totalAmount).toFixed(2) !== Number(detailAmount).toFixed(2)) {
            alert('總金額不等於費用項目金額加總');
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
                Number(totalAmount)
            );
            let combineArray = {
                InvoiceWKMaster: tmpArray,
                InvoiceWKDetail: invoiceDetailInfo
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
            setTotalAmount(tmpArray?.InvoiceWKMaster.TotalAmount);
            setIsPro(tmpArray?.InvoiceWKMaster.IsPro);
            setIsLiability(tmpArray?.InvoiceWKMaster.IsLiability);
            setIsRecharge(tmpArray?.InvoiceWKMaster.IsRecharge);
            setPartyName(tmpArray?.InvoiceWKMaster.PartyName);
            setInvoiceDetailInfo(tmpArray?.InvoiceWKDetail);
            setEditItem(editItem);
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
                Number(totalAmount)
            );
            let combineArray = {
                InvoiceWKMaster: tmpAddArray,
                InvoiceWKDetail: invoiceDetailInfo
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
        listInfo.forEach((dataInfo) => {
            fetch(generateInvoice, { method: 'POST', body: JSON.stringify(dataInfo) })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data=>>', data);
                })
                .catch((e) => console.log('e=>>', e));
        });
        setListInfo([]);
    };

    useEffect(() => {
        if (workTitle && submarineCable) {
            let bmApi = billMilestoneList + 'SubmarineCable=' + submarineCable + '&WorkTitle=' + workTitle;
            fetch(bmApi, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                    setBmStoneList(data);
                })
                .catch((e) => console.log('e1=>>', e));
        }
    }, [workTitle, submarineCable]);

    useEffect(() => {
        fetch(supplierNameList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setSupNmList(data);
            })
            .catch((e) => console.log('e1=>>', e));
        fetch(submarineCableList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setSubCableList(data);
            })
            .catch((e) => console.log('e1=>>', e));
    }, []);

    useEffect(() => {
        itemInfoInitial();
        if (editItem >= 0) {
            editlistInfoItem();
            setIsListEdit(true);
        }
    }, [editItem]);

    useEffect(() => {
        itemInfoInitial();
    }, []);

    return (
        <Grid container spacing={1}>
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
                            />
                        </Grid>
                        {/* 按鈕 */}
                        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                            {isListEdit ? (
                                <>
                                    <Button variant="contained" sx={{ ml: '0.25rem', mr: '0.25rem' }} onClick={saveEdit}>
                                        儲存編輯
                                    </Button>
                                    <Button variant="contained" sx={{ ml: '0.25rem', mr: '0.25rem' }} onClick={cancelEdit}>
                                        取消編輯
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="contained" sx={{ ml: '0.25rem', mr: '0.25rem' }} onClick={addInvoiceInfo}>
                                        新增發票
                                    </Button>
                                    <Button variant="contained" sx={{ ml: '0.25rem', mr: '0.25rem' }} onClick={itemInfoInitial}>
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
                                <InvoiceDataList listInfo={listInfo} setEditItem={setEditItem} deletelistInfoItem={deletelistInfoItem} />
                            </MainCard>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                            {listInfo.length > 0 ? (
                                <Button variant="contained" sx={{ px: '1rem', py: '0.5rem' }} onClick={sendInvoice}>
                                    送出發票
                                </Button>
                            ) : (
                                ''
                            )}
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default InvoiceWorkManage;
