import { useState } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    RadioGroup,
    FormGroup,
    FormControlLabel,
    Radio,
    Box,
    Checkbox
} from '@mui/material';
import PropTypes from 'prop-types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField } from '@mui/material/index';
// project import
import MainCard from 'components/MainCard';

// api
import { queryInvoice } from 'components/apis.jsx';
import dayjs from 'dayjs';

const InvoiceQuery = ({ setListInfo, queryApi, supNmList, subCableList, bmsList, setAction, setPage }) => {
    const [issueDate, setIssueDate] = useState([null, null]); //發票日期
    const [supplierNameQuery, setSupplierNameQuery] = useState(''); //供應商
    const [submarineCableQuery, setSubmarineCableQuery] = useState(''); //海纜名稱
    const [invoiceStatusQuery, setInvoiceStatusQuery] = useState({
        BILLED: false,
        COMPLETE: false,
        INVALID: false,
        PAYING: false,
        TEMPORARY: false,
        VALIDATED: false
    }); //處理狀態
    // const [partyNameQuery, setPartyNameQuery] = useState(''); //會員代號
    const [billMilestoneQuery, setBillMilestoneQuery] = useState(''); //計帳段號
    const [invoiceNoQuery, setInvoiceNoQuery] = useState(''); //發票號碼
    const [isIssueDate, setIsIssueDate] = useState(''); //是否為發票日期

    const initQuery = () => {
        setIssueDate([null, null]);
        setSupplierNameQuery('');
        setSubmarineCableQuery('');
        setInvoiceStatusQuery({ BILLED: false, COMPLETE: false, INVALID: false, PAYING: false, TEMPORARY: false, VALIDATED: false });
        setBillMilestoneQuery('');
        setInvoiceNoQuery('');
        setIsIssueDate('');
    };

    const handleChange = (event) => {
        setInvoiceStatusQuery({ ...invoiceStatusQuery, [event.target.name]: event.target.checked });
    };

    const invoiceQuery = () => {
        let tmpQuery = '/';
        if (supplierNameQuery && supplierNameQuery !== '') {
            tmpQuery = tmpQuery + 'SupplierName=' + supplierNameQuery + '&';
        }
        if (submarineCableQuery && submarineCableQuery !== '') {
            tmpQuery = tmpQuery + 'SubmarineCable=' + submarineCableQuery + '&';
        }
        if (invoiceNoQuery && invoiceNoQuery !== '') {
            tmpQuery = tmpQuery + 'InvoiceNo=' + invoiceNoQuery + '&';
        }
        if (billMilestoneQuery && billMilestoneQuery !== '') {
            tmpQuery = tmpQuery + 'BillMilestone=' + billMilestoneQuery + '&';
        }
        if (isIssueDate === 'true') {
            tmpQuery =
                tmpQuery +
                'startIssueDate=' +
                dayjs(issueDate[0]).format('YYYYMMDD') +
                '&' +
                'endIssueDate=' +
                dayjs(issueDate[1]).format('YYYYMMDD') +
                '&';
        }
        if (isIssueDate === 'false') {
            tmpQuery =
                tmpQuery +
                'startDueDate=' +
                dayjs(issueDate[0]).format('YYYYMMDD') +
                '&' +
                'endDueDate=' +
                dayjs(issueDate[1]).format('YYYYMMDD') +
                '&';
        }
        if (
            !(
                invoiceStatusQuery?.TEMPORARY &&
                invoiceStatusQuery?.VALIDATED &&
                invoiceStatusQuery?.BILLED &&
                invoiceStatusQuery?.PAYING &&
                invoiceStatusQuery?.COMPLETE &&
                invoiceStatusQuery?.INVALID
            ) &&
            (invoiceStatusQuery?.TEMPORARY ||
                invoiceStatusQuery?.VALIDATED ||
                invoiceStatusQuery?.BILLED ||
                invoiceStatusQuery?.PAYING ||
                invoiceStatusQuery?.COMPLETE ||
                invoiceStatusQuery?.INVALID)
        ) {
            let tmpStatus = '';
            if (invoiceStatusQuery?.TEMPORARY) {
                tmpStatus = tmpStatus + 'Status=TEMPORARY&';
            }
            if (invoiceStatusQuery?.VALIDATED) {
                tmpStatus = tmpStatus + 'Status=VALIDATED&';
            }
            if (invoiceStatusQuery?.BILLED) {
                tmpStatus = tmpStatus + 'Status=BILLED&';
            }
            if (invoiceStatusQuery?.PAYING) {
                tmpStatus = tmpStatus + 'Status=PAYING&';
            }
            if (invoiceStatusQuery?.COMPLETE) {
                tmpStatus = tmpStatus + 'Status=COMPLETE&';
            }
            if (invoiceStatusQuery?.INVALID) {
                tmpStatus = tmpStatus + 'Status=INVALID&';
            }
            tmpQuery = tmpQuery + tmpStatus;
        }
        if (tmpQuery.includes('&')) {
            tmpQuery = tmpQuery.slice(0, -1);
        } else {
            tmpQuery = tmpQuery + 'all';
        }
        tmpQuery = queryInvoice + tmpQuery;
        queryApi.current = tmpQuery;
        console.log('tmpQuery=>>', tmpQuery);
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setPage(0);
                setListInfo(data);
                setAction('');
            })
            .catch((e) => console.log('e1=>', e));
    };

    return (
        <MainCard title="條件查詢">
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={1}>
                {/* row1 */}
                <Grid item xs={12} sm={2} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        供應商：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇供應商</InputLabel>
                        <Select value={supplierNameQuery} label="發票供應商" onChange={(e) => setSupplierNameQuery(e.target.value)}>
                            {supNmList.map((i) => (
                                <MenuItem key={i.SupplierName} value={i.SupplierName}>
                                    {i.SupplierName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={2} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        海纜名稱：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇海纜</InputLabel>
                        <Select value={submarineCableQuery} label="發票供應商" onChange={(e) => setSubmarineCableQuery(e.target.value)}>
                            {subCableList.map((i) => (
                                <MenuItem key={i.CableName} value={i.CableName}>
                                    {i.CableName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={2} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        處理狀態：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} md={5} lg={5}>
                    <FormGroup
                        row
                        value={invoiceStatusQuery}
                        name="radio-buttons-group"
                        // onChange={(e) => setInvoiceStatusQuery(e.target.value)}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={'TEMPORARY'}
                                    onChange={handleChange}
                                    checked={invoiceStatusQuery.TEMPORARY}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                />
                            }
                            label="暫存"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={'VALIDATED'}
                                    onChange={handleChange}
                                    checked={invoiceStatusQuery.VALIDATED}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                />
                            }
                            label="Validated"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={'BILLED'}
                                    onChange={handleChange}
                                    // checked={invoiceStatusQuery.BILLED}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                />
                            }
                            label="BILLED"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={'PAYING'}
                                    onChange={handleChange}
                                    checked={invoiceStatusQuery.PAYING}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                />
                            }
                            label="PAYING"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={'COMPLETE'}
                                    onChange={handleChange}
                                    checked={invoiceStatusQuery.COMPLETE}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                />
                            }
                            label="COMPLETE"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={'INVALID'}
                                    onChange={handleChange}
                                    checked={invoiceStatusQuery.INVALID}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                />
                            }
                            label="INVALID"
                        />
                    </FormGroup>
                </Grid>
                {/* row2 */}
                <Grid item xs={12} sm={2} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        計帳段號：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇計帳段號</InputLabel>
                        <Select value={billMilestoneQuery} label="發票供應商" onChange={(e) => setBillMilestoneQuery(e.target.value)}>
                            {bmsList.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={2} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        發票號碼：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} md={2} lg={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={invoiceNoQuery}
                        size="small"
                        label="填寫發票號碼"
                        onChange={(e) => setInvoiceNoQuery(e.target.value)}
                    />
                </Grid>
                <Grid item xs={0} sm={4} md={3} lg={3} />
                <Grid item xs={12} sm={0} md={3} lg={3} />
                {/* row3 */}
                <Grid item xs={12} sm={9} md={9} lg={9} display="flex" alignItems="center">
                    <Typography
                        variant="h5"
                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' }, mr: { lg: '1rem' } }}
                    >
                        日期條件及區間：
                    </Typography>
                    <FormControl>
                        <RadioGroup row value={isIssueDate} name="radio-buttons-group" onChange={(e) => setIsIssueDate(e.target.value)}>
                            <FormControlLabel
                                value={true}
                                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                label="發票日期"
                            />
                            <FormControlLabel
                                value={false}
                                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                label="發票到期日"
                            />
                        </RadioGroup>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: '起始日', end: '結束日' }}>
                        <DateRangePicker
                            inputFormat="YYYY/MM/DD"
                            value={issueDate}
                            onChange={(e) => {
                                setIssueDate(e);
                            }}
                            renderInput={(startProps, endProps) => (
                                <>
                                    <TextField size="small" {...startProps} />
                                    <Box sx={{ mx: 1 }}> to </Box>
                                    <TextField size="small" {...endProps} />
                                </>
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3} display="flex" justifyContent="end" alignItems="center">
                    <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={invoiceQuery}>
                        查詢
                    </Button>
                    <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={initQuery}>
                        清除
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

InvoiceQuery.propTypes = {
    setListInfo: PropTypes.func,
    queryApi: PropTypes.string,
    supNmList: PropTypes.array,
    subCableList: PropTypes.array,
    bmsList: PropTypes.array,
    setAction: PropTypes.func,
    setPage: PropTypes.func
};

export default InvoiceQuery;
