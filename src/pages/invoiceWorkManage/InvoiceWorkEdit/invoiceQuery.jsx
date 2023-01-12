import { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField } from '@mui/material/index';
// project import
import MainCard from 'components/MainCard';

const InvoiceQueryBlock = ({ invoiceQuery }) => {
    const [issueDate, setIssueDate] = useState([null, null]); //發票日期

    return (
        <MainCard title="條件查詢">
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={1}>
                {/* row1 */}
                <Grid item xs={12} sm={6} md={4} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        供應商：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇供應商</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            // value={supplyName}
                            label="發票供應商"
                            onChange={(e) => setSupplyName(e.target.value)}
                        >
                            <MenuItem value={'供應商1號'}>供應商1號</MenuItem>
                            <MenuItem value={'供應商2號'}>供應商2號</MenuItem>
                            <MenuItem value={'供應商3號'}>供應商3號</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        海纜名稱：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">選擇海纜</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            // value={submarineCable}
                            label="發票供應商"
                            onChange={(e) => setSubmarineCable(e.target.value)}
                        >
                            <MenuItem value={'海纜1號'}>海纜1號</MenuItem>
                            <MenuItem value={'海纜2號'}>海纜2號</MenuItem>
                            <MenuItem value={'海纜3號'}>海纜3號</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        處理狀態：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl>
                        <RadioGroup
                            row
                            // value={isPro}
                            aria-labelledby="demo-radio-buttons-group-label"
                            // defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(e) => setIsPro(e.target.value)}
                        >
                            <FormControlLabel
                                value={true}
                                control={
                                    <Radio
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: { lg: 14, xl: 20 }
                                            }
                                        }}
                                    />
                                }
                                label="暫存"
                            />
                            <FormControlLabel
                                value={false}
                                control={
                                    <Radio
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: { lg: 14, xl: 20 }
                                            }
                                        }}
                                    />
                                }
                                label="Validated"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2} xl={2} />
                {/* row2 */}
                <Grid item xs={12} sm={6} md={4} lg={1} xl={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        會員名稱：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        // value={invoiceNo}
                        size="small"
                        label="填寫會員代號"
                        onChange={(e) => setInvoiceNo(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={1} xl={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        記帳段號：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        // value={invoiceNo}
                        size="small"
                        label="填寫記帳段號"
                        onChange={(e) => setInvoiceNo(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={1} xl={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        發票號碼：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        // value={invoiceNo}
                        size="small"
                        label="填寫記帳段號"
                        onChange={(e) => setInvoiceNo(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} />

                {/* row3 */}
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        日期條件及區間：
                    </Typography>
                </Grid>
                <Grid item display="flex" xs={12} sm={6} md={4} lg={8}>
                    <FormControl>
                        <RadioGroup
                            row
                            // value={isPro}
                            aria-labelledby="demo-radio-buttons-group-label"
                            // defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(e) => setIsPro(e.target.value)}
                        >
                            <FormControlLabel
                                value={true}
                                control={
                                    <Radio
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: { lg: 14, xl: 20 }
                                            }
                                        }}
                                    />
                                }
                                label="發票日期"
                            />
                            <FormControlLabel
                                value={false}
                                control={
                                    <Radio
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: { lg: 14, xl: 20 }
                                            }
                                        }}
                                    />
                                }
                                label="發票到期日"
                            />
                        </RadioGroup>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: '起始日', end: '結束日' }}>
                        <DateRangePicker
                            inputFormat="YYYY/MM/DD"
                            value={issueDate}
                            onChange={(e) => {
                                setIssueDate(e);
                            }}
                            renderInput={(startProps, endProps) => (
                                <>
                                    <TextField size="small" {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField size="small" {...endProps} />
                                </>
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={4} lg={4}>
                 
                </Grid> */}
                <Grid item xs={12} sm={6} md={4} lg={2} display="flex" justifyContent="end" alignItems="center">
                    <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={invoiceQuery}>
                        查詢
                    </Button>
                    <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={invoiceQuery}>
                        清除
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default InvoiceQueryBlock;
