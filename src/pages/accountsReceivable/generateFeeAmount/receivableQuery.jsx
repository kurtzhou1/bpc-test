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
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { queryToCombineInvo, queryToDecutBill, quertDeductedData } from 'components/apis';

// day
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField } from '@mui/material/index';

// redux
import { useSelector } from 'react-redux';

// ==============================|| SAMPLE PAGE ||============================== //

const ReceivableQuery = ({ value, setListInfo }) => {
    const { partiesList, subCableList, supNmList } = useSelector((state) => state.dropdown); //供應商下拉選單 + 海纜名稱下拉選單
    const [issueDate, setIssueDate] = useState([null, null]); //發票日期
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [partyName, setPartyName] = useState(''); //會員代號
    const [supplierName, setSupplierName] = useState(''); //供應商
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [invoiceNo, setInvoiceNo] = useState(''); //發票號碼

    const initQuery = () => {
        setIssueDate([null, null]);
        setWorkTitle('');
        setPartyName('');
        setSupplierName('');
        setSubmarineCable('');
        setInvoiceNo('');
    };

    const receivableQuery = () => {
        let tmpQuery = '';
        if (partyName && partyName !== '') {
            tmpQuery = tmpQuery + 'PartyName=' + partyName + '&';
        }
        if (supplierName && supplierName !== '') {
            tmpQuery = tmpQuery + 'SupplierName=' + supplierName + '&';
        }
        if (submarineCable && submarineCable !== '') {
            tmpQuery = tmpQuery + 'SubmarineCable=' + submarineCable + '&';
        }
        if (invoiceNo && invoiceNo !== '') {
            tmpQuery = tmpQuery + 'InvoiceNo=' + invoiceNo + '&';
        }
        if (workTitle && workTitle !== '') {
            tmpQuery = tmpQuery + 'WorkTitle=' + workTitle + '&';
        }
        if (issueDate[0]) {
            tmpQuery =
                tmpQuery +
                'startIssueDate=' +
                dayjs(issueDate[0]).format('YYYYMMDD') +
                '&' +
                'endIssueDate=' +
                dayjs(issueDate[1]).format('YYYYMMDD') +
                '&';
        }
        if (value === 0) {
            if (tmpQuery.includes('&')) {
                tmpQuery = tmpQuery.slice(0, -1);
                tmpQuery = '/Status=TO_MERGE&' + tmpQuery;
            } else {
                tmpQuery = tmpQuery + '/Status=TO_MERGE';
            }
            tmpQuery = queryToCombineInvo + tmpQuery;
        } else if (value === 1) {
            if (tmpQuery.includes('&')) {
                tmpQuery = '/' + tmpQuery.slice(0, -1);
            } else {
                tmpQuery = tmpQuery + '/all';
            }
            tmpQuery = queryToDecutBill + tmpQuery;
        } else if (value === 2) {
            if (tmpQuery.includes('&')) {
                tmpQuery = '/' + tmpQuery.slice(0, -1);
            } else {
                tmpQuery = tmpQuery + '/all';
            }
            tmpQuery = quertDeductedData + tmpQuery;
        } else if (value === 3) {
            if (tmpQuery.includes('&')) {
                tmpQuery = '/' + tmpQuery.slice(0, -1);
            } else {
                tmpQuery = tmpQuery + '/all';
            }
            tmpQuery = quertDeductedData + tmpQuery;
        }
        console.log('tmpQuery=>>', tmpQuery);
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setListInfo(data);
            })
            .catch((e) => {
                console.log('e1=>>', e);
            });
    };

    useEffect(() => {
        initQuery();
        receivableQuery();
    }, [value]);

    return (
        <MainCard title={`${value === 0 ? '發票' : '帳單'}查詢`} sx={{ width: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={2}>
                {/* row1 */}
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        會員：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇會員</InputLabel>
                        <Select value={partyName} label="會員" onChange={(e) => setPartyName(e.target.value)}>
                            {partiesList.map((i) => (
                                <MenuItem value={i.PartyName}>{i.PartyName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        海纜名稱：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇海纜名稱</InputLabel>
                        <Select value={submarineCable} label="海纜名稱" size="small" onChange={(e) => setSubmarineCable(e.target.value)}>
                            {subCableList.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
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
                {value === 0 ? (
                    <>
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                                供應商：
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">選擇供應商</InputLabel>
                                <Select value={supplierName} label="供應商" onChange={(e) => setSupplierName(e.target.value)}>
                                    {supNmList.map((i) => (
                                        <MenuItem key={i} value={i}>
                                            {i}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                                發票號碼：
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <FormControl fullWidth size="small">
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={invoiceNo}
                                    size="small"
                                    label="填寫發票號碼"
                                    onChange={(e) => setInvoiceNo(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={3} sm={3} md={3} lg={3} />
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                                帳單日期：
                            </Typography>
                        </Grid>
                        <Grid item xs={5} sm={5} md={5} lg={5}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: '起始日', end: '結束日' }}>
                                <DateRangePicker
                                    inputFormat="YYYY/MM/DD"
                                    value={issueDate}
                                    onChange={(e) => {
                                        setIssueDate(e);
                                    }}
                                    renderInput={(startProps, endProps) => (
                                        <>
                                            <TextField fullWidth size="small" {...startProps} />
                                            <Box sx={{ mx: 1 }}> to </Box>
                                            <TextField fullWidth size="small" {...endProps} />
                                        </>
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </>
                )}
                <Grid
                    item
                    xs={value === 0 ? 9 : 6}
                    sm={value === 0 ? 9 : 6}
                    md={value === 0 ? 9 : 6}
                    lg={value === 0 ? 9 : 6}
                    display="flex"
                    justifyContent="end"
                    alignItems="center"
                >
                    <Button sx={{ mr: '0.5rem' }} variant="contained" onClick={receivableQuery}>
                        查詢
                    </Button>
                    <Button variant="contained">清除</Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ReceivableQuery;
