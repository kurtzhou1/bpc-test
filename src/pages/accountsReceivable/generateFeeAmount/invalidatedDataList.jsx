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
    Grid,
    FormControl,
    InputLabel,
    Select,
    Box,
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

import dayjs from 'dayjs';

import { toBillDataapi, sendJounary } from 'components/apis.jsx';

const InvalidatedDataList = ({ dataList }) => {
    const deductInfo = useRef({});
    const actionName = useRef('');
    const [isDialogOpen, setIsDialogOpen] = useState(false); //檢視
    const [infoTerminal, setInfoTerminal] = useState(false); //作廢
    const [uploadOpen, setUploadOpen] = useState(false); //上傳
    const [toBillDataMain, setToBillDataMain] = useState(); //發票主檔
    const [toBillDataInfo, setToBillDataInfo] = useState(); //發票明細檔
    const [totalAmount, setTotalAmount] = useState(); //發票總金額
    const [currentAmount, setCurrentAmount] = useState(''); //目前金額
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: theme.palette.common.gary,
            color: theme.palette.common.black,
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

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleDialogOpen = (action, info) => {
        deductInfo.current = info;
        actionName.current = action;
        setIsDialogOpen(true);
    };

    // //立帳作業
    // const toBillData = (wKMasterID) => {
    //     console.log('立帳作業wKMasterID=>>', wKMasterID);
    //     let tmpQuery = '/' + 'WKMasterID=' + wKMasterID;
    //     tmpQuery = toBillDataapi + tmpQuery;
    //     console.log('tmpQuery=>>', tmpQuery);
    //     fetch(tmpQuery, { method: 'GET' })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log('立帳成功=>>', data);
    //             let tmpAmount = 0;
    //             if (Array.isArray(data)) {
    //                 toBillDataMain.current = data ? data.InvoiceMaster : [];
    //                 setToBillDataInfo(data ? data.InvoiceDetail : []);
    //                 setTotalAmount(data ? data.TotalAmount : 0);
    //                 data.InvoiceDetail.forEach((i) => {
    //                     tmpAmount = tmpAmount + i.FeeAmountPost + i.Difference;
    //                 });
    //                 setCurrentAmount(tmpAmount.toFixed(2));
    //             }
    //         })
    //         .catch((e) => console.log('e1=>', e));
    //     setIsDialogOpen(true);
    // };

    // const changeDiff = (diff, id) => {
    //     let tmpArray = toBillDataInfo.map((i) => i);
    //     let tmpAmount = 0;
    //     tmpArray[id].Difference = Number(diff);
    //     tmpArray.forEach((i) => {
    //         tmpAmount = tmpAmount + i.FeeAmountPost + i.Difference;
    //     });
    //     setToBillDataInfo(tmpArray);
    //     setCurrentAmount(tmpAmount.toFixed(2));
    // };

    // // 送出立帳(新增)
    // const sendJounaryInfo = () => {
    //     let tmpArray = toBillDataMain.current.map((i) => i);
    //     tmpArray.forEach((i) => {
    //         delete i.InvMasterID;
    //     });
    //     let tmpData = {
    //         TotalAmount: totalAmount,
    //         InvoiceMaster: tmpArray,
    //         InvoiceDetail: toBillDataInfo
    //     };
    //     fetch(sendJounary, { method: 'POST', body: JSON.stringify(tmpData) })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log('立帳成功=>>', data);
    //             apiQuery();
    //             handleDialogClose();
    //         })
    //         .catch((e) => console.log('e1=>', e));
    // };

    return (
        <>
            <Dialog onClose={handleDialogClose} maxWidth="lg" fullWidth open={isDialogOpen}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                    立帳作業
                </BootstrapDialogTitle>
                <DialogContent>
                    <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                        <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center">NO</StyledTableCell>
                                    <StyledTableCell align="center">會員</StyledTableCell>
                                    <StyledTableCell align="center">海纜名稱</StyledTableCell>
                                    <StyledTableCell align="center">海纜作業</StyledTableCell>
                                    <StyledTableCell align="center">發票代碼</StyledTableCell>
                                    <StyledTableCell align="center">供應商</StyledTableCell>
                                    <StyledTableCell align="center">合約種類</StyledTableCell>
                                    <StyledTableCell align="center">發票日期</StyledTableCell>
                                    <StyledTableCell align="center">明細數量</StyledTableCell>
                                    <StyledTableCell align="center">總價</StyledTableCell>
                                    <StyledTableCell align="center">處理狀態</StyledTableCell>
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
                                                    // value={diffNumber}
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
                    {/* <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={sendJounaryInfo}>
                        新增
                    </Button> */}
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
                            <StyledTableCell align="center">會員</StyledTableCell>
                            <StyledTableCell align="center">發票代碼</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">合約種類</StyledTableCell>
                            <StyledTableCell align="center">發票日期</StyledTableCell>
                            <StyledTableCell align="center">明細數量</StyledTableCell>
                            <StyledTableCell align="center">總價</StyledTableCell>
                            {/* <StyledTableCell align="center">處理狀態</Styled。TableCell> */}
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {toBillDataInfo?.map((row, id) => {
                            console.log('row=>>', row);
                            return (
                                <TableRow
                                    key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.PartyName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceNo}</StyledTableCell>
                                    <StyledTableCell align="center">{row.SupplierName}</StyledTableCell>
                                    <StyledTableCell align="center">{dayjs(row.IssueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                    <StyledTableCell align="center">{toBillDataInfo.length}</StyledTableCell>
                                    <StyledTableCell align="center">{row.TotalAmount}</StyledTableCell>
                                    {/* <StyledTableCell align="center">{row.Status}</StyledTableCell> */}
                                    <StyledTableCell align="center">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                '& button': { mx: { sm: 0.3, md: 0.3, lg: 0.6, xl: 1.5 }, p: 0, fontSize: 1 }
                                            }}
                                        >
                                            <Button
                                                color="success"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDialogOpen('viewDeducted', {
                                                        PartyName: row.PartyName,
                                                        IssueDate: dayjs(row.IssueDate).format('YYYY/MM/DD'),
                                                        SubmarineCable: row.SubmarineCable,
                                                        WorkTitle: row.WorkTitle
                                                    });
                                                }}
                                            >
                                                檢視
                                            </Button>
                                            <Button
                                                color="error"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    setInfoTerminal(true);
                                                }}
                                            >
                                                作廢
                                            </Button>
                                            <Button
                                                color="warning"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    setInfoTerminal(true);
                                                }}
                                            >
                                                退回
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

export default InvalidatedDataList;
