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

const LiabilityDataList = ({ listInfo, setDialogAction, setIsDialogOpen, setEditItem, updatelistInfoItem }) => {
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
    // console.log('131123123123=>>', listInfo);

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center">帳務計費段</StyledTableCell>
                        <StyledTableCell align="center">會員名稱</StyledTableCell>
                        {/* <StyledTableCell align="center">海纜名稱</StyledTableCell> */}
                        {/* <StyledTableCell align="center">海纜作業</StyledTableCell> */}
                        <StyledTableCell align="center">攤分比例</StyledTableCell>
                        <StyledTableCell align="center">異動原因</StyledTableCell>
                        <StyledTableCell align="center">終止日期</StyledTableCell>
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
                                <StyledTableCell align="center">{row.BillMilestone}</StyledTableCell>
                                <StyledTableCell align="center">{row.PartyName}</StyledTableCell>
                                <StyledTableCell align="center">{`${row.LbRatio}%`}</StyledTableCell>
                                <StyledTableCell align="center">{row.ModifyNote}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.CreateTime === '' ? '' : dayjs(row.CreateTime).format('YYYY/MM/DD')}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.CreateTime === '' ? (
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
                                    ) : (
                                        ''
                                    )}
                                    {row.CreateTime === '' ? (
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
                                    ) : (
                                        ''
                                    )}
                                    {row.CreateTime === '' ? (
                                        <Button
                                            color="error"
                                            onClick={() => {
                                                updatelistInfoItem(id);
                                            }}
                                        >
                                            終止
                                        </Button>
                                    ) : (
                                        ''
                                    )}
                                </StyledTableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LiabilityDataList;
