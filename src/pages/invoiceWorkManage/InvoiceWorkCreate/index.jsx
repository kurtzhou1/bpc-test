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

// ==============================|| SAMPLE PAGE ||============================== //

const InvoiceWorkManage = () => {
    const [invoiceDetailInfo, setInvoiceDetailInfo] = useState([]);
    const [supplierName, setSupplierName] = useState(''); //供應商
    const [invoiceNo, setInvoiceNo] = useState(''); //發票號碼
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [workTitle, setWorTitle] = useState(''); //海纜作業
    const [contractType, setContractType] = useState(''); //合約種類
    const [issueDate, setIssueDate] = useState(new Date()); //發票日期
    const [dueDate, setDueDate] = useState(new Date()); //發票到期日
    const [totalAmount, setTotalAmount] = useState(0); //總金額
    const [isPro, setIsPro] = useState(); //是否為Pro-forma
    const [isLiability, setIsLiability] = useState(); //是否需攤分
    const [isRecharge, setIsRecharge] = useState(); //是否為短腳補收
    const [partyName, setPartyName] = useState(''); //會員代號

    const [editItem, setEditItem] = useState(NaN);
    const [listInfo, setListInfo] = useState([]);
    const [isListEdit, setIsListEdit] = useState(false);

    const fakeUrl = 'http://127.0.0.1:8000/api/v1/generateInvoiceWKMaster&InvoiceWKDetail&InvoiceMaster&InvoiceDetail';

    const itemDetailInitial = () => {
        setSupplierName('');
        setInvoiceNo('');
        setSubmarineCable('');
        setWorTitle('');
        setContractType('');
        setIssueDate(new Date());
        setDueDate(new Date());
        setTotalAmount(0);
        setIsPro(false);
        setIsLiability(false);
        setIsRecharge(false);
        setPartyName('');
        setInvoiceDetailInfo([]);
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

    //新增發票
    const addInvoiceInfo = () => {
        console.log('totalAmount=>>', totalAmount);
        let tmpList = listInfo;
        let tmpArray = createData(
            invoiceNo.trim() === '' ? 'No.' + dayjs(new Date()).format('YYYYMMDDHHmmss') : invoiceNo,
            supplierName,
            submarineCable,
            workTitle,
            contractType,
            dayjs(issueDate).format('YYYY/MM/DD'),
            dayjs(dueDate).format('YYYY/MM/DD'),
            partyName,
            'TEMPPORARY',
            isPro,
            isRecharge,
            isLiability,
            totalAmount
        );
        let combineArray = {
            InvoiceWKMaster: tmpArray,
            InvoiceWKDetail: invoiceDetailInfo
        };
        tmpList.push(combineArray);
        setListInfo([...tmpList]);
        itemDetailInitial();
        setInvoiceDetailInfo([]);
    };

    console.log('listInfo=>>', listInfo);

    //刪除
    const deletelistInfoItem = (deleteItem) => {
        let tmpArray = listInfo;
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
            setWorTitle(tmpArray.InvoiceWKMaster.WorkTitle);
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
        setEditItem(NaN);
        deletelistInfoItem(editItem);
        addInvoiceInfo();
        setIsListEdit(false);
    };

    //取消編輯
    const cancelEdit = () => {
        setEditItem(NaN);
        itemDetailInitial();
        setIsListEdit(false);
    };

    //送出
    const sendInvoice = () => {
        console.log('listInfo=>>', listInfo);
        listInfo.forEach((dataInfo) => {
            fetch(fakeUrl, { method: 'POST', body: JSON.stringify(dataInfo) })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data=>>', data);
                })
                .catch((e) => console.log('e=>>', e));
        });
    };

    useEffect(() => {
        itemDetailInitial();
        if (editItem >= 0) {
            editlistInfoItem();
            setIsListEdit(true);
        }
    }, [editItem]);

    useEffect(() => {
        itemDetailInitial();
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
                                setWorTitle={setWorTitle}
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
                            />
                        </Grid>
                        {/* 右 */}
                        <Grid item xs={6}>
                            <CreateInvoiceDetail invoiceDetailInfo={invoiceDetailInfo} setInvoiceDetailInfo={setInvoiceDetailInfo} />
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
                                    <Button variant="contained" sx={{ ml: '0.25rem', mr: '0.25rem' }} onClick={itemDetailInitial}>
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
