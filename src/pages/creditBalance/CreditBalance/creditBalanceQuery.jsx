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

// ==============================|| SAMPLE PAGE ||============================== //

const CreditBalanceQuery = ({ creditBalanceQuery }) => {
    const [issueDate, setIssueDate] = useState([null, null]); //發票日期
    return (
        <MainCard title="餘額查詢" sx={{ width: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={2}>
                {/* row1 */}
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        會員：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇會員</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            // value={supplierName}
                            label="會員"
                            onChange={(e) => setSupplierName(e.target.value)}
                        >
                            <MenuItem value={'Taiwan'}>Taiwan</MenuItem>
                            <MenuItem value={'Korean'}>Korean</MenuItem>
                            <MenuItem value={'Japan'}>Japan</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        CB種類：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇CB種類</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            // value={submarineCable}
                            label="發票供應商"
                            onChange={(e) => setSubmarineCable(e.target.value)}
                        >
                            <MenuItem value={'CB種類1'}>CB種類1</MenuItem>
                            <MenuItem value={'CB種類2'}>CB種類2</MenuItem>
                            <MenuItem value={'CB種類3'}>CB種類3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        建立日期：
                    </Typography>
                </Grid>
                <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
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
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField fullWidth size="small" {...endProps} />
                                </>
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                {/* row2 */}
                <Grid item xs={1} sm={1} md={1} lg={2} display="flex" alignItems="center">
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        有無剩餘金額：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="space-between">
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
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={2} display="flex" alignItems="center">
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        有無退費紀錄：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="space-between">
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
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} />
                <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="end" alignItems="center">
                    <Button sx={{ mr: '0.5rem' }} variant="contained" onClick={CreditBalanceQuery}>
                        查詢
                    </Button>
                    <Button variant="contained">清除</Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CreditBalanceQuery;
