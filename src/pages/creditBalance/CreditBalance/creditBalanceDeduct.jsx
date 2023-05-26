import { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    IconButton,
    TextField,
    Checkbox,
    Autocomplete,
    Table
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import dayjs from 'dayjs';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// project import
import MainCard from 'components/MainCard';
import { handleNumber } from 'components/commonFunction';

// table
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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

const CreditBalanceDeduct = ({ cblistInfo }) => {
    console.log('cblistInfo=>>', cblistInfo);

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center">海纜名稱</StyledTableCell>
                        <StyledTableCell align="center">海纜作業</StyledTableCell>
                        <StyledTableCell align="center">計帳段號</StyledTableCell>
                        <StyledTableCell align="center">發票號碼</StyledTableCell>
                        <StyledTableCell align="center">Debit</StyledTableCell>
                        <StyledTableCell align="center">Credit</StyledTableCell>
                        <StyledTableCell align="center">Balance</StyledTableCell>
                        <StyledTableCell align="center">日期</StyledTableCell>
                        <StyledTableCell align="center">備註</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cblistInfo?.map((row, id) => {
                        return (
                            <TableRow key={row?.SubmarineCable + row?.InvNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                <StyledTableCell align="center">{row.SubmarineCable}</StyledTableCell>
                                <StyledTableCell align="center">{row.WorkTitle}</StyledTableCell>
                                <StyledTableCell align="center">{row.BillMilestone}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvNo}</StyledTableCell>
                                <StyledTableCell align="center">{`$${handleNumber(row.Debit)}`}</StyledTableCell>
                                <StyledTableCell align="center">{`$${handleNumber(row.Credit)}`}</StyledTableCell>
                                <StyledTableCell align="center">{`$${handleNumber(row.Balance)}`}</StyledTableCell>
                                <StyledTableCell align="center">{dayjs(row.CNIssueDate).format('YYYYMMDD')}</StyledTableCell>
                                <StyledTableCell align="center">{row.Description}</StyledTableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CreditBalanceDeduct;
