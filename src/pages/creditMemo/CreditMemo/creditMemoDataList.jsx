import { useState } from 'react';

// project import
import { handleNumber } from 'components/commonFunction';
// material-ui
import { Button, Table, Grid, Box } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CreditMemoQuery from './creditMemoQuery';

// import CreditBalanceView from './CreditMemoView';
// import CreditBalanceTerminate from './CreditMemoTerminate';
import dayjs from 'dayjs';

const CreditBalanceDataList = ({ listInfo }) => {
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
                                <StyledTableCell align="center">CM號碼</StyledTableCell>
                                <StyledTableCell align="center">海纜名稱</StyledTableCell>
                                <StyledTableCell align="center">海纜作業</StyledTableCell>
                                <StyledTableCell align="center">會員</StyledTableCell>
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
                                        <StyledTableCell align="center">{row.CMNo}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.SubmarineCable}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.WorkTitle}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.PartyName}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {dayjs(row.LastIssueDate).format('YYYY/MM/DD')}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.Note}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    '& button': {
                                                        mx: { sm: 0.2, md: 0.2, lg: 0.2, xl: 1 },
                                                        p: 0,
                                                    },
                                                }}
                                            >
                                                <Button
                                                    color="success"
                                                    size="small"
                                                    variant="outlined"
                                                    // onClick={() => {
                                                    //     setModifyItem(row.BillDetail);
                                                    //     setIsDetailOpen(true);
                                                    // }}
                                                >
                                                    產製
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    size="small"
                                                    variant="outlined"
                                                    // onClick={() => {
                                                    //     handleUploadOpen(row.BillMaster?.BillMasterID);
                                                    // }}
                                                >
                                                    上傳
                                                </Button>
                                                <Button
                                                    color="info"
                                                    size="small"
                                                    variant="outlined"
                                                    // onClick={() => {
                                                    //     handleAttachUploadOpen(
                                                    //         row.BillMaster?.BillMasterID,
                                                    //     );
                                                    // }}
                                                >
                                                    下載
                                                </Button>
                                            </Box>
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
