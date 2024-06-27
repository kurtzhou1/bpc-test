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
    deleteLiability,
    addLiabilityapi,
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
    const [splitNumber, setSplitNumber] = useState('');
    const [issueDate, setIssueDate] = useState(null); //發票日期
    const [subject, setSubject] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [billingNo, setBillingNo] = useState('');
    const [submarineCable, setSubmarineCable] = useState('');
    const [workTitle, setWorkTitle] = useState('');
    const [currAmount, setCurrAmount] = useState(0);
    const [note, setNote] = useState('');

    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
    const [partiesList, setPartiesList] = useState([]); //會員下拉選單

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const itemDetailInitial = () => {
        setBillMilestone('');
        setSubject([]);
        setLBRatio('');
        setWorkTitle('');
        setSubmarineCable('');
        setSplitNumber('');
        setNote('');
    };

    const itemDetailPartInitial = () => {
        setSubject([]);
        setLBRatio('');
        setSplitNumber('');
        setNote('');
    };

    const infoCheck = () => {
        if (subject.length === 0) {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入會員名稱',
                    },
                }),
            );
            return false;
        }
        if (billMilestone === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入計帳段號',
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
        if (lBRatio === 0 || lBRatio === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請輸入攤分比例',
                    },
                }),
            );
            return false;
        }
        return true;
    };

    //新增
    const addList = () => {
        if (infoCheck()) {
            let tmpArray = listInfo.map((i) => i);
            console.log('', tmpArray);
            let partyArray = subject;
            partyArray.forEach((e) => {
                tmpArray.push({
                    BillMilestone: billMilestone,
                    subject: e,
                    LBRatio: lBRatio,
                    SubmarineCable: submarineCable,
                    WorkTitle: workTitle,
                    Note: note,
                });
            });
            console.log('partyArray=>>', partyArray);
            setListInfo([...tmpArray]);
            itemDetailPartInitial();
        }
    };

    //分段+
    const addSplit = () => {
        let tmpArray = listInfo.map((i) => i);
        let partyArray = subject;
        partyArray.forEach((e) => {
            tmpArray.push({
                BillMilestone: billMilestone + splitNumber,
                subject: e,
                LBRatio: lBRatio,
                SubmarineCable: submarineCable,
                WorkTitle: workTitle,
                ModifyNote: modifyNote,
            });
        });
        setListInfo([...tmpArray]);
        setSplitNumber('');
    };

    //刪除
    const deletelistInfoItem = (deleteItem) => {
        let tmpArray = listInfo.map((i) => i);
        tmpArray.splice(deleteItem, 1);
        setListInfo([...tmpArray]);
    };

    const excuteSplit = () => {
        console.log(listInfo);
        if (listInfo.length > 0) {
            fetch(deleteLiability, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
                },
                body: JSON.stringify({ LBRawID: lBRawID.current }),
            })
                .then((res) => res.json())
                .then(() => {
                    console.log('刪除成功');
                    fetch(addLiabilityapi, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
                        },
                        body: JSON.stringify(listInfo),
                    })
                        .then((res) => res.json())
                        .then(() => {
                            dispatch(
                                setMessageStateOpen({
                                    messageStateOpen: {
                                        isOpen: true,
                                        severity: 'success',
                                        message: '分段成功',
                                    },
                                }),
                            );
                            handleAddCurrencyClose();
                            itemDetailInitial();
                            setEditItem(NaN);
                            setListInfo([]);
                            apiQuery();
                        })
                        .catch((e) => console.log('e1=>', e));
                })
                .catch((e) => console.log('e1=>', e));
        } else {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請增加分段帳號',
                    },
                }),
            );
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
        //會員名稱
        fetch(getPartiesInfoList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setPartiesList(data);
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
                                    value={issueDate}
                                    onChange={(e) => {
                                        setIssueDate(e);
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
                            value={subject}
                            size="small"
                            label="填寫主旨/用途"
                            onChange={(e) => setSubject(e.target.value)}
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
                                // value={billMilestoneQuery}
                                label="幣別代碼"
                                // onChange={(e) => setBillMilestoneQuery(e.target.value)}
                            >
                                <MenuItem value={'All'}>All</MenuItem>
                                <MenuItem value={'USD'}>USD</MenuItem>
                                <MenuItem value={'TWD'}>TWD</MenuItem>
                                <MenuItem value={'JP'}>JP</MenuItem>
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
                            value={note}
                            size="small"
                            label="原始幣別中文"
                            onChange={(e) => setNote(e.target.value)}
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
                                // value={billMilestoneQuery}
                                label="幣別代碼"
                                // onChange={(e) => setBillMilestoneQuery(e.target.value)}
                            >
                                <MenuItem value={'All'}>All</MenuItem>
                                <MenuItem value={'USD'}>USD</MenuItem>
                                <MenuItem value={'TWD'}>TWD</MenuItem>
                                <MenuItem value={'JP'}>JP</MenuItem>
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
                            value={note}
                            size="small"
                            label="兌換幣別中文"
                            onChange={(e) => setNote(e.target.value)}
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
                            value={invoiceNo}
                            size="small"
                            label="填寫匯率"
                            onChange={(e) => setInvoiceNo(e.target.value)}
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
                            value={billingNo}
                            size="small"
                            label="填寫備註"
                            onChange={(e) => setBillingNo(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                {dialogAction === 'Edit' ? (
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={saveEdit}>
                        儲存
                    </Button>
                ) : (
                    <Button
                        sx={{ mr: '0.05rem' }}
                        variant="contained"
                        onClick={() => {
                            addLiability(listInfo, setListInfo);
                        }}
                    >
                        儲存
                    </Button>
                )}
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleAddCurrencyClose();
                        itemDetailInitial();
                        setEditItem(NaN);
                        setListInfo([]);
                    }}
                >
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CurrencyAdd;
