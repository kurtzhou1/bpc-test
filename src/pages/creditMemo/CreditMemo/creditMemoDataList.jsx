import { useState } from 'react';

// project import
import { handleNumber } from 'components/commonFunction';
// material-ui
import { Button, Table, Grid } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// import CreditBalanceView from './CreditMemoView';
// import CreditBalanceTerminate from './CreditMemoTerminate';
import dayjs from 'dayjs';

const CreditBalanceDataList = ({ listInfo, setIsDialogOpen, deletelistInfoItem }) => {
    const [cbView, setCbview] = useState(false);
    const [cbTerminal, setCbTerminal] = useState(false);
    const [summary, setSummary] = useState('');
    const [cbToCn, setCbToCn] = useState({}); //處理狀態
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
    }));

    const handleViewClose = () => {
        setCbview(false);
    };

    const handleTerminalClose = () => {
        setCbTerminal(false);
    };

    const handleChange = (event) => {
        setCbToCn({ ...cbToCn, [event.target.name]: event.target.checked });
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                    <Table sx={{ minWidth: 300 }} stickyHeader>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">NO</StyledTableCell>
                                <StyledTableCell align="center">CB號碼</StyledTableCell>
                                <StyledTableCell align="center">CB種類</StyledTableCell>
                                <StyledTableCell align="center">海纜名稱</StyledTableCell>
                                <StyledTableCell align="center">海纜作業</StyledTableCell>
                                <StyledTableCell align="center">會員名稱</StyledTableCell>
                                <StyledTableCell align="center">總金額</StyledTableCell>
                                <StyledTableCell align="center">開立日期</StyledTableCell>
                                <StyledTableCell align="center">摘要說明</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listInfo?.map((row, id) => {
                                return (
                                    <TableRow
                                        key={row.CNNo + id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                        <StyledTableCell align="center">{row.CNNo}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.CNType}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.SubmarineCable}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.WorkTitle}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.PartyName}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{`$${handleNumber(
                                            row.CurrAmount,
                                        )}`}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            {dayjs(row.IssueDate).format('YYYY/MM/DD')}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.Note}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    window.open(row.URI);
                                                }}
                                            >
                                                下載
                                            </Button>
                                        </StyledTableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default CreditBalanceDataList;
