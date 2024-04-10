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
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { queryToDecutBill, getPartiesInfoList, submarineCableInfoList } from 'components/apis';
// day
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField } from '@mui/material/index';

// ==============================|| SAMPLE PAGE ||============================== //

const ReceivableQuery = ({ setListInfo }) => {
    const [issueDate, setIssueDate] = useState([null, null]); //發票日期
    const [workTitle, setWorkTitle] = useState('All'); //海纜作業
    const [partyName, setPartyName] = useState('All'); //會員名稱
    const [submarineCable, setSubmarineCable] = useState('All'); //海纜名稱
    const [billingNo, setBillingNo] = useState(''); //帳單號碼
    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
    const [partiesList, setPartiesList] = useState([]); //會員下拉選單

    const initInfo = () => {
        setIssueDate([null, null]);
        setWorkTitle('All');
        setPartyName('All');
        setSubmarineCable('All');
        setBillingNo('');
    };

    const receivableQuery = () => {
        let tmpObject = {};
        if (partyName && partyName !== 'All') {
            // tmpQuery = tmpQuery + 'PartyName=' + partyName + '&';
            tmpObject.PartyName = partyName;
        }
        if (submarineCable && submarineCable !== 'All') {
            // tmpQuery = tmpQuery + 'SubmarineCable=' + submarineCable + '&';
            tmpObject.SubmarineCable = submarineCable;
        }
        if (billingNo && billingNo !== '') {
            // tmpQuery = tmpQuery + 'BillingNo=' + billingNo + '&';
            tmpObject.BillingNo = billingNo;
        }
        if (workTitle && workTitle !== 'All') {
            // tmpQuery = tmpQuery + 'WorkTitle=' + workTitle + '&';
            tmpObject.WorkTitle = workTitle;
        }
        if (issueDate[0]) {
            // tmpQuery =
            //     tmpQuery +
            //     'startIssueDate=' +
            //     dayjs(issueDate[0]).format('YYYYMMDD') +
            //     '&' +
            //     'endIssueDate=' +
            //     dayjs(issueDate[1]).format('YYYYMMDD') +
            //     '&';
            tmpObject.IssueDate = {
                start: dayjs(issueDate[0]).format('YYYYMMDD'),
                end: dayjs(issueDate[1]).format('YYYYMMDD'),
            };
        }
        fetch(queryToDecutBill, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(tmpObject),
        })
            .then((res) => res.json())
            .then((data) => {
                setListInfo(data);
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    };

    useEffect(() => {
        initInfo();
        //海纜名稱
        fetch(submarineCableInfoList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setSubmarineCableList(data);
            })
            .catch((e) => console.log('e1=>', e));
        //會員名稱
        fetch(getPartiesInfoList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setPartiesList(data);
            })
            .catch((e) => console.log('e1=>', e));
    }, []);

    return (
        <MainCard title="帳單查詢" sx={{ width: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={2}>
                {/* row1 */}
                <Grid item md={1} lg={1}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { lg: '0.7rem', xl: '0.88rem' },
                            ml: { lg: '0.5rem', xl: '1.5rem' },
                        }}
                    >
                        會員：
                    </Typography>
                </Grid>
                <Grid item md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇會員</InputLabel>
                        <Select
                            value={partyName}
                            label="會員"
                            onChange={(e) => setPartyName(e.target.value)}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            {partiesList.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={1} lg={1}>
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
                <Grid item md={2} lg={2}>
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
                <Grid item md={1} lg={1}>
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
                <Grid item md={2} lg={2}>
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
                <Grid item md={3} lg={3} />
                <Grid item md={1} lg={1}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { lg: '0.7rem', xl: '0.88rem' },
                            ml: { lg: '0.5rem', xl: '1.5rem' },
                        }}
                    >
                        帳單日期：
                    </Typography>
                </Grid>
                <Grid item md={5} lg={5}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        localeText={{ start: '起始日', end: '結束日' }}
                    >
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
                <Grid item md={1} lg={1}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { lg: '0.7rem', xl: '0.88rem' },
                            ml: { lg: '0.5rem', xl: '1.5rem' },
                        }}
                    >
                        帳單號碼：
                    </Typography>
                </Grid>
                <Grid item md={2} lg={2}>
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
                <Grid item md={3} lg={3} display="flex" justifyContent="end" alignItems="center">
                    <Button sx={{ mr: '0.5rem' }} variant="contained" onClick={receivableQuery}>
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

export default ReceivableQuery;
