import { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { queryPaydraft } from 'components/apis';

// day
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TextField } from '@mui/material/index';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// redux
import { useSelector } from 'react-redux';

// ==============================|| SAMPLE PAGE ||============================== //

const CorrespondenceQuery = ({ setListInfo, queryApi, value }) => {
    const [issueDate, setIssueDate] = useState(null); //發票日期
    const [supplierName, setSupplierName] = useState(''); //供應商
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const { supNmList, subCableList } = useSelector((state) => state.dropdown); //供應商下拉選單 + 海纜名稱下拉選單
    const [invoiceNo, setInvoiceNo] = useState(''); //發票號碼

    const initData = () => {
        setIssueDate(null);
        setSupplierName('');
        setSubmarineCable('');
        setWorkTitle('');
        setInvoiceNo('');
    };

    const correspondenceQuery = () => {
        let tmpQuery = value === 0 ? '/Status=TEMPORARY&PayeeType=SUPPLIER&' : '/Status=COMPLETE&PayeeType=SUPPLIER&';
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
        if (issueDate && value === 1) {
            tmpQuery =
                tmpQuery +
                'startIssueDate=' +
                dayjs(issueDate).format('YYYYMMDD') +
                '&' +
                'endIssueDate=' +
                dayjs(issueDate).format('YYYYMMDD') +
                '&';
        }
        tmpQuery = tmpQuery.slice(0, -1);
        tmpQuery = queryPaydraft + tmpQuery;
        console.log('tmpQuery=>>', tmpQuery);
        queryApi.current = tmpQuery;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setListInfo(data);
                }
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    };

    return (
        <MainCard title="函稿查詢" sx={{ width: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={2}>
                {/* row1 */}
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
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
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
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
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        海纜作業：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇海纜作業</InputLabel>
                        <Select value={workTitle} label="海纜作業" onChange={(e) => setWorkTitle(e.target.value)}>
                            <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                            <MenuItem value={'Construction'}>Construction</MenuItem>
                            <MenuItem value={'OM'}>OM</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
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
                {/* row2 */}
                {/* <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        剩餘金額：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="space-between">
                    <FormControl row size="small">
                        <FormGroup
                            row
                            size="small"
                            // value={isLiability}
                             
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
                {value === 1 ? (
                    <>
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                                發文日期：
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
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
                        <Grid item xs={9} sm={9} md={9} lg={9} display="flex" justifyContent="end" alignItems="center">
                            <Button sx={{ mr: '0.5rem' }} variant="contained" onClick={correspondenceQuery}>
                                查詢
                            </Button>
                            <Button variant="contained" onClick={initData}>
                                清除
                            </Button>
                        </Grid>
                    </>
                ) : (
                    <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="end" alignItems="center">
                        <Button sx={{ mr: '0.5rem' }} variant="contained" onClick={correspondenceQuery}>
                            查詢
                        </Button>
                        <Button variant="contained" onClick={initData}>
                            清除
                        </Button>
                    </Grid>
                )}
            </Grid>
        </MainCard>
    );
};

CorrespondenceQuery.propTypes = {
    setListInfo: PropTypes.func,
    queryApi: PropTypes.string,
    value: PropTypes.number
};

export default CorrespondenceQuery;
