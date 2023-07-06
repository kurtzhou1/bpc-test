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
    Box,
    MenuItem
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
import { withStyles } from '@material-ui/core/styles';

// api
import { sendToWriteOff, queryToDecutBill } from 'components/apis.jsx';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.gary,
        color: theme.palette.common.black,
        paddingTop: '0.1rem',
        paddingBottom: '0.1rem',
        fontSize: '0.05rem',
        overflowX: 'auto',
        minWidth: '100%'
    },
    [`&.${tableCellClasses.body}.totalAmount`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        backgroundColor: '#CFD8DC'
    }
}));

const styles = (theme) => ({
    root: {
        overflowX: 'auto'
    }
});

const WriteOffWork = ({ isDialogOpen, handleDialogClose, writeOffInfo, writeOffDetail, writeOffQuery, action }) => {
    const [toWriteOffMasterInfo, setToWriteOffMasterInfo] = useState({}); //帳單明細檔
    const [toWriteOffDetailInfo, setToWriteOffDetailInfo] = useState([]); //帳單明細檔
    const [isComplete, setIsComplete] = useState(false);
    const orgFeeAmountTotal = useRef(0); //原始費用
    const dedAmountTotal = useRef(0); //折抵費用
    const feeAmountTotal = useRef(0); //應繳費用
    const receivedAmountTotal = useRef(0); //累計費用

    const bankFeesTotal = useRef(0); //手續費
    const ReceiveAmountTotal = useRef(0); //本次實收費用
    const totalAmountTotal = useRef(0); //總金額
    const overAmountTotal = useRef(0); //重溢繳
    const shortAmountTotal = useRef(0); //短繳
    const bankFeesLessTotal = useRef(0);

    //跑加總使用
    let totalAmount = 0; //總金額
    let tmpTotalAmount = 0; //本次實收+累計實收-應繳金額
    let overAmount = 0; //短繳
    let shortAmount = 0;
    let bankFeeBalance = 0;

    let tmpTotal = 0;
    let tmpOverAmount = 0; //短繳
    let tmpShortAmount = 0;
    let tmpBankFeeBalance = 0;
    let tmpStatus = '';

    const changeBankFees = (bankFees, id) => {
        let tmpArray = toWriteOffDetailInfo.map((i) => i);
        let tmpBankFees = 0;
        tmpArray.forEach((i) => {
            if (i.BillDetailID === id) {
                i.BankFees = bankFees;
                tmpBankFees = tmpBankFees + Number(bankFees.toString().replaceAll(',', ''));
            } else {
                tmpBankFees = tmpBankFees + Number(i.BankFees.toString().replaceAll(',', ''));
            }
        });
        bankFeesTotal.current = tmpBankFees;
        setToWriteOffDetailInfo(tmpArray);
    };

    const changeReceiveAmount = (receiveAmount, id) => {
        let tmpArray = toWriteOffDetailInfo.map((i) => i);
        let tmpreceiveAmount = 0;
        tmpArray.forEach((i) => {
            if (i.BillDetailID === id) {
                i.ReceiveAmount = receiveAmount;
                tmpreceiveAmount = tmpreceiveAmount + Number(receiveAmount.toString().replaceAll(',', ''));
            } else {
                tmpreceiveAmount = tmpreceiveAmount + Number(i.ReceiveAmount.toString().replaceAll(',', ''));
            }
        });
        ReceiveAmountTotal.current = tmpreceiveAmount;
        setToWriteOffDetailInfo(tmpArray);
    };

    // const changeShortOverReason = (shortOverReason, id) => {
    //     let tmpArray = toWriteOffDetailInfo.map((i) => i);
    //     tmpArray.forEach((i) => {
    //         if (i.BillDetailID === id) {
    //             i.ShortOverReason = shortOverReason;
    //         }
    //     });
    //     setToWriteOffDetailInfo(tmpArray);
    // };

    const changeReceiveDate = (receiveDate, id) => {
        let tmpArray = toWriteOffDetailInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.BillDetailID === id) {
                i.ReceiveDate = dayjs(receiveDate).format('YYYY/MM/DD');
            }
        });
        setToWriteOffDetailInfo(tmpArray);
    };

    const changeNote = (note, id) => {
        let tmpArray = toWriteOffDetailInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.BillDetailID === id) {
                i.Note = note;
            }
        });
        setToWriteOffDetailInfo(tmpArray);
    };

    const changeState = (status, id) => {
        let tmpArray = toWriteOffDetailInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.BillDetailID === id) {
                i.Status = status;
            }
        });
        setToWriteOffDetailInfo(tmpArray);
    };

    const handleChange = (e) => {
        setIsComplete(e.target.checked);
    };

    const initData = () => {
        let tmpArray = JSON.parse(JSON.stringify(writeOffDetail));
        let tmpOrgFeeAmountTotal = 0; //原始費用
        let tmpDedAmountTotal = 0; //折抵費用
        let tmpFeeAmountTotal = 0; //應繳費用
        let tmpReceivedAmountTotal = 0; //累計費用
        tmpArray.forEach((i) => {
            i.ReceiveAmount = 0;
            i.BankFees = 0;
            tmpOrgFeeAmountTotal = tmpOrgFeeAmountTotal + i.OrgFeeAmount;
            tmpDedAmountTotal = tmpDedAmountTotal + i.DedAmount;
            tmpFeeAmountTotal = tmpFeeAmountTotal + i.FeeAmount;
            tmpReceivedAmountTotal = tmpReceivedAmountTotal + i.ReceivedAmount;
        });
        orgFeeAmountTotal.current = tmpOrgFeeAmountTotal; //原始費用
        dedAmountTotal.current = tmpDedAmountTotal; //折抵費用
        feeAmountTotal.current = tmpFeeAmountTotal; //應繳費用
        receivedAmountTotal.current = tmpReceivedAmountTotal; //累計費用
        setToWriteOffDetailInfo(tmpArray);
        setToWriteOffMasterInfo(writeOffInfo);
    };

    const sendData = () => {
        let tmpArray = {};
        let tmpData = toWriteOffDetailInfo?.map((i) => i);
        let tmpBankFees = 0;
        let tmpAmount = 0;
        let diffAmount = 0;

        tmpData.forEach((i) => {
            tmpAmount = 0;
            tmpAmount = i?.ReceiveAmount
                ? Number(i.ReceiveAmount.toString().replaceAll(',', ''))
                : 0 + i?.ReceiveAmount
                ? Number(i.ReceivedAmount.toString().replaceAll(',', ''))
                : 0;
            diffAmount = 0;
            diffAmount = tmpAmount - i?.FeeAmount ? Number(i.FeeAmount.toString().replaceAll(',', '')) : 0;
            i.OverAmount = diffAmount > 0 ? diffAmount : 0;
            i.ShortAmount = i?.FeeAmount
                ? Number(i?.FeeAmount.toString().replaceAll(',', ''))
                : 0 - i?.ReceivedAmount
                ? Number(i?.ReceivedAmount.toString().replaceAll(',', ''))
                : 0 - Number(totalAmount.replaceAll(',', '')) > 0
                ? i?.FeeAmount
                    ? Number(i?.FeeAmount.toString().replaceAll(',', ''))
                    : 0 - i?.ReceivedAmount
                    ? Number(i?.ReceivedAmount.toString().replaceAll(',', ''))
                    : 0 - Number(totalAmount.replaceAll(',', ''))
                : 0;
            tmpBankFees = tmpBankFees + i?.BankFees ? Number(i.BankFees.toString().replaceAll(',', '')) : 0;
            i.ReceivedAmount = i?.ReceivedAmount ? Number(i.ReceiveAmount.toString().replaceAll(',', '')) : 0;
            // delete i.ReceiveAmount;
        });
        toWriteOffMasterInfo.Status = isComplete ? 'COMPLETE' : toWriteOffMasterInfo.Status;
        toWriteOffMasterInfo.BankFees = tmpBankFees;
        tmpArray = {
            BillMaster: toWriteOffMasterInfo,
            BillDetail: toWriteOffDetailInfo
        };
        console.log('tmpArray=>>', tmpArray);
        // fetch(sendToWriteOff, { method: 'POST', body: JSON.stringify(tmpArray) })
        //     .then((res) => res.json())
        //     .then(() => {
        //         writeOffQuery();
        //         handleClose();
        //     })
        //     .catch((e) => console.log('e1=>', e));
    };

    const handleClose = () => {
        handleDialogClose();
        setToWriteOffDetailInfo([]);
        setToWriteOffMasterInfo({});
        orgFeeAmountTotal.current = 0; //原始費用
        dedAmountTotal.current = 0; //折抵費用
        feeAmountTotal.current = 0; //應繳費用
        receivedAmountTotal.current = 0; //累計費用

        bankFeesTotal.current = 0; //手續費
        ReceiveAmountTotal.current = 0; //本次實收費用
        totalAmountTotal.current = 0; //總金額
        overAmountTotal.current = 0; //重溢繳
        bankFeesLessTotal.current = 0;
        shortAmountTotal.current = 0;
    };

    useEffect(() => {
        if (writeOffDetail?.length > 0 && isDialogOpen) {
            initData();
        }
    }, [writeOffDetail, isDialogOpen]);

    return (
        <Dialog maxWidth="xxl" open={isDialogOpen}>
            <BootstrapDialogTitle>{action !== 'view' ? '收款銷帳作業' : '已銷帳明細'}</BootstrapDialogTitle>
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
                                <TextField value={writeOffInfo?.PartyName} fullWidth disabled={true} variant="outlined" size="small" />
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
                                    value={dayjs(writeOffInfo?.DueDate).format('YYYY/MM/DD')}
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
                                <TextField value={writeOffInfo?.SubmarineCable} fullWidth disabled={true} variant="outlined" size="small" />
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
                                <TextField value={writeOffInfo?.WorkTitle} fullWidth disabled={true} variant="outlined" size="small" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <MainCard title="帳單明細列表">
                            <TableContainer component={Paper}>
                                <Table stickyHeader sx={{ minWidth: 1000 }}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">發票號碼</StyledTableCell>
                                            <StyledTableCell align="center">費用項目</StyledTableCell>
                                            <StyledTableCell align="center">計帳段號</StyledTableCell>
                                            <StyledTableCell align="center">原始費用</StyledTableCell>
                                            <StyledTableCell align="center">折抵</StyledTableCell>
                                            <StyledTableCell align="center">應繳</StyledTableCell>
                                            <StyledTableCell align="center">累計實收</StyledTableCell>
                                            {action === 'view' ? '' : <StyledTableCell align="center">手續費</StyledTableCell>}
                                            {action === 'view' ? '' : <StyledTableCell align="center">本次實收</StyledTableCell>}
                                            {action === 'view' ? '' : <StyledTableCell align="center">總金額(含手續費)</StyledTableCell>}
                                            <StyledTableCell align="center">重溢繳</StyledTableCell>
                                            <StyledTableCell align="center">短繳</StyledTableCell>
                                            {/* {action === 'view' ? '' : <StyledTableCell align="center">手續費差額</StyledTableCell>} */}
                                            {/* {action === 'view' ? '' : <StyledTableCell align="center">短繳原因</StyledTableCell>} */}
                                            <StyledTableCell align="center">收款日期</StyledTableCell>
                                            <StyledTableCell align="center">摘要說明</StyledTableCell>
                                            {action === 'view' ? '' : <StyledTableCell align="center">收費狀態</StyledTableCell>}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {toWriteOffDetailInfo?.map((row, id) => {
                                            totalAmount = row?.BankFees
                                                ? Number(row?.BankFees?.toString().replaceAll(',', ''))
                                                : 0 + row?.ReceiveAmount
                                                ? Number(row?.ReceiveAmount?.toString().replaceAll(',', ''))
                                                : 0;
                                            tmpTotalAmount = row?.ReceiveAmount
                                                ? Number(row?.ReceiveAmount?.toString().replaceAll(',', ''))
                                                : 0 + row?.ReceivedAmount
                                                ? Number(row?.ReceivedAmount?.toString().replaceAll(',', ''))
                                                : 0 - row?.FeeAmount
                                                ? Number(row?.FeeAmount?.toString().replaceAll(',', ''))
                                                : 0; //本次實收+累計實收-應繳金額

                                            //處理Total
                                            overAmount = tmpTotalAmount > 0 ? tmpTotalAmount : 0;
                                            // 短繳 本次實收+累計實收-應繳 > 0，則顯示其金額差額 5/25改
                                            shortAmount = row?.FeeAmount
                                                ? Number(row?.FeeAmount?.toString().replaceAll(',', ''))
                                                : 0 - row?.ReceivedAmount
                                                ? Number(row?.ReceivedAmount?.toString().replaceAll(',', ''))
                                                : 0 - Number(totalAmount.replaceAll(',', '')) > 0
                                                ? row?.FeeAmount
                                                    ? Number(row?.FeeAmount?.toString().replaceAll(',', ''))
                                                    : 0 - row?.ReceivedAmount
                                                    ? Number(row?.ReceivedAmount?.toString().replaceAll(',', ''))
                                                    : 0 - Number(totalAmount.replaceAll(',', ''))
                                                : 0;
                                            bankFeeBalance =
                                                tmpTotalAmount >= 0
                                                    ? 0
                                                    : Math.abs(tmpTotalAmount) <= row?.BankFees
                                                    ? Number(row?.BankFees?.toString().replaceAll(',', ''))
                                                    : 0
                                                    ? tmpTotalAmount
                                                    : 0;

                                            tmpTotal = tmpTotal + totalAmount;
                                            tmpOverAmount = tmpOverAmount + overAmount; //溢繳
                                            tmpShortAmount = tmpShortAmount + shortAmount; //短繳加總
                                            // tmpBankFeeBalance = tmpBankFeeBalance + bankFeeBalance; //手續費差額(負值)
                                            // tmpStatus =
                                            //     overAmount > 0
                                            //         ? 'OVER'
                                            //         : Math.abs(bankFeeBalance) > 0
                                            //         ? 'BANK_FEE'
                                            //         : shortAmount === 0 || shortAmount === row.FeeAmount
                                            //         ? 'INCOMPLETE'
                                            //         : 'PARTIAL';
                                            return (
                                                <TableRow
                                                    key={row?.BillMasterID + row?.BillDetailID}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center" sx={{ fontSize: '0.1rem', minWidth: 75 }}>
                                                        {row?.InvoiceNo}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '0.1rem', minWidth: 75 }}>
                                                        {row?.FeeItem}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '0.1rem', minWidth: 75 }}>
                                                        {row?.BillMilestone}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {handleNumber(row?.OrgFeeAmount.toFixed(2))}
                                                    </TableCell>
                                                    {/* 折抵 */}
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {handleNumber(row?.DedAmount.toFixed(2))}
                                                    </TableCell>
                                                    {/* 應繳 */}
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {handleNumber(row?.FeeAmount.toFixed(2))}
                                                    </TableCell>
                                                    {/* 累計實收 */}
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {handleNumber(row?.ReceivedAmount.toFixed(2))}
                                                    </TableCell>
                                                    {/* 手續費 */}
                                                    {action === 'view' ? (
                                                        ''
                                                    ) : (
                                                        <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                            <TextField
                                                                // inputProps={{ step: '.01' }}
                                                                sx={{ minWidth: 75 }}
                                                                size="small"
                                                                fullWidth
                                                                value={handleNumber(row.BankFees)}
                                                                // type="number"
                                                                onChange={(e) => changeBankFees(e.target.value, row.BillDetailID)}
                                                            />
                                                        </TableCell>
                                                    )}
                                                    {/* 本次實收 */}
                                                    {action === 'view' ? (
                                                        ''
                                                    ) : (
                                                        <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                            <TextField
                                                                // inputProps={{ step: '.01' }}
                                                                sx={{ minWidth: 75 }}
                                                                size="small"
                                                                value={handleNumber(row.ReceiveAmount)}
                                                                // type="number"
                                                                onChange={(e) => {
                                                                    changeReceiveAmount(e.target.value, row.BillDetailID);
                                                                }}
                                                            />
                                                        </TableCell>
                                                    )}
                                                    {/* 總金額 */}
                                                    {action === 'view' ? (
                                                        ''
                                                    ) : (
                                                        <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                            {totalAmount ? handleNumber(totalAmount.toFixed(2)) : '0.00'}
                                                        </TableCell>
                                                    )}
                                                    {/* 重溢繳 */}
                                                    {/* 重溢繳 : 本次實收+累計實收-應繳 > 0，則顯示其金額差額 */}
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {tmpTotalAmount > 0 ? handleNumber(tmpTotalAmount.toFixed(2)) : '0.00'}
                                                    </TableCell>
                                                    {/* 短繳 */}
                                                    {/* 短繳：本次實收+累計實收-應繳 (應該是負值或0) 取正值 跟 手續費比，如果大於 則顯示此正值的金額(顯示的金額不用減掉手續費) */}
                                                    {/* 短繳：應繳金額-累計實收金額-總金額(含手續費)  5/25以後 */}
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {/* {tmpTotalAmount >= 0
                                                            ? '0.00'
                                                            : Math.abs(tmpTotalAmount) > Number(row.BankFees)
                                                            ? handleNumber(Math.abs(tmpTotalAmount).toFixed(2))
                                                            : '0.00'} */}
                                                        {/* 5/25以後 */}
                                                        {handleNumber(shortAmount.toFixed(2))}
                                                    </TableCell>
                                                    {/* 手續費差額 */}
                                                    {/* 手續費差額：本次實收+累計實收-應繳 (應該是負值或0) 取正值 跟 手續費比 ，如果小於等於則顯示正值的金額(顯示的金額不用減掉手續費) */}
                                                    {/* {action === 'view' ? (
                                                        ''
                                                    ) : (
                                                        <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                            {tmpTotalAmount >= 0
                                                                ? '0.00'
                                                                : Math.abs(tmpTotalAmount) <= Number(row.BankFees)
                                                                ? handleNumber(Math.abs(tmpTotalAmount).toFixed(2))
                                                                : '0.00'}
                                                        </TableCell>
                                                    )} */}
                                                    {/* 短繳原因 */}
                                                    {/* {action === 'view' ? (
                                                        ''
                                                    ) : (
                                                        <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                            <TextField
                                                                size="small"
                                                                sx={{ minWidth: 75 }}
                                                                value={row.ShortOverReason}
                                                                onChange={(e) => {
                                                                    changeShortOverReason(e.target.value, row.BillDetailID);
                                                                }}
                                                            />
                                                        </TableCell>
                                                    )} */}
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {action === 'view' ? (
                                                            row.ReceiveDate
                                                        ) : (
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DesktopDatePicker
                                                                    // inputFormat="YYYY/MM/DD"
                                                                    value={row.ReceiveDate}
                                                                    // value={dayjs(row.ReceiveDate).format('YYYY/MM/DD')}
                                                                    onChange={(e) => {
                                                                        changeReceiveDate(e, row.BillDetailID);
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField size="small" sx={{ minWidth: 150 }} {...params} />
                                                                    )}
                                                                />
                                                            </LocalizationProvider>
                                                        )}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {action === 'view' ? (
                                                            row.Note
                                                        ) : (
                                                            <TextField
                                                                size="small"
                                                                sx={{ minWidth: 75 }}
                                                                value={row.Note}
                                                                onChange={(e) => {
                                                                    changeNote(e.target.value, row.BillDetailID);
                                                                }}
                                                            />
                                                        )}
                                                    </TableCell>
                                                    {action === 'view' ? (
                                                        ''
                                                    ) : (
                                                        <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                            <Select
                                                                // value={tmpStatus}
                                                                value={row.Status}
                                                                label="會員"
                                                                onChange={(e) => changeState(e.target.value, row.BillDetailID)}
                                                            >
                                                                <MenuItem value={'OK'}>正常繳款</MenuItem>
                                                                <MenuItem value={'OVER'}>重溢繳</MenuItem>
                                                                <MenuItem value={'BANK_FEE'}>補手續費</MenuItem>
                                                                <MenuItem value={'PARTIAL'}>部分收款</MenuItem>
                                                                <MenuItem value={'INCOMPLETE'}>尚未收款</MenuItem>
                                                            </Select>
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            );
                                        })}
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <StyledTableCell className="totalAmount" align="center">
                                                Total
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center" />
                                            <StyledTableCell className="totalAmount" align="center" />
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(orgFeeAmountTotal.current.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(dedAmountTotal.current.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(feeAmountTotal.current.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(receivedAmountTotal.current.toFixed(2))}
                                            </StyledTableCell>
                                            {action === 'view' ? (
                                                ''
                                            ) : (
                                                <StyledTableCell className="totalAmount" align="center">
                                                    {handleNumber(bankFeesTotal.current.toFixed(2))}
                                                </StyledTableCell>
                                            )}
                                            {action === 'view' ? (
                                                ''
                                            ) : (
                                                <StyledTableCell className="totalAmount" align="center">
                                                    {handleNumber(ReceiveAmountTotal.current.toFixed(2))}
                                                </StyledTableCell>
                                            )}
                                            {action === 'view' ? (
                                                ''
                                            ) : (
                                                <StyledTableCell className="totalAmount" align="center">
                                                    {handleNumber(tmpTotal.toFixed(2))}
                                                </StyledTableCell>
                                            )}
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(tmpOverAmount.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(tmpShortAmount.toFixed(2))}
                                            </StyledTableCell>
                                            {/* {action === 'view' ? (
                                                ''
                                            ) : (
                                                <StyledTableCell className="totalAmount" align="center">
                                                    {handleNumber(Math.abs(tmpBankFeeBalance).toFixed(2))}
                                                </StyledTableCell>
                                            )} */}
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            {/* {action === 'view' ? (
                                                ''
                                            ) : (
                                                <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            )} */}
                                            {action === 'view' ? (
                                                ''
                                            ) : (
                                                <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            )}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        {action === 'view' ? (
                            ''
                        ) : (
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
                                    <Checkbox checked={isComplete} onChange={handleChange} size="small" sx={{ p: 0 }} />
                                    確認此帳單完成銷帳作業
                                </Box>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                {action === 'view' ? (
                    ''
                ) : (
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
                        <Button sx={{ mr: '0.05rem' }} disabled={action === 'view'} variant="contained" onClick={sendData}>
                            儲存
                        </Button>
                        {/* <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={initData}>
                    Reset
                </Button> */}
                    </Box>
                )}

                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleClose}>
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WriteOffWork;
