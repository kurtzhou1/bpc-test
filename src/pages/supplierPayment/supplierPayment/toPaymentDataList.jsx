import { useState, useRef, useEffect } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

// project import
import PaymentWork from './paymentWork';
import DedAmountWork from './dedAmountWork';
import { handleNumber } from 'components/commonFunction';
import { BootstrapDialogTitle } from 'components/commonFunction';

// material-ui
import { Button, Table, TextField, Box, Paper, Checkbox, Dialog, DialogContent, Grid, DialogActions } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

// icon
// import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
// import AddCircleIcon from '@mui/icons-material/AddCircle';

import dayjs from 'dayjs';

import { sendPayment } from 'components/apis.jsx';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.gary,
        color: theme.palette.common.black,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        border: '1px solid #EEEEEE'
    },
    [`&.${tableCellClasses.body}.totalAmount`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        backgroundColor: '#CFD8DC'
    }
}));

const ToPaymentDataList = ({ listInfo, cbToCn, setCbToCn, isSend, setIsSend, supplierPaymentQuery }) => {
    const dispatch = useDispatch();
    const [toPaymentList, setToPaymentList] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false); //折抵作業
    const [isDedDialogOpen, setIsDedDialogOpen] = useState(false); //減項作業
    const [isSendDialogOpen, setIsSendDialogOpen] = useState(false); //折抵作業
    const editPaymentInfo = useRef([]);
    const editCMList = useRef([]);
    const actionName = useRef('');
    const invoiceNoEdit = useRef('');
    const dueDateEdit = useRef('');
    const [finishList, setFinishList] = useState({}); //完成付款結案
    const currentSupplierName = useRef('');
    const [paymentInfo, setPaymentInfo] = useState([]); //付款資訊
    const paidAmount = useRef(0);
    // const totalAmount = useRef(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const payAmount = useRef(0);

    const handleChange = (event, supplierName) => {
        console.log('event=>>', event.target.checked, supplierName, currentSupplierName)
        if (currentSupplierName.current === supplierName || currentSupplierName.current === '') {
            if (event.target.checked && (currentSupplierName.current === supplierName || currentSupplierName.current === '')) {
                currentSupplierName.current = supplierName;
                setCbToCn({ ...cbToCn, [event.target.value]: event.target.checked });
            } else {
                setCbToCn({ ...cbToCn, [event.target.value]: event.target.checked });
                if (Object.values(cbToCn).filter((i) => i).length === 1) {
                    currentSupplierName.current = '';
                }
            }
        }
    };

    const handleListChange = (event) => {
        console.log('event=>>', event);
        setFinishList({ ...finishList, [event.target.value]: event.target.checked });
    };

    const handleDialogOpen = (receivedAmountSum, paidAmount, info, invoiceNo, dueDate) => {
        if (receivedAmountSum > paidAmount) {
            editPaymentInfo.current = info;
            invoiceNoEdit.current = invoiceNo;
            dueDateEdit.current = dueDate;
            setIsDialogOpen(true);
            actionName.current = 'toPayment';
        } else {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '累計實收金額必須多於累計實付' } }));
        }
    };

    const handleDialogClose = () => {
        editPaymentInfo.current = [];
        invoiceNoEdit.current = '';
        setIsDialogOpen(false);
        actionName.current = '';
    };

    const handleDedDialogOpen = (info, invoiceNo, dueDate) => {
        editCMList.current = info;
        invoiceNoEdit.current = invoiceNo;
        dueDateEdit.current = dueDate;
        setIsDedDialogOpen(true);
        actionName.current = 'toPayment';
    };

    const handleDedDialogClose = () => {
        editCMList.current = [];
        invoiceNoEdit.current = '';
        setIsDedDialogOpen(false);
        actionName.current = '';
    };

    const savePaymentEdit = (info) => {
        let tmpArray = toPaymentList.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.InvoiceWKMaster.InvoiceNo === invoiceNoEdit.current) {
                i.BillDetailList = info;
            }
        });
        setToPaymentList(tmpArray);
        handleDialogClose();
    };

    const saveDedAmountEdit = (info, dedAmountTotal) => {
        let tmpArray = toPaymentList.map((i) => i);
        tmpArray.forEach((i) => {
            console.log(i.InvoiceWKMaster.InvoiceNo, invoiceNoEdit.current)
            if (i.InvoiceWKMaster.InvoiceNo === invoiceNoEdit.current) {
                i.CMList = info;
                i.InvoiceWKMaster.NewDedAmount = dedAmountTotal;
            }
        });
        setToPaymentList(tmpArray);
        handleDedDialogClose();
    };

    const changeNote = (note, invoiceNo) => {
        let tmpArray = toPaymentList.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.InvoiceWKMaster.InvoiceNo === invoiceNo) {
                i.Note = note;
            }
        });
        setToPaymentList(tmpArray);
    };

    const handleIsSendDialogClose = () => {
        setIsSendDialogOpen(false);
        paidAmount.current = 0;
        setTotalAmount(0);
        payAmount.current = 0;
    };

    const sendPaymentInfo = () => {
        let tmpArray = paymentInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (finishList[i.InvoiceWKMaster.InvoiceNo]) {
                i.Status = 'COMPLETE';
            }
            i.BillDetailList.forEach((i) => {
                i.PayAmount = i.PayAmount ? i.PayAmount : 0;
            });
        });
        let sendTmpArray = {
            PaymentList: tmpArray
        };
        fetch(sendPayment, {
            method: 'POST',
            body: JSON.stringify(sendTmpArray)
        })
            .then((res) => res.json())
            .then(() => {
                handleIsSendDialogClose();
                setFinishList([]);
                supplierPaymentQuery();
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        setToPaymentList(listInfo);
    }, [listInfo]);

    useEffect(() => {
        if (isSend) {
            let tmpArray = [];
            toPaymentList.forEach((i) => {
                if (cbToCn[i.InvoiceWKMaster.InvoiceNo]) {
                    tmpArray.push(i);
                }
                i.Note = i.Note ? i.Note : '';
            });
            tmpArray.forEach((i) => {
                i.Status = 'PARTIAL';
            });
            console.log('tmpArray=>>', tmpArray);
            setPaymentInfo(tmpArray);
            setIsSendDialogOpen(true);
            setIsSend(false);
        }
    }, [isSend]);

    useEffect(() => {
        if (isSendDialogOpen) {
            let tmpTotal = 0;
            paymentInfo.forEach((i) => {
                paidAmount.current = paidAmount.current + i?.InvoiceWKMaster?.PaidAmount;
                tmpTotal = tmpTotal + i.InvoiceWKMaster.TotalAmount;
                payAmount.current = payAmount.current + i.PayAmount;
            });
            setTotalAmount(tmpTotal);
        }
    }, [isSendDialogOpen]);

    return (
        <>
            <DedAmountWork
                isDedDialogOpen={isDedDialogOpen}
                handleDedDialogClose={handleDedDialogClose}
                editCMList={editCMList.current}
                actionName={actionName.current}
                invoiceNo={invoiceNoEdit.current}
                dueDate={dueDateEdit.current}
                saveDedAmountEdit={saveDedAmountEdit}
            />
            <PaymentWork
                isDialogOpen={isDialogOpen}
                handleDialogClose={handleDialogClose}
                editPaymentInfo={editPaymentInfo.current}
                actionName={actionName.current}
                invoiceNo={invoiceNoEdit.current}
                dueDate={dueDateEdit.current}
                savePaymentEdit={savePaymentEdit}
            />
            <Dialog maxWidth="md" fullWidth open={isSendDialogOpen}>
                <BootstrapDialogTitle>本次付款資訊</BootstrapDialogTitle>
                <DialogContent>
                    <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table sx={{ minWidth: 300 }} stickyHeader >
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">No</StyledTableCell>
                                            <StyledTableCell align="center">發票號碼</StyledTableCell>
                                            <StyledTableCell align="center">供應商</StyledTableCell>
                                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                                            <StyledTableCell align="center">發票到期日</StyledTableCell>
                                            <StyledTableCell align="center">總金額</StyledTableCell>
                                            <StyledTableCell align="center">累計實付金額</StyledTableCell>
                                            <StyledTableCell align="center">本次減項金額</StyledTableCell>
                                            <StyledTableCell align="center">累計減項金額</StyledTableCell>
                                            <StyledTableCell align="center">本次付款金額</StyledTableCell>
                                            <StyledTableCell align="center">完成付款結案</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paymentInfo?.map((row, id) => {
                                            return (
                                                <TableRow
                                                    key={row.InvoiceWKMaster.WKMasterID + id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{id + 1}</TableCell>
                                                    <TableCell align="center">{row.InvoiceWKMaster.InvoiceNo}</TableCell>
                                                    <TableCell align="center">{row.InvoiceWKMaster.SupplierName}</TableCell>
                                                    <TableCell align="center">{row.InvoiceWKMaster.SubmarineCable}</TableCell>
                                                    <TableCell align="center">{row.InvoiceWKMaster.WorkTitle}</TableCell>
                                                    <TableCell align="center">
                                                        {dayjs(row.InvoiceWKMaster.IssueDate).format('YYYY/MM/DD')}
                                                    </TableCell>
                                                    <TableCell align="center">{`$${handleNumber(
                                                        row.InvoiceWKMaster?.TotalAmount?.toFixed(2)
                                                    )}`}</TableCell>
                                                    <TableCell align="center">{`$${handleNumber(
                                                        row?.InvoiceWKMaster?.PaidAmount?.toFixed(2)
                                                    )}`}</TableCell>
                                                    {/* 本次減項金額 */}
                                                          <TableCell align="center">{`$${handleNumber(
                                                        row?.InvoiceWKMaster?.NewDedAmount?.toFixed(2)
                                                    )}`}</TableCell>
                                                    {/* 累計減項金額 */}
                                                          <TableCell align="center">{`$${handleNumber(
                                                        row?.InvoiceWKMaster?.DedAmount?.toFixed(2)
                                                    )}`}</TableCell>
                                                    <TableCell align="center">{`$${handleNumber(row?.PayAmount?.toFixed(2))}`}</TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            value={row.InvoiceWKMaster.InvoiceNo}
                                                            onChange={handleListChange}
                                                            checked={finishList[row.InvoiceWKMaster.InvoiceNo] || false}
                                                            // sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <StyledTableCell className="totalAmount" align="center">
                                                Total
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">{`$${handleNumber(
                                                totalAmount?.toFixed(2)
                                            )}`}</StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">{`$${handleNumber(
                                                paidAmount.current?.toFixed(2)
                                            )}`}</StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">{`$${handleNumber(
                                                payAmount.current?.toFixed(2)
                                            )}`}</StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={sendPaymentInfo}>
                        確認
                    </Button>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleIsSendDialogClose}>
                        關閉
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">發票號碼</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">發票到期日</StyledTableCell>
                            <StyledTableCell align="center">總金額</StyledTableCell>
                            <StyledTableCell align="center">累計實收金額</StyledTableCell>
                            <StyledTableCell align="center">累計實付金額</StyledTableCell>
                            <StyledTableCell align="center">累計減項金額</StyledTableCell>
                            <StyledTableCell align="center">本次減項金額</StyledTableCell>
                            <StyledTableCell align="center">本次付款金額</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                            <StyledTableCell align="center">摘要說明</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {toPaymentList?.map((row, id) => {
                            row.PayAmount = 0;
                            row.BillDetailList.forEach((i) => {
                                row.PayAmount = row.PayAmount + (i.PayAmount ? i.PayAmount : 0);
                            });
                            return (
                                <TableRow
                                    key={row?.InvoiceWKMaster?.WKMasterID + row?.InvoiceWKMaster?.InvoiceNo}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">
                                        <Checkbox
                                            value={row?.InvoiceWKMaster?.InvoiceNo}
                                            onChange={(e) => {
                                                handleChange(e, row?.InvoiceWKMaster?.SupplierName);
                                            }}
                                            checked={cbToCn[row?.InvoiceWKMaster?.InvoiceNo] || false}
                                        />
                                    </TableCell>
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.InvoiceNo}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.SupplierName}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {dayjs(row?.InvoiceWKMaster?.DueDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {handleNumber(row?.InvoiceWKMaster?.TotalAmount.toFixed(2))}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{handleNumber(row?.ReceivedAmountSum.toFixed(2))}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {handleNumber(row?.InvoiceWKMaster?.PaidAmount.toFixed(2))}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {handleNumber(row?.InvoiceWKMaster?.DedAmount.toFixed(2))}
                                    </StyledTableCell>
                                    {/* 本次減項金額 */}
                                    <StyledTableCell align="center">
                                        {handleNumber(row?.InvoiceWKMaster?.NewDedAmount.toFixed(2))}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{handleNumber(row.PayAmount.toFixed(2))}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', '& button': { mx: 1, p: 0 } }}>
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDialogOpen(
                                                        row?.ReceivedAmountSum,
                                                        row?.InvoiceWKMaster?.PaidAmount,
                                                        row.BillDetailList,
                                                        row.InvoiceWKMaster.InvoiceNo,
                                                        row.InvoiceWKMaster.DueDate
                                                    );
                                                }}
                                            >
                                                編輯付款
                                            </Button>
                                            <Button
                                                color="success"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDedDialogOpen(
                                                        row.CMList,
                                                        row.InvoiceWKMaster.InvoiceNo,
                                                        row.InvoiceWKMaster.DueDate
                                                    );
                                                }}
                                            >
                                                發票金額減項
                                            </Button>
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <TextField
                                            size="small"
                                            sx={{ minWidth: 75 }}
                                            value={row.Note}
                                            onChange={(e) => {
                                                changeNote(e.target.value, row.InvoiceWKMaster.InvoiceNo);
                                            }}
                                        />
                                    </StyledTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ToPaymentDataList;

ToPaymentDataList.propTypes = {
    listInfo: React.Array,
    supplierPaymentQuery: React.func,
    actionName: React.String,
    invoiceNo: React.String,
    dueDate: PropTypes.instanceOf(Date),
    handleDialogClose: React.func,
    isDialogOpen: React.bool
};
