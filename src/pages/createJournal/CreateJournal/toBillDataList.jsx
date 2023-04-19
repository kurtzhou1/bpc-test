import { useState, useRef } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
// material-ui
import { Typography, Button, Table, Dialog, DialogContent, DialogContentText, DialogActions, TextField, Box } from '@mui/material';
import { TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';

import { toBillDataapi, sendJounary } from 'components/apis.jsx';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const ToBillDataList = ({ listInfo, apiQuery }) => {
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const toBillDataMain = useRef();
    const [toBillDataInfo, setToBillDataInfo] = useState([]); //發票明細檔
    const [totalAmount, setTotalAmount] = useState(0); //發票總金額
    const [currentAmount, setCurrentAmount] = useState(0); //目前金額
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

    //立帳作業
    const toBillData = (wKMasterID) => {
        let tmpQuery = '/' + 'WKMasterID=' + wKMasterID;
        tmpQuery = toBillDataapi + tmpQuery;
        console.log('tmpQuery=>>', tmpQuery);
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('data=>>', data, Array.isArray(data.InvoiceDetail), Array.isArray(data.InvoiceMaster));
                let tmpAmount = 0;
                if (Array.isArray(data.InvoiceDetail) && Array.isArray(data.InvoiceMaster)) {
                    toBillDataMain.current = data.InvoiceMaster;
                    setToBillDataInfo(data.InvoiceDetail);
                    setTotalAmount(data.TotalAmount);
                    data.InvoiceDetail.forEach((i) => {
                        tmpAmount = tmpAmount + i.FeeAmountPost + i.Difference;
                    });
                    setCurrentAmount(tmpAmount.toFixed(2));
                    setIsDialogOpen(true);
                } else {
                    toBillDataMain.current = [];
                    setToBillDataInfo([]);
                    setTotalAmount(0);
                    setCurrentAmount(0);
                    dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'info', message: '沒有攤分資料' } }));
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    const changeDiff = (diff, id) => {
        let tmpArray = toBillDataInfo.map((i) => i);
        let tmpAmount = 0;
        tmpArray[id].Difference = Number(diff);
        tmpArray.forEach((i) => {
            tmpAmount = tmpAmount + i.FeeAmountPost + i.Difference;
        });
        setToBillDataInfo(tmpArray);
        setCurrentAmount(tmpAmount.toFixed(2));
    };

    // 送出立帳(新增)
    const sendJounaryInfo = () => {
        if (Number(totalAmount).toFixed(2) === Number(currentAmount).toFixed(2)) {
            let tmpArray = toBillDataMain.current.map((i) => i);
            tmpArray.forEach((i) => {
                delete i.InvMasterID;
            });
            let tmpData = {
                TotalAmount: totalAmount,
                InvoiceMaster: tmpArray,
                InvoiceDetail: toBillDataInfo
            };
            fetch(sendJounary, { method: 'POST', body: JSON.stringify(tmpData) })
                .then((res) => res.json())
                .then((data) => {
                    alert('送出立帳成功');
                    apiQuery();
                    handleDialogClose();
                })
                .catch((e) => console.log('e1=>', e));
        } else {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '目前金額不等於發票總金額' } }));
        }
    };

    return (
        <>
            <Dialog
                //  onClose={handleDialogClose}
                maxWidth="lg"
                fullWidth
                open={isDialogOpen}
            >
                <BootstrapDialogTitle
                // onClose={handleDialogClose}
                >
                    立帳作業
                </BootstrapDialogTitle>
                <DialogContent>
                    <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
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
                                {toBillDataInfo.map((row, id) => {
                                    let afterDiff = row.FeeAmountPost + row.Difference;
                                    return (
                                        <TableRow
                                            key={row.FeeAmountPre + row?.PartyName + row?.LBRatio}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{row.FeeItem}</TableCell>
                                            <TableCell align="center">{`$${handleNumber(row.FeeAmountPre)}`}</TableCell>
                                            <TableCell align="center">{row.PartyName}</TableCell>
                                            <TableCell align="center">{`${row.LBRatio}%`}</TableCell>
                                            <TableCell align="center">{`$${handleNumber(row.FeeAmountPost)}`}</TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    label="$"
                                                    size="small"
                                                    type="number"
                                                    style={{ width: '30%' }}
                                                    onChange={(e) => {
                                                        changeDiff(e.target.value, id);
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">{`$${handleNumber(afterDiff.toFixed(2))}`}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <DialogContentText sx={{ fontSize: '20px', mt: '0.5rem' }}>發票總金額：${handleNumber(totalAmount)}</DialogContentText>
                    <DialogContentText sx={{ fontSize: '20px', color: '#CC0000' }}>
                        目前金額：${handleNumber(currentAmount)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={sendJounaryInfo}>
                        新增
                    </Button>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">工作主檔ID</StyledTableCell>
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
                                    key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo}
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
                                    <StyledTableCell align="center">{handleNumber(row.InvoiceWKMaster.TotalAmount)}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                '& button': { mx: { sm: 0.3, md: 0.3, lg: 0.6, xl: 1.5 }, p: 0, fontSize: 1 }
                                            }}
                                        >
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                onClick={() => {
                                                    toBillData(row.InvoiceWKMaster.WKMasterID);
                                                }}
                                            >
                                                立帳作業
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

export default ToBillDataList;
