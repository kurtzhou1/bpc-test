import { useState, useRef, useEffect } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
import { queryCB, sendDuctInfo } from 'components/apis';
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
    TextField
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

// redux

const fakeData = [
    {
        CBID: 1,
        BLDetailID: 1,
        WorkTitle: 'test123',
        InvoiceNo: 'test123',
        PartyName: 'CHT',
        LastUpdDate: '2023-03-01 00:00:00',
        SubmarineCable: 'test123',
        CBType: 'test123',
        BillingNo: 'test123',
        BillMilestone: 'test123',
        CurrAmount: 3333.14,
        CreateDate: '2023-03-0100:00:00',
        Note: 'test123'
    },
    {
        CBID: 2,
        BLDetailID: 2,
        WorkTitle: 'test456',
        InvoiceNo: 'test456',
        PartyName: 'CHT',
        LastUpdDate: '2023-03-02 00:00:00',
        SubmarineCable: 'test456',
        CBType: 'test456',
        BillingNo: 'test456',
        BillMilestone: 'test456',
        CurrAmount: 3.14,
        CreateDate: '2023-03-0100:00:00',
        Note: 'test456'
    }
];

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

const DeductedWork = ({ isDeductedWorkOpen, handleDeductedClose, billDetailInfo }) => {
    let feeAmount = useRef(0); // 總費用金額加總(上)
    let dedAmount = useRef(0); //總折抵資料加總(上)
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        let tmpCBArray = [];
        let tmpData = billDetailInfo.map((i) => i);
        if (isDeductedWorkOpen) {
            tmpData.forEach((row1, id) => {
                console.log('row1=>>', row1);
                tmpCBArray = [];
                feeAmount.current = feeAmount.current + row1.BillDetail.FeeAmount;
                dedAmount.current = dedAmount.current + row1.BillDetail.DedAmount;
                row1.CB.forEach((row2) => {
                    tmpCBArray.push(row2.CBType);
                });
                tmpData[id].CBTYPE = tmpCBArray.join('、');
            });
            setDataList(tmpData);
        }
    }, [billDetailInfo, isDeductedWorkOpen]);

    return (
        <Dialog onClose={handleDeductedClose} maxWidth="sm" open={isDeductedWorkOpen}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDeductedClose}>
                檢視已折抵帳單
            </BootstrapDialogTitle>
            <DialogContent>
                <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 10 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">NO</StyledTableCell>
                                        <StyledTableCell align="center">費用項目</StyledTableCell>
                                        <StyledTableCell align="center">折抵CB</StyledTableCell>
                                        <StyledTableCell align="center">折抵金額</StyledTableCell>
                                        <StyledTableCell align="center">總金額</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataList.map((row, id) => {
                                        return (
                                            <TableRow
                                                // key={row.BillDetailID + row?.BillMasterID}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{id + 1}</TableCell>
                                                <TableCell align="center">{row.BillDetail.FeeItem}</TableCell>
                                                <TableCell align="center">{row.CBTYPE}</TableCell>
                                                <TableCell align="center">{`$${handleNumber(
                                                    row.BillDetail.DedAmount.toFixed(2)
                                                )}`}</TableCell>
                                                <TableCell align="center">{`$${handleNumber(
                                                    row.BillDetail.FeeAmount.toFixed(2)
                                                )}`}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <StyledTableCell className="totalAmount" align="center">
                                            Total
                                        </StyledTableCell>
                                        <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                        <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                        <StyledTableCell className="totalAmount" align="center">{`$${handleNumber(
                                            dedAmount.current.toFixed(2)
                                        )}`}</StyledTableCell>
                                        <StyledTableCell className="totalAmount" align="center">{`$${handleNumber(
                                            feeAmount.current.toFixed(2)
                                        )}`}</StyledTableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                {/* <DialogContentText sx={{ fontSize: '20px', mt: '0.5rem' }}>總金額：${handleNumber(totalAmount)}</DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleDeductedClose();
                    }}
                >
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeductedWork;
