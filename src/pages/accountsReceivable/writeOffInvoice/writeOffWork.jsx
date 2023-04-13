import { useState, useRef } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
import MainCard from 'components/MainCard';
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
    TextField
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';

import { toBillDataapi, sendJounary } from 'components/apis.jsx';

const ToGenerateDataList = ({ isDialogOpen, handleDialogClose, deductInfo, actionName }) => {
    const fakeData = {
        // 原始費用
        // 抵扣
        // 應繳
        // 累計實收
        // 手續費
        // 不含手續費實收
        // 總金額
        // 重溢繳
        // 短繳
        // 手續費差額
        // 短繳原因
        // 收款日期
        // 摘要說明
        // 收費狀態
        TotalAmount: 5582012.72,
        BillMaster: [
            {
                InvMasterID: 1,
                WKMasterID: 1,
                InvoiceNo: 'DT0170168-1',
                PartyName: 'Edge',
                SupplierName: 'NEC',
                SubmarineCable: 'SJC2',
                WorkTitle: 'Construction',
                IssueDate: '2022-09-09T00:00:00',
                DueDate: '2022-11-08T00:00:00',
                IsPro: false,
                ContractType: 'SC',
                Status: ''
            }
        ],
        BillDetail: [
            {
                WKMasterID: 2,
                WKDetailID: 2,
                InvMasterID: 2,
                InvoiceNo: 'DT0170168-2',
                PartyName: 'Edge',
                SupplierName: 'NEC',
                SubmarineCable: 'SJC2',
                WorkTitle: 'Construction',
                BillMilestone: 'BM9a',
                FeeItem: 'BM12a Under the Sea',
                OrgFeeAmount: 8888.88, //原始費用金額
                DedAmount: 8888.88, //抵扣金額
                FeeAmount: 8888.88, //應收(會員繳)金額
                ReceivedAmount: 1111.88, //累積實收(會員繳)金額
                D: 1288844.44, //重溢繳金額
                ShortAmount: 8888.88, //短繳金額
                BankFees: 8888.88, //銀行手續費
                ToCBAmount: 8888.88, //已經轉CB的金額
                ShortOverReason: '短溢繳原因測試', //短溢繳原因
                WriteOffDate: 8888.88, //銷帳日期
                ReceivedDate: 0, //最新收款日期
                Note: '測試', //摘要說明
                Status: '' //收費狀態
            }
        ]
    };

    const [isDeductWorkOpen, setIsDeductWorkOpen] = useState(false);
    const [editItem, setEditItem] = useState();
    const [toBillDataMain, setToBillDataMain] = useState(fakeData.BillMaster); //帳單主檔
    const [toBillDataInfo, setToBillDataInfo] = useState(fakeData.BillDetail); //帳單明細檔
    const [totalAmount, setTotalAmount] = useState(fakeData.TotalAmount); //發票總金額
    const [currentAmount, setCurrentAmount] = useState(''); //目前金額
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: theme.palette.common.gary,
            color: theme.palette.common.black,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem',
            fontSize: '0.05rem'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        }
    }));

    const deductWork = (id) => {
        console.log('我問號');
        setEditItem(id);
        setIsDeductWorkOpen(true);
    };

    return (
        <Dialog onClose={handleDialogClose} maxWidth="xl" open={isDialogOpen}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                收款銷帳作業
            </BootstrapDialogTitle>
            <DialogContent>
                <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 10 }}>
                    {actionName !== 'view' ? (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 10 }}>
                                <Grid item xs={1} sm={1} md={1} lg={1}>
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                    >
                                        會員：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        value={deductInfo.PartyName}
                                        fullWidth
                                        disabled={true}
                                        variant="outlined"
                                        size="small"
                                        // type="number"
                                    />
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} lg={1}>
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                    >
                                        發票截止日期：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        value={deductInfo.IssueDate}
                                        fullWidth
                                        disabled={true}
                                        variant="outlined"
                                        size="small"
                                        // type="number"
                                    />
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} lg={1}>
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                    >
                                        海纜名稱：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        value={deductInfo.SubmarineCable}
                                        fullWidth
                                        disabled={true}
                                        variant="outlined"
                                        size="small"
                                        // type="number"
                                    />
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} lg={1}>
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                    >
                                        海纜作業：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        value={deductInfo.WorkTitle}
                                        fullWidth
                                        disabled={true}
                                        variant="outlined"
                                        size="small"
                                        // type="number"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        ''
                    )}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <MainCard title="帳單明細列表">
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table sx={{ minWidth: 300, fontSize: 18 }} stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {/* <StyledTableCell align="center">NO</StyledTableCell> */}
                                            <StyledTableCell align="center">費用項目</StyledTableCell>
                                            <StyledTableCell align="center">原始費用</StyledTableCell>
                                            {/* {actionName === 'viewDeducted' ? (
                                                <StyledTableCell align="center">折抵CB種類</StyledTableCell>
                                            ) : (
                                                ''
                                            )} */}
                                            <StyledTableCell align="center">折抵</StyledTableCell>
                                            <StyledTableCell align="center">應繳</StyledTableCell>
                                            <StyledTableCell align="center">累計實收</StyledTableCell>
                                            <StyledTableCell align="center">手續費</StyledTableCell>
                                            <StyledTableCell align="center">本次實收</StyledTableCell>
                                            <StyledTableCell align="center">總金額(含手續費)</StyledTableCell>
                                            <StyledTableCell align="center">重溢繳</StyledTableCell>
                                            <StyledTableCell align="center">短繳</StyledTableCell>
                                            <StyledTableCell align="center">手續費差額</StyledTableCell>
                                            <StyledTableCell align="center">短繳原因</StyledTableCell>
                                            <StyledTableCell align="center">收款日期</StyledTableCell>
                                            <StyledTableCell align="center">摘要說明</StyledTableCell>
                                            <StyledTableCell align="center">收費狀態</StyledTableCell>
                                            {/* {actionName === 'deduct' ? <StyledTableCell align="center">Action</StyledTableCell> : ''} */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {toBillDataInfo.map((row, id) => {
                                            return (
                                                <TableRow
                                                    key={row.FeeAmountPre + row?.PartyName + row?.LBRatio}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center" sx={{ fontSize: '0.1rem' }}>
                                                        {id + 1}???
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        {row.OrgFeeAmount}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">{`$${handleNumber(
                                                        row.DedAmount
                                                    )}`}</TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">{`$${handleNumber(
                                                        row.FeeAmount
                                                    )}`}</TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">{`$${handleNumber(
                                                        row.ReceivedAmount
                                                    )}`}</TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        <TextField
                                                            label="$"
                                                            size="small"
                                                            type="number"
                                                            // style={{ width: '30%' }}
                                                            // value={diffNumber}
                                                            // onChange={(e) => {
                                                            //     changeDiff(e.target.value, id);
                                                            // }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        <TextField
                                                            label="$"
                                                            size="small"
                                                            type="number"
                                                            // style={{ width: '30%' }}
                                                            // value={diffNumber}
                                                            // onChange={(e) => {
                                                            //     changeDiff(e.target.value, id);
                                                            // }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        <TextField
                                                            label="$"
                                                            size="small"
                                                            type="number"
                                                            // style={{ width: '30%' }}
                                                            // value={diffNumber}
                                                            // onChange={(e) => {
                                                            //     changeDiff(e.target.value, id);
                                                            // }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        <TextField
                                                            label="$"
                                                            size="small"
                                                            type="number"
                                                            // style={{ width: '30%' }}
                                                            // value={diffNumber}
                                                            // onChange={(e) => {
                                                            //     changeDiff(e.target.value, id);
                                                            // }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                        短繳
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center"></TableCell>
                                                    {/* {actionName === 'viewDeducted' ? (
                                                        <StyledTableCell align="center">一般、賠償</StyledTableCell>
                                                    ) : (
                                                        ''
                                                    )}
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">{`1`}</TableCell>
                                                    <TableCell sx={{ fontSize: '0.1rem' }} align="center">{`$${handleNumber(
                                                        afterDiff.toFixed(2)
                                                    )}`}</TableCell>
                                                    {actionName === 'deduct' ? (
                                                        <TableCell sx={{ fontSize: '0.1rem' }} align="center">
                                                            <Button
                                                                color="primary"
                                                                variant={editItem === id ? 'contained' : 'outlined'}
                                                                size="small"
                                                                onClick={() => {
                                                                    deductWork(id);
                                                                }}
                                                            >
                                                                折抵
                                                            </Button>
                                                        </TableCell>
                                                    ) : (
                                                        ''
                                                    )} */}
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </MainCard>
                    </Grid>
                    {isDeductWorkOpen && actionName === 'deduct' ? (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <MainCard title={`${deductInfo.PartyName}可折抵CB`}>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="center">NO</StyledTableCell>
                                                        <StyledTableCell align="center">CB種類</StyledTableCell>
                                                        <StyledTableCell align="center">可折抵金額</StyledTableCell>
                                                        <StyledTableCell align="center">摘要說明</StyledTableCell>
                                                        <StyledTableCell align="center">折抵金額</StyledTableCell>
                                                        <StyledTableCell align="center">剩餘可折抵金額</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {toBillDataInfo.map((row, id) => {
                                                        let afterDiff = row.FeeAmountPost + row.Difference;
                                                        return (
                                                            <TableRow
                                                                key={row.FeeAmountPre + row?.PartyName + row?.LBRatio}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell align="center">{row.FeeItem}</TableCell>
                                                                <TableCell align="center">{row.PartyName}</TableCell>
                                                                <TableCell align="center">{`${row.LBRatio}%`}</TableCell>
                                                                <TableCell align="center">{`$${handleNumber(
                                                                    row.FeeAmountPost
                                                                )}`}</TableCell>
                                                                <TableCell align="center">
                                                                    <TextField
                                                                        label="$"
                                                                        size="small"
                                                                        type="number"
                                                                        style={{ width: '30%' }}
                                                                        // value={diffNumber}
                                                                        onChange={(e) => {
                                                                            changeDiff(e.target.value, id);
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">{`$${handleNumber(
                                                                    afterDiff.toFixed(2)
                                                                )}`}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="end">
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            size="small"
                                            sx={{ ml: '0.5rem', mt: '0.5rem' }}
                                            onClick={() => {
                                                setIsDeductWorkOpen(false);
                                                setEditItem();
                                            }}
                                        >
                                            儲存
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            size="small"
                                            sx={{ ml: '0.5rem', mt: '0.5rem' }}
                                            onClick={() => {
                                                setIsDeductWorkOpen(false);
                                                setEditItem();
                                            }}
                                        >
                                            取消
                                        </Button>
                                    </Grid>
                                </Grid>
                            </MainCard>
                        </Grid>
                    ) : (
                        ''
                    )}
                </Grid>
                {/* <DialogContentText sx={{ fontSize: '20px', mt: '0.5rem' }}>總金額：${handleNumber(totalAmount)}</DialogContentText> */}
            </DialogContent>
            <DialogActions>
                {actionName === 'deduct' ? (
                    <>
                        <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                            儲存
                        </Button>
                        <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                            Reset
                        </Button>
                    </>
                ) : (
                    ''
                )}
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleDialogClose();
                        setIsDeductWorkOpen(false);
                        setEditItem();
                    }}
                >
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ToGenerateDataList;
