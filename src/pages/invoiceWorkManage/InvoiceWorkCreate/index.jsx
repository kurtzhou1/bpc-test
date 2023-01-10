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
    const [supplyID, setSupplyID] = useState(''); //供應商
    const [invoiceNo, setInvoiceNo] = useState(''); //發票號碼
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [workTitle, setWorTitle] = useState(''); //海纜作業
    const [contractType, setContractType] = useState(''); //合約種類
    const [issueDate, setIssueDate] = useState(new Date()); //發票日期
    const [invoiceDueDate, setInvoiceDueDate] = useState(new Date()); //發票到期日
    const [totalAmount, setTotalAmount] = useState(0); //總金額
    const [isPro, setIsPro] = useState(false); //是否為Pro-forma
    const [isLiability, setIsLiability] = useState(false); //是否需攤分
    const [isRecharge, setIsRecharge] = useState(false); //是否為短腳補收
    const [partyID, setPartyID] = useState(''); //會員代號

    const [editItem, setEditItem] = useState(NaN);
    const [listInfo, setListInfo] = useState([]);
    const [isListEdit, setIsListEdit] = useState(false);

    const fakeUrl = 'http://127.0.0.1:8000/api/v1/generateInvoiceWKMaster&InvoiceWKDetail&InvoiceMaster&InvoiceDetail';

    const itemDetailInitial = () => {
        setSupplyID('');
        setInvoiceNo('');
        setSubmarineCable('');
        setWorTitle('');
        setContractType('');
        setIssueDate(new Date());
        setInvoiceDueDate(new Date());
        setTotalAmount(0);
        setIsPro(false);
        setIsLiability(false);
        setIsRecharge(false);
        setPartyID('');
        setInvoiceDetailInfo([]);
    };

    const createData = (
        supplyID,
        invoiceNo,
        submarineCable,
        workTitle,
        contractType,
        issueDate,
        invoiceDueDate,
        totalAmount,
        isPro,
        isLiability,
        isRecharge,
        partyID,
        status
    ) => {
        return {
            supplyID,
            invoiceNo,
            submarineCable,
            workTitle,
            contractType,
            issueDate,
            invoiceDueDate,
            totalAmount,
            isPro,
            isLiability,
            isRecharge,
            partyID,
            status
        };
    };

    //新增發票
    const addInvoiceInfo = () => {
        let tmpList = listInfo;
        let tmpArray = createData(
            supplyID,
            invoiceNo,
            submarineCable,
            workTitle,
            contractType,
            dayjs(issueDate).format('YYYY/MM/DD'),
            dayjs(invoiceDueDate).format('YYYY/MM/DD'),
            totalAmount,
            isPro,
            isLiability,
            isRecharge,
            partyID,
            'TEMP'
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
            setSupplyID(tmpArray?.InvoiceWKMaster.supplyID);
            setInvoiceNo(tmpArray?.InvoiceWKMaster.invoiceNo);
            setSubmarineCable(tmpArray?.InvoiceWKMaster.submarineCable);
            setWorTitle(tmpArray.InvoiceWKMaster.workTitle);
            setContractType(tmpArray?.InvoiceWKMaster.contractType);
            setIssueDate(tmpArray?.InvoiceWKMaster.issueDate);
            setInvoiceDueDate(tmpArray?.InvoiceWKMaster.invoiceDueDate);
            setTotalAmount(tmpArray?.InvoiceWKMaster.totalAmount);
            setIsPro(tmpArray?.InvoiceWKMaster.isPro);
            setIsLiability(tmpArray?.InvoiceWKMaster.isLiability);
            setIsRecharge(tmpArray?.InvoiceWKMaster.isLiability);
            setPartyID(tmpArray?.InvoiceWKMaster.partyID);
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
                                supplyID={supplyID}
                                setSupplyID={setSupplyID}
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
                                invoiceDueDate={invoiceDueDate}
                                setInvoiceDueDate={setInvoiceDueDate}
                                totalAmount={totalAmount}
                                setTotalAmount={setTotalAmount}
                                isPro={isPro}
                                setIsPro={setIsPro}
                                isLiability={isLiability}
                                setIsLiability={setIsLiability}
                                isRecharge={isRecharge}
                                setIsRecharge={setIsRecharge}
                                partyID={partyID}
                                setPartyID={setPartyID}
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
