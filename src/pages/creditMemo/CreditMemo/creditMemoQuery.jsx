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
    Checkbox,
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
import { creditMemoView, submarineCableInfoList, getPartiesInfoList } from 'components/apis.jsx';

// ==============================|| SAMPLE PAGE ||============================== //

const CreditMemoQuery = ({ setListInfo }) => {
    const [partyName, setPartyName] = useState('All'); //會員名稱
    const [submarineCable, setSubmarineCable] = useState('All'); //海纜名稱
    const [workTitle, setWorkTitle] = useState('All'); //海纜作業
    const [lastIssueDate, setLastIssueDate] = useState([null, null]); //建立日期
    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
    const [partiesList, setPartiesList] = useState([]); //會員下拉選單
    const [cMNo, setCMNo] = useState('');

    const initQuery = () => {
        setPartyName('All');
        setCMNo('');
        setSubmarineCable('All');
        setWorkTitle('All');
        setLastIssueDate([null, null]);
    };

    const creditMemoQuery = () => {
        let tmpObject = {};
        if (partyName && partyName !== 'All') {
            tmpObject.PartyName = partyName;
        }
        if (cMNo && cMNo !== '') {
            tmpObject.CMNo = cMNo;
        }
        if (submarineCable && submarineCable !== 'All') {
            tmpObject.SubmarineCable = submarineCable;
        }
        if (workTitle && workTitle !== 'All') {
            tmpObject.WorkTitle = workTitle;
        }
        if (lastIssueDate[0] && lastIssueDate[1]) {
            tmpObject.LastIssueDate = {
                start: dayjs(lastIssueDate[0]).format('YYYYMMDD'),
                end: dayjs(lastIssueDate[1]).format('YYYYMMDD'),
            };
        }

        fetch(creditMemoView, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
            },
            body: JSON.stringify(tmpObject),
        })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setListInfo(data);
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
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
        <MainCard title="CM查詢" sx={{ width: '100%' }}>
            <Grid container display="flex" alignItems="center" spacing={2}>
                {/* row1 */}
                <Grid item lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.7rem', xl: '0.88rem' } }}>
                        會員：
                    </Typography>
                </Grid>
                <Grid item lg={2}>
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
                <Grid item lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.7rem', xl: '0.88rem' } }}>
                        CM號碼：
                    </Typography>
                </Grid>
                <Grid item lg={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={cMNo}
                        size="small"
                        label="填寫CM號碼"
                        onChange={(e) => setCMNo(e.target.value)}
                    />
                </Grid>
                <Grid item lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.7rem', xl: '0.88rem' } }}>
                        海纜名稱：
                    </Typography>
                </Grid>
                <Grid item lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇海纜名稱</InputLabel>
                        <Select
                            value={submarineCable}
                            label="海纜名稱"
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
                <Grid item lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.7rem', xl: '0.88rem' } }}>
                        海纜作業：
                    </Typography>
                </Grid>
                <Grid item lg={2}>
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
                {/* row2 */}
                <Grid item lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.7rem', xl: '0.88rem' } }}>
                        建立日期：
                    </Typography>
                </Grid>
                <Grid item lg={4}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        localeText={{ start: '起始日', end: '結束日' }}
                    >
                        <DateRangePicker
                            inputFormat="YYYY/MM/DD"
                            value={lastIssueDate}
                            onChange={(e) => {
                                setLastIssueDate(e);
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
                <Grid item lg={3} />
                <Grid item lg={4} display="flex" justifyContent="end" alignItems="center">
                    <Button sx={{ mr: '0.5rem' }} variant="contained" onClick={creditMemoQuery}>
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

export default CreditMemoQuery;
