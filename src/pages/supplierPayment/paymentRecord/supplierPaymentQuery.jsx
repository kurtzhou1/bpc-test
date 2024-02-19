import { useEffect, useState } from 'react';
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import {
    querySupplierPayment,
    supplierNameDropDownUnique,
    submarineCableInfoList,
} from 'components/apis';

// day
import dayjs from 'dayjs';
import { TextField } from '@mui/material/index';

// ==============================|| SAMPLE PAGE ||============================== //

const SupplierPaymentQuery = ({ setListInfo, queryApi, value }) => {
    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
    const [issueDate, setIssueDate] = useState([null, null]); //發票日期
    const [workTitle, setWorkTitle] = useState('All'); //海纜作業
    const [supplierName, setSupplierName] = useState('All'); //供應商
    const [submarineCable, setSubmarineCable] = useState('All'); //海纜名稱
    const [invoiceNo, setInvoiceNo] = useState(''); //發票號碼
    const [supNmList, setSupNmList] = useState([]); //供應商下拉選單

    const initInfo = () => {
        setIssueDate([null, null]);
        setWorkTitle('All');
        setSupplierName('All');
        setSubmarineCable('All');
        setInvoiceNo('');
    };

    const supplierPaymentQuery = () => {
        let tmpQuery = '';
        if (supplierName && supplierName !== '') {
            tmpQuery = tmpQuery + 'SupplierName=' + supplierName + '&';
        }
        if (submarineCable && submarineCable !== '') {
            tmpQuery = tmpQuery + 'SubmarineCable=' + submarineCable + '&';
        }
        if (invoiceNo && invoiceNo !== '' && value === 0) {
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
                tmpQuery = '/Status=PAYING&' + tmpQuery;
            } else {
                tmpQuery = tmpQuery + '/Status=PAYING';
            }
            tmpQuery = querySupplierPayment + tmpQuery;
        } else if (value === 1) {
            console.log('tmpQuery=>>', tmpQuery);
            if (tmpQuery.includes('&')) {
                tmpQuery = '/' + tmpQuery.slice(0, -1);
                tmpQuery = tmpQuery + '&Status=COMPLETE';
            } else {
                tmpQuery = tmpQuery + '/Status=COMPLETE';
            }
            tmpQuery = querySupplierPayment + tmpQuery;
        }
        console.log('按下查詢=>>', tmpQuery);
        queryApi.current = tmpQuery;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('data=>>', data);
                if (Array.isArray(data)) {
                    setListInfo(data);
                }
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    };

    useEffect(() => {
        fetch(supplierNameDropDownUnique, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setSupNmList(data);
                }
            })
            .catch((e) => console.log('e1=>', e));
        //海纜名稱
        fetch(submarineCableInfoList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setSubmarineCableList(data);
            })
            .catch((e) => console.log('e1=>', e));
    }, []);

    return (
        <MainCard title="發票查詢" sx={{ width: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={2}>
                {/* row1 */}
                <Grid item sm={1} md={1} lg={1}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { lg: '0.7rem', xl: '0.88rem' },
                            ml: { lg: '0.5rem', xl: '1.5rem' },
                        }}
                    >
                        海纜名稱：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇海纜名稱</InputLabel>
                        <Select
                            value={submarineCable}
                            label="海纜名稱"
                            size="small"
                            onChange={(e) => setSubmarineCable(e.target.value)}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            {submarineCableList.map((i) => (
                                <MenuItem key={i.CableName} value={i.CableName}>
                                    {i.CableName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={1} md={1} lg={1}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { lg: '0.7rem', xl: '0.88rem' },
                            ml: { lg: '0.5rem', xl: '1.5rem' },
                        }}
                    >
                        海纜作業：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇海纜作業</InputLabel>
                        <Select
                            value={workTitle}
                            label="海纜作業"
                            onChange={(e) => setWorkTitle(e.target.value)}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                            <MenuItem value={'Construction'}>Construction</MenuItem>
                            <MenuItem value={'O&M'}>O&M</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={1} md={1} lg={1}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { lg: '0.7rem', xl: '0.88rem' },
                            ml: { lg: '0.5rem', xl: '1.5rem' },
                        }}
                    >
                        供應商：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇供應商</InputLabel>
                        <Select
                            value={supplierName}
                            label="供應商"
                            onChange={(e) => setSupplierName(e.target.value)}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            {supNmList.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={1} md={1} lg={1}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { lg: '0.7rem', xl: '0.88rem' },
                            ml: { lg: '0.5rem', xl: '1.5rem' },
                        }}
                    >
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
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    display="flex"
                    justifyContent="end"
                    alignItems="center"
                >
                    <Button
                        sx={{ mr: '0.5rem' }}
                        variant="contained"
                        onClick={supplierPaymentQuery}
                    >
                        查詢
                    </Button>
                    <Button variant="contained" onClick={initInfo}>
                        清除
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default SupplierPaymentQuery;
