import { useState, useRef } from 'react';

// project import
import DeductWork from './toDeductWork';
import { handleNumber } from 'components/commonFunction';
import MainCard from 'components/MainCard';
import GenerateFeeTerminate from './generateFeeTerminate';
import GenerateBack from './generateBack';

// material-ui
import { Button, Table, Dialog, Box } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import BillDraftMake from './billDraftMake';
import dayjs from 'dayjs';

import { toBillDataapi, sendJounary } from 'components/apis.jsx';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.gary,
        color: theme.palette.common.black,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem'
    }
}));

const ToGenerateDataList = ({ dataList, receivableQuery }) => {
    const [isDeductOpen, setIsDeductOpen] = useState(false); //檢視、折抵作業
    const [isDialogOpen, setIsDialogOpen] = useState(false); //檢視帳單
    const [isDeductWorkOpen, setIsDeductWorkOpen] = useState(false); //作廢
    const [infoBack, setInfoBack] = useState(false); //退回
    const billMasterInfo = useRef([]);
    const billDetailInfo = useRef([]);
    const actionName = useRef('');
    const [editItem, setEditItem] = useState();
    const [infoTerminal, setInfoTerminal] = useState(false);
    const billMasterID = useRef(-1);
    const submarineCable = useRef('');
    const pONo = useRef('');

    const handleDeductClose = () => {
        setIsDeductOpen(false);
        setEditItem();
    };

    const handleDeductOpen = (action, info) => {
        billDetailInfo.current = info.BillDetail;
        billMasterInfo.current = info.BillMaster;
        actionName.current = action;
        setIsDeductOpen(true);
    };

    const handleDialogOpen = (info) => {
        billMasterID.current = info.BillMasterID;
        pONo.current = info.PONo;
        submarineCable.current = info.SubmarineCable;
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
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
            <DeductWork
                isDeductOpen={isDeductOpen}
                handleDeductClose={handleDeductClose}
                billDetailInfo={billDetailInfo.current}
                billMasterInfo={billMasterInfo.current}
                actionName={actionName.current}
                receivableQuery={receivableQuery}
            />
            <GenerateFeeTerminate infoTerminal={infoTerminal} handleTerminalClose={handleTerminalClose} />
            <GenerateBack infoBack={infoBack} handleBackClose={handleBackClose} />
            <BillDraftMake
                isDialogOpen={isDialogOpen}
                handleDialogClose={handleDialogClose}
                billMasterID={billMasterID.current}
                pONo={pONo.current}
                submarineCableName={submarineCable.current}
                action={'toDeduct'}
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
                            <StyledTableCell align="center">帳單日期</StyledTableCell>
                            <StyledTableCell align="center">截止日</StyledTableCell>
                            <StyledTableCell align="center">明細數量</StyledTableCell>
                            <StyledTableCell align="center">是否為pro-forma</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataList?.map((row, id) => {
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
                                    <StyledTableCell align="center">{dayjs(row.BillMaster.IssueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                    <StyledTableCell align="center">{dayjs(row.BillMaster.DueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillDetail ? row.BillDetail.length : 0}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMaster.IsPro === 1 ? '是' : '否'}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', '& button': { mx: 0.2, p: 0, fontSize: 1 } }}>
                                            <Button
                                                color="success"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDeductOpen('view', {
                                                        BillDetail: row.BillDetail,
                                                        BillMaster: row.BillMaster,
                                                        PartyName: row.BillMaster.PartyName
                                                    });
                                                }}
                                            >
                                                檢視
                                            </Button>
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDeductOpen('deduct', {
                                                        BillDetail: row.BillDetail,
                                                        BillMaster: row.BillMaster,
                                                        PartyName: row.BillMaster.PartyName
                                                    });
                                                }}
                                            >
                                                折抵作業
                                            </Button>
                                            <Button
                                                color="info"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDialogOpen({
                                                        BillMasterID: row.BillMaster.BillMasterID,
                                                        PONo: row.BillMaster.PONo,
                                                        SubmarineCable: row.BillMaster.SubmarineCable,
                                                        WorkTitle: row.BillMaster.WorkTitle
                                                    });
                                                }}
                                            >
                                                預覽帳單
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

export default ToGenerateDataList;
