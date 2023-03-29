import { useState, useRef, useEffect } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
import { combineInvo, isBillNoCheckOK, invoCombine, generateBillNoCovert } from 'components/apis';
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
    DialogActions,
    TextField,
    Checkbox
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';
// day
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const fakeData = {
    message: 'success',
    BillMaster: {
        BillingNo: '3345678',
        PartyName: 'str',
        SubmarineCable: 'str',
        WorkTitle: 'str',
        IssueDate: '2022-09-09T12:00:00',
        DueDate: '2022-09-09T12:00:00',
        FeeAmountSum: 19870131.8888,
        ReceivedAmountSum: 19870131.8888,
        IsPro: true,
        Status: 'str'
    },
    BillDetail: [
        {
            WKMasterID: 131,
            InvDetailID: 131,
            PartyName: 'str',
            SupplierName: 'str',
            SubmarineC: 'str',
            WorkTitle: 'O&M',
            BillMilestone: 'str',
            SubmarineCable: 'str',
            FeeItem: 'str',
            FeeAmount: 999,
            OrgFeeAmount: 19870131.8888,
            DedAmount: 19870131.8888,
            FeeAmount: 19870131.8888,
            ReceivedAmount: 19870131.8888,
            OverAmount: 19870131.8888,
            ShortAmount: 19870131.8888,
            BankFees: 19870131.8888,
            ShortOverReason: 'str',
            WriteOffDate: '2022-09-09T12:00:00',
            ReceiveDate: '2022-09-09T12:00:00',
            Note: 'str',
            ToCBAmount: 'str',
            Status: 'str'
        },
        {
            WKMasterID: 131,
            InvDetailID: 131,
            PartyName: 'str',
            SupplierName: 'str',
            SubmarineC: 'str',
            WorkTitle: 'O&M',
            SubmarineCable: 'str',
            BillMilestone: 'str',
            FeeItem: 'str',
            OrgFeeAmount: 19870131.8888,
            DedAmount: 19870131.8888,
            FeeAmount: 19870131.8888,
            ReceivedAmount: 19870131.8888,
            OverAmount: 19870131.8888,
            ShortAmount: 19870131.8888,
            BankFees: 19870131.8888,
            ShortOverReason: 'str',
            FeeAmount: 999,
            WriteOffDate: '2022-09-09T12:00:00',
            ReceiveDate: '2022-09-09T12:00:00',
            Note: 'str',
            ToCBAmount: 'str',
            Status: 'str'
        }
    ]
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.gary,
        color: theme.palette.common.black,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem'
    },
    [`&.${tableCellClasses.body}.totalAmount`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        backgroundColor: '#CFD8DC'
    }
}));

const ToCombineDataList = ({ handleDialogClose, isDialogOpen, dataList, totalCombineAmount }) => {
    const dispatch = useDispatch();
    const [issueDate, setIssueDate] = useState(new Date()); //發票日期
    const [poNo, setPoNo] = useState(''); //PO號碼
    const [billList, setBillList] = useState(fakeData);
    const [billingNo, setBillingNo] = useState('');
    const billingNoOld = useRef('');
    const [cbToCn, setCbToCn] = useState({}); //處理狀態
    const sendComBineData = useRef({}); //按下合併帳單時送出的資料
    const totalAmount = useRef(0);

    const handleChange = (event) => {
        setCbToCn({ ...cbToCn, [event.target.name]: event.target.checked });
    };

    const handleCancel = () => {
        handleDialogClose();
        setIssueDate(new Date());
        setBillingNo('');
        billingNoOld.current = '';
        totalAmount.current = 0;
    };

    //自動產生號碼
    const billNoGenerate = () => {
        let tmpArray = {
            BillingNo: billingNoOld.current
        };
        console.log('tmpArray=>>', tmpArray);
        fetch(generateBillNoCovert, {
            method: 'POST',
            body: JSON.stringify(tmpArray)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.BillingNo.length > 0) {
                    setBillingNo(data.BillingNo);
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    //合併帳單
    const handleCombine = () => {
        let tmpArray = {
            BillingNo: billingNo
        };
        billList.BillMaster.BillingNo = billingNo;
        // billList.BillMaster.DueDate = dayjs(issueDate).format('YYYY-MM-DD hh:mm:ss');
        billList.DueDate = dayjs(issueDate).format('YYYY-MM-DD hh:mm:ss');
        billList.PONo = poNo;
        console.log('billList=>>', billList);
        fetch(isBillNoCheckOK, {
            method: 'POST',
            body: JSON.stringify(tmpArray)
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.isExist) {
                    fetch(invoCombine, {
                        method: 'POST',
                        body: JSON.stringify(billList)
                    })
                        .then((res) => res.json())
                        .then(() => {
                            dispatch(
                                setMessageStateOpen({
                                    messageStateOpen: { isOpen: true, severity: 'success', message: '合併帳單成功' }
                                })
                            );
                            handleDialogClose();
                        })
                        .catch((e) => console.log('e1=>', e));
                } else {
                    dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '帳單號碼已重複' } }));
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        let tmpAmount = 0;
        let tmpSendArray = [];
        let tmpArray = dataList.filter((i) => {
            return cbToCn[i.InvoiceMaster.InvMasterID];
        });
        console.log('dataList=>>', dataList);
        console.log('cbToCn=>>', cbToCn);
        console.log('tmpArray=>>', tmpArray);
        tmpArray.forEach((i) => {
            tmpAmount = tmpAmount + i.InvoiceDetail[0].FeeAmountPre;
            tmpSendArray.push(i.InvoiceMaster);
        });
        console.log('tmpSendArray=>>', tmpSendArray);
        sendComBineData.current = { InvoiceMaster: tmpSendArray }; //按下合併帳單時，送出的資料
        totalCombineAmount.current = tmpAmount;
    }, [cbToCn]);

    useEffect(() => {
        if (isDialogOpen) {
            let tmpAmount = 0;
            fetch(combineInvo, {
                method: 'POST',
                body: JSON.stringify(sendComBineData.current)
            })
                .then((res) => res.json())
                .then((data) => {
                    setBillList(data);
                    billingNoOld.current = data.BillMaster.BillingNo;
                    data.BillDetail.forEach((i) => {
                        tmpAmount = tmpAmount + i.OrgFeeAmount;
                    });
                    totalAmount.current = tmpAmount;
                })
                .catch((e) => console.log('e1=>', e));
        }
    }, [isDialogOpen]);

    return (
        <>
            <Dialog onClose={handleDialogClose} maxWidth="md" fullWidth open={isDialogOpen}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                    合併帳單作業
                </BootstrapDialogTitle>
                <DialogContent>
                    <Grid container spacing={1} display="flex">
                        <Grid item xs={6} sm={3} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                帳單到期日期：
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3} md={2} lg={2}>
                            <FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        inputFormat="YYYY/MM/DD"
                                        value={issueDate}
                                        onChange={(e) => {
                                            setIssueDate(e);
                                        }}
                                        renderInput={(params) => <TextField size="small" {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={3} md={1} lg={1} display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                PO號碼：
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3} md={2} lg={2}>
                            <TextField
                                value={poNo}
                                fullWidth
                                variant="outlined"
                                size="small"
                                // type="number"
                                label="填寫Po號碼"
                                onChange={(e) => {
                                    setPoNo(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} md={1} lg={1} display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                帳單號碼：
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3} md={2} lg={2}>
                            <TextField
                                value={billingNo}
                                fullWidth
                                variant="outlined"
                                size="small"
                                // type="number"
                                label="填寫帳單號碼"
                                onChange={(e) => {
                                    setBillingNo(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={0} sm={0} md={2} lg={2} display="flex" justifyContent="start" alignItems="center">
                            <Button sx={{ ml: '0.rem' }} variant="contained" size="small" onClick={billNoGenerate}>
                                自動產生號碼
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">會員</StyledTableCell>
                                            <StyledTableCell align="center">發票代碼</StyledTableCell>
                                            <StyledTableCell align="center">供應商</StyledTableCell>
                                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                                            <StyledTableCell align="center">發票日期</StyledTableCell>
                                            <StyledTableCell align="center">總金額</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {billList.BillDetail.map((row, id) => {
                                            return (
                                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell align="center">{row.PartyName}</TableCell>
                                                    <TableCell align="center">{row.InvoiceNo}</TableCell>
                                                    <TableCell align="center">{row.SupplierName}</TableCell>
                                                    <TableCell align="center">{row.SubmarineCable}</TableCell>
                                                    <TableCell align="center">{dayjs(row.IssueDate).format('YYYY/MM/DD')}</TableCell>
                                                    <TableCell align="center">{`$${handleNumber(row.FeeAmount.toFixed(2))}`}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <StyledTableCell className="totalAmount" align="center">
                                                Total
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">{`$${handleNumber(
                                                totalAmount.current.toFixed(2)
                                            )}`}</StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    {/* <DialogContentText sx={{ fontSize: '20px', mt: '0.5rem' }}>
                        總金額：${handleNumber(totalCombineAmount.current)}
                    </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleCombine}>
                        合併
                    </Button>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleCancel}>
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">會員</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">發票代碼</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">合約種類</StyledTableCell>
                            <StyledTableCell align="center">發票日期</StyledTableCell>
                            <StyledTableCell align="center">明細數量</StyledTableCell>
                            <StyledTableCell align="center">總價</StyledTableCell>
                            <StyledTableCell align="center">處理狀態</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataList.map((row, id) => {
                            let tmpAmount = 0;
                            row.InvoiceDetail.forEach((i) => {
                                tmpAmount = tmpAmount + i.FeeAmountPost;
                            });
                            return (
                                <TableRow
                                    key={row.InvoiceMaster?.InvoiceNo + id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">
                                        <Checkbox
                                            name={row.InvoiceMaster?.InvMasterID}
                                            onChange={handleChange}
                                            checked={cbToCn.id}
                                            // sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{id + 1}</TableCell>
                                    <TableCell align="center">{row.InvoiceMaster?.PartyName}</TableCell>
                                    <TableCell align="center">{row.InvoiceMaster?.SubmarineCable}</TableCell>
                                    <TableCell align="center">{row.InvoiceMaster?.WorkTitle}</TableCell>
                                    <TableCell align="center">{row.InvoiceMaster?.InvoiceNo}</TableCell>
                                    <TableCell align="center">{row.InvoiceMaster?.SupplierName}</TableCell>
                                    <TableCell align="center">{row.InvoiceMaster?.ContractType}</TableCell>
                                    <TableCell align="center">{dayjs(row.InvoiceMaster?.IssueDate).format('YYYY/MM/DD')}</TableCell>
                                    <TableCell align="center">{row.InvoiceDetail ? row.InvoiceDetail.length : 0}</TableCell>
                                    <TableCell align="center">{`$${handleNumber(
                                        // row.InvoiceDetail ? row.InvoiceDetail[0].FeeAmountPre : 0
                                        tmpAmount
                                    )}`}</TableCell>
                                    <TableCell align="center">{row.InvoiceMaster?.Status}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ToCombineDataList;
