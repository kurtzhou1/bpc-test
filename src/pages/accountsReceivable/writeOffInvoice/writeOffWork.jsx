import { useState, useRef, useEffect } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
import MainCard from 'components/MainCard';
// material-ui
import {
    Typography,
    Button,
    Table,
    Dialog,
    DialogContent,
    DialogContentText,
    Grid,
    FormControl,
    InputLabel,
    Select,
    DialogActions,
    TextField,
    Checkbox,
    Box
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';

// api
import { sendToWriteOff } from 'components/apis.jsx';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.gary,
        color: theme.palette.common.black,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        fontSize: '0.05rem'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem'
    }
}));

const WriteOffWork = ({ isDialogOpen, handleDialogClose, writeOffInfo }) => {
    console.log('writeOffInfo=>>', writeOffInfo);

    const [isDeductWorkOpen, setIsDeductWorkOpen] = useState(false);
    const [editItem, setEditItem] = useState();
    const [toWriteOffDetailInfo, setToWriteOffDetailInfo] = useState([]); //帳單明細檔
    const [isComplete, setIsComplete] = useState(false);

    const changeBankFees = (bankFees, id) => {
        let tmpArray = toWriteOffDetailInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.BillDetailID === id) {
                i.BankFees = bankFees;
            }
        });
        setToWriteOffDetailInfo(tmpArray);
    };

    const changeReceiveAmount = (receiveAmount, id) => {
        let tmpArray = toWriteOffDetailInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.BillDetailID === id) {
                i.ReceiveAmount = receiveAmount;
            }
        });
        setToWriteOffDetailInfo(tmpArray);
    };

    const handleChange = (e) => {
        setIsComplete(e.target.checked);
    };

    const initData = () => {
        let tmpArray = writeOffInfo?.BillDetail?.map((i) => i);
        tmpArray.forEach((i) => {
            i.ReceiveAmount = 0;
            i.BankFees = 0;
        });
        setToWriteOffDetailInfo(tmpArray);
    };

    useEffect(() => {
        if (writeOffInfo?.BillDetail?.length > 0) {
            initData();
        }
    }, [writeOffInfo]);

    return (
        <Dialog
            // onClose={handleDialogClose}
            maxWidth="xl"
            open={isDialogOpen}
        >
            <BootstrapDialogTitle
            // onClose={handleDialogClose}
            >
                收款銷帳作業
            </BootstrapDialogTitle>
            <DialogContent>
                <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 10 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 10 }}>
                            <Grid item xs={1} sm={1} md={1} lg={1}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    會員：
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <TextField
                                    value={writeOffInfo?.BillMaster?.PartyName}
                                    fullWidth
                                    disabled={true}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    發票截止日期：
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <TextField
                                    value={dayjs(writeOffInfo?.BillMaster?.DueDate).format('YYYY/MM/DD')}
                                    fullWidth
                                    disabled={true}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    海纜名稱：
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <TextField
                                    value={writeOffInfo?.BillMaster?.SubmarineCable}
                                    fullWidth
                                    disabled={true}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    海纜作業：
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <TextField
                                    value={writeOffInfo?.BillMaster?.WorkTitle}
                                    fullWidth
                                    disabled={true}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <MainCard title="帳單明細列表">
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table sx={{ minWidth: 300, fontSize: 18 }} stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">費用項目</StyledTableCell>
                                            <StyledTableCell align="center">原始費用</StyledTableCell>
                                            <StyledTableCell align="center">折抵</StyledTableCell>
                                            <StyledTableCell align="center">應繳</StyledTableCell>
                                            <StyledTableCell align="center">累計實收</StyledTableCell>
                                            <StyledTableCell align="center">手續費</StyledTableCell>
                                            <StyledTableCell align="center">本次實收</StyledTableCell>
                                            <StyledTableCell align="center">總金額(含手續費)</StyledTableCell>
                                            <StyledTableCell align="center">重溢繳</StyledTableCell>
                                            <StyledTableCell align="center">短繳</StyledTableCell>
                                            <StyledTableCell align="center">手續費差額</StyledTableCell>
                                            <StyledTableCell align="center">短繳原因</StyledTableCell>
                                            <StyledTableCell align="center">收款日期</StyledTableCell>
                                            <StyledTableCell align="center">摘要說明</StyledTableCell>
                                            <StyledTableCell align="center">收費狀態</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {toWriteOffDetailInfo?.map((row, id) => {
                                            let totalAmount = Number(row.BankFees) + Number(row.ReceiveAmount);
                                            let tmpAmount = Number(row.ReceiveAmount) + Number(row.ReceivedAmount);
                                            let diffAmount = tmpAmount - Number(row.BankFees);
                                            return (
                                                <TableRow
                                                    // key={row?.FeeAmountPre + row?.PartyName + row?.LBRatio}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center" sx={{ fontSize: '0.1rem' }}>
                                                        {id + 1}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        ${handleNumber(row?.OrgFeeAmount.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        ${handleNumber(row?.DedAmount.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        ${handleNumber(row?.FeeAmount.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        ${handleNumber(row?.ReceivedAmount.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        <TextField
                                                            size="small"
                                                            value={row.BankFees}
                                                            type="number"
                                                            onChange={(e) => changeBankFees(e.target.value, row.BillDetailID)}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        <TextField
                                                            size="small"
                                                            // style={{ width: '30%' }}
                                                            value={row.ReceiveAmount}
                                                            type="number"
                                                            onChange={(e) => {
                                                                changeReceiveAmount(e.target.value, row.BillDetailID);
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {totalAmount ? totalAmount.toFixed(2) : '0.00'}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {diffAmount > 0 ? handleNumber(diffAmount.toFixed(2)) : '0.00'}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {diffAmount > row.BankFees ? handleNumber(tmpAmount.toFixed(2)) : '0.00'}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {diffAmount <= row.BankFees ? handleNumber(tmpAmount.toFixed(2)) : '0.00'}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {row.ShortOverReason}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {row.ReceiveDate ? dayjs(row?.ReceiveDate) : ''}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {row?.Note}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {row?.Status}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box
                            sx={{
                                fontSize: '12px',
                                m: 1,
                                fontWeight: 'bold',
                                display: 'flex',
                                justifyContent: 'end',
                                alignItems: 'center'
                            }}
                        >
                            <Box sx={{ color: 'red', mr: 2.5 }}>(提示：若有費用項目還未完成收款，原則上不用勾選)</Box>
                            <Box>
                                <Checkbox checked={isComplete} onChange={handleChange} size="small" sx={{ p: 0 }} /> 確認此帳單完成銷帳作業
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                    儲存
                </Button>
                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={initData}>
                    Reset
                </Button>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleDialogClose();
                        setIsDeductWorkOpen(false);
                        setEditItem();
                    }}
                >
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WriteOffWork;
