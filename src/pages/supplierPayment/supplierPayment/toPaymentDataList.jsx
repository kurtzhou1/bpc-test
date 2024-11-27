import { useState, useRef, useEffect } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

// project import
import PaymentWork from './paymentWork';
import { handleNumber } from 'components/commonFunction';
import { BootstrapDialogTitle } from 'components/commonFunction';
import Decimal from 'decimal.js';

// material-ui
import {
    Button,
    Table,
    TextField,
    Box,
    Paper,
    Checkbox,
    Dialog,
    DialogContent,
    Grid,
    DialogActions,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

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
        border: '1px solid #EEEEEE',
    },
    [`&.${tableCellClasses.body}.totalAmount`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        backgroundColor: '#CFD8DC',
    },
}));

const ToPaymentDataList = ({
    listInfo,
    cbToCn,
    setCbToCn,
    isSend,
    setIsSend,
    supplierPaymentQuery,
}) => {
    const dispatch = useDispatch();
    const [toPaymentList, setToPaymentList] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false); //折抵作業
    const [isSendDialogOpen, setIsSendDialogOpen] = useState(false); //折抵作業
    const editPaymentInfo = useRef([]);
    const actionName = useRef('');
    const invoiceNoEdit = useRef('');
    const dueDateEdit = useRef('');
    const [finishList, setFinishList] = useState({}); //完成付款結案
    const currentSupplierName = useRef(''); //相同的才能打勾
    const [paymentInfo, setPaymentInfo] = useState([]); //付款資訊
    const paidAmount = useRef(0);
    // const totalAmount = useRef(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const payAmount = useRef(0);

    const handleChange = (event, supplierName) => {
        if (currentSupplierName.current === supplierName || currentSupplierName.current === '') {
            if (
                event.target.checked &&
                (currentSupplierName.current === supplierName || currentSupplierName.current === '')
            ) {
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

    console.log('cbToCn=>>', cbToCn);

    const handleListChange = (event) => {
        console.log('event=>>', event);
        setFinishList({ ...finishList, [event.target.value]: event.target.checked });
    };

    const handleDialogOpen = (info, invoiceNo, dueDate) => {
        editPaymentInfo.current = info;
        invoiceNoEdit.current = invoiceNo;
        dueDateEdit.current = dueDate;
        setIsDialogOpen(true);
        actionName.current = 'toPayment';
    };

    const handleDialogClose = () => {
        editPaymentInfo.current = [];
        invoiceNoEdit.current = '';
        setIsDialogOpen(false);
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
            PaymentList: tmpArray,
        };
        fetch(sendPayment, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
            },
            body: JSON.stringify(sendTmpArray),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('data=>>>', data);
                handleIsSendDialogClose();
                setFinishList([]);
                supplierPaymentQuery();
            })
            .catch(() => {
                dispatch(
                    setMessageStateOpen({
                        messageStateOpen: {
                            isOpen: true,
                            severity: 'error',
                            message: '網路異常，請檢查網路連線或與系統窗口聯絡',
                        },
                    }),
                );
            });
    };

    useEffect(() => {
        setToPaymentList(listInfo);
        console.log('listInfo=>>', listInfo);
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
                paidAmount.current = new Decimal(paidAmount.current).add(
                    new Decimal(i?.InvoiceWKMaster?.PaidAmount),
                );
                tmpTotal = new Decimal(tmpTotal).add(new Decimal(i.InvoiceWKMaster.TotalAmount));
                payAmount.current = new Decimal(payAmount.current)
                    .add(new Decimal(i.PayAmount))
                    .toNumber();
            });
            setTotalAmount(tmpTotal);
        }
    }, [isSendDialogOpen]);

    return (
        <>
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
                    <Grid
                        container
                        spacing={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TableContainer
                                component={Paper}
                                sx={{ maxHeight: window.screen.height * 0.45 }}
                            >
                                <Table sx={{ minWidth: 300 }} stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">No</StyledTableCell>
                                            <StyledTableCell align="center">
                                                發票號碼
                                            </StyledTableCell>
                                            <StyledTableCell align="center">供應商</StyledTableCell>
                                            <StyledTableCell align="center">
                                                海纜名稱
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                海纜作業
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                發票到期日
                                            </StyledTableCell>
                                            <StyledTableCell align="center">總金額</StyledTableCell>
                                            <StyledTableCell align="center">
                                                累計實付金額
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                本次付款金額
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                完成付款結案
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paymentInfo?.map((row, id) => {
                                            return (
                                                <TableRow
                                                    key={row.InvoiceWKMaster.WKMasterID + id}
                                                    sx={{
                                                        '&:last-child td, &:last-child th': {
                                                            border: 0,
                                                        },
                                                    }}
                                                >
                                                    <TableCell align="center">{id + 1}</TableCell>
                                                    <TableCell align="center">
                                                        {row.InvoiceWKMaster.InvoiceNo}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.InvoiceWKMaster.SupplierName}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.InvoiceWKMaster.SubmarineCable}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.InvoiceWKMaster.WorkTitle}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {dayjs(
                                                            row.InvoiceWKMaster.IssueDate,
                                                        ).format('YYYY/MM/DD')}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {handleNumber(
                                                            row.InvoiceWKMaster?.TotalAmount,
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {handleNumber(
                                                            row?.InvoiceWKMaster?.PaidAmount,
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {handleNumber(row?.PayAmount)}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            value={row.InvoiceWKMaster.InvoiceNo}
                                                            onChange={handleListChange}
                                                            checked={
                                                                finishList[
                                                                    row.InvoiceWKMaster.InvoiceNo
                                                                ] || false
                                                            }
                                                            // sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        <TableRow
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                            }}
                                        >
                                            <StyledTableCell className="totalAmount" align="center">
                                                Total
                                            </StyledTableCell>
                                            <StyledTableCell
                                                className="totalAmount"
                                                align="center"
                                            ></StyledTableCell>
                                            <StyledTableCell
                                                className="totalAmount"
                                                align="center"
                                            ></StyledTableCell>
                                            <StyledTableCell
                                                className="totalAmount"
                                                align="center"
                                            ></StyledTableCell>
                                            <StyledTableCell
                                                className="totalAmount"
                                                align="center"
                                            ></StyledTableCell>
                                            <StyledTableCell
                                                className="totalAmount"
                                                align="center"
                                            ></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(totalAmount)}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(paidAmount.current)}
                                            </StyledTableCell>

                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(payAmount.current)}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                className="totalAmount"
                                                align="center"
                                            ></StyledTableCell>
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
                    <Button
                        sx={{ mr: '0.05rem' }}
                        variant="contained"
                        onClick={handleIsSendDialogClose}
                    >
                        關閉
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ maxHeight: window.screen.height * 0.45 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader>
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
                            <StyledTableCell align="center">換匯後累計實收金額</StyledTableCell>
                            <StyledTableCell align="center">累計實付金額</StyledTableCell>
                            <StyledTableCell align="center">本次付款金額</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                            <StyledTableCell align="center">摘要說明</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {toPaymentList?.map((row, id) => {
                            row.PayAmount = 0;
                            row.ExgReceivedAmountTotal = 0;
                            row?.BillDetailList &&
                                row.BillDetailList.forEach((i) => {
                                    row.PayAmount = new Decimal(row.PayAmount)
                                        .add(new Decimal(i.PayAmount ? i.PayAmount : 0))
                                        .toNumber();
                                });
                            row?.BillDetail &&
                                row.BillDetail.forEach((i) => {
                                    row.ExgReceivedAmountTotal = new Decimal(
                                        row.ExgReceivedAmountTotal,
                                    )
                                        .add(
                                            new Decimal(
                                                i.ExgReceivedAmount ? i.ExgReceivedAmount : 0,
                                            ),
                                        )
                                        .toNumber();
                                });
                            console.log('row=>>', row);
                            return (
                                <TableRow
                                    key={row?.InvoiceWKMaster?.WKMasterID + id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">
                                        <Checkbox
                                            value={row?.InvoiceWKMaster?.InvoiceNo}
                                            onChange={(e) => {
                                                handleChange(e, row?.InvoiceWKMaster?.SupplierName);
                                            }}
                                            checked={
                                                cbToCn[row?.InvoiceWKMaster?.InvoiceNo] || false
                                            }
                                        />
                                    </TableCell>
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.InvoiceWKMaster?.InvoiceNo}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.InvoiceWKMaster?.SupplierName}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.InvoiceWKMaster?.SubmarineCable}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.InvoiceWKMaster?.WorkTitle}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {dayjs(row?.InvoiceWKMaster?.DueDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {handleNumber(row?.InvoiceWKMaster?.TotalAmount)}{' '}
                                        {row?.InvoiceWKMaster?.Code}
                                    </StyledTableCell>
                                    {/* 換匯後累計實收金額 */}
                                    <StyledTableCell align="center">
                                        {handleNumber(row?.ExgReceivedAmountTotal)}{' '}
                                        {row?.BillDetail ? row?.BillDetail[0].Code : ''}
                                    </StyledTableCell>
                                    {/* 累計實付金額 */}
                                    <StyledTableCell align="center">
                                        {handleNumber(row?.ReceivedAmountSum)}
                                    </StyledTableCell>
                                    {/* 本次付款金額 */}
                                    <StyledTableCell align="center">
                                        {handleNumber(row?.InvoiceWKMaster?.PaidAmount)}{' '}
                                        {row?.InvoiceWKMaster?.Code}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {handleNumber(row.PayAmount)} {row?.InvoiceWKMaster?.Code}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                '& button': { mx: 1, p: 0 },
                                            }}
                                        >
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="outlined"
                                                // onClick={() => {
                                                //     handleDialogOpen(
                                                //         row.BillDetailList,
                                                //         row.InvoiceWKMaster.InvoiceNo,
                                                //         row.InvoiceWKMaster.DueDate,
                                                //     );
                                                // }}
                                            >
                                                收款換匯
                                            </Button>
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDialogOpen(
                                                        row.BillDetailList,
                                                        row.InvoiceWKMaster.InvoiceNo,
                                                        row.InvoiceWKMaster.DueDate,
                                                    );
                                                }}
                                            >
                                                編輯付款
                                            </Button>
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <TextField
                                            size="small"
                                            sx={{ minWidth: 75 }}
                                            value={row.Note}
                                            onChange={(e) => {
                                                changeNote(
                                                    e.target.value,
                                                    row.InvoiceWKMaster.InvoiceNo,
                                                );
                                            }}
                                        />
                                    </StyledTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* </Paper> */}
        </>
    );
};

export default ToPaymentDataList;

ToPaymentDataList.propTypes = {
    listInfo: PropTypes.array,
    supplierPaymentQuery: PropTypes.func,
    // setIsSend:React.SetStateAction<string>,
    actionName: PropTypes.string,
    invoiceNo: PropTypes.string,
    dueDate: PropTypes.string,
    // handleDialogClose: React.func,
    isDialogOpen: PropTypes.bool,
};
