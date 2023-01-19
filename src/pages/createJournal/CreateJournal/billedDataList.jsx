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

import dayjs from 'dayjs';

const BilledDataList = ({ listInfo, setDialogAction, setIsDialogOpen, setEditItem, deletelistInfoItem }) => {
    console.log('listInfo=>>', listInfo);
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
                        console.log('row=>', row);
                        return (
                            <TableRow
                                // key={row.InvoiceWKMaster?.invoiceNo + row.InvoiceWKMaster?.supplierName + id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                <StyledTableCell align="center">{row.billMilestone}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.partyName.map((i) => {
                                        console.log('i=>>', i);
                                        return i === 0 ? <sapn>{i.title}</sapn> : <sapn>、{i.title}</sapn>;
                                    })}
                                </StyledTableCell>
                                <StyledTableCell align="center">{`${row.lbRatio}%`}</StyledTableCell>
                                <StyledTableCell align="center">{row.modifyNote}</StyledTableCell>
                                <StyledTableCell align="center"> {dayjs(row.createTime).format('YYYY/MM/DD')}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button
                                        color="primary"
                                        onClick={() => {
                                            setDialogAction('Edit');
                                            setIsDialogOpen(true);
                                            setEditItem(id);
                                        }}
                                    >
                                        編輯
                                    </Button>
                                    <Button
                                        color="success"
                                        onClick={() => {
                                            setDialogAction('Split');
                                            setIsDialogOpen(true);
                                            setEditItem(id);
                                        }}
                                    >
                                        分段
                                    </Button>
                                    <Button
                                        color="error"
                                        onClick={() => {
                                            deletelistInfoItem(id);
                                        }}
                                    >
                                        刪除
                                    </Button>
                                </StyledTableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BilledDataList;
