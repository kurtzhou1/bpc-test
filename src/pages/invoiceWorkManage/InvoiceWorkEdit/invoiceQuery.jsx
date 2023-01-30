import { useEffect, useState } from 'react';
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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField } from '@mui/material/index';
// project import
import MainCard from 'components/MainCard';

// api
import { queryInvoice } from 'components/apis';
import dayjs from 'dayjs';

const InvoiceQueryBlock = ({ setListInfo, queryApi }) => {
    const [issueDate, setIssueDate] = useState([null, null]); //發票日期
    const [supplierNameQuery, setSupplierNameQuery] = useState(''); //供應商
    const [submarineCableQuery, setSubmarineCableQuery] = useState(''); //海纜名稱
    const [invoiceStatusQuery, setInvoiceStatusQuery] = useState(); //處理狀態
    const [partyNameQuery, setPartyNameQuery] = useState(''); //會員代號
    const [billMilestoneQuery, setBillMilestoneQuery] = useState(''); //記帳段號
    const [invoiceNoQuery, setInvoiceNoQuery] = useState(''); //發票號碼
    const [isIssueDate, setIsIssueDate] = useState(''); //是否為發票日期

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
        if (partyNameQuery && partyNameQuery !== '') {
            tmpQuery = tmpQuery + 'PartyName=' + partyNameQuery + '&';
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
        if (invoiceStatusQuery?.TEMPORARY && !invoiceStatusQuery?.VALIDATED) {
            tmpQuery = tmpQuery + 'Status=TEMPORARY&';
        }
        if (invoiceStatusQuery?.VALIDATED && !invoiceStatusQuery?.TEMPORARY) {
            tmpQuery = tmpQuery + 'Status=VALIDATED&';
        }
        if (tmpQuery.includes('&')) {
            tmpQuery = tmpQuery.slice(0, -1);
        } else {
            tmpQuery = tmpQuery + 'all';
        }
        tmpQuery = queryInvoice + tmpQuery;
        queryApi.current = tmpQuery;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setListInfo(data);
            })
            .catch((e) => console.log('e1=>>', e));
    };

    return (
        <MainCard title="條件查詢">
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={1}>
                {/* row1 */}
                <Grid item xs={12} sm={6} md={4} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        供應商：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇供應商</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={supplierNameQuery}
                            label="發票供應商"
                            onChange={(e) => setSupplierNameQuery(e.target.value)}
                        >
                            <MenuItem value={'供應商1號'}>供應商1號</MenuItem>
                            <MenuItem value={'供應商2號'}>供應商2號</MenuItem>
                            <MenuItem value={'供應商3號'}>供應商3號</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        海纜名稱：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇海纜</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={submarineCableQuery}
                            label="發票供應商"
                            onChange={(e) => setSubmarineCableQuery(e.target.value)}
                        >
                            <MenuItem value={'海纜1號'}>海纜1號</MenuItem>
                            <MenuItem value={'海纜2號'}>海纜2號</MenuItem>
                            <MenuItem value={'海纜3號'}>海纜3號</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        處理狀態：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    {/* <FormControl> */}
                    <FormGroup
                        row
                        value={invoiceStatusQuery}
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="female"
                        name="radio-buttons-group"
                        // onChange={(e) => setInvoiceStatusQuery(e.target.value)}
                    >
                        <FormControlLabel
                            value={true}
                            control={
                                <Checkbox
                                    name={'TEMPORARY'}
                                    onChange={handleChange}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                />
                            }
                            label="暫存"
                        />
                        <FormControlLabel
                            value={false}
                            control={
                                <Checkbox
                                    name={'VALIDATED'}
                                    onChange={handleChange}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                />
                            }
                            label="Validated"
                        />
                    </FormGroup>
                    {/* </FormControl> */}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2} xl={2} />
                {/* row2 */}
                <Grid item xs={12} sm={6} md={4} lg={1} xl={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        會員名稱：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇會員</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={partyNameQuery}
                            label="會員"
                            onChange={(e) => setPartyNameQuery(e.target.value)}
                        >
                            <MenuItem value={'Taiwan'}>Taiwan</MenuItem>
                            <MenuItem value={'Japan'}>Japan</MenuItem>
                            <MenuItem value={'Korean'}>Korean</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={1} xl={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        記帳段號：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={billMilestoneQuery}
                        size="small"
                        label="填寫記帳段號"
                        onChange={(e) => setBillMilestoneQuery(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={1} xl={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        發票號碼：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={invoiceNoQuery}
                        size="small"
                        label="填寫發票號碼"
                        onChange={(e) => setInvoiceNoQuery(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} />
                {/* row3 */}
                <Grid item xs={12} sm={6} md={4} lg={9} display="flex" alignItems="center">
                    <Typography
                        variant="h5"
                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' }, mr: { lg: '1rem' } }}
                    >
                        日期條件及區間：
                    </Typography>
                    <FormControl>
                        <RadioGroup
                            row
                            value={isIssueDate}
                            aria-labelledby="demo-radio-buttons-group-label"
                            // defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(e) => setIsIssueDate(e.target.value)}
                        >
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
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField size="small" {...endProps} />
                                </>
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} display="flex" justifyContent="end" alignItems="center">
                    <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={invoiceQuery}>
                        查詢
                    </Button>
                    <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={invoiceQuery}>
                        清除
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default InvoiceQueryBlock;
