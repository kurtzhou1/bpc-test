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

const DeductedDataList = ({ dataList, receivableQuery }) => {
    const billInfo = useRef({});
    const [isDialogOpen, setIsDialogOpen] = useState(false); //檢視
    const [isDeductedWorkOpen, setIsDeductedWorkOpen] = useState(false); //產製帳單
    const [isUploadOpen, setIsUploadOpen] = useState(false); //簽核
    const [infoTerminal, setInfoTerminal] = useState(false); //作廢
    const [infoBack, setInfoBack] = useState(false); //退回
    const billMasterID = useRef(-1);
    const submarineCable = useRef('');
    const billingNo = useRef('');
    const pONo = useRef('');
    const billDetailInfo = useRef([]);
    const [editItem, setEditItem] = useState();

    const handleDeductedOpen = (data) => {
        billDetailInfo.current = data;
        // billMasterInfo.current = info.BillMaster;
        setIsDeductedWorkOpen(true);
    };

    const handleDeductedClose = () => {
        setIsDeductedWorkOpen(false);
        // setEditItem();
    };

    const handleDialogOpen = (info) => {
        billMasterID.current = info.BillMasterID;
        pONo.current = info.PONo;
        submarineCable.current = info.SubmarineCable;
        BillingNo.current = info.BillingNo;
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        billMasterID.current = -1;
    };

    const handleUploadOpen = (info) => {
        billMasterID.current = info.BillMasterID;
        setIsUploadOpen(true);
    };

    const handleUploadClose = () => {
        setIsUploadOpen(false);
        billMasterID.current = -1;
    };

    const handleTerminalClose = () => {
        setInfoTerminal(false);
    };

    const handleBackClose = () => {
        setInfoBack(false);
    };

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
                submarineCableName={submarineCable.current}
                billingNo={billingNo.current}
                action={'deducted'}
            />
            <SignAndUpload
                isUploadOpen={isUploadOpen}
                handleUploadClose={handleUploadClose}
                billMasterID={billMasterID.current}
                receivableQuery={receivableQuery}
            />
            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">會員</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">帳單號碼</StyledTableCell>
                            {/* <StyledTableCell align="center">供應商</StyledTableCell> */}
                            <StyledTableCell align="center">帳單日期</StyledTableCell>
                            <StyledTableCell align="center">明細數量</StyledTableCell>
                            <StyledTableCell align="center">總金額</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataList?.map((row, id) => {
                            console.log('dataList=>>', row);
                            return (
                                <TableRow
                                    key={row.BillMaster.BillMasterID + row.BillMaster.BillingNo}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.PartyName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.BillingNo}</StyledTableCell>
                                    {/* <StyledTableCell align="center">{row.BillMaster.SupplierName}</StyledTableCell> */}
                                    <StyledTableCell align="center">{dayjs(row.BillMaster.IssueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                    <StyledTableCell align="center">{row.data ? row.data.length : 0}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.FeeAmountSum}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', '& button': { mx: 0.2, p: 0, fontSize: 1 } }}>
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
                                                        PONo: row.BillMaster.PONo,
                                                        SubmarineCable: row.BillMaster.SubmarineCable, //haha
                                                        WorkTitle: row.BillMaster.WorkTitle,
                                                        BillingNo: row.BillMaster.BillingNo
                                                    });
                                                }}
                                            >
                                                產製帳單
                                            </Button>
                                            <Button
                                                color="info"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleUploadOpen({
                                                        BillMasterID: row.BillMaster.BillMasterID
                                                    });
                                                }}
                                            >
                                                簽核上傳
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
