import { useEffect, useState } from 'react';
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// day
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField } from '@mui/material/index';

//api
import { queryInvoice, supplierNameDropDownUnique, submarineCableInfoList } from 'components/apis.jsx';

// ==============================|| SAMPLE PAGE ||============================== //

const JournalQuery = ({ setListInfo, queryApi, invoiceStatus, supplierName, setSupplierName, submarineCable, setSubmarineCable, issueDate, setIssueDate, initQuery }) => {
    const [supNmList, setSupNmList] = useState([]); //供應商下拉選單
    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單

    const jounaryQuery = () => {
     // let tmpQuery = '/';
     let tmpArray = {};
        if (supplierName && supplierName !== '') {
            // tmpQuery = tmpQuery + 'SupplierName=' + supplierName + '&';
            tmpArray.SupplierName = supplierName;
        }
        if (submarineCable && submarineCable !== '') {
            // tmpQuery = tmpQuery + 'SubmarineCable=' + submarineCable + '&';
            tmpArray.SubmarineCable = submarineCable;
        }
        if (issueDate[0] && issueDate[1]) {
            tmpArray.CreateDate = {
                start: dayjs(issueDate[0]).format('YYYYMMDD'),
                end: dayjs(issueDate[1]).format('YYYYMMDD')
            }
        }
        if (invoiceStatus === '0' || invoiceStatus === 0) {
            // tmpQuery = tmpQuery + 'Status=' + 'VALIDATED' + '&';
            tmpArray.Status = "VALIDATED";
        } else if (invoiceStatus === '1' || invoiceStatus === 1) {
            // tmpQuery = tmpQuery + 'Status=' + 'BILLED' + '&';
            tmpArray.Status = "BILLED";
        } else {
            tmpArray.Status = 'INVALID';
        }
        queryApi.current = tmpArray;
        console.log('tmpQuery=>>', tmpArray);
        fetch(queryInvoice, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then((data) => {
                setListInfo(data);
                // initQuery();
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        fetch(supplierNameDropDownUnique, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('data=>>', data);
                if(Array.isArray(data)) {
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
    }, [])

    return (
        <MainCard title="發票查詢" sx={{ width: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={2}>
                {/* row1 */}
                <Grid item xs={2} sm={2} md={1} lg={1}>
                    <Typography
                        textAlign="right"
                        variant="h5"
                        sx={{ fontSize: { lg: '0.7rem' ,xl: '0.88rem' } }}
                    >
                        海纜名稱：
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇海纜</InputLabel>
                        <Select value={submarineCable} label="海纜" onChange={(e) => setSubmarineCable(e.target.value)}>
                            {submarineCableList.map((i) => (
                                <MenuItem key={i.CableName} value={i.CableName}>
                                    {i.CableName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} sm={2} md={1} lg={1}>
                    <Typography variant="h5" textAlign="right" sx={{ fontSize: { lg: '0.7rem' ,xl: '0.88rem' } }}>
                        供應商：
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇供應商</InputLabel>
                        <Select value={supplierName} label="供應商" onChange={(e) => setSupplierName(e.target.value)}>
                            {supNmList.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3} sm={3} md={1} lg={1}>
                    <Typography
                        textAlign="right"
                        variant="h5"
                        sx={{ fontSize: { lg: '0.7rem' ,xl: '0.88rem' } }}
                    >
                        發票日期：
                    </Typography>
                </Grid>
                <Grid item xs={9} sm={9} md={3} lg={3}>
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
