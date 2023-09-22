import { useState } from 'react';
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
    FormControlLabel,
    FormGroup,
    Table,
    Box
} from '@mui/material';

// day
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// project
import { BootstrapDialogTitle } from 'components/commonFunction';

// api
import { addBillNotifyRule, addSysInvNotifyRule } from 'components/apis.jsx';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { TableBody, TableHead, TableContainer, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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

const RuleAdd = ({
    isDialogOpen,
    handleAddRuleClose,
    value,
    partiesList,
    submarineCableList,
    apiQuery
}) => {
    const dispatch = useDispatch();
    const [ruleName, setRuleName] = useState('');
    const [ruleCName, setRuleCName] = useState('');
    const [days1BeforeDue, setDays1BeforeDue] = useState(0);
    const [days2BeforeDue, setDays2BeforeDue] = useState(0);
    const [daysAfterDue, setDaysAfterDue] = useState(0);
    const [emailList, setEmailList] = useState([]);
    const [partyName, setPartyName] = useState('');
    const [notifyTarget, setNotifyTarget] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [emailText, setEmailText] = useState('');
    const [submarineCable, setSubmarineCable] = useState('');
    const [workTitle, setWorkTitle] = useState('');
    const [dueDate, setDueDate] = useState(new Date()); //到期日
    const [listInfo, setListInfo] = useState([]);
    const [recipientName, setRecipientName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const [sendType, setSendType] = useState({
        isWeb: false,
        isEmail: false
    }); //寄送方式

    const formInitial = () => {
        setEmailText('');
        setRuleName('');
        setRuleCName('');
        setPartyName('');
        setSubmarineCable('');
        setDays1BeforeDue(0);
        setDays2BeforeDue(0);
        setDaysAfterDue(0);
        setEmailList([]);
        setNotifyTarget('');
        setDueDate(new Date());
        setSendType({
            isWeb: false,
            isEmail: false,
            isSMS: false
        })
    };

    const itemInitial = () => {
        setRecipientName('');
        setEmail('');
        setMobile('');
    }

    const infoCheck = () => {
        console.log(partyName, partyName === '')
        if (ruleName === '') {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請輸入規則英文名稱' } }));
            return false;
        }
        if (ruleCName === '') {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請輸入規則中文名稱' } }));
            return false;
        }
        if (partyName === ''&& value === 0 ) {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請選擇會員名稱' } }));
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
        return true;
    };

    const addList = (v) => {
        const emailRule = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        console.log(v);
        if(emailRule.test(v)) {
            setEmailList(emailList=> [...emailList, v]);
            setEmailText('');
        } else {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請輸入正確email格式' } }));
            setEmailText('');
        }
    }

    const addRule = () => {
        if (value === 0) {
            if (infoCheck()) {
                let tmpArray = {
                    RuleName: ruleName,
                    ruleCNameame: ruleCName,
                    SubmarineCable: submarineCable,
                    WorkTitle: workTitle,
                    PartyName: partyName,
                    Days1BeforeDue: days1BeforeDue,
                    Days2BeforeDue: days2BeforeDue,
                    DaysAfterDue: daysAfterDue,
                    CCList: emailList,
                    Email: sendType.isEmail ? true : false,
                    Web: sendType.isWeb ? true : false
                }
                fetch(addBillNotifyRule, { method: 'POST', body: JSON.stringify(tmpArray) })
                    .then((res) => res.json())
                    .then(() => {
                        dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '新增規則成功' } }));
                        handleAddRuleClose();
                        formInitial();
                    })
                    .catch((e) => console.log('e1=>', e));
            }
        } else if (value === 1) {
            let tmpListInfo = listInfo;
            tmpListInfo.forEach((i) => {
                delete i.id
            });
            console.log('tmpListInfo=>>', tmpListInfo);
            let tmpArray = {
                SysInvNotifyRule:{
                    RuleName: ruleName,
                    RuleCName: ruleCName,
                    SubmarineCable: submarineCable,
                    WorkTitle: workTitle,
                    Days1BeforeDue: Number(days1BeforeDue),
                    Days2BeforeDue: Number(days2BeforeDue),
                    DaysAfterDue: Number(daysAfterDue),
                    CCList: [],
                    Email: sendType.isEmail ? true : false,
                    Web: sendType.isWeb ? true : false,
                    NotifyTarget: notifyTarget,
                    SMS: sendType.isSMS ? true : false
                },
                SysInvNotifyRecipients:tmpListInfo
            }
            fetch(addSysInvNotifyRule, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then(() => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '新增規則成功' } }));
                handleAddRuleClose();
                formInitial();
            })
            .catch((e) => console.log('e1=>', e));
        }
    }

    const addInfoList = () => {
        const maxID = Math.max(...listInfo.map(p => p.id));
        let tmpArray = {
            id: maxID + 1,
            RecipientName: recipientName,
            Email: email,
            Mobile: mobile
        }
        setListInfo(listInfo=> [...listInfo, tmpArray]);
        itemInitial();
    }

    const delInfoList = (id) => {
        setListInfo(listInfo.filter(i => i.id !== id))
    }

    const copyInfoList = (info) => {
        const maxID = Math.max(...listInfo.map(p => p.id));
        let tmpArray = {
            id: maxID + 1,
            RecipientName: info.RecipientName,
            Email: info.Email,
            Mobile: info.Mobile
        }
        setListInfo(listInfo=> [...listInfo, tmpArray]);
    }

    const handleChange = (event) => {
        setSendType({ ...sendType, [event.target.name]: event.target.checked });
    };

    return (
        <Dialog maxWidth="sm" fullWidth open={isDialogOpen} >
            <BootstrapDialogTitle sx={{fontSize: '1.1rem', fontWeight: 'bold'}}>
                {`${value === 0 ? '會員帳單' : value === 1 ? '發票內部通知' : '帳單內部通知' }提醒通知規則`}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Typography variant="h5" display="flex" justifyContent="end">
                            規則英文名稱：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={ruleName}
                            size="small"
                            label="填寫英文名稱"
                            onChange={(e) => setRuleName(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Typography variant="h5" display="flex" justifyContent="end">
                            規則中文名稱：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={ruleCName}
                            size="small"
                            label="填寫中文名稱"
                            onChange={(e) => setRuleCName(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Typography variant="h5" display="flex" justifyContent="end">
                            海纜名稱：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>選擇海纜名稱</InputLabel>
                            <Select value={submarineCable} label="海纜名稱" size="small" onChange={(e) => setSubmarineCable(e.target.value)}>
                                {submarineCableList.map((i) => (
                                    <MenuItem key={i} value={i}>
                                        {i}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="end">
                        <Typography variant="h5">
                            海纜作業：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <FormControl fullWidth size="small">
                            <InputLabel size="small" id="billMilestone">
                                選擇海纜作業
                            </InputLabel>
                            <Select
                                size="small"
                                value={workTitle}
                                label="填寫海纜作業"
                                onChange={(e) => setWorkTitle(e.target.value)}
                            >
                                <MenuItem value={'Construction'}>Construction</MenuItem>
                                <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                                <MenuItem value={'O&M'}>O&M</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {value === 0 ? (
                    <>
                        <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="end">
                            <Typography variant="h5">
                                會員名稱：
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>選擇會員</InputLabel>
                                <Select value={partyName} label="會員名稱" onChange={(e) => setPartyName(e.target.value)}>
                                    {partiesList.map((i) => (
                                        <MenuItem key={i} value={i}>
                                            {i}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </>
                    ):''}
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Typography variant="h5" display="flex" justifyContent="end">
                            到期日之前的第一門檻天數：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={days1BeforeDue}
                            size="small"
                            label="填寫數字"
                            onChange={(e) => setDays1BeforeDue(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Typography variant="h5" display="flex" justifyContent="end">
                            到期日之前的第二門檻天數：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={days2BeforeDue}
                            size="small"
                            label="填寫數字"
                            onChange={(e) => setDays2BeforeDue(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Typography variant="h5" display="flex" justifyContent="end">
                            到期日之後的門檻天數：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={daysAfterDue}
                            size="small"
                            label="填寫數字"
                            onChange={(e) => setDaysAfterDue(e.target.value)} 
                        />
                    </Grid>
                    {value === 0 ? (
                        <>
                            <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="end">
                                <Typography variant="h5">
                                    Email副本清單：
                                </Typography>
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={emailText}
                                    size="small"
                                    label="填寫email"
                                    onChange={(e) => setEmailText(e.target.value)} 
                                />
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1} display="flex" alignItems="center" justifyContent="start">
                                <Button
                                    size="small"
                                    style={{ maxWidth: '2rem', maxHeight: '2rem', minWidth: '2rem', minHeight: '2rem' }}
                                    variant="contained"
                                    onClick={(e) => addList(emailText)}
                                >
                                    +
                                </Button>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5} />
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Autocomplete
                                    multiple
                                    freeSolo
                                    open={isOpen}
                                    onInputChange={(_, value) => {
                                        if (value.length === 0) {
                                            if (isOpen) setIsOpen(false);
                                        } else {
                                            if (!isOpen) setIsOpen(true);
                                        }
                                    }}
                                    onClose={() => setIsOpen(false)}
                                    options={emailList}
                                    value={emailList}
                                    size="small"
                                    disableCloseOnSelect
                                    onChange={(event, newValue) => {
                                        setEmailList(newValue);
                                    }}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Email副本清單" variant="outlined" />
                                    )}
                                />
                            </Grid>
                        </>
                        ) : (
                        <>
                            <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="end">
                                <Typography variant="h5">
                                    提醒對象種類：
                                </Typography>
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>選擇對象種類</InputLabel>
                                    <Select
                                        size="small"
                                        value={notifyTarget}
                                        label="填寫對象種類"
                                        onChange={(e) => setNotifyTarget(e.target.value)}
                                    >
                                        <MenuItem value={'CBP'}>CBP</MenuItem>
                                        <MenuItem value={'OP'}>OP</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="end">
                                <Typography variant="h5">
                                    帳單到期日：
                                </Typography>
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <FormControl>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        inputFormat="YYYY/MM/DD"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e)}
                                        renderInput={(params) => <TextField size="small" {...params} />}
                                    />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid> */}
                        </>
                        )
                    }
                    <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="end">
                        <FormGroup row value={sendType}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={'isWeb'}
                                        onChange={handleChange}
                                        checked={sendType.isWeb}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 20, xl: 24 } } }}
                                    />
                                }
                                label={<Typography variant="h5" >以Web通知</Typography>}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={'isEmail'}
                                        onChange={handleChange}
                                        checked={sendType.isEmail}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 20, xl: 24 } } }}
                                    />
                                }
                                label={<Typography variant="h5" >以Email通知</Typography>}
                            />
                            {value === 1 ? (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={'isSMS'}
                                        onChange={handleChange}
                                        checked={sendType.isSMS}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 20, xl: 24 } } }}
                                    />
                                }
                                label={<Typography variant="h5" >以SMS通知</Typography>}
                            />
                            ):''}
                        </FormGroup>
                    </Grid>
                    {value === 1 || value === 2 ? (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Action</StyledTableCell>
                                            <StyledTableCell align="center">收件者身分/群組</StyledTableCell>
                                            <StyledTableCell align="center">收件者名稱</StyledTableCell>
                                            <StyledTableCell align="center">Email</StyledTableCell>
                                            <StyledTableCell align="center">行動電話</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="center">
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        '& button': { mx: { md: 0.6, lg: 1, xl: 1.8 }, p: 0, fontSize: 1 }
                                                    }}
                                                >
                                                    <Button color="success" variant="outlined" onClick={addInfoList}>
                                                        新增
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                {notifyTarget}
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    size="small"
                                                    // style={{ width: '30%' }}
                                                    value={recipientName}
                                                    onChange={(e) => {
                                                        setRecipientName(e.target.value);
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    size="small"
                                                    // style={{ width: '30%' }}
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    size="small"
                                                    value={mobile}
                                                    onChange={(e) => {
                                                        setMobile(e.target.value);
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        {listInfo?.map((row, id) => {
                                            return (
                                                <TableRow
                                                    // key={row.InvoiceWKMaster?.invoiceNo + row.InvoiceWKMaster?.supplierName + id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                     <StyledTableCell align="center">
                                                     <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            '& button': { mx: { md: 0.6, lg: 1, xl: 1.8 }, p: 0, fontSize: 1 }
                                                        }}
                                                    >
                                                        <Button color="primary" variant="outlined" onClick={() => copyInfoList(row)}>
                                                            複製
                                                        </Button>
                                                        <Button color="error" variant="outlined" onClick={() => delInfoList(row.id)}>
                                                            刪除
                                                        </Button>
                                                    </Box>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{notifyTarget}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.RecipientName}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.Email}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.Mobile}</StyledTableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    ) : (
                        ''
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        addRule();
                    }}
                >
                    儲存
                </Button>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleAddRuleClose();
                        formInitial();
                    }}
                >
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RuleAdd;
