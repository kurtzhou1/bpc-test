import { useState, useRef, useEffect } from 'react';

// project import
import PaymentWork from './paymentWork';
import { handleNumber } from 'components/commonFunction';
import { BootstrapDialogTitle } from 'components/commonFunction';

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
    DialogContentText,
    Grid,
    DialogActions
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// icon
// import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
    const [isColumn2Open, setIsColumn2Open] = useState(true);
    const [isColumn3Open, setIsColumn3Open] = useState(true);
    const [isColumn4Open, setIsColumn4Open] = useState(true);
    const dispatch = useDispatch();
    // let tmpBMArray = [];

    const columns1 = [
        { id: '海纜名稱', label: '海纜名稱', minWidth: '90px', align: 'center', className: '' },
        { id: '海纜作業', label: '海纜作業', minWidth: '90px', align: 'center' },
        { id: '計帳段號', label: '計帳段號', minWidth: '90px', align: 'center' }
    ];

    const columns2 = [
        { id: 'Suppliers', label: 'Suppliers', minWidth: '90px', align: 'center', className: '' },
        {
            id: "Supplier's Invoice No.",
            label: "Supplier's Invoice No.",
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Amt(USD)',
            label: 'Amt(USD)',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'dueDate',
            label: 'DueDate',
            minWidth: '90px',
            align: 'center'
        }
    ];

    const columns3 = [
        {
            id: 'Invoice#(CBP to Party)',
            label: 'Invoice#(CBP to Party)',
            minWidth: '90px',
            align: 'center'
        },

        {
            id: 'Party',
            label: 'Party',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Description',
            label: 'Description',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Amount Billed(USD)',
            label: 'Amount Billed(USD)',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Due Date',
            label: 'Due Date',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Received Amt(USD)',
            label: 'Received Amt(USD)',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Diff',
            label: 'Diff',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Remark',
            label: 'Remark',
            minWidth: '90px',
            align: 'center'
        }
    ];

    const columns4 = [
        {
            id: 'Amt(USD)',
            label: 'Amt(USD)',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Remittance Date',
            label: 'Remittance Date',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Diff',
            label: 'Diff',
            minWidth: '90px',
            align: 'center'
        }
    ];

    const [toPaymentList, setToPaymentList] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false); //折抵作業
    const [isSendDialogOpen, setIsSendDialogOpen] = useState(false); //折抵作業
    const editPaymentInfo = useRef([]);
    const actionName = useRef('');
    const invoiceNoEdit = useRef('');
    const dueDateEdit = useRef('');
    const [finishList, setFinishList] = useState({}); //完成付款結案
    const currentSupplierName = useRef('');
    const [paymentInfo, setPaymentInfo] = useState([]); //付款資訊

    const handleChange = (event, supplierName) => {
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

    console.log('finishList=>>', finishList);

    const handleDialogOpen = (info, invoiceNo, dueDate) => {
        // let tmpArray = info.BillDetail.map((i) => i);
        editPaymentInfo.current = info;
        invoiceNoEdit.current = invoiceNo;
        dueDateEdit.current = dueDate;
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        editPaymentInfo.current = [];
        invoiceNoEdit.current = '';
        setIsDialogOpen(false);
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
    };

    const sendPaymentInfo = () => {
        let tmpArray = paymentInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (finishList[i.InvoiceWKMaster.InvoiceNo]) {
                i.Status = 'COMPLETE';
            }
        });
        fetch(sendPayment, {
            method: 'POST',
            body: JSON.stringify(tmpArray)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('data=>>>', data);
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
            console.log('cbToCn=>>', cbToCn);
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

    return (
        <>
            <Dialog maxWidth="md" fullWidth open={isSendDialogOpen}>
                <BootstrapDialogTitle>本次付款資訊</BootstrapDialogTitle>
                <DialogContent>
                    <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">No</StyledTableCell>
                                            <StyledTableCell align="center">發票號碼</StyledTableCell>
                                            <StyledTableCell align="center">供應商</StyledTableCell>
                                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                                            <StyledTableCell align="center">發票到期日</StyledTableCell>
                                            <StyledTableCell align="center">總金額</StyledTableCell>
                                            <StyledTableCell align="center">累積實付金額</StyledTableCell>
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
                                                        row.InvoiceWKMaster.TotalAmount?.toFixed(2)
                                                    )}`}</TableCell>
                                                    <TableCell align="center">{`$${handleNumber(
                                                        row.InvoiceWKMaster.ReceivedAmountSum?.toFixed(2)
                                                    )}`}</TableCell>
                                                    <TableCell align="center">{`$${handleNumber(
                                                        row.InvoiceWKMaster.PayAmount?.toFixed(2)
                                                    )}`}</TableCell>
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
                                        {/* <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <StyledTableCell className="totalAmount" align="center">
                                                Total
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">{`$${handleNumber(
                                                totalAmount.current?.toFixed(2)
                                            )}`}</StyledTableCell>
                                        </TableRow> */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={sendPaymentInfo}>
                        合併
                    </Button>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleIsSendDialogClose}>
                        關閉
                    </Button>
                </DialogActions>
            </Dialog>
            <PaymentWork
                isDialogOpen={isDialogOpen}
                handleDialogClose={handleDialogClose}
                editPaymentInfo={editPaymentInfo.current}
                actionName={actionName.current}
                invoiceNo={invoiceNoEdit.current}
                dueDate={dueDateEdit.current}
                savePaymentEdit={savePaymentEdit}
            />
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        {/* <TableRow>
                            <StyledTableCell align="center" colSpan={3}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={isColumn2Open ? 4 : 1}>
                                <Button
                                    onClick={() => {
                                        setIsColumn2Open(!isColumn2Open);
                                    }}
                                >
                                    {isColumn2Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                </Button>
                                {isColumn2Open ? '供應商發票' : ''}
                            </StyledTableCell>
                            <StyledTableCell align="center" colSpan={isColumn3Open ? 8 : 1}>
                                <Button
                                    onClick={() => {
                                        setIsColumn3Open(!isColumn3Open);
                                    }}
                                >
                                    {isColumn3Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                </Button>
                                {isColumn3Open ? '會員帳單明細與付款資訊' : ''}
                            </StyledTableCell>
                            <StyledTableCell align="center" colSpan={isColumn4Open ? 3 : 1}>
                                <Button
                                    onClick={() => {
                                        setIsColumn4Open(!isColumn4Open);
                                    }}
                                >
                                    {isColumn4Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                </Button>
                                {isColumn4Open ? '匯出金額給供應商' : ''}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            {columns1.map((column) => {
                                return (
                                    <StyledTableCell key={column.id} align={column.align} className={column.className}>
                                        {column.label}
                                    </StyledTableCell>
                                );
                            })}
                            {isColumn2Open ? (
                                columns2.map((column) => {
                                    return (
                                        <StyledTableCell key={column.id} align={column.align}>
                                            {column.label}
                                        </StyledTableCell>
                                    );
                                })
                            ) : (
                                <StyledTableCell key={columns2[0].id} align={columns2[0].align}>
                                    {columns2[0].label}
                                </StyledTableCell>
                            )}
                            {isColumn3Open ? (
                                columns3.map((column) => {
                                    return (
                                        <StyledTableCell key={column.id} align={column.align}>
                                            {column.label}
                                        </StyledTableCell>
                                    );
                                })
                            ) : (
                                <StyledTableCell key={columns3[0].id} align={columns3[0].align}>
                                    {columns3[0].label}
                                </StyledTableCell>
                            )}
                            {isColumn4Open ? (
                                columns4.map((column) => {
                                    return (
                                        <StyledTableCell key={column.id} align={column.align}>
                                            {column.label}
                                        </StyledTableCell>
                                    );
                                })
                            ) : (
                                <StyledTableCell key={columns4[0].id} align={columns4[0].align}>
                                    {columns4[0].label}
                                </StyledTableCell>
                            )}
                        </TableRow> */}
                        <TableRow>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">會員代碼</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">發票到期日</StyledTableCell>
                            <StyledTableCell align="center">總金額</StyledTableCell>
                            <StyledTableCell align="center">累計實收金額</StyledTableCell>
                            <StyledTableCell align="center">累計實付金額</StyledTableCell>
                            <StyledTableCell align="center">本次付款金額</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                            <StyledTableCell align="center">摘要說明</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {toPaymentList?.map((row, id) => {
                            // tmpBMArray = [];
                            // let tmpPayAmount = 0;
                            row.PayAmount = 0;
                            row.BillDetailList.forEach((i) => {
                                // tmpPayAmount = tmpPayAmount + (i.PayAmount ? i.PayAmount : 0);
                                row.PayAmount = row.PayAmount + (i.PayAmount ? i.PayAmount : 0);
                            });
                            // row?.BillDetailList.forEach((i) => {
                            //     if (!tmpBMArray.includes(i.BillMilestone)) {
                            //         tmpBMArray.push(i.BillMilestone);
                            //     }
                            // });
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
                                            // sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                        />
                                    </TableCell>
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.PartyName}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.SupplierName}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {dayjs(row?.InvoiceWKMaster?.DueDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {handleNumber(row?.InvoiceWKMaster?.TotalAmount.toFixed(2))}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {handleNumber(row?.InvoiceWKMaster?.PaidAmount.toFixed(2))}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{handleNumber(row?.ReceivedAmountSum.toFixed(2))}</StyledTableCell>
                                    {/* <StyledTableCell align="center">{handleNumber(tmpPayAmount.toFixed(2))}</StyledTableCell> */}
                                    <StyledTableCell align="center">{handleNumber(row.PayAmount.toFixed(2))}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', '& button': { mx: 1, p: 0, fontSize: 1 } }}>
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDialogOpen(
                                                        row.BillDetailList,
                                                        row.InvoiceWKMaster.InvoiceNo,
                                                        row.InvoiceWKMaster.DueDate
                                                    );
                                                }}
                                            >
                                                編輯付款資訊
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
                        {/* {listInfo?.map((row) => {
                            tmpBMArray = [];
                            row?.BillDetailList.forEach((i) => {
                                if (!tmpBMArray.includes(i.BillMilestone)) {
                                    tmpBMArray.push(i.BillMilestone);
                                }
                            });
                            return (
                                <TableRow key={row.WKMasterID + row.InvoiceNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">{tmpBMArray.join(',')}</StyledTableCell>
                                    {isColumn2Open ? (
                                        <>
                                            <StyledTableCell align="center">{row?.InvoiceWKMaster?.SupplierName}</StyledTableCell>
                                            <StyledTableCell align="center">{row?.InvoiceWKMaster?.InvoiceNo}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {handleNumber(row?.InvoiceWKMaster?.TotalAmount)}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{dayjs(row?.DueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                        </>
                                    ) : (
                                        <StyledTableCell align="center">{row.SupplierName}</StyledTableCell>
                                    )}
                                    {isColumn3Open ? (
                                        <>
                                            <StyledTableCell align="center">{'No. 12345678'}</StyledTableCell>
                                            <StyledTableCell align="center">{row.PartyName}</StyledTableCell>
                                            <StyledTableCell align="center">{'測試檔案資料'}</StyledTableCell>
                                            <StyledTableCell align="center">{handleNumber(123456789)}</StyledTableCell>
                                            <StyledTableCell align="center">{dayjs(row.IssueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                            <StyledTableCell align="center">{handleNumber(123456789)}</StyledTableCell>
                                            <StyledTableCell align="center">{handleNumber(1)}</StyledTableCell>
                                            <StyledTableCell align="center">{'N/A'}</StyledTableCell>
                                        </>
                                    ) : (
                                        <StyledTableCell align="center">{'No. 12345678'}</StyledTableCell>
                                    )}
                                    {isColumn4Open ? (
                                        <>
                                            <StyledTableCell align="center">{handleNumber(123456789)}</StyledTableCell>
                                            <StyledTableCell align="center">{dayjs(row.IssueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                            <StyledTableCell align="center">{handleNumber(1)}</StyledTableCell>
                                        </>
                                    ) : (
                                        <StyledTableCell align="center">{handleNumber(123456789)}</StyledTableCell>
                                    )}
                                </TableRow>
                            );
                        })} */}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* </Paper> */}
        </>
    );
};

export default ToPaymentDataList;
