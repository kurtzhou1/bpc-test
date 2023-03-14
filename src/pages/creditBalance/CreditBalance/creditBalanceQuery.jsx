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

// day
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField } from '@mui/material/index';

// api
import { queryCB } from 'components/apis.jsx';

// ==============================|| SAMPLE PAGE ||============================== //

const CreditBalanceQuery = ({ setListInfo, partiesList, subCableList }) => {
    const [partyName, setPartyName] = useState(''); //會員代號
    const [cBType, setCBType] = useState(''); //CB種類
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [currAmount, setCurrAmount] = useState({ TRUE: false, FALSE: false }); //剩餘金額
    const [createDate, setCreateDate] = useState([null, null]); //建立日期

    const creditBalanceQuery = () => {
        let tmpQuery = '/';
        if (partyName && partyName !== '') {
            tmpQuery = tmpQuery + 'PartyName=' + partyName + '&';
        }
        if (cBType && cBType !== '') {
            tmpQuery = tmpQuery + 'CBType=' + cBType + '&';
        }
        if (submarineCable && submarineCable !== '') {
            tmpQuery = tmpQuery + 'SubmarineCable=' + submarineCable + '&';
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
        console.log('currAmount=>>', currAmount, currAmount.TRUE, currAmount.FALSE);
        if (currAmount?.TRUE && !currAmount?.FALSE) {
            tmpQuery = tmpQuery + 'CurrAmount=true&';
        }
        if (currAmount?.FALSE && !currAmount?.TRUE) {
            tmpQuery = tmpQuery + 'CurrAmount=false&';
        }

        if (tmpQuery.includes('&')) {
            tmpQuery = tmpQuery.slice(0, -1);
        } else {
            tmpQuery = tmpQuery + 'all';
        }

        tmpQuery = queryCB + tmpQuery;
        // queryApi.current = tmpQuery;
        console.log('tmpQuery=>>', tmpQuery);
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('查詢成功=>>', data);
                if (Array.isArray(data)) {
                    setListInfo(data);
                }
            })
            .catch((e) => console.log('e1=>>', e));
    };

    console.log('1=>>', partiesList, subCableList);

    const handleChange = (event) => {
        setCurrAmount({ ...currAmount, [event.target.name]: event.target.checked });
    };

    return (
        <MainCard title="餘額查詢" sx={{ width: '100%' }}>
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
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={partyName}
                            label="會員"
                            onChange={(e) => setPartyName(e.target.value)}
                        >
                            {partiesList.map((i) => (
                                <MenuItem value={i.PartyName}>{i.PartyName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        CB種類：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇CB種類</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={cBType}
                            label="發票供應商"
                            onChange={(e) => setCBType(e.target.value)}
                        >
                            {/* <MenuItem value={'一般'}>一般</MenuItem> */}
                            <MenuItem value={'MWG'}>MWG</MenuItem>
                            <MenuItem value={'重溢繳'}>重溢繳</MenuItem>
                            <MenuItem value={'賠償'}>賠償</MenuItem>
                            <MenuItem value={'賠償'}>預付</MenuItem>
                            <MenuItem value={'其他'}>其他</MenuItem>
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
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={submarineCable}
                            label="海纜名稱"
                            onChange={(e) => setSubmarineCable(e.target.value)}
                        >
                            {subCableList.map((i) => (
                                <MenuItem value={i.CableName}>{i.CableName}</MenuItem>
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
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={workTitle}
                            label="海纜作業"
                            onChange={(e) => setWorkTitle(e.target.value)}
                        >
                            <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                            <MenuItem value={'Construction'}>Construction</MenuItem>
                            <MenuItem value={'O&M'}>O&M</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* row2 */}
                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="end">
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '0rem' } }}>
                        剩餘金額：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl row size="small">
                        <FormGroup row size="small" value={currAmount} aria-labelledby="demo-radio-buttons-group-label">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={'TRUE'}
                                        checked={currAmount.TRUE}
                                        onChange={handleChange}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                    />
                                }
                                label="有"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={'FALSE'}
                                        checked={currAmount.FALSE}
                                        onChange={handleChange}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                    />
                                }
                                label="無"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                {/* <Grid item xs={1} sm={1} md={1} lg={1} display="flex" alignItems="center">
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '0rem' } }}>
                        退費紀錄：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={1} lg={1} display="flex" justifyContent="space-between">
                    <FormControl row>
                        <FormGroup
                            row
                            // value={isLiability}
                            aria-labelledby="demo-radio-buttons-group-label"
                            // defaultValue="female"
                            name="radio-buttons-group"
                            // onChange={(e) => setIsLiability(e.target.value)}
                        >
                            <FormControlLabel
                                value={true}
                                control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                label="有"
                            />
                            <FormControlLabel
                                value={false}
                                control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                label="無"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid> */}
                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="end">
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        建立日期：
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
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
                <Grid item xs={6} sm={6} md={2} lg={2} display="flex" justifyContent="end" alignItems="center">
                    <Button sx={{ mr: '0.5rem' }} variant="contained" onClick={creditBalanceQuery}>
                        查詢
                    </Button>
                    <Button variant="contained">清除</Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CreditBalanceQuery;
