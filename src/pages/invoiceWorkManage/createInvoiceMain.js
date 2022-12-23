import { useState } from 'react';

// project import
import MainCard from 'components/MainCard';
import { TextField } from '../../../node_modules/@mui/material/index';

// material-ui
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CreateInvoiceMain = () => {
    const [dayValue, setDayValue] = useState();
    const changeDay = (newValue) => {
        setDayValue(newValue);
    };

    return (
        <MainCard title="發票工作主檔建立" sx={{ height: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={0.5}>
                {/* row1 */}
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        供應商：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇供應商</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            // value={age}
                            label="發票供應商"
                            // onChange={handleChange}
                        >
                            <MenuItem value={10}>供應商1號</MenuItem>
                            <MenuItem value={20}>供應商2號</MenuItem>
                            <MenuItem value={30}>供應商3號</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        發票號碼：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <TextField fullWidth variant="outlined" size="small" label="發票號碼" />
                </Grid>
                {/* row2 */}
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        海纜名稱：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇海纜</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            // value={age}
                            label="發票供應商"
                            // onChange={handleChange}
                        >
                            <MenuItem value={10}>海纜1號</MenuItem>
                            <MenuItem value={20}>海纜2號</MenuItem>
                            <MenuItem value={30}>海纜3號</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        海纜作業：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <TextField fullWidth variant="outlined" size="small" label="填寫海纜作業" />
                </Grid>
                {/* row3 */}
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        合約種類：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇合約種類</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            // value={age}
                            label="發票供應商"
                            // onChange={handleChange}
                        >
                            <MenuItem value={10}>合約種類1</MenuItem>
                            <MenuItem value={20}>合約種類2</MenuItem>
                            <MenuItem value={30}>合約種類3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        發票日期：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                inputFormat="YYYY/MM/DD"
                                value={dayValue}
                                onChange={changeDay}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                {/* row4 */}
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        總金額：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <TextField fullWidth variant="outlined" size="small" label="填寫發票總金額" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        發票到期日：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                inputFormat="YYYY/MM/DD"
                                value={dayValue}
                                onChange={changeDay}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                {/* row5 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        是否為Pro-Forma：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl>
                        <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                            <FormControlLabel value="Y" control={<Radio size="small" />} label="Y" />
                            <FormControlLabel value="N" control={<Radio size="small" />} label="N" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        是否需攤分：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl>
                        <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                            <FormControlLabel value="Y" control={<Radio size="small" />} label="Y" />
                            <FormControlLabel value="N" control={<Radio size="small" />} label="N" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {/* row6 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        是否為短繳補收：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl>
                        <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                            <FormControlLabel value="Y" control={<Radio size="small" />} label="Y" />
                            <FormControlLabel value="N" control={<Radio size="small" />} label="N" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        會員代號：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <TextField variant="outlined" size="small" label="不須攤分請填寫會員代號" />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CreateInvoiceMain;
