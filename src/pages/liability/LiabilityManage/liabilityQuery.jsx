import { useState } from 'react';
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
import { queryLiability } from 'components/apis.jsx';

import PropTypes from 'prop-types';

// ==============================|| SAMPLE PAGE ||============================== //

const LiabilityQuery = ({ setListInfo, bmStoneList, partyList, subCableList, workTitleList, queryApi }) => {
    const [billMilestoneQuery, setBillMilestoneQuery] = useState(''); //記帳段號
    const [partyNameQuery, setPartyNameQuery] = useState(''); //會員代號
    const [createDate, setCreateDate] = useState([null, null]); //建立日期
    const [submarineCableQuery, setSubmarineCableQuery] = useState(''); //海纜名稱
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [invoiceStatusQuery, setInvoiceStatusQuery] = useState({ TRUE: false, FALSE: false }); //處理狀態

    const initQuery = () => {
        setBillMilestoneQuery('');
        setPartyNameQuery('');
        setCreateDate([null, null]);
        setSubmarineCableQuery('');
        setWorkTitle('');
        setInvoiceStatusQuery({ TRUE: false, FALSE: false });
    };

    const liabilityQuery = () => {
        let tmpQuery = '/';
        if (billMilestoneQuery && billMilestoneQuery !== '') {
            tmpQuery = tmpQuery + 'BillMilestone=' + billMilestoneQuery + '&';
        }
        if (partyNameQuery && partyNameQuery !== '') {
            tmpQuery = tmpQuery + 'PartyName=' + partyNameQuery + '&';
        }
        if (submarineCableQuery && submarineCableQuery !== '') {
            tmpQuery = tmpQuery + 'SubmarineCable=' + submarineCableQuery + '&';
        }
        if (workTitle && workTitle !== '') {
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
        console.log('invoiceStatusQuery=>>', invoiceStatusQuery);
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
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('查詢成功=>>', data);
                setListInfo(data);
            })
            .catch((e) => console.log('e1=>', e));
    };

    const handleChange = (event) => {
        setInvoiceStatusQuery({ ...invoiceStatusQuery, [event.target.name]: event.target.checked });
    };

    return (
        <MainCard title="Liability條件查詢" sx={{ width: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={2}>
                {/* row1 */}
                <Grid item xs={2} sm={2} md={1} lg={1} xl={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        記帳段號：
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇記帳段號</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={billMilestoneQuery}
                            label="記帳段號"
                            onChange={(e) => setBillMilestoneQuery(e.target.value)}
                        >
                            {bmStoneList?.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} sm={2} md={1} lg={1} xl={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        會員代號：
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇會員</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={partyNameQuery}
                            label="會員代號"
                            onChange={(e) => setPartyNameQuery(e.target.value)}
                        >
                            {partyList.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} sm={2} md={1} lg={1} xl={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        建立日期：
                    </Typography>
                </Grid>
                <Grid item xs={10} sm={10} md={5} lg={5} xl={5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: '起始日', end: '結束日' }}>
                        <DateRangePicker
                            inputFormat="YYYY/MM/DD"
                            value={createDate}
                            onChange={(e) => {
                                setCreateDate(e);
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

                {/* row2 */}
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
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            size="small"
                            value={submarineCableQuery}
                            label="填寫海纜名稱"
                            onChange={(e) => setSubmarineCableQuery(e.target.value)}
                        >
                            {subCableList.map((i) => (
                                <MenuItem key={i.CableName} value={i.CableName}>
                                    {i.CableName}
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
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            size="small"
                            value={workTitle}
                            label="填寫海纜作業"
                            onChange={(e) => setWorkTitle(e.target.value)}
                        >
                            {workTitleList.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} sm={2} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        終止狀態：
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={2} lg={2}>
                    {/* <FormControl> */}
                    <FormGroup row value={invoiceStatusQuery} aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
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
                    {/* </FormControl> */}
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} display="flex" justifyContent="end" alignItems="center">
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
    bmStoneList: PropTypes.array,
    partyList: PropTypes.array,
    subCableList: PropTypes.array,
    workTitleList: PropTypes.array,
    queryApi: PropTypes.string
};

export default LiabilityQuery;
