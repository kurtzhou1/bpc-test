import { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Checkbox,
    Autocomplete,
    Table,
} from '@mui/material';

// day
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// table
import { TableBody, TableHead, TableContainer, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// project
import { BootstrapDialogTitle } from 'components/commonFunction';

// api
import {
    addCurrencyExchangeData,
    getCurrencyData,
    submarineCableInfoList,
    getPartiesInfoList,
} from 'components/apis.jsx';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.gary,
        color: theme.palette.common.black,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
    },
}));

const CurrencyAdd = ({
    handleAddCurrencyClose,
    isAddCurrencyOpen,
    addLiability,
    saveEdit,
    billMilestone,
    setBillMilestone,
    dialogAction,
    lBRatio,
    setLBRatio,
    modifyNote,
    setEditItem,
    lBRawID,
    apiQuery,
}) => {
    const dispatch = useDispatch();
    const [listInfo, setListInfo] = useState([]);
    const [submarineCable, setSubmarineCable] = useState('');
    const [billYM, setBillYM] = useState(null); //發票日期
    const [purpose, setPurpose] = useState('');
    const [exgRate, setExgRate] = useState(0);
    const [workTitle, setWorkTitle] = useState('');
    const [fromCode, setFromCode] = useState({});
    const [toCode, setToCode] = useState('');
    const [note, setNote] = useState('');
    const [fromCName, setFromCName] = useState('');
    const [toCName, setToCName] = useState('');

    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
    const [codeList, setCodeList] = useState([]);

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const itemDetailInitial = () => {
        setBillMilestone('');
        setPurpose([]);
        setLBRatio('');
        setWorkTitle('');
        setSubmarineCable('');
        setNote('');
    };

    const itemDetailPartInitial = () => {
        setPurpose([]);
        setLBRatio('');
        setNote('');
    };

    const infoCheck = () => {
        if (purpose === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入主旨/用途',
                    },
                }),
            );
            return false;
        }
        if (submarineCable === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入海纜名稱',
                    },
                }),
            );
            return false;
        }
        if (workTitle === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入海纜作業',
                    },
                }),
            );
            return false;
        }
        if (billYM) {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入出帳日期',
                    },
                }),
            );
            return false;
        }
        if (fromCode.Code) {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入原始幣別',
                    },
                }),
            );
            return false;
        }
        if (toCode.Code) {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入兌換幣別',
                    },
                }),
            );
            return false;
        }
        if (exgRate === 0) {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入匯率',
                    },
                }),
            );
            return false;
        }
        return true;
    };

    const addCurrencyData = () => {
        if (infoCheck()) {
            let tmpArray = {};
            tmpArray.SubmarineCable = submarineCable;
            tmpArray.BillYM = billYM;
            tmpArray.Purpose = purpose;
            tmpArray.ExgRate = exgRate;
            tmpArray.WorkTitle = workTitle;
            tmpArray.FromCode = fromCode.Code;
            tmpArray.ToCode = toCode.Code;
            tmpArray.Note = note;
            fetch(addCurrencyExchangeData, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
                },
                body: JSON.stringify(tmpArray),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.alert_msg) {
                        dispatch(
                            setMessageStateOpen({
                                messageStateOpen: {
                                    isOpen: true,
                                    severity: 'error',
                                    message: data.alert_msg,
                                },
                            }),
                        );
                    } else {
                        dispatch(
                            setMessageStateOpen({
                                messageStateOpen: {
                                    isOpen: true,
                                    severity: 'success',
                                    message: '新增成功',
                                },
                            }),
                        );
                    }
                })
                .catch((e) => console.log('e1=>', e));
        }
    };

    useEffect(() => {
        //海纜名稱
        fetch(submarineCableInfoList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setSubmarineCableList(data);
            })
            .catch((e) => console.log('e1=>', e));
        fetch(getCurrencyData, {
            method: 'GET',
            Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
        })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCodeList(data);
                }
            })
            .catch((e) => console.log('e1=>', e));
    }, []);

    return (
        <Dialog maxWidth="sm" fullWidth open={isAddCurrencyOpen}>
            <BootstrapDialogTitle>
                {dialogAction === 'Edit' ? '編輯新增貨幣與匯率資料' : '新增新增貨幣與匯率資料'}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid
                    container
                    spacing={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item md={3} lg={3} display="flex" justifyContent="center">
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { lg: '0.7rem', xl: '0.88rem' },
                                ml: { lg: '0.5rem', xl: '1.5rem' },
                            }}
                        >
                            海纜名稱：
                        </Typography>
                    </Grid>
                    <Grid item md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={submarineCable}
                            size="small"
                            label="填寫海纜名稱"
                            onChange={(e) => setSubmarineCable(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={3} lg={3} display="flex" justifyContent="center">
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { lg: '0.7rem', xl: '0.88rem' },
                                ml: { lg: '0.5rem', xl: '1.5rem' },
                            }}
                        >
                            海纜作業：
                        </Typography>
                    </Grid>
                    <Grid item md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={workTitle}
                            size="small"
                            label="填寫海纜作業"
                            onChange={(e) => setWorkTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { lg: '0.7rem', xl: '0.88rem' },
                                ml: { lg: '0.5rem', xl: '1.5rem' },
                            }}
                        >
                            出帳日期：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    inputFormat="YYYY/MM/DD"
                                    value={billYM}
                                    onChange={(e) => {
                                        setBillYM(e);
                                    }}
                                    renderInput={(params) => <TextField size="small" {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { lg: '0.7rem', xl: '0.88rem' },
                                ml: { lg: '0.5rem', xl: '1.5rem' },
                            }}
                        >
                            主旨/用途：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={purpose}
                            size="small"
                            label="填寫主旨/用途"
                            onChange={(e) => setPurpose(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { lg: '0.7rem', xl: '0.88rem' },
                                ml: { lg: '0.5rem', xl: '1.5rem' },
                            }}
                        >
                            原始幣別：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl fullWidth size="small">
                            <Select
                                value={fromCode}
                                label="幣別代碼"
                                onChange={(e) => setFromCode(e.target.value)}
                            >
                                {codeList.map((i) => (
                                    <MenuItem key={i.Code} value={i}>
                                        {i.Code}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { lg: '0.7rem', xl: '0.88rem' },
                                ml: { lg: '0.5rem', xl: '1.5rem' },
                            }}
                        >
                            原始幣別中文：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={fromCode.CName ?? ''}
                            size="small"
                            disabled
                            label="請選取左方原始幣別"
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { lg: '0.7rem', xl: '0.88rem' },
                                ml: { lg: '0.5rem', xl: '1.5rem' },
                            }}
                        >
                            兌換幣別：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl fullWidth size="small">
                            <Select
                                value={toCode}
                                label="幣別代碼"
                                onChange={(e) => setToCode(e.target.value)}
                            >
                                {codeList.map((i) => (
                                    <MenuItem key={i.Code} value={i.Code}>
                                        {i.Code}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { lg: '0.7rem', xl: '0.88rem' },
                                ml: { lg: '0.5rem', xl: '1.5rem' },
                            }}
                        >
                            兌換幣別中文：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={toCode.CName ?? ''}
                            size="small"
                            disabled
                            label="請選取左方兌換幣別"
                            onChange={(e) => setToCName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { lg: '0.7rem', xl: '0.88rem' },
                                ml: { lg: '0.5rem', xl: '1.5rem' },
                            }}
                        >
                            匯率：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={exgRate}
                            size="small"
                            label="填寫匯率"
                            onChange={(e) => setExgRate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { lg: '0.7rem', xl: '0.88rem' },
                                ml: { lg: '0.5rem', xl: '1.5rem' },
                            }}
                        >
                            備註：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={note}
                            size="small"
                            label="填寫備註"
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={addCurrencyData}>
                    儲存
                </Button>
                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleAddCurrencyClose}>
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CurrencyAdd;
