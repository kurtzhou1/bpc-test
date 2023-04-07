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
    Box,
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

import dayjs from 'dayjs';

import { updateBM } from 'components/apis.jsx';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const SignedDataList = ({ dataList }) => {
    const deductInfo = useRef({});
    const dispatch = useDispatch();
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

    const toWriteOff = (billMasterID) => {
        let tmpData = {
            BillMasterID: billMasterID,
            Ststus: 'TO_WRITEOFF'
        };
        fetch(sendJounary, { method: 'POST', body: JSON.stringify(tmpData) })
            .then((res) => res.json())
            .then((data) => {
                console.log('立帳成功=>>', data);
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '進待銷帳成功' } }));
            })
            .catch((e) => console.log('e1=>', e));
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleDialogOpen = (action, info) => {
        deductInfo.current = info;
        actionName.current = action;
        setIsDialogOpen(true);
    };

    console.log('dataList=>>', dataList);

    return (
        <>
            <Dialog onClose={handleDialogClose} maxWidth="lg" fullWidth open={isDialogOpen}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                    立帳作業
                </BootstrapDialogTitle>
                {/* <DialogContent>
                    <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                        <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
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
                                {dataList.map((row, id) => {
                                    return (
                                        <TableRow
                                            key={row.FeeAmountPre + row?.PartyName + row?.LBRatio}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                            <StyledTableCell align="center">{row.BillMaster.PartyName}</StyledTableCell>
                                            <StyledTableCell align="center">{row.BillMaster.SubmarineCable}</StyledTableCell>
                                            <StyledTableCell align="center">{row.BillMaster.WorkTitle}</StyledTableCell>
                                            <StyledTableCell align="center">{row.BillMaster.BillingNo}</StyledTableCell>
                                            <StyledTableCell align="center">{row.BillMaster.SupplierName}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {dayjs(row.BillMaster.IssueDate).format('YYYY/MM/DD')}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.data ? row.data.length : 0}</StyledTableCell>
                                            <StyledTableCell align="center">{row.BillMaster.FeeAmountSum}</StyledTableCell>
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
                </DialogContent> */}
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
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">發票代碼</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">發票日期</StyledTableCell>
                            <StyledTableCell align="center">明細數量</StyledTableCell>
                            <StyledTableCell align="center">總價</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataList?.map((row, id) => {
                            return (
                                <TableRow
                                    key={row.InvoiceWKMaster?.BillMasterID + row.InvoiceWKMaster?.InvoiceNo}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.PartyName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.BillingNo}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.SupplierName}</StyledTableCell>
                                    <StyledTableCell align="center">{dayjs(row.BillMaster.IssueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                    <StyledTableCell align="center">{row.data ? row.data.length : 0}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.FeeAmountSum}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                '& button': { mx: { sm: 0.2, md: 0.2, lg: 0.2, xl: 1 }, p: 0, fontSize: 1 }
                                            }}
                                        >
                                            {row.BillMaster.Status === 'TO_WRITEOFF' ? (
                                                <Button color="secondary" size="small" variant="outlined">
                                                    已進待銷
                                                </Button>
                                            ) : (
                                                <Button
                                                    color="primary"
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        toWriteOff(row.BillMaster.BillMasterID);
                                                    }}
                                                >
                                                    進待銷帳
                                                </Button>
                                            )}

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
                                                檢視帳單
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

export default SignedDataList;
