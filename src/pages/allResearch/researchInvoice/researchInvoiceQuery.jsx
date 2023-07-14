import { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Radio,
    FormGroup,
    RadioGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// day
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField } from '@mui/material/index';

// api
import { searchInvoiceWKMasterByBillMaster } from 'components/apis.jsx';

// redux
import { useSelector } from 'react-redux';

// ==============================|| SAMPLE PAGE ||============================== //

const ResearchBillQuery = ({ setListInfo, setDetailInfo }) => {
    const [partyName, setPartyName] = useState(''); //會員代號
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [dueDate, setDueDate] = useState(null); //發票日期
    const [billingNo, setBillingNo] = useState(''); //發票號碼
    const { partiesList, subCableList } = useSelector((state) => state.dropdown); //供應商下拉選單 + 海纜名稱下拉選單

    const queryInit = () => {
        setPartyName('');
        setSubmarineCable('');
        setWorkTitle('');
        setDueDate(null);
        setBillingNo('');
    };

    const invoiceQuery = () => {
        let tmpQuery = {};
        if (partyName && partyName !== '') {
            // tmpQuery = tmpQuery + 'SupplierName=' + supplierName + '&';
            tmpQuery.PartyName = partyName;
        }
        if (submarineCable && submarineCable !== '') {
            // tmpQuery = tmpQuery + 'SubmarineCable=' + submarineCable + '&';
            tmpQuery.SubmarineCable = submarineCable;
        }
        if (workTitle && workTitle !== '') {
            // tmpQuery = tmpQuery + 'WorkTitle=' + workTitle + '&';
            tmpQuery.WorkTitle = workTitle;
        }
        if (billingNo && billingNo !== '') {
            // tmpQuery = tmpQuery + 'BillMilestone=' + billingNo + '&';
            tmpQuery.BillingNo = billingNo;
        }
        // if (billMilestone && billMilestone !== '') {
        //     // tmpQuery = tmpQuery + 'BillMilestone=' + billMilestone + '&';
        //     tmpQuery.BillMilestone = billMilestone;
        // }
        if (dueDate) {
            tmpQuery.startDueDate = dayjs(dueDate).format('YYYYMMDD');
            tmpQuery.endDueDate = dayjs(dueDate).format('YYYYMMDD');
        }

        console.log('tmpQuery=>>', tmpQuery);

        fetch(searchInvoiceWKMasterByBillMaster, { method: 'POST', body: JSON.stringify(tmpQuery) })
            .then((res) => res.json())
            .then((data) => {
                console.log('查詢成功=>>', data);
                if (Array.isArray(data)) {
                    setListInfo(data);
                    setDetailInfo([]);
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    return (
        <MainCard title="條件查詢" sx={{ width: '100%' }}>
            <Grid container display="flex" alignItems="center" spacing={2}>
                {/* row1 */}
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                        會員：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇會員</InputLabel>
                        <Select value={partyName} label="會員" onChange={(e) => setPartyName(e.target.value)}>
                            {partiesList.map((i) => (
                                <MenuItem value={i}>{i}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                        海纜名稱：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇海纜名稱</InputLabel>
                        <Select value={submarineCable} label="海纜名稱" onChange={(e) => setSubmarineCable(e.target.value)}>
                            {subCableList.map((i) => (
                                <MenuItem key={i.CableName} value={i.CableName}>
                                    {i.CableName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                        海纜作業：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇海纜作業</InputLabel>
                        <Select value={workTitle} label="海纜作業" onChange={(e) => setWorkTitle(e.target.value)}>
                            <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                            <MenuItem value={'Construction'}>Construction</MenuItem>
                            <MenuItem value={'O&M'}>O&M</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                        帳單號碼：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={billingNo}
                            size="small"
                            label="填寫帳單號碼"
                            onChange={(e) => setBillingNo(e.target.value)}
                        />
                    </FormControl>
                </Grid>
                {/* row2 */}
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                        帳單日期：
                    </Typography>
                </Grid>
                <Grid item xs={5} sm={5} md={5} lg={5} display="flex" alignItems="center">
                    <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: '起始日', end: '結束日' }}>
                        <DesktopDatePicker
                            inputFormat="YYYY/MM/DD"
                            value={dueDate}
                            onChange={(e) => {
                                setDueDate(e);
                            }}
                            renderInput={(params) => <TextField size="small" {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} display="flex" justifyContent="end" alignItems="center">
                    <Button sx={{ mr: '0.5rem' }} variant="contained" onClick={invoiceQuery}>
                        查詢
                    </Button>
                    <Button variant="contained" onClick={queryInit}>
                        清除
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ResearchBillQuery;
