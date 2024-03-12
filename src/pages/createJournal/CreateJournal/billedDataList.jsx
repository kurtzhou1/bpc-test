import { useState, useRef } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
// material-ui
import {
    Typography,
    Button,
    Table,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';

import {
    journaryDetailView,
    journaryMasterView,
    updateInvoice,
    updateInvoiceMaster,
} from 'components/apis.jsx';

const BilledDataList = ({ listInfo, apiQuery }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [toBillDataInfo, setToBillDataInfo] = useState([]); //發票明細檔
    const totalAmount = useRef(0);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: theme.palette.common.gary,
            color: theme.palette.common.black,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem',
        },
    }));

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const billDataView = (WKMasterID) => {
        let tmpQuery = '/' + 'WKMasterID=' + WKMasterID;
        let tmpQueryDetail = journaryDetailView + tmpQuery;
        let tmpQueryMaster = journaryMasterView + tmpQuery;
        fetch(tmpQueryMaster, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                totalAmount.current = data[0].TotalAmount;
                fetch(tmpQueryDetail, { method: 'GET' })
                    .then((res) => res.json())
                    .then((data2) => {
                        setToBillDataInfo(data2);
                        setIsDialogOpen(true);
                    })
                    .catch((e) => console.log('e1=>', e));
            })
            .catch((e) => console.log('e1=>', e));
    };

    const billDataViewInvalid = (WKMasterID) => {
        let tmpArray = {
            WKMasterID: WKMasterID,
            Status: 'INVALID',
        };
        fetch(updateInvoice, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then(() => {
                console.log('updateInvoice invalid success');
            })
            .catch((e) => console.log('e1=>', e));
        fetch(updateInvoiceMaster, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then(() => {
                console.log('updateInvoiceMaster invalid success');
                alert('作廢成功');
            })
            .catch((e) => console.log('e1=>', e));
        apiQuery();
    };

    return (
        <>
            <Dialog maxWidth="xl" fullWidth open={isDialogOpen}>
                <BootstrapDialogTitle>立帳作業</BootstrapDialogTitle>
                <DialogContent>
                    <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                        <Table sx={{ minWidth: 300 }} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">費用項目</StyledTableCell>
                                    <StyledTableCell align="center">費用金額</StyledTableCell>
                                    <StyledTableCell align="center">會員</StyledTableCell>
                                    <StyledTableCell align="center">攤分比例</StyledTableCell>
                                    <StyledTableCell align="center">攤分後金額</StyledTableCell>
                                    {/* haha預付稅款 */}
                                    <StyledTableCell align="center">預付稅款</StyledTableCell>
                                    <StyledTableCell align="center">調整尾差值</StyledTableCell>
                                    <StyledTableCell align="center">總費用金額</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {toBillDataInfo?.map((row, id) => {
                                    let afterDiff = row.FeeAmountPost + row.Difference;
                                    return (
                                        <TableRow
                                            key={row.PartyName + row.LBRatio + id}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                            }}
                                        >
                                            <TableCell align="center">{row.FeeItem}</TableCell>
                                            <TableCell align="center">{`$${handleNumber(
                                                row.FeeAmountPre,
                                            )}`}</TableCell>
                                            <TableCell align="center">{row.PartyName}</TableCell>
                                            <TableCell align="center">{`${row.LBRatio}%`}</TableCell>
                                            <TableCell align="center">{`$${handleNumber(
                                                row.FeeAmountPost,
                                            )}`}</TableCell>
                                            <TableCell align="center">0</TableCell>
                                            <TableCell align="center">{`$${row.Difference}`}</TableCell>
                                            <TableCell align="center">{`$${handleNumber(
                                                afterDiff.toFixed(2),
                                            )}`}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <DialogContentText sx={{ fontSize: '20px', mt: '0.5rem' }}>
                        發票總金額：${handleNumber(totalAmount.current)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                        關閉
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">發票號碼</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">合約種類</StyledTableCell>
                            <StyledTableCell align="center">發票日期</StyledTableCell>
                            <StyledTableCell align="center">明細數量</StyledTableCell>
                            <StyledTableCell align="center">總金額</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listInfo?.map((row, id) => {
                            return (
                                <TableRow
                                    key={id + row?.InvoiceWKMaster?.InvoiceNo + id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
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
                                        {dayjs(row?.InvoiceWKMaster.IssueDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.InvoiceWKDetail.length}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {handleNumber(row?.InvoiceWKMaster.TotalAmount)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                '& button': {
                                                    mx: { sm: 0.3, md: 0.3, lg: 0.6, xl: 1.5 },
                                                    p: 0,
                                                },
                                            }}
                                        >
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                onClick={() => {
                                                    billDataView(row.InvoiceWKMaster.WKMasterID);
                                                }}
                                            >
                                                檢視
                                            </Button>
                                            <Button
                                                color="error"
                                                variant="outlined"
                                                onClick={() => {
                                                    billDataViewInvalid(
                                                        row.InvoiceWKMaster.WKMasterID,
                                                    );
                                                }}
                                            >
                                                作廢
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

export default BilledDataList;
