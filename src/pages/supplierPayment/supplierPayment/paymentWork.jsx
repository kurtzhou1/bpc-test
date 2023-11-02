import { useState, useRef, useEffect } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
import MainCard from 'components/MainCard';
// material-ui
import { Typography, Button, Table, Dialog, DialogContent, Grid, DialogActions, TextField } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

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
    },
    [`&.${tableCellClasses.body}.totalAmount`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        backgroundColor: '#CFD8DC'
    }
}));

const PaymentWork = ({ isDialogOpen, handleDialogClose, editPaymentInfo, actionName, invoiceNo, dueDate, savePaymentEdit }) => {
    console.log('editPaymentInfo=>>>', editPaymentInfo);
    const dispatch = useDispatch();
    const [toPaymentDetailInfo, setToPaymentDetailInfo] = useState([]); //帳單明細檔
    const orgfeeAmountTotal = useRef(0); //應收金額
    const receivedAmountTotal = useRef(0); //已實收金額
    const paidAmountTotal = useRef(0); //已實付金額
    const toPaymentAmountTotal = useRef(0); //未付款金額
    const payAmountTotal = useRef(0); //此次付款金額

    const initData = () => {
        orgfeeAmountTotal.current = 0;
        receivedAmountTotal.current = 0;
        paidAmountTotal.current = 0;
        toPaymentAmountTotal.current = 0;
        payAmountTotal.current = 0;
    }

    const changeNote = (note, invDetailID) => {
        let tmpArray = toPaymentDetailInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.InvDetailID === invDetailID) {
                i.Note = note;
            }
        });
        setToPaymentDetailInfo(tmpArray);
    };

    const changePayAmount = (payment, invDetailID) => {
        payAmountTotal.current = 0;
        let tmpArray = toPaymentDetailInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.InvDetailID === invDetailID) {
                i.PayAmount = Number(payment);
            }
            payAmountTotal.current =
                payAmountTotal.current +
                (i.PayAmount ? i.PayAmount : Number(i.ReceivedAmount - i.PaidAmount) > 0 ? Number(i.ReceivedAmount - i.PaidAmount) : 0);
        });
        setToPaymentDetailInfo(tmpArray);
    };

    const handleSaveEdit = () => {
        //若已實付金額+此次付款金額 > 已實收金額，則需要顯示一個告警提醒
        if (payAmountTotal.current + paidAmountTotal.current > receivedAmountTotal.current) {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'info',
                        message: `已實付金額+此次付款金額超出已實收金額${handleNumber(
                            (payAmountTotal.current + paidAmountTotal.current - receivedAmountTotal.current).toFixed(2)
                        )}`
                    }
                })
            );
        }
        let tmpArray = toPaymentDetailInfo.map((i) => i);
        tmpArray.forEach((i) => {
            i.PayAmount = i.PayAmount ? i.PayAmount : Number(i.ReceivedAmount - i.PaidAmount);
        });
        savePaymentEdit(tmpArray);
    };

    const handleTmpSaveEdit = () => {
        savePaymentEdit(editPaymentInfo);
    };

    useEffect(() => {
        let tmpArray = JSON.parse(JSON.stringify(editPaymentInfo));
        tmpArray.forEach((i) => {
            // i.PayAmount = i.PayAmount ? i.PayAmount : Number(i.ReceivedAmount - i.PaidAmount);
            orgfeeAmountTotal.current = orgfeeAmountTotal.current + i.OrgFeeAmount;
            receivedAmountTotal.current = receivedAmountTotal.current + i.ReceivedAmount;
            paidAmountTotal.current = paidAmountTotal.current + i.PaidAmount;
            toPaymentAmountTotal.current =
                toPaymentAmountTotal.current + (i.OrgFeeAmount - i.PaidAmount > 0 ? i.OrgFeeAmount - i.PaidAmount : 0);
            payAmountTotal.current = payAmountTotal.current + (i.PayAmount ? i.PayAmount : Number(i.ReceivedAmount - i.PaidAmount));
        });
        tmpArray.sort((a, b) => {
            let aBillingNo = a.BillingNo.toUpperCase();
            let bBillingNo = b.BillingNo.toUpperCase();
            if (aBillingNo < bBillingNo) {
                return -1;
            }
            if (aBillingNo > bBillingNo) {
                return 1;
            }
            return 0;
        })
        if (isDialogOpen) {
            setToPaymentDetailInfo(tmpArray);
        }
    }, [isDialogOpen]);

    return (
        <Dialog maxWidth="xxl" open={isDialogOpen}>
            <BootstrapDialogTitle>{actionName === 'toPayment' ? '收款明細與編輯付款資訊' : '收款明細與付款資訊'}</BootstrapDialogTitle>
            <DialogContent>
                <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 10 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 10 }}>
                            <Grid item sm={1} md={1} lg={1}>
                                <Typography variant="h5" sx={{ fontSize: { lg: '0.7rem' ,xl: '0.88rem' }, display: 'flex' ,justifyContent: 'end' }}>
                                    發票號碼：
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <TextField
                                    value={invoiceNo}
                                    fullWidth
                                    disabled={true}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <Typography variant="h5" sx={{ fontSize: { lg: '0.7rem' ,xl: '0.88rem' }, display: 'flex' ,justifyContent: 'end' }}>
                                    發票到期日：
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <TextField
                                    value={dayjs(dueDate).format('YYYY/MM/DD')}
                                    fullWidth
                                    disabled={true}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <MainCard title="帳單明細列表">
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table sx={{ minWidth: 300 }} stickyHeader >
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">帳單號碼</StyledTableCell>
                                            <StyledTableCell align="center">費用項目</StyledTableCell>
                                            <StyledTableCell align="center">計帳段號</StyledTableCell>
                                            <StyledTableCell align="center">會員</StyledTableCell>
                                            <StyledTableCell align="center">應收金額</StyledTableCell>
                                            <StyledTableCell align="center">已實收金額</StyledTableCell>
                                            <StyledTableCell align="center">已實付金額</StyledTableCell>
                                            <StyledTableCell align="center">未付款金額</StyledTableCell>
                                            <StyledTableCell align="center">摘要說明</StyledTableCell>
                                            {actionName === 'toPayment' ? (
                                                <StyledTableCell align="center">此次付款金額</StyledTableCell>
                                            ) : (
                                                ''
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {toPaymentDetailInfo?.map((row) => {
                                            let toPayment = row.OrgFeeAmount - row.PaidAmount; //未付款金額
                                            let tmpPayAmount = row.PayAmount ? row.PayAmount : Number(row.ReceivedAmount) - Number(row.PaidAmount);
                                            return (
                                                <TableRow
                                                    key={row.BillingNo + row?.FeeItem + row?.PartyName}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{row?.BillingNo}</TableCell>
                                                    <TableCell align="center">{row.FeeItem}</TableCell>
                                                    <TableCell align="center">{row.BillMilestone}</TableCell>
                                                    <TableCell align="center">{row.PartyName}</TableCell>
                                                    <TableCell align="center">${handleNumber(row.OrgFeeAmount.toFixed(2))}</TableCell>
                                                    <TableCell align="center">${handleNumber(row.ReceivedAmount.toFixed(2))}</TableCell>
                                                    <TableCell align="center">${handleNumber(row.PaidAmount.toFixed(2))}</TableCell>
                                                    <TableCell align="center">
                                                        {toPayment > 0 ? `$${handleNumber(toPayment.toFixed(2))}` : 0}
                                                    </TableCell>
                                                    {actionName === 'toPayment' ? (
                                                        <TableCell align="center">
                                                            <TextField
                                                                size="small"
                                                                sx={{ minWidth: 75 }}
                                                                value={row.Note}
                                                                onChange={(e) => {
                                                                    changeNote(e.target.value, row.InvDetailID);
                                                                }}
                                                            />
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell align="center">
                                                            <TableCell align="center">{row.Note}</TableCell>
                                                        </TableCell>
                                                    )}
                                                    {actionName === 'toPayment' ? (
                                                        <TableCell align="center">
                                                            <TextField
                                                                size="small"
                                                                inputProps={{ step: '.01' }}
                                                                sx={{ minWidth: 75 }}
                                                                value={handleNumber(tmpPayAmount.toFixed(2))}
                                                                onChange={(e) => {
                                                                    changePayAmount(e.target.value, row.InvDetailID);
                                                                }}
                                                            />
                                                        </TableCell>
                                                    ) : (
                                                        ''
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
                                            <StyledTableCell className="totalAmount" align="center" />
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(orgfeeAmountTotal.current.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(receivedAmountTotal.current.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(paidAmountTotal.current.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(toPaymentAmountTotal.current.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center" />
                                            {actionName === 'toPayment' ? (
                                                <StyledTableCell className="totalAmount" align="center">
                                                    {handleNumber(payAmountTotal.current.toFixed(2))}
                                                </StyledTableCell>
                                            ) : (
                                                ''
                                            )}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </MainCard>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                {actionName === 'toPayment' ? (
                    <>
                        <Button
                            sx={{ mr: '0.05rem' }}
                            variant="contained"
                            onClick={() => {
                                handleSaveEdit();
                                initData();
                            }}
                        >
                            儲存
                        </Button>
                        <Button
                            sx={{ mr: '0.05rem' }}
                            variant="contained"
                            onClick={() => {
                                handleDialogClose();
                                handleTmpSaveEdit();
                                initData();
                            }}
                        >
                            關閉
                        </Button>
                    </>
                ) : (
                    <Button
                        sx={{ mr: '0.05rem' }}
                        variant="contained"
                        onClick={() => {
                            handleDialogClose();
                            initData();
                        }}
                    >
                        關閉
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default PaymentWork;

PaymentWork.propTypes = {
    actionName: React.String,
    invoiceNo: React.String,
    dueDate: PropTypes.instanceOf(Date),
    editPaymentInfo: React.Array,
    savePaymentEdit: React.func,
    handleDialogClose: React.func,
    isDialogOpen: React.bool
};
