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
    FormControlLabel,
    FormGroup,
    Checkbox,
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// day
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TextField } from '@mui/material/index';

//api
import { queryLiability, dropdownmenuBillMilestone } from 'components/apis.jsx';

import PropTypes from 'prop-types';

// ==============================|| SAMPLE PAGE ||============================== //

const LiabilityQuery = ({
    setListInfo,
    partyList,
    submarineCableList,
    workTitleList,
    queryApi,
}) => {
    const [billMilestoneQuery, setBillMilestoneQuery] = useState('All'); //計帳段號
    const [partyNameQuery, setPartyNameQuery] = useState('All'); //會員名稱
    const [createDate, setCreateDate] = useState([null, null]); //建立日期
    const [submarineCableQuery, setSubmarineCableQuery] = useState('All'); //海纜名稱
    const [workTitle, setWorkTitle] = useState('All'); //海纜作業
    const [invoiceStatusQuery, setInvoiceStatusQuery] = useState({ TRUE: false, FALSE: false }); //處理狀態
    const [bmStoneList, setBmStoneList] = useState([]); //計帳段號下拉選單(需要選擇海纜名稱或海纜作業才能出現)
    const [issueDate, setIssueDate] = useState(null); //發票日期
    const [subject, setSubject] = useState('');

    const initQuery = () => {
        setBillMilestoneQuery('All');
        setPartyNameQuery('All');
        setCreateDate([null, null]);
        setSubmarineCableQuery('All');
        setWorkTitle('All');
        setInvoiceStatusQuery({ TRUE: false, FALSE: false });
    };

    const liabilityQuery = () => {
        let tmpQuery = '/';
        if (billMilestoneQuery && billMilestoneQuery !== 'All') {
            tmpQuery = tmpQuery + 'BillMilestone=' + billMilestoneQuery + '&';
        }
        if (partyNameQuery && partyNameQuery !== 'All') {
            tmpQuery = tmpQuery + 'PartyName=' + partyNameQuery + '&';
        }
        if (submarineCableQuery && submarineCableQuery !== 'All') {
            tmpQuery = tmpQuery + 'SubmarineCable=' + submarineCableQuery + '&';
        }
        if (workTitle && workTitle !== 'All') {
            tmpQuery = tmpQuery + 'WorkTitle=' + workTitle + '&';
        }
        if (createDate[0] && createDate[1]) {
            tmpQuery =
                tmpQuery +
                'startCreateDate=' +
                dayjs(createDate[0]).format('YYYYMMDD') +
                '&' +
                'endCreateDate=' +
                dayjs(createDate[1]).format('YYYYMMDD') +
                '&';
        }
        // End = 'true' || 'false' || 'all'
        if (invoiceStatusQuery?.TRUE && !invoiceStatusQuery?.FALSE) {
            tmpQuery = tmpQuery + 'End=true&';
        }
        if (invoiceStatusQuery?.FALSE && !invoiceStatusQuery?.TRUE) {
            tmpQuery = tmpQuery + 'End=false&';
        }

        if (tmpQuery.includes('&')) {
            tmpQuery = tmpQuery.slice(0, -1);
        } else {
            tmpQuery = tmpQuery + 'all';
        }

        tmpQuery = queryLiability + tmpQuery;
        queryApi.current = tmpQuery;
        fetch(tmpQuery, {
            method: 'GET',
            Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('查詢liabilityQuery成功=>>', data);
                setListInfo(data);
            })
            .catch((e) => console.log('e1=>', e));
    };

    const handleChange = (event) => {
        setInvoiceStatusQuery({ ...invoiceStatusQuery, [event.target.name]: event.target.checked });
    };

    useEffect(() => {
        let tmpArray = {};
        if (submarineCableQuery !== '') {
            tmpArray.SubmarineCable = submarineCableQuery;
        }
        if (workTitle !== '') {
            tmpArray.WorkTitle = workTitle;
        }
        if (Object.keys(tmpArray).length !== 0) {
            console.log('tmpArray=>>', tmpArray);
            fetch(dropdownmenuBillMilestone, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
                },
                body: JSON.stringify(tmpArray),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data抓取成功=>>', data);
                    if (Array.isArray(data)) {
                        setBmStoneList(data);
                    }
                })
                .catch((e) => console.log('e1=>', e));
        }
    }, [submarineCableQuery, workTitle]);

    return (
        <MainCard title="貨幣與匯率條件查詢" sx={{ width: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={2}>
                {/* row1 */}
                <Grid item md={1} lg={1} display="flex">
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
                        <InputLabel size="small" id="billMilestone">
                            選擇海纜名稱
                        </InputLabel>
                        <Select
                            size="small"
                            value={submarineCableQuery}
                            label="填寫海纜名稱"
                            onChange={(e) => setSubmarineCableQuery(e.target.value)}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            {submarineCableList.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={1} lg={1} display="flex">
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
                        <InputLabel size="small" id="billMilestone">
                            選擇海纜作業
                        </InputLabel>
                        <Select
                            size="small"
                            value={workTitle}
                            label="填寫海纜作業"
                            onChange={(e) => setWorkTitle(e.target.value)}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            {workTitleList.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={1} lg={1} xl={1}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { lg: '0.7rem', xl: '0.88rem' },
                            ml: { lg: '0.5rem', xl: '1.5rem' },
                        }}
                    >
                        出帳日期：
                    </Typography>
                </Grid>
                <Grid item md={2} lg={2} xl={2}>
                    <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                inputFormat="YYYY/MM/DD"
                                value={issueDate}
                                onChange={(e) => {
                                    setIssueDate(e);
                                }}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                <Grid item md={1} lg={1} display="flex">
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { lg: '0.7rem', xl: '0.88rem' },
                            ml: { lg: '0.5rem', xl: '1.5rem' },
                        }}
                    >
                        主旨/用途：
                    </Typography>
                </Grid>
                <Grid item md={2} lg={2} xl={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={subject}
                        size="small"
                        // label="主旨"
                        inputProps={{ maxLength: 65 }}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </Grid>
                <Grid item md={1} lg={1} xl={1}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { lg: '0.7rem', xl: '0.88rem' },
                            ml: { lg: '0.5rem', xl: '1.5rem' },
                        }}
                    >
                        原始幣別
                    </Typography>
                </Grid>
                <Grid item md={2} lg={2} xl={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>原始幣別：</InputLabel>
                        <Select
                            value={billMilestoneQuery}
                            label="幣別代碼"
                            onChange={(e) => setBillMilestoneQuery(e.target.value)}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'TWD'}>TWD</MenuItem>
                            <MenuItem value={'JP'}>JP</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* row2 */}
                <Grid item md={1} lg={1} xl={1}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { lg: '0.7rem', xl: '0.88rem' },
                            ml: { lg: '0.5rem', xl: '1.5rem' },
                        }}
                    >
                        原始幣別
                    </Typography>
                </Grid>
                <Grid item md={2} lg={2} xl={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>原始幣別：</InputLabel>
                        <Select
                            value={billMilestoneQuery}
                            label="幣別代碼"
                            onChange={(e) => setBillMilestoneQuery(e.target.value)}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'TWD'}>TWD</MenuItem>
                            <MenuItem value={'JP'}>JP</MenuItem>
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
                        終止狀態：
                    </Typography>
                </Grid>
                <Grid item md={2} lg={2}>
                    {/* <FormControl> */}
                    <FormGroup row value={invoiceStatusQuery}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={'TRUE'}
                                    onChange={handleChange}
                                    checked={invoiceStatusQuery.TRUE}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                />
                            }
                            label="終止"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={'FALSE'}
                                    onChange={handleChange}
                                    checked={invoiceStatusQuery.FALSE}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                />
                            }
                            label="未終止"
                        />
                    </FormGroup>
                </Grid>
                <Grid item md={3} lg={3} display="flex" justifyContent="end" alignItems="center">
                    <Button sx={{ mr: '0.5rem' }} variant="contained" onClick={liabilityQuery}>
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

LiabilityQuery.propTypes = {
    setListInfo: PropTypes.func,
    // bmStoneList: PropTypes.array,
    partyList: PropTypes.array,
    submarineCableList: PropTypes.array,
    workTitleList: PropTypes.array,
    queryApi: PropTypes.string,
};

export default LiabilityQuery;
