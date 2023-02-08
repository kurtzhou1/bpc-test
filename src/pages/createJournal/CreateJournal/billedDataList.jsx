import { useState } from 'react';

// project import

// material-ui
import {
    Typography,
    Button,
    Table,
    Dialog,
    DialogContent,
    Grid,
    FormControl,
    InputLabel,
    Select,
    DialogContentText,
    DialogActions
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';

const BilledDataList = ({ listInfo, BootstrapDialogTitle }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [toBillDataInfo, setToBillDataInfo] = useState(fakeData.InvoiceDetail); //發票明細檔
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

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const billDataView = (wKMasterID) => {
        console.log('wKMasterID=>>', wKMasterID);
        // let tmpQuery = '/' + 'WKMasterID=' + wKMasterID;
        // tmpQuery = toBillDataapi + tmpQuery;
        // fetch(tmpQuery, { method: 'GET' })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log('立帳成功=>>', data);
        //         let tmpAmount = 0;
        //         toBillDataMain.current = data.InvoiceMaster;
        //         setToBillDataInfo(data.InvoiceDetail);
        //         setTotalAmount(data.TotalAmount);
        //         data.InvoiceDetail.forEach((i) => {
        //             tmpAmount = tmpAmount + i.FeeAmountPost + i.Difference;
        //         });
        //         setCurrentAmount(tmpAmount.toFixed(2));
        //     })
        //     .catch((e) => console.log('e1=>>', e));
        setIsDialogOpen(true);
    };

    console.log('isDialogOpen=>>', isDialogOpen);

    return (
        <>
            <Dialog onClose={handleDialogClose} maxWidth="lg" fullWidth open={isDialogOpen}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                    立帳作業
                </BootstrapDialogTitle>
                <DialogContent>
                    <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
                        <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">費用項目</StyledTableCell>
                                    <StyledTableCell align="center">費用金額</StyledTableCell>
                                    <StyledTableCell align="center">會員</StyledTableCell>
                                    <StyledTableCell align="center">攤分比例</StyledTableCell>
                                    <StyledTableCell align="center">攤分後金額</StyledTableCell>
                                    <StyledTableCell align="center">調整尾差值</StyledTableCell>
                                    <StyledTableCell align="center">總費用金額</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {toBillDataInfo.map((row, id) => {
                                    let afterDiff = row.FeeAmountPost + row.Difference;
                                    return (
                                        <TableRow
                                            // key={row?.WKMasterID + row?.InvoiceNo}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">1</TableCell>
                                            <TableCell align="center">{`$${row.FeeAmountPre}`}</TableCell>
                                            <TableCell align="center">{row.PartyName}</TableCell>
                                            <TableCell align="center">{`${row.LBRatio}%`}</TableCell>
                                            <TableCell align="center">{`$${row.FeeAmountPost}`}</TableCell>
                                            <TableCell align="center">{`$${row.Difference}`}</TableCell>
                                            <TableCell align="center">{`$${afterDiff.toFixed(2)}`}</TableCell>
                                        </TableRow>
                                    );
                                })} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <DialogContentText sx={{ fontSize: '20px', mt: '0.5rem' }}>發票總金額：${totalAmount}</DialogContentText>
                    <DialogContentText sx={{ fontSize: '20px', color: '#CC0000' }}>目前金額：${currentAmount}</DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    {/* <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={sendJounaryInfo}>
                        新增
                    </Button> */}
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">工作主檔ID</StyledTableCell>
                            <StyledTableCell align="center">發票代碼</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">合約種類</StyledTableCell>
                            <StyledTableCell align="center">發票日期</StyledTableCell>
                            <StyledTableCell align="center">明細數量</StyledTableCell>
                            <StyledTableCell align="center">總價</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listInfo?.map((row, id) => {
                            return (
                                <TableRow
                                    // key={row.InvoiceWKMaster?.invoiceNo + row.InvoiceWKMaster?.supplierName + id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.WKMasterID}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.InvoiceNo}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.SupplierName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {dayjs(row.InvoiceWKMaster.IssueDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKDetail.length}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.TotalAmount}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button
                                            color="primary"
                                            onClick={() => {
                                                billDataView(row.InvoiceWKMaster.WKMasterID);
                                            }}
                                        >
                                            檢視
                                        </Button>
                                        <Button
                                            color="error"
                                            onClick={() => {
                                                toBillData(row.InvoiceWKMaster.WKMasterID);
                                            }}
                                        >
                                            作廢
                                        </Button>
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
