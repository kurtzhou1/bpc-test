// import { useState } from 'react';

// project import

// material-ui
import { Typography, Button, Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const LiabilityDataList = ({ listInfo }) => {
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

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center">帳務計費段</StyledTableCell>
                        <StyledTableCell align="center">會員名稱</StyledTableCell>
                        <StyledTableCell align="center">攤分比例</StyledTableCell>
                        <StyledTableCell align="center">異動原因</StyledTableCell>
                        <StyledTableCell align="center">終止日期</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {listInfo?.map((row, id) => {
                        return ( */}
                    <TableRow
                        // key={row.InvoiceWKMaster?.invoiceNo + row.InvoiceWKMaster?.supplyID + id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <StyledTableCell align="center">1</StyledTableCell>
                        <StyledTableCell align="center">BM 0-a</StyledTableCell>
                        <StyledTableCell align="center">Taiwan</StyledTableCell>
                        <StyledTableCell align="center">10%</StyledTableCell>
                        <StyledTableCell align="center">測試</StyledTableCell>
                        <StyledTableCell align="center">2022/12/31</StyledTableCell>
                        <StyledTableCell align="center">
                            <Button color="primary">編輯</Button>
                            <Button color="success">分段</Button>
                            <Button color="error">刪除</Button>
                        </StyledTableCell>
                    </TableRow>
                    {/* ); */}
                    {/* })} */}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LiabilityDataList;
