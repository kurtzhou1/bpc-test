import { useState, useRef } from 'react';

// project import
import { handleNumber } from 'components/commonFunction';
import PaymentWork from './paymentWork';
// material-ui
import { Button, Table, Box } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';

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

const PaymentedDataList = ({ listInfo }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false); //折抵作業
    const editPaymentInfo = useRef([]);
    const invoiceNoEdit = useRef('');
    const dueDateEdit = useRef('');
    const actionName = useRef('');
    const handleDialogOpen = (info, invoiceNo, dueDate) => {
        editPaymentInfo.current = info;
        invoiceNoEdit.current = invoiceNo;
        dueDateEdit.current = dueDate;
        setIsDialogOpen(true);
        actionName.current = 'paymented';
    };
    const handleDialogClose = () => {
        editPaymentInfo.current = [];
        invoiceNoEdit.current = '';
        setIsDialogOpen(false);
        actionName.current = '';
    };
    return (
        <>
            <PaymentWork
                isDialogOpen={isDialogOpen}
                handleDialogClose={handleDialogClose}
                editPaymentInfo={editPaymentInfo.current}
                actionName={actionName.current}
                invoiceNo={invoiceNoEdit.current}
                dueDate={dueDateEdit.current}
            />
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">發票號碼</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">發票到期日</StyledTableCell>
                            <StyledTableCell align="center">總金額</StyledTableCell>
                            <StyledTableCell align="center">累計實收金額</StyledTableCell>
                            <StyledTableCell align="center">累計實付金額</StyledTableCell>
                            {/* <StyledTableCell align="center">摘要說明</StyledTableCell> */}
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listInfo?.map((row, id) => {
                            row.PayAmount = 0;
                            row.BillDetailList.forEach((i) => {
                                row.PayAmount = row.PayAmount + (i.PayAmount ? i.PayAmount : 0);
                            });

                            return (
                                <TableRow
                                    key={row?.InvoiceWKMaster?.WKMasterID + row?.InvoiceWKMaster?.InvoiceNo}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
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
                                    {/* <StyledTableCell align="center">
                                        <StyledTableCell align="center">{row?.Note}</StyledTableCell>
                                    </StyledTableCell> */}
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
                                                檢視
                                            </Button>
                                        </Box>
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

export default PaymentedDataList;
