import { useState, useRef } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
import { addCB } from 'components/apis';
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

const ToGenerateDataList = ({ isDialogOpen, handleDialogClose, billDetailInfo, actionName }) => {
    const fakeData = [
        {
            CBID: 1,
            BLDetailID: 1,
            WorkTitle: 'test123',
            InvoiceNo: 'test123',
            PartyName: 'CHT',
            LastUpdDate: '2023-03-01 00:00:00',
            SubmarineCable: 'test123',
            CBType: 'test123',
            BillingNo: 'test123',
            BillMilestone: 'test123',
            CurrAmount: 3.14,
            CreateDate: '2023-03-0100:00:00',
            Note: 'test123'
        },
        {
            CBID: 2,
            BLDetailID: 2,
            WorkTitle: 'test456',
            InvoiceNo: 'test456',
            PartyName: 'CHT',
            LastUpdDate: '2023-03-02 00:00:00',
            SubmarineCable: 'test456',
            CBType: 'test456',
            BillingNo: 'test456',
            BillMilestone: 'test456',
            CurrAmount: 3.14,
            CreateDate: '2023-03-0100:00:00',
            Note: 'test456'
        }
    ];

    const [isDeductWorkOpen, setIsDeductWorkOpen] = useState(false);
    const [cbDataList, setCbDataList] = useState(fakeData);
    const tmpCBArray = useRef([]);
    const editItem = useRef(-1);
    const [cbToCn, setCbToCn] = useState({}); //處理狀態
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

    const deductWork = (data, id) => {
        let tmpQuery =
            addCB +
            '/SubmarineCable=' +
            data.SubmarineCable +
            '&WorkTitle=' +
            data.WorkTitle +
            '&BillMilestone=' +
            data.BillMilestone +
            '&PartyName=' +
            data.PartyName;
        console.log('tmpQuery=>>', tmpQuery);
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCbDataList(data);
                }
            })
            .catch((e) => console.log('e1=>>', e));
        editItem.current = id;
        setIsDeductWorkOpen(true);
    };

    const changeDiff = (value, cbid) => {
        let tmpArray = tmpCBArray.current.map((i) => i);
        if (tmpArray.length > 0) {
            tmpArray.forEach((i) => {
                console.log(i.CBID, cbid);
                if (i.CBID === cbid) {
                    console.log('YES');
                    i.TransAmount = value;
                } else {
                    console.log('NO');
                    tmpArray.push({ CBID: cbid, TransAmount: value });
                }
            });
        } else {
            console.log('NONO');
            tmpArray.push({ CBID: cbid, TransAmount: value });
        }
        tmpCBArray.current = tmpArray;
        console.log('data=>>', tmpCBArray.current);

        // setCbToCn({ ...cbToCn, CBID: cbid });
        // let tmpArray = cbDataList.map((i) => i);
        // let tmpAmount = 0;
        // tmpArray[id].Difference = Number(diff);
        // tmpArray.forEach((i) => {
        //     tmpAmount = tmpAmount + i.FeeAmountPost + i.Difference;
        // });
        // setToBillDataInfo(tmpArray);
        // setCurrentAmount(tmpAmount.toFixed(2));
    };

    return (
        <Dialog onClose={handleDialogClose} maxWidth="xl" open={isDialogOpen}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                折抵作業
            </BootstrapDialogTitle>
            <DialogContent>
                <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 10 }}>
                    {actionName === 'view' ? (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 10 }}>
                                <Grid item xs={1} sm={1} md={1} lg={1} />
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                    >
                                        會員：
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <TextField
                                        value={billDetailInfo.PartyName}
                                        fullWidth
                                        disabled={true}
                                        variant="outlined"
                                        size="small"
                                        // type="number"
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                    >
                                        發票截止日期：
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <TextField value={billDetailInfo.IssueDate} fullWidth disabled={true} variant="outlined" size="small" />
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} lg={1} />
                                <Grid item xs={1} sm={1} md={1} lg={1} />
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                    >
                                        海纜名稱：
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <TextField
                                        value={billDetailInfo.SubmarineCable}
                                        fullWidth
                                        disabled={true}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                    >
                                        海纜作業：
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <TextField value={billDetailInfo.WorkTitle} fullWidth disabled={true} variant="outlined" size="small" />
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} lg={1} />
                            </Grid>
                        </Grid>
                    ) : (
                        ''
                    )}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <MainCard title="帳單明細列表">
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">NO</StyledTableCell>
                                            <StyledTableCell align="center">費用項目</StyledTableCell>
                                            <StyledTableCell align="center">費用金額</StyledTableCell>
                                            {/* {actionName === 'deduct' ? <StyledTableCell align="center">折抵CB種類</StyledTableCell> : ''} */}
                                            <StyledTableCell align="center">折抵金額</StyledTableCell>
                                            <StyledTableCell align="center">總金額</StyledTableCell>
                                            {actionName === 'deduct' ? <StyledTableCell align="center">Action</StyledTableCell> : ''}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {billDetailInfo.map((row, id) => {
                                            return (
                                                <TableRow
                                                    key={row.BillMasterID + row?.BillDetailID + row?.InvDetailID}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{id + 1}</TableCell>
                                                    <TableCell align="center">{row.FeeItem}</TableCell>
                                                    <TableCell align="center">{`$${handleNumber(row.FeeAmount)}`}</TableCell>
                                                    {/* {actionName === 'deduct' ? (
                                                        <StyledTableCell align="center">一般、賠償</StyledTableCell>
                                                    ) : (
                                                        ''
                                                    )} */}
                                                    <TableCell align="center">{`$${handleNumber(row.FeeAmount)}`}</TableCell>
                                                    <TableCell align="center">{`$${handleNumber(row.DedAmount.toFixed(2))}`}</TableCell>
                                                    {actionName === 'deduct' ? (
                                                        <TableCell align="center">
                                                            <Button
                                                                color="primary"
                                                                variant={editItem.current === id ? 'contained' : 'outlined'}
                                                                size="small"
                                                                onClick={() => {
                                                                    deductWork(row, id);
                                                                }}
                                                            >
                                                                折抵
                                                            </Button>
                                                        </TableCell>
                                                    ) : (
                                                        ''
                                                    )}
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
                            <MainCard title={`${billDetailInfo.PartyName}可折抵CB`}>
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
                                                    {cbDataList.map((row, id) => {
                                                        // let afterDiff = row.FeeAmountPost + row.Difference;
                                                        return (
                                                            <TableRow
                                                                key={row.CBType + row?.CurrAmount + row?.Note}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell align="center">{id + 1}</TableCell>
                                                                <TableCell align="center">{row.CBType}</TableCell>
                                                                <TableCell align="center">{row.CurrAmount}</TableCell>
                                                                <TableCell align="center">{row.Note}</TableCell>
                                                                <TableCell align="center">
                                                                    <TextField
                                                                        label="$"
                                                                        size="small"
                                                                        type="number"
                                                                        style={{ width: '30%' }}
                                                                        // value={diffNumber}
                                                                        onChange={(e) => {
                                                                            changeDiff(e.target.value, row.CBID);
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                {/* <TableCell align="center">{`$${handleNumber(
                                                                    afterDiff.toFixed(2)
                                                                )}`}</TableCell> */}
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
                                                editItem.current = -1;
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
                                                editItem.current = -1;
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
                        editItem.current = -1;
                    }}
                >
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ToGenerateDataList;
