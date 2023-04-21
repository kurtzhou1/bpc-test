import { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    TextField,
    Checkbox,
    Autocomplete,
    Table,
    Tabs,
    Tab
} from '@mui/material';

// day
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// project import
import MainCard from 'components/MainCard';
import CreditBalanceDeduct from './creditBalanceDeduct';
import CreditBalanceRefund from './creditBalanceRefund';
import { BootstrapDialogTitle, TabPanel } from 'components/commonFunction';

// table
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// api
import { generateReport } from 'components/apis.jsx';

const CreditBalanceView = ({ cbView, handleViewClose, listInfo, viewId }) => {
    const [cblistInfo, setCbListInfo] = useState(listInfo);
    const [value, setValue] = useState(0);

    const itemDetailInitial = () => {
        setPartyName([]);
        setLBRatio('');
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: theme.palette.common.gary,
            color: theme.palette.common.black,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        }
    }));

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDownload = () => {
        let tmpData = {
            CBID: viewId,
            Download: true
        };
        fetch(generateReport, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: JSON.stringify(tmpData)
        })
            .then((res) => {
                return res.blob();
            })
            .then((blob) => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `CB報表.xlsx`;
                link.click();
            })
            .catch((e) => console.log('e1=>', e));
    };

    return (
        <Dialog
            // onClose={() => {
            //     itemDetailInitial();
            //     handleViewClose();
            // }}
            maxWidth="sm"
            fullWidth
            open={cbView}
        >
            <BootstrapDialogTitle>檢視Credit Balance明細</BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container spacing={1}>
                    {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                        <MainCard title="Credit Balance" sx={{ width: '100%' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                    >
                                        會員代號：
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <FormControl fullWidth size="small">
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            // disabled={listInfo.length > 0}
                                            // value={billMilestone}
                                            size="small"
                                            label="填寫CB種類"
                                            // onChange={(e) => setBillMilestone(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                    >
                                        CB種類：
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫會員代號"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                    >
                                        剩餘金額：
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫剩餘金額"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                    >
                                        摘要：
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫摘要"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid> */}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <MainCard title="Credit Balance" sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="CB抵扣紀錄" {...a11yProps(0)} />
                                    <Tab label="退費紀錄" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <CreditBalanceDeduct cblistInfo={cblistInfo} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <CreditBalanceRefund cblistInfo={cblistInfo} />
                            </TabPanel>
                        </MainCard>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleDownload();
                    }}
                >
                    產生CB報表
                </Button>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleViewClose();
                        itemDetailInitial();
                    }}
                >
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreditBalanceView;
