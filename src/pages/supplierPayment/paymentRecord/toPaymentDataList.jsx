import { useState, useEffect } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

// project import
import { handleNumber } from 'components/commonFunction';

// material-ui
import { Button, Table, Box, Paper } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import PayStatementList from './payStatementList';

// icon
// import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
// import AddCircleIcon from '@mui/icons-material/AddCircle';

import dayjs from 'dayjs';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.gary,
        color: theme.palette.common.black,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        border: '1px solid #EEEEEE',
    },
    [`&.${tableCellClasses.body}.totalAmount`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        backgroundColor: '#CFD8DC',
    },
}));

const ToPaymentDataList = ({ listInfo }) => {
    const [toPaymentList, setToPaymentList] = useState([]);

    const [modifyItem, setModifyItem] = useState([]);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const isDetailClose = () => {
        setIsDetailOpen(false);
    };

    useEffect(() => {
        setToPaymentList(listInfo);
    }, [listInfo]);

    return (
        <>
            <PayStatementList
                modifyItem={modifyItem}
                isDetailOpen={isDetailOpen}
                isDetailClose={isDetailClose}
            />
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight:
                        window.screen.height < 1000
                            ? window.screen.height * 0.45
                            : window.screen.height * 0.45,
                }}
            >
                <Table sx={{ minWidth: 300 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">No</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">此次應付總金額</StyledTableCell>
                            <StyledTableCell align="center">此次付款總金額</StyledTableCell>
                            <StyledTableCell align="center">付款日期</StyledTableCell>
                            <StyledTableCell align="center">摘要說明</StyledTableCell>
                            <StyledTableCell align="center">動作</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {toPaymentList?.map((row, id) => {
                            console.log('row=>>', row);
                            return (
                                <TableRow
                                    key={row?.InvoiceWKMaster?.WKMasterID + id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.PayMaster?.SubmarineCable}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.PayMaster?.WorkTitle}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.PayMaster?.SupplierName}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {handleNumber(row?.PayMaster?.FeeAmount)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {handleNumber(row?.PayMaster?.PaidAmount)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {dayjs(row?.PayMaster?.PaidDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row?.PayMaster?.Note}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                '& button': { mx: 1, p: 0 },
                                            }}
                                        >
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    setModifyItem(row.PayStatementList);
                                                    setIsDetailOpen(true);
                                                }}
                                            >
                                                檢視
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

export default ToPaymentDataList;

ToPaymentDataList.propTypes = {
    listInfo: React.Array,
    supplierPaymentQuery: React.func,
    actionName: React.String,
    invoiceNo: React.String,
    dueDate: PropTypes.instanceOf(Date),
    handleDialogClose: React.func,
    isDialogOpen: React.bool,
};
