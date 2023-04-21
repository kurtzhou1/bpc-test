import { useState, useRef } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
import CorrespondenceQuery from './correspondenceQuery';
import MainCard from 'components/MainCard';
import CorrespondenceMake from './correspondenceMake';
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

import dayjs from 'dayjs';

import { toBillDataapi, sendJounary } from 'components/apis.jsx';

const Correspondence = ({ listInfo, apiQuery }) => {
    const correspondenceQuery = () => {
        console.log('correspondenceQuery');
    };

    //以下都無用
    const deductInfo = useRef({});
    const actionName = useRef('');
    const [isDialogOpen, setIsDialogOpen] = useState(false); //檢視
    const [infoTerminal, setInfoTerminal] = useState(false); //作廢
    const [uploadOpen, setUploadOpen] = useState(false); //上傳
    const [currentAmount, setCurrentAmount] = useState(''); //目前金額
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

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleDialogOpen = (action, info) => {
        deductInfo.current = info;
        actionName.current = action;
        setIsDialogOpen(true);
    };

    const handleTerminalClose = () => {
        setInfoTerminal(false);
    };

    const handUploadClose = () => {
        setUploadOpen(false);
    };

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <CorrespondenceQuery correspondenceQuery={correspondenceQuery} />
                </Grid>
                <Grid item xs={12}>
                    <MainCard title="函稿資料列表">
                        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">供應商</StyledTableCell>
                                        <StyledTableCell align="center">海纜資訊</StyledTableCell>
                                        <StyledTableCell align="center">匯款總金額</StyledTableCell>
                                        <StyledTableCell align="center">主旨</StyledTableCell>
                                        <StyledTableCell align="center">聯絡人員</StyledTableCell>
                                        <StyledTableCell align="center">連絡電話</StyledTableCell>
                                        <StyledTableCell align="center">E-mail</StyledTableCell>
                                        <StyledTableCell align="center">發文日期</StyledTableCell>
                                        <StyledTableCell align="center">發文字號</StyledTableCell>
                                        <StyledTableCell align="center">發文者</StyledTableCell>
                                        <StyledTableCell align="center">狀態</StyledTableCell>
                                        <StyledTableCell align="center">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[].map((row, id) => {
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
                                                <StyledTableCell align="center">
                                                    {dayjs(row.IssueDate).format('YYYY/MM/DD')}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{toBillDataInfo.length}</StyledTableCell>
                                                <StyledTableCell align="center">{toBillDataInfo.length}</StyledTableCell>
                                                <StyledTableCell align="center">{toBillDataInfo.length}</StyledTableCell>
                                                <StyledTableCell align="center">{row.Status}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            '& button': { mx: { sm: 0.3, md: 0.3, lg: 0.6, xl: 1.5 }, p: 0, fontSize: 1 }
                                                        }}
                                                    >
                                                        <Button
                                                            color="primary"
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
                                                            更新函稿
                                                        </Button>
                                                        {/* <Button
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
                                                        </Button> */}
                                                    </Box>
                                                </StyledTableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </MainCard>
                </Grid>
            </Grid>
            <CorrespondenceMake isDialogOpen={isDialogOpen} handleDialogClose={handleDialogClose} listInfo={listInfo} />
        </>
    );
};

export default Correspondence;
