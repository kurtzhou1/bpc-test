import { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    Box,
    TextField,
    Checkbox,
    Table,
    Tabs,
    Tab,
    RadioGroup,
    FormControlLabel,
    Radio
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
import { BootstrapDialogTitle, TabPanel } from 'components/commonFunction';

// table
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const CorrespondenceMake = ({ isDialogOpen, handleDialogClose, listInfo }) => {
    const [cblistInfo, setCbListInfo] = useState(listInfo);
    // const [editItem, setEditItem] = useState(NaN);
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(0);

    // const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    // const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const itemDetailInitial = () => {
        setPartyName([]);
        setLBRatio('');
        setIsEdit(false);
    };

    // //編輯
    // const editlistInfoItem = () => {
    //     let tmpArray = listInfo[editItem];

    //     if (tmpArray) {
    //         setPartyName([tmpArray?.PartyName]);
    //         setLBRatio(tmpArray?.LbRatio);
    //     }
    //     setIsEdit(true);
    // };

    //新增
    // const addList = () => {
    //     let tmpArray = listInfo.map((i) => i);
    //     console.log('=>>', partyName);
    //     let partyArray = partyName;
    //     partyArray.forEach((e) => {
    //         tmpArray.push({
    //             BillMilestone: billMilestone,
    //             PartyName: e,
    //             LBRatio: lBRatio
    //         });
    //     });
    //     setListInfo([...tmpArray]);
    //     itemDetailInitial();
    // };

    // //刪除
    // const deletelistInfoItem = (deleteItem) => {
    //     let tmpArray = listInfo.map((i) => i);
    //     tmpArray.splice(deleteItem, 1);
    //     setListInfo([...tmpArray]);
    // };

    // useEffect(() => {
    //     if (editItem >= 0) {
    //         editlistInfoItem();
    //         // setIsListEdit(true);
    //     }
    // }, [editItem]);

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

    return (
        <Dialog onClose={handleDialogClose} maxWidth="lg" fullWidth open={isDialogOpen}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                製作函稿
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container spacing={1}>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <MainCard title="發文基本資訊" sx={{ width: '100%' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        發文字號：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
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
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        發文日期：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫會員代號"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                                {/* <Grid item xs={3} sm={3} md={3} lg={3} xl={6} /> */}
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        受文者：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫剩餘金額"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        聯絡人員：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫摘要"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        聯絡電話：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫摘要"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        E-mail：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫摘要"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="start">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        主旨：
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="center">
                                    <RadioGroup
                                        row
                                        // value={isUpload}
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        // onChange={(e) => setIsUpload(e.target.value)}
                                    >
                                        <Grid
                                            container
                                            spacing={2}
                                            // sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
                                                {/* <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center', width: '100%' }}> */}
                                                <FormControlLabel
                                                    value={false}
                                                    control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                                />
                                                <Typography
                                                    variant="h5"
                                                    // onClick={() => {
                                                    //     setIsUpload(false);
                                                    // }}
                                                    sx={{
                                                        fontSize: { lg: '0.5rem', xl: '0.88rem' },
                                                        ml: { lg: '0.5rem', xl: '1.5rem' }
                                                    }}
                                                >
                                                    請電匯CIENA JP以支付
                                                    <TextField
                                                        variant="outlined"
                                                        // value={lBRatio}
                                                        size="small"
                                                        label="自行填寫主旨"
                                                        // onChange={(e) => setLBRatio(e.target.value)}
                                                    />
                                                    淨額為美金元{' '}
                                                    <TextField
                                                        variant="outlined"
                                                        // value={lBRatio}
                                                        size="small"
                                                        label="自行填寫主旨"
                                                        // onChange={(e) => setLBRatio(e.target.value)}
                                                    />
                                                    (US$48,576.00)，請查照
                                                </Typography>
                                                {/* </Box> */}
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
                                                {/* <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center', width: '100%' }}> */}
                                                {/* <DropzoneArea onChange={handleUploadChange} acceptedFiles={['.pdf']} /> */}
                                                <FormControlLabel
                                                    value={true}
                                                    control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    // value={lBRatio}
                                                    size="small"
                                                    label="自行填寫主旨"
                                                    // onChange={(e) => setLBRatio(e.target.value)}
                                                />
                                                {/* </Box> */}
                                            </Grid>
                                        </Grid>
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </MainCard>
                        <MainCard title="說明" sx={{ width: '100%' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        聯盟銀行帳號：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
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
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        供應商IBAN：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫會員代號"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                                {/* <Grid item xs={3} sm={3} md={3} lg={3} xl={6} /> */}
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        供應商銀行：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫剩餘金額"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        海纜資訊：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫剩餘金額"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={8} sm={8} md={8} lg={8} display="flex" justifyContent="center" />
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        供應商銀行帳號：
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫摘要"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        供應商銀行戶名：
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫摘要"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        供應商國際銀行代碼：
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={lBRatio}
                                        size="small"
                                        label="填寫摘要"
                                        // onChange={(e) => setLBRatio(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        供應商銀行地址：
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
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
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <MainCard title="Credit Balance" sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="CB抵扣紀錄" {...a11yProps(0)} />
                                    <Tab label="退費紀錄" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                {/* <CreditBalanceDeduct cblistInfo={cblistInfo} /> */}
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {/* <CreditBalanceRefund cblistInfo={cblistInfo} /> */}
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
                        handleDialogClose();
                        // itemDetailInitial();
                    }}
                >
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CorrespondenceMake;
