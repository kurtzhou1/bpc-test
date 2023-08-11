import { useEffect, useState } from 'react';
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, Box, Checkbox, FormGroup } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// day
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField } from '@mui/material/index';

//api
import { queryInvoice, supplierNameDropDown } from 'components/apis.jsx';

// redux
import { useSelector } from 'react-redux';

// ==============================|| SAMPLE PAGE ||============================== //

const JournalQuery = ({ setListInfo, queryApi, invoiceStatus, setPage }) => {
    const [supplierName, setSupplierName] = useState(''); //供應商
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [issueDate, setIssueDate] = useState([null, null]); //發票日期
    const { subCableList } = useSelector((state) => state.dropdown); //海纜名稱下拉選單
    const [supNmList, setSupNmList] = useState([]); //供應商下拉選單

    const initQuery = () => {
        setSupplierName('');
        setSubmarineCable('');
        setIssueDate([null, null]);
    };

    const jounaryQuery = () => {
        let tmpQuery = '/';
        if (supplierName && supplierName !== '') {
            tmpQuery = tmpQuery + 'SupplierName=' + supplierName + '&';
        }
        if (submarineCable && submarineCable !== '') {
            tmpQuery = tmpQuery + 'SubmarineCable=' + submarineCable + '&';
        }
        // if (partyName && partyName !== '') {
        //     tmpQuery = tmpQuery + 'PartyName=' + partyName + '&';
        // }

        if (issueDate[0] && issueDate[1]) {
            tmpQuery =
                tmpQuery +
                'startCreateDate=' +
                dayjs(issueDate[0]).format('YYYYMMDD') +
                '&' +
                'endCreateDate=' +
                dayjs(issueDate[1]).format('YYYYMMDD') +
                '&';
        }
        if (invoiceStatus === '0' || invoiceStatus === 0) {
            tmpQuery = tmpQuery + 'Status=' + 'all' + '&';
        } 

        if (tmpQuery.includes('&')) {
            tmpQuery = tmpQuery.slice(0, -1);
        }

        tmpQuery = queryInvoice + tmpQuery;
        queryApi.current = tmpQuery;
        console.log('立帳發票查詢=>>', tmpQuery);
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('查詢成功=>>', data);
                setListInfo(data);
                setPage(0);
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        if (submarineCable !== ''){
            let tmpQuery = supplierNameDropDown + 'SubmarineCable=' + submarineCable
            fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('查詢成功=>>', data);
                if(Array.isArray(data)) {
                    setSupNmList(data);
                }
            })
            .catch((e) => console.log('e1=>', e));
        }
    }, [submarineCable])

    return (
        <MainCard title="發票查詢" sx={{ width: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={2}>
                {/* row1 */}
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography
                        variant="h5"
                        textAlign="right"
                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                    >
                        海纜名稱：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇海纜</InputLabel>
                        <Select value={submarineCable} label="海纜" onChange={(e) => setSubmarineCable(e.target.value)}>
                            {subCableList.map((i) => (
                                <MenuItem key={i.CableName} value={i.CableName}>
                                    {i.CableName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography
                        textAlign="right"
                        variant="h5"
                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                    >
                        供應商：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇供應商</InputLabel>
                        <Select value={supplierName} label="供應商" onChange={(e) => setSupplierName(e.target.value)}>
                            {supNmList.map((i) => (
                                <MenuItem key={i.SupplierName} value={i.SupplierName}>
                                    {i.SupplierName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
              
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography
                        variant="h5"
                        textAlign="right"
                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                    >
                        發票日期：
                    </Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
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
                <Grid item xs={2} sm={2} md={2} lg={2} />
                <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="end" alignItems="center">
                    <Button sx={{ mr: '0.5rem' }} variant="contained" onClick={jounaryQuery}>
                        查詢
                    </Button>
                    <Button variant="contained" onClick={initQuery}>
                        清除
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default JournalQuery;
