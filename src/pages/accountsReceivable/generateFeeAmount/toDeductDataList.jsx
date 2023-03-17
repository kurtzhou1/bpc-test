import { useState, useRef } from 'react';

// project import
import DeductWork from './deductWork';
import { handleNumber } from 'components/commonFunction';
import MainCard from 'components/MainCard';
import GenerateFeeTerminate from './generateFeeTerminate';
import GenerateBack from './generateBack';

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
    TextField,
    Box
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

import { toBillDataapi, sendJounary } from 'components/apis.jsx';

const ToGenerateDataList = ({ listInfo, apiQuery }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false); //折抵作業
    const [isDeductWorkOpen, setIsDeductWorkOpen] = useState(false); //作廢
    const [infoBack, setInfoBack] = useState(false); //退回
    const billMasterInfo = useRef([]);
    const billDetailInfo = useRef([]);
    const actionName = useRef('');
    const [editItem, setEditItem] = useState();
    // const [toBillDataMain, setToBillDataMain] = useState(fakeData.InvoiceMaster); //發票主檔
    // const [toBillDataInfo, setToBillDataInfo] = useState(fakeData.InvoiceDetail); //發票明細檔
    // const [totalAmount, setTotalAmount] = useState(fakeData.TotalAmount); //發票總金額
    const [currentAmount, setCurrentAmount] = useState(''); //目前金額
    const [infoTerminal, setInfoTerminal] = useState(false);
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
        setEditItem();
    };

    const handleDialogOpen = (action, info) => {
        billDetailInfo.current = info.BillDetail;
        billMasterInfo.current = info.BillMaster;
        actionName.current = action;
        setIsDialogOpen(true);
    };

    const handleTerminalClose = () => {
        setInfoTerminal(false);
    };

    const handleBackClose = () => {
        setInfoBack(false);
    };

    return (
        <>
            <DeductWork
                isDialogOpen={isDialogOpen}
                handleDialogClose={handleDialogClose}
                billDetailInfo={billDetailInfo.current}
                billMasterInfo={billMasterInfo.current}
                actionName={actionName.current}
            />
            <GenerateFeeTerminate infoTerminal={infoTerminal} handleTerminalClose={handleTerminalClose} />
            <GenerateBack infoBack={infoBack} handleBackClose={handleBackClose} />
            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">會員</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">帳單日期</StyledTableCell>
                            <StyledTableCell align="center">帳單截止日</StyledTableCell>
                            <StyledTableCell align="center">明細數量</StyledTableCell>
                            <StyledTableCell align="center">是否為pro-forma</StyledTableCell>
                            <StyledTableCell align="center">處理狀態</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listInfo?.map((row, id) => {
                            return (
                                <TableRow
                                    key={row.BillMaster.BillMasterID + row.BillMaster.BillMasterID}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.PartyName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">{dayjs(row.BillMaster.IssueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                    <StyledTableCell align="center">{dayjs(row.BillMaster.DueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillDetail.length}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.IsPro === 1 ? '是' : '否'}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.Status}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', '& button': { mx: 1, p: 0, fontSize: 1 } }}>
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDialogOpen('deduct', {
                                                        BillDetail: row.BillDetail,
                                                        BillMaster: row.BillMaster
                                                    });
                                                }}
                                            >
                                                折抵作業
                                            </Button>
                                            <Button
                                                color="success"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDialogOpen('view', {
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
                                                color="warning"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    setInfoBack(true);
                                                }}
                                            >
                                                退回
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

export default ToGenerateDataList;
