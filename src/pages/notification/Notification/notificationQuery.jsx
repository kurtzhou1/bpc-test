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
    Checkbox
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// day
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField } from '@mui/material/index';

//api
import { getSysInvNotifyRule } from 'components/apis.jsx';

import PropTypes from 'prop-types';

// ==============================|| SAMPLE PAGE ||============================== //

const NotificationQuery = ({ setListInfo, partiesList, submarineCableList, value, queryApi }) => {
    const [submarineCableQuery, setSubmarineCableQuery] = useState(''); //海纜名稱
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [partyNameQuery, setPartyNameQuery] = useState(''); //會員名稱
    const [ruleName, setRuleName] = useState('');
    const [ruleCName, setRuleCName] = useState('');

    const initQuery = () => {
        setPartyNameQuery('');
        setSubmarineCableQuery('');
        setWorkTitle('');
        setRuleName('');
        setRuleCName('');
    };

    const notificationQuery = () => {
        let tmpArray = {};
        if (submarineCableQuery !== '' || workTitle !== '' || ruleName !== '' || ruleCName !== '') {
            tmpArray = {
                SubmarineCableQuery: submarineCableQuery,
                WorkTitle: workTitle,
                RuleName: ruleName,
                RuleCName: ruleCName
            };
        }
        fetch(getSysInvNotifyRule, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then((data) => {
                setListInfo(data);
                initQuery();
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        initQuery();
    }, [value]);

    return (
        <MainCard title="條件查詢" sx={{ width: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={2}>
                {/* row1 */}
                <Grid item xs={2} sm={2} md={1} lg={1} display="flex">
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        海纜名稱：
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={2} lg={2}>
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
                            {submarineCableList.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} sm={2} md={1} lg={1} display="flex">
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        海纜作業：
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel size="small" id="billMilestone">
                            選擇海纜作業
                        </InputLabel>
                        <Select size="small" value={workTitle} label="填寫海纜作業" onChange={(e) => setWorkTitle(e.target.value)}>
                            <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                            <MenuItem value={'Construction'}>Construction</MenuItem>
                            <MenuItem value={'O&M'}>O&M</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {value === 0 ? (
                <>
                    <Grid item xs={2} sm={2} md={1} lg={1} xl={1}>
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            會員名稱：
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>選擇會員</InputLabel>
                            <Select value={partyNameQuery} label="會員名稱" onChange={(e) => setPartyNameQuery(e.target.value)}>
                                {partiesList.map((i) => (
                                    <MenuItem key={i} value={i}>
                                        {i}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </>
                ) : ''}
                <Grid item xs={2} sm={2} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        規則英文名稱：
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={ruleName}
                            size="small"
                            label="填寫規則名稱"
                            onChange={(e) => setRuleName(e.target.value)}
                        />
                    </FormControl>
                </Grid>
                {value === 1 ? (
                <>
                    <Grid item xs={2} sm={2} md={1} lg={1} xl={1}>
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            規則中文名稱：
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={ruleCName}
                            size="small"
                            label="填寫規則名稱"
                            onChange={(e) => setRuleCName(e.target.value)}
                        />
                    </FormControl>
                </Grid>
                </>
                ) : <Grid item md={3} />}
                {/* row2 */}
                <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="end" alignItems="center">
                    <Button sx={{ mr: '0.5rem' }} variant="contained" onClick={notificationQuery}>
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

NotificationQuery.propTypes = {
    setListInfo: PropTypes.func,
    // bmStoneList: PropTypes.array,
    partiesList: PropTypes.array,
    submarineCableList: PropTypes.array,
    workTitleList: PropTypes.array,
    queryApi: PropTypes.string
};

export default NotificationQuery;
