import { useState, useRef } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
import DeductedWork from './deductedWork';
import GenerateFeeTerminate from './generateFeeTerminate';
import GenerateBack from './generateBack';
import SignAndUpload from './signAndUpload';
import BillDraftMake from './billDraftMake';
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
    Box,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';

import { toBillDataapi, sendJounary } from 'components/apis.jsx';

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

const DeductedDataList = ({ dataList }) => {
    const billInfo = useRef({});
    const [isDeductedWorkOpen, setIsDeductedWorkOpen] = useState(false); //檢視
    const [isDialogOpen, setIsDialogOpen] = useState(false); //檢視
    const [infoTerminal, setInfoTerminal] = useState(false); //作廢
    const [infoBack, setInfoBack] = useState(false); //退回
    const billMasterID = useRef('');
    const billDetailInfo = useRef([]);
    const pONo = useRef('');
    const [editItem, setEditItem] = useState();

    const handleDeductedOpen = (data) => {
        billDetailInfo.current = data;
        // billMasterInfo.current = info.BillMaster;
        setIsDeductedWorkOpen(true);
    };

    const handleDeductedClose = () => {
        setIsDeductedWorkOpen(false);
        setEditItem();
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setEditItem();
    };

    const handleDialogOpen = (info) => {
        billMasterID.current = info.BillMasterID;
        pONo.current = info.PONo;
        // billMasterInfo.current = info.BillMaster;
        setIsDialogOpen(true);
    };

    const handleTerminalClose = () => {
        setInfoTerminal(false);
    };

    const handleBackClose = () => {
        setInfoBack(false);
    };

    console.log('pONo=>>', pONo.current);

    return (
        <>
            <DeductedWork
                isDeductedWorkOpen={isDeductedWorkOpen}
                handleDeductedClose={handleDeductedClose}
                billDetailInfo={billDetailInfo.current}
            />
            {/* <GenerateFeeTerminate infoTerminal={infoTerminal} handleTerminalClose={handleTerminalClose} />
            <GenerateBack infoBack={infoBack} handleBackClose={handleBackClose} />  */}
            <BillDraftMake
                isDialogOpen={isDialogOpen}
                handleDialogClose={handleDialogClose}
                billMasterID={billMasterID.current}
                pONo={pONo.current}
            />
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
                            <StyledTableCell align="center">處理狀態</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataList?.map((row, id) => {
                            console.log('row=>>', row);
                            return (
                                <TableRow
                                    key={row.BillMaster.BillMasterID + row.BillMaster.BillMasterID}
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
                                    <StyledTableCell align="center">{row.BillMaster.Status}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', '& button': { mx: 1, p: 0, fontSize: 1 } }}>
                                            <Button
                                                color="success"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDeductedOpen(row.data);
                                                }}
                                            >
                                                檢視
                                            </Button>
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDialogOpen({
                                                        BillMasterID: row.BillMaster.BillMasterID,
                                                        PONo: row.BillMaster.PONo
                                                    });
                                                }}
                                            >
                                                產製帳單
                                            </Button>
                                            <Button
                                                color="info"
                                                size="small"
                                                variant="outlined"
                                                // onClick={() => {
                                                //     handleDialogOpen('deduct', {
                                                //         BillDetail: row.BillDetail,
                                                //         BillMaster: row.BillMaster
                                                //     });
                                                // }}
                                            >
                                                簽核
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

export default DeductedDataList;
