import { useState, useRef } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
// material-ui
import { Button, Table, Dialog, DialogContent, DialogActions, Box } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';

import {
    journalDetailView,
    journalMasterView,
    updateInvoice,
    updateInvoiceMaster,
} from 'components/apis.jsx';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

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
    [`&.${tableCellClasses.body}.totalAmount`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        backgroundColor: '#CFD8DC',
    },
}));

const BilledDataList = ({ listInfo, apiQuery }) => {
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [toBillDataInfo, setToBillDataInfo] = useState([]); //發票明細檔
    const totalAmount = useRef(0);
    let differAmount = useRef(0); //尾差值總和
    let feeAmountPostAmount = useRef(0); //攤分後金額總合

    const infoInit = () => {
        differAmount.current = 0;
        feeAmountPostAmount.current = 0;
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        infoInit();
    };

    const billDataView = (WKMasterID) => {
        let tmpQuery = '/WKMasterID=' + WKMasterID;
        let tmpQueryDetail = journalDetailView + tmpQuery;
        let tmpQueryMaster = journalMasterView + tmpQuery;
        fetch(tmpQueryMaster, {
            method: 'GET',
            Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('data1=>>', data);
                totalAmount.current = data[0].TotalAmount;
                fetch(tmpQueryDetail, {
                    method: 'GET',
                    Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
                })
                    .then((res) => res.json())
                    .then((data2) => {
                        console.log('data2=>>', data2);
                        let tmpDifferAmount = 0;
                        const reduceArray = Object.values(
                            data2.reduce((acc, item) => {
                                const keyName = item.PartyName;
                                if (!acc[keyName]) {
                                    acc[keyName] = [];
                                }
                                acc[keyName].push(item);
                                return acc;
                            }, []),
                        );
                        data2.forEach((i) => {
                            tmpDifferAmount = tmpDifferAmount + i.Difference;
                        });
                        differAmount.current = tmpDifferAmount;
                        setToBillDataInfo(reduceArray);
                        setIsDialogOpen(true);
                    })
                    .catch(() => {
                        setToBillDataInfo([]);
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

    const billDataViewInvalid = (WKMasterID) => {
        let tmpArray = {
            WKMasterID: WKMasterID,
            Status: 'INVALID',
        };
        fetch(updateInvoice, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
            },
            body: JSON.stringify(tmpArray),
        })
            .then((res) => res.json())
            .then(() => {
                console.log('updateInvoice invalid success');
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
        fetch(updateInvoiceMaster, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
            },
            body: JSON.stringify(tmpArray),
        })
            .then((res) => res.json())
            .then(() => {
                dispatch(
                    setMessageStateOpen({
                        messageStateOpen: {
                            isOpen: true,
                            severity: 'success',
                            message: '作廢成功',
                        },
                    }),
                );
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
        apiQuery();
    };

    return (
        <>
            <Dialog maxWidth="xl" fullWidth open={isDialogOpen}>
                <BootstrapDialogTitle>立帳作業</BootstrapDialogTitle>
                <DialogContent>
                    <TableContainer component={Paper} sx={{ maxHeight: window.screen.height }}>
                        <Table sx={{ minWidth: 300 }} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">No</StyledTableCell>
                                    <StyledTableCell align="center">費用項目</StyledTableCell>
                                    <StyledTableCell align="center">費用金額</StyledTableCell>
                                    <StyledTableCell align="center">會員</StyledTableCell>
                                    <StyledTableCell align="center">攤分比例</StyledTableCell>
                                    <StyledTableCell align="center">攤分後金額</StyledTableCell>
                                    <StyledTableCell align="center">預付稅款</StyledTableCell>
                                    <StyledTableCell align="center">調整尾差值</StyledTableCell>
                                    <StyledTableCell align="center">總費用金額</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {toBillDataInfo.map((rowFirst, idFirst) => {
                                    return rowFirst.map((rowSecond, idSecond) => {
                                        let afterDiff =
                                            rowSecond.FeeAmountPost +
                                            rowSecond.Difference -
                                            rowSecond.WHTAmount;
                                        return (
                                            <TableRow
                                                key={
                                                    rowSecond.PartyName +
                                                    rowSecond.LBRatio +
                                                    idFirst +
                                                    idSecond
                                                }
                                                sx={{
                                                    '&:last-child td, &:last-child th': {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        borderTop:
                                                            idFirst !== 0 && idSecond === 0
                                                                ? '0.5px solid black'
                                                                : null,
                                                    }}
                                                >
                                                    {(idFirst + 1) * rowFirst.length -
                                                        (rowFirst.length - idSecond - 1)}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        borderTop:
                                                            idFirst !== 0 && idSecond === 0
                                                                ? '0.5px solid black'
                                                                : null,
                                                    }}
                                                >
                                                    {rowSecond.FeeItem}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        borderTop:
                                                            idFirst !== 0 && idSecond === 0
                                                                ? '0.5px solid black'
                                                                : null,
                                                    }}
                                                >
                                                    ${handleNumber(rowSecond.FeeAmountPre)}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        borderTop:
                                                            idFirst !== 0 && idSecond === 0
                                                                ? '0.5px solid black'
                                                                : null,
                                                    }}
                                                >
                                                    {rowSecond.PartyName}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        borderTop:
                                                            idFirst !== 0 && idSecond === 0
                                                                ? '0.5px solid black'
                                                                : null,
                                                    }}
                                                >
                                                    {rowSecond.LBRatio}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        borderTop:
                                                            idFirst !== 0 && idSecond === 0
                                                                ? '0.5px solid black'
                                                                : null,
                                                    }}
                                                >
                                                    ${handleNumber(rowSecond.FeeAmountPost)}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        borderTop:
                                                            idFirst !== 0 && idSecond === 0
                                                                ? '0.5px solid black'
                                                                : null,
                                                    }}
                                                >
                                                    {rowSecond.WHTAmount}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        borderTop:
                                                            idFirst !== 0 && idSecond === 0
                                                                ? '0.5px solid black'
                                                                : null,
                                                    }}
                                                >
                                                    ${rowSecond.Difference}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        borderTop:
                                                            idFirst !== 0 && idSecond === 0
                                                                ? '0.5px solid black'
                                                                : null,
                                                    }}
                                                >
                                                    ${handleNumber(afterDiff.toFixed(2))}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    });
                                })}
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                                    <StyledTableCell className="totalAmount" align="center">
                                        {handleNumber(totalAmount.current.toFixed(2))}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        className="totalAmount"
                                        align="center"
                                    ></StyledTableCell>
                                    <StyledTableCell className="totalAmount" align="center">
                                        {handleNumber(differAmount.current.toFixed(2))}
                                    </StyledTableCell>
                                    <StyledTableCell className="totalAmount" align="center">
                                        {handleNumber(differAmount.current.toFixed(2))}
                                    </StyledTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <DialogContentText sx={{ fontSize: '20px', mt: '0.5rem' }}>
                        發票總金額：${handleNumber(totalAmount.current)}
                    </DialogContentText> */}
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
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">發票日期</StyledTableCell>
                            <StyledTableCell align="center">明細數量</StyledTableCell>
                            <StyledTableCell align="center">原始金額</StyledTableCell>
                            <StyledTableCell align="center">換匯後金額</StyledTableCell>
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
                                        {handleNumber(row.InvoiceWKMaster.TotalAmount)}{' '}
                                        {row.InvoiceWKMaster.Code}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {handleNumber(row.InvoiceWKMaster.ExgTotalAmount)}{' '}
                                        {row.InvoiceWKMaster.ToCode}
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
