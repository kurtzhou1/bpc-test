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
    Table
} from '@mui/material';

// project
import { BootstrapDialogTitle } from 'components/commonFunction';
import { handleNumber } from 'components/commonFunction';

// day
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// table
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// api
import { queryCB } from 'components/apis.jsx';
// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const CreditBalanceAdd = ({ handleDialogClose, isDialogOpen, billMilestone, partiesList, subCableList, queryApi, setListInfo }) => {
    const dispatch = useDispatch();
    const [cBType, setCBType] = useState(''); // CB種類
    const [partyName, setPartyName] = useState(''); //會員代號
    const [currAmount, setCurrAmount] = useState('0'); // 剩餘金額
    const [note, setNote] = useState(''); // 摘要
    const [invoiceNo, setInvoiceNo] = useState(''); // 發票號碼
    const [billingNo, setBillingNo] = useState(''); // 帳單號碼
    const [submarineCable, setSubmarineCable] = useState(''); // 海纜名稱
    const [workTitle, setWorkTitle] = useState(''); // 海纜作業

    const infoInitial = () => {
        setCBType('');
        setPartyName('');
        setCurrAmount('0');
        setNote('');
        setInvoiceNo('');
        setBillingNo('');
        setSubmarineCable('');
        setWorkTitle('');
    };

    const creditBalanceQuery = () => {
        fetch(queryApi, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setListInfo(data);
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    const infoCheck = () => {
        if (cBType === '') {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請選擇CB種類' } }));
            return false;
        }
        if (partyName === '') {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請選擇會員代號' } }));
            return false;
        }
        if (submarineCable === '') {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請輸入海纜名稱' } }));
            return false;
        }
        if (workTitle === '') {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請輸入海纜作業' } }));
            return false;
        }
        if (currAmount === '0') {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '剩餘金額不能小於0' } }));
            return false;
        }
        return true;
    };

    const addCB = () => {
        if (infoCheck()) {
            let tmpArray = {
                WorkTitle: workTitle ? workTitle : null,
                InvoiceNo: invoiceNo ? invoiceNo : null,
                PartyName: partyName ? partyName : null,
                SubmarineCable: submarineCable ? submarineCable : null,
                CBType: cBType ? cBType : null,
                BillingNo: billingNo ? billingNo : null,
                BillMilestone: billMilestone ? billMilestone : null,
                CurrAmount: currAmount ? Number(currAmount.replaceAll(',', '')) : null,
                Note: note ? note : null
            };
            fetch(queryCB, { method: 'POST', body: JSON.stringify(tmpArray) })
                .then((res) => res.json())
                .then(() => {
                    alert('送出Credit Balance成功');
                    handleDialogClose();
                    infoInitial();
                    creditBalanceQuery();
                })
                .catch((e) => console.log('e1=>', e));
        }
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

    return (
        <Dialog
            // onClose={() => {
            //     infoInitial();
            //     handleDialogClose();
            // }}
            maxWidth="sm"
            fullWidth
            open={isDialogOpen}
        >
            <BootstrapDialogTitle>新增Credit Balance</BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            CB種類：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">選擇CB種類</InputLabel>
                            <Select value={cBType} label="填寫海纜作業" onChange={(e) => setCBType(e.target.value)}>
                                <MenuItem value={'MWG'}>MWG</MenuItem>
                                <MenuItem value={'重溢繳'}>重溢繳</MenuItem>
                                <MenuItem value={'賠償'}>賠償</MenuItem>
                                <MenuItem value={'賠償'}>預付</MenuItem>
                                <MenuItem value={'其他'}>其他</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            摘要：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={note}
                            size="small"
                            label="填寫摘要"
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            會員代號：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">選擇會員</InputLabel>
                            <Select value={partyName} label="會員" onChange={(e) => setPartyName(e.target.value)}>
                                {partiesList.map((i) => (
                                    <MenuItem value={i}>{i}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* <Grid item xs={3} sm={3} md={3} lg={3} xl={6} /> */}
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            剩餘金額：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={handleNumber(currAmount)}
                            size="small"
                            label="填寫剩餘金額"
                            onChange={(e) => setCurrAmount(e.target.value)}
                        />
                    </Grid>

                    {/* <Grid item xs={3} sm={3} md={3} lg={3} xl={6} /> */}
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            發票號碼：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={invoiceNo}
                            size="small"
                            label="填寫發票號碼"
                            onChange={(e) => setInvoiceNo(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            帳單號碼：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={billingNo}
                            size="small"
                            label="填寫帳單號碼"
                            onChange={(e) => setBillingNo(e.target.value)}
                        />
                    </Grid>
                    {/* <Grid item xs={3} sm={3} md={3} lg={3} xl={6} /> */}
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            海纜名稱：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>選擇海纜名稱</InputLabel>
                            <Select value={submarineCable} label="海纜名稱" onChange={(e) => setSubmarineCable(e.target.value)}>
                                {subCableList.map((i) => (
                                    <MenuItem key={i.CableName} value={i.CableName}>
                                        {i.CableName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            海纜作業：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="billMilestone">選擇海纜作業</InputLabel>
                            <Select value={workTitle} label="海纜作業" onChange={(e) => setWorkTitle(e.target.value)}>
                                <MenuItem value={'Construction'}>Construction</MenuItem>
                                <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                                <MenuItem value={'O&M'}>O&M</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <>
                    <Button
                        sx={{ mr: '0.05rem' }}
                        variant="contained"
                        onClick={() => {
                            addCB();
                        }}
                    >
                        儲存
                    </Button>
                    <Button
                        sx={{ mr: '0.05rem' }}
                        variant="contained"
                        onClick={() => {
                            handleDialogClose();
                            infoInitial();
                        }}
                    >
                        關閉
                    </Button>
                </>
            </DialogActions>
        </Dialog>
    );
};

export default CreditBalanceAdd;
