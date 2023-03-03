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

const CreditBalanceManage = ({
    handleDialogClose,
    addLiability,
    saveEdit,
    isDialogOpen,
    billMilestone,
    setBillMilestone,
    dialogAction,
    lBRatio,
    setLBRatio
}) => {
    const [listInfo, setListInfo] = useState([]);
    const [cbType, setcbType] = useState('');
    const [partyName, setPartyName] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [billingNo, setBillingNo] = useState('');
    const [submarineCable, setSubmarineCable] = useState('');
    const [workTitle, setWorkTitle] = useState('');
    const [currAmount, setCurrAmount] = useState(0);
    const [createDate, setCreateDate] = useState(new Date());
    const [note, setNote] = useState('');

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
    const addList = () => {
        let tmpArray = listInfo.map((i) => i);
        console.log('=>>', partyName);
        let partyArray = partyName;
        partyArray.forEach((e) => {
            tmpArray.push({
                BillMilestone: billMilestone,
                PartyName: e,
                LBRatio: lBRatio
            });
        });
        setListInfo([...tmpArray]);
        itemDetailInitial();
    };

    //刪除
    const deletelistInfoItem = (deleteItem) => {
        let tmpArray = listInfo.map((i) => i);
        tmpArray.splice(deleteItem, 1);
        setListInfo([...tmpArray]);
    };

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

    return (
        <Dialog onClose={handleDialogClose} maxWidth="sm" fullWidth open={isDialogOpen}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                新增Credit Balance
            </BootstrapDialogTitle>
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
                            <Select
                                // labelId="demo-simple-select-label"
                                // id="demo-simple-select"
                                value={workTitle}
                                label="填寫海纜作業"
                                onChange={(e) => setWorkTitle(e.target.value)}
                            >
                                {/* <MenuItem value={'一般'}>一般</MenuItem> */}
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
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={partyName}
                            size="small"
                            label="填寫會員代號"
                            onChange={(e) => setPartyName(e.target.value)}
                        />
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
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={submarineCable}
                            size="small"
                            label="填寫海纜名稱"
                            onChange={(e) => setSubmarineCable(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="center">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            海纜作業：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={workTitle}
                            size="small"
                            label="填寫海纜作業"
                            onChange={(e) => setWorkTitle(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <>
                    <Button
                        sx={{ mr: '0.05rem' }}
                        variant="contained"
                        onClick={() => {
                            addLiability(listInfo);
                            setListInfo([]);
                        }}
                    >
                        儲存
                    </Button>
                    <Button
                        sx={{ mr: '0.05rem' }}
                        variant="contained"
                        onClick={() => {
                            handleDialogClose();
                            itemDetailInitial();
                        }}
                    >
                        取消
                    </Button>
                </>
            </DialogActions>
        </Dialog>
    );
};

export default CreditBalanceManage;
