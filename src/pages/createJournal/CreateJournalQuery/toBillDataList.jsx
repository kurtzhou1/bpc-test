import { useState, useRef } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
// material-ui
import {
    Button,
    Table,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    TableFooter,
    Box,
    TablePagination,
} from '@mui/material';
import { TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';

import { journalDetailView, journalMasterView } from 'components/apis.jsx';

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

const ToBillDataList = ({ listInfo, page, setPage }) => {
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [toBillDataInfo, setToBillDataInfo] = useState([]); //發票明細檔
    const totalAmount = useRef(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listInfo.length) : 0;
    let codeType = useRef(''); //幣別
    let differAmount = useRef(0); //尾差值總和
    let afterDiffAmount = useRef(0); //總費用金額總和

    const infoInit = () => {
        differAmount.current = 0;
        afterDiffAmount.current = 0;
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        infoInit();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //立帳作業檢視
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
                totalAmount.current = data[0].TotalAmount;
                fetch(tmpQueryDetail, {
                    method: 'GET',
                    Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
                })
                    .then((res) => res.json())
                    .then((data2) => {
                        let tmpDifferAmount = 0;
                        let tmpAfterDiffAmount = 0;
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
                            tmpAfterDiffAmount =
                                tmpAfterDiffAmount + (i.FeeAmountPost + i.Difference - i.WHTAmount);
                            codeType.current = i.ToCode;
                        });
                        afterDiffAmount.current = tmpAfterDiffAmount;
                        differAmount.current = tmpDifferAmount;
                        setToBillDataInfo(reduceArray);
                        setIsDialogOpen(true);
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

    return (
        <>
            <Dialog maxWidth="xl" fullWidth open={isDialogOpen}>
                <BootstrapDialogTitle>立帳作業</BootstrapDialogTitle>
                <Box display="flex" justifyContent="end" sx={{ marginRight: '2rem' }}>
                    幣別：{codeType.current}
                </Box>
                <DialogContent>
                    <TableContainer
                        component={Paper}
                        sx={{ maxHeight: window.screen.height * 0.45 }}
                    >
                        <Table sx={{ minWidth: 300 }} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">No</StyledTableCell>
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
                                {toBillDataInfo.map((rowFirst, idFirst) => {
                                    return rowFirst.map((rowSecond, idSecond) => {
                                        let afterDiff =
                                            rowSecond.FeeAmountPost + rowSecond.Difference;
                                        return (
                                            <TableRow
                                                key={rowSecond?.FeeItem + idFirst + idSecond}
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
                                                >{`$${handleNumber(
                                                    rowSecond.FeeAmountPre,
                                                )}`}</TableCell>
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
                                                >{`${rowSecond.LBRatio}%`}</TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        borderTop:
                                                            idFirst !== 0 && idSecond === 0
                                                                ? '0.5px solid black'
                                                                : null,
                                                    }}
                                                >{`$${handleNumber(
                                                    rowSecond.FeeAmountPost,
                                                )}`}</TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        borderTop:
                                                            idFirst !== 0 && idSecond === 0
                                                                ? '0.5px solid black'
                                                                : null,
                                                    }}
                                                >{`$${rowSecond.Difference}`}</TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        borderTop:
                                                            idFirst !== 0 && idSecond === 0
                                                                ? '0.5px solid black'
                                                                : null,
                                                    }}
                                                >{`$${handleNumber(
                                                    afterDiff.toFixed(2),
                                                )}`}</TableCell>
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
                                    <StyledTableCell className="totalAmount" align="center">
                                        {handleNumber(differAmount.current.toFixed(2))}
                                    </StyledTableCell>
                                    <StyledTableCell className="totalAmount" align="center">
                                        {handleNumber(afterDiffAmount.current.toFixed(2))}
                                    </StyledTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <DialogContentText sx={{ fontSize: '20px', mt: '0.5rem' }}>
                        發票總金額：${handleNumber(totalAmount.current)}
                    </DialogContentText> */}
                </DialogContent>
                <Box display="flex" justifyContent="end" sx={{ marginRight: '2rem' }}>
                    幣別：{codeType.current}
                </Box>
                <DialogActions>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                        關閉
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ maxHeight: window.screen.height * 0.4 }}>
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
                            <StyledTableCell align="center">狀態</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? listInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : listInfo
                        )?.map((row, id) => {
                            return (
                                <TableRow
                                    key={row.InvoiceWKMaster?.WKMasterID + id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.InvoiceWKMaster.InvoiceNo}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.InvoiceWKMaster.SupplierName}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.InvoiceWKMaster.SubmarineCable}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.InvoiceWKMaster.WorkTitle}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {dayjs(row?.InvoiceWKMaster.IssueDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.InvoiceWKDetail?.length}
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
                                        {row?.InvoiceWKMaster.Status === 'VALIDATED'
                                            ? '待立帳'
                                            : row?.InvoiceWKMaster.Status === 'BILLED'
                                            ? '已立帳'
                                            : row?.InvoiceWKMaster.Status === 'TEMPORARY'
                                            ? '暫存'
                                            : row?.InvoiceWKMaster.Status === 'INVALID'
                                            ? '已作廢'
                                            : row?.InvoiceWKMaster.Status === 'COMPLETE'
                                            ? '已結案'
                                            : row?.InvoiceWKMaster.Status === 'PAYING'
                                            ? '付款中'
                                            : row?.InvoiceWKMaster.Status}
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
                                                color="success"
                                                variant="outlined"
                                                onClick={() => {
                                                    billDataView(row.InvoiceWKMaster.WKMasterID);
                                                }}
                                            >
                                                檢視
                                            </Button>
                                        </Box>
                                    </StyledTableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 30 * emptyRows }}>
                                <StyledTableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 15, 20, { label: 'All', value: -1 }]}
                                colSpan={12}
                                count={listInfo.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};

export default ToBillDataList;
