import { useState, useRef, useEffect } from 'react';

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
    Grid,
    Select,
    DialogActions,
    TextField,
    Checkbox,
    Box,
    MenuItem
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// api
import { saveWriteOff } from 'components/apis.jsx';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.gary,
        color: theme.palette.common.black,
        paddingTop: '0.1rem',
        paddingBottom: '0.1rem',
        overflowX: 'auto',
        minWidth: '100%'
    },
    [`&.${tableCellClasses.body}.totalAmount`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        backgroundColor: '#CFD8DC'
    }
}));

const fakeData = [
  {
    "BillMasterID": 5,
    "WriteOffDetailID": 18,
    "ReceivedAmount": 960.0,
    "Note": null,
    "InvoiceNo": "CHT-NCPUPG2022.B-230418",
    "BankFees": 10.0,
    "Status": "OVER",
    "FeeItem": "CBP Handling Fee_NCP Upgrade 2022.B BM0",
    "BankFee": 0.0,
    "BillMilestone": "2022.B_BM0",
    "ReceiveAmount": 0.0,
    "OrgFeeAmount": 951.32,
    "BRAmount": 0.0,
    "DedAmount": 0.0,
    "OverAmount": 8.68,
    "FeeAmount": 951.32,
    "ShortAmount": 0.0,
    "BillDetailID": 18,
    "ReceiveDate": "2023-10-18T10:45:00"
  },
  {
    "BillMasterID": 5,
    "WriteOffDetailID": 19,
    "ReceivedAmount": 14635.0,
    "Note": null,
    "InvoiceNo": "88561",
    "BankFees": 185.0,
    "Status": "OVER",
    "FeeItem": "BM0: Contract Agreement",
    "BankFee": 0.0,
    "BillMilestone": "2022.B_BM0",
    "ReceiveAmount": 0.0,
    "OrgFeeAmount": 14629.94,
    "BRAmount": 0.0,
    "DedAmount": 0.0,
    "OverAmount": 5.06,
    "FeeAmount": 14629.94,
    "ShortAmount": 0.0,
    "BillDetailID": 19,
    "ReceiveDate": "2023-10-18T12:30:00"
  },
  {
    "BillMasterID": 5,
    "WriteOffDetailID": 20,
    "ReceivedAmount": 27035.2,
    "Note": null,
    "InvoiceNo": "504893",
    "BankFees": 200.0,
    "Status": "OK",
    "FeeItem": "BM0: Contract Agreement",
    "BankFee": 0.0,
    "BillMilestone": "2022.B_BM0",
    "ReceiveAmount": 0.0,
    "OrgFeeAmount": 27135.2,
    "BRAmount": 0.0,
    "DedAmount": 0.0,
    "OverAmount": 0.0,
    "FeeAmount": 27135.2,
    "ShortAmount": 0.0,
    "BillDetailID": 20,
    "ReceiveDate": "2023-10-18T10:45:00"
  },
  {
    "BillMasterID": 5,
    "WriteOffDetailID": 21,
    "ReceivedAmount": 2176.09,
    "Note": null,
    "InvoiceNo": "16150",
    "BankFees": 53.0,
    "Status": "OK",
    "FeeItem": "BM0: Contract Agreement",
    "BankFee": 0.0,
    "BillMilestone": "2022.B_BM0",
    "ReceiveAmount": 0.0,
    "OrgFeeAmount": 2204.09,
    "BRAmount": 0.0,
    "DedAmount": 0.0,
    "OverAmount": 0.0,
    "FeeAmount": 2204.09,
    "ShortAmount": 0.0,
    "BillDetailID": 21,
    "ReceiveDate": "2023-10-18T12:30:00"
  }
]


const WriteOffWork = ({ isDialogOpen, handleDialogClose, writeOffInfo, writeOffDetail, writeOffInitQuery, action }) => {
    // const [toWriteOffMasterInfo, setToWriteOffMasterInfo] = useState({}); //帳單明細檔
    const [toWriteOffDetailInfo, setToWriteOffDetailInfo] = useState([]); //帳單明細檔
    const orgFeeAmountTotal = useRef(0); //原始費用
    const dedAmountTotal = useRef(0); //折抵費用
    const feeAmountTotal = useRef(0); //應繳費用
    const receivedAmountTotal = useRef(0); //累計費用
    const bankFeesTotal = useRef(0); //累計手續費

    let tmpBankFee = 0;//本次手續費
    let tmpreceiveAmount = 0; //本次實收
    let tmpTotal = 0; //本次總金額
    let tmpOverAmount = 0; //重溢繳
    let tmpShortAmount = 0; //短繳
    let tmpChangeState = 0;

    // 本次手續費
    const changeBankFee = (bankFee, id) => {
        let tmpArray = toWriteOffDetailInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.BillDetailID === id) {
                let tmpBRAmount = Number(i.ReceiveAmount.toString().replaceAll(',', '')) + Number(bankFee.toString().replaceAll(',', ''));
                i.BankFee = bankFee;
                i.BRAmount = tmpBRAmount;
                i.OverAmount = (Number(i.ReceiveAmount.toString().replaceAll(',', '')) + Number(i.ReceivedAmount.toString().replaceAll(',', ''))) - Number(i.FeeAmount.toString().replaceAll(',', ''))
                    <= 0 ? 0 : 
                (Number(i.ReceiveAmount.toString().replaceAll(',', '')) + Number(i.ReceivedAmount.toString().replaceAll(',', ''))) - Number(i.FeeAmount.toString().replaceAll(',', ''));
                i.ShortAmount = Number(i.FeeAmount.toString().replaceAll(',', '')) -  Number(i.ReceivedAmount.toString().replaceAll(',', '')) -  Number(i.BankFees.toString().replaceAll(',', '')) - tmpBRAmount
                    <= 0 ? 0 :
                Number(i.FeeAmount.toString().replaceAll(',', '')) -  Number(i.ReceivedAmount.toString().replaceAll(',', '')) -  Number(i.BankFees.toString().replaceAll(',', '')) - tmpBRAmount;
            }
        });
        // console.log('tmpArray=>>', tmpArray);
        setToWriteOffDetailInfo(tmpArray);
    };

    // 本次實收
    const changeReceiveAmount = (receiveAmount, id) => {
        let tmpArray = toWriteOffDetailInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.BillDetailID === id) {
                let tmpBRAmount = Number(i.BankFee.toString().replaceAll(',', '')) + Number(receiveAmount.toString().replaceAll(',', ''));
                i.ReceiveAmount = receiveAmount;
                i.BRAmount = tmpBRAmount;
                i.OverAmount = (Number(receiveAmount.toString().replaceAll(',', '')) + Number(i.ReceivedAmount.toString().replaceAll(',', ''))) - Number(i.FeeAmount.toString().replaceAll(',', '')) 
                    <= 0 ? 0 : 
                (Number(receiveAmount.toString().replaceAll(',', '')) + Number(i.ReceivedAmount.toString().replaceAll(',', ''))) - Number(i.FeeAmount.toString().replaceAll(',', ''));
                i.ShortAmount = Number(i.FeeAmount.toString().replaceAll(',', '')) -  Number(i.ReceivedAmount.toString().replaceAll(',', '')) -  Number(i.BankFees.toString().replaceAll(',', '')) - tmpBRAmount
                    <= 0 ? 0 :
                Number(i.FeeAmount.toString().replaceAll(',', '')) -  Number(i.ReceivedAmount.toString().replaceAll(',', '')) -  Number(i.BankFees.toString().replaceAll(',', '')) - tmpBRAmount;
            } else {
            }
        });
        setToWriteOffDetailInfo(tmpArray);
    };

    const changeReceiveDate = (receiveDate, id) => {
        let tmpArray = toWriteOffDetailInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.BillDetailID === id) {
                i.ReceiveDate = dayjs(receiveDate).format('YYYY/MM/DD');
            }
        });
        setToWriteOffDetailInfo(tmpArray);
    };

    const changeNote = (note, id) => {
        let tmpArray = toWriteOffDetailInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.BillDetailID === id) {
                i.Note = note;
            }
        });
        setToWriteOffDetailInfo(tmpArray);
    };

    const changeState = (status, id) => {
        let tmpArray = toWriteOffDetailInfo.map((i) => i);
        tmpArray.forEach((i) => {
            if (i.BillDetailID === id) {
                i.Status = status;
                console.log('status=>>', status);
                if(status === 'OK'){
                    tmpChangeState = Number(i.ReceiveAmount.toString().replaceAll(',', '')) + Number(i.ShortAmount.toString().replaceAll(',', ''));
                    i.ReceiveAmount = tmpChangeState.toFixed(2);
                    i.BRAmount = tmpChangeState + Number(i.BankFee.toString().replaceAll(',', ''));
                    i.ShortAmount = Number(i.FeeAmount.toString().replaceAll(',', '')) - Number(i.ReceivedAmount.toString().replaceAll(',', '')) - Number(i.BankFees.toString().replaceAll(',', '')) - tmpChangeState -  Number(i.BankFee.toString().replaceAll(',', ''))
                      <= 0 ? 0 :
                    Number(i.FeeAmount.toString().replaceAll(',', '')) - Number(i.ReceivedAmount.toString().replaceAll(',', '')) - Number(i.BankFees.toString().replaceAll(',', '')) - tmpChangeState - Number(i.BankFee.toString().replaceAll(',', ''));
                }
            }
        });
        setToWriteOffDetailInfo(tmpArray);
    };

    const initData = () => {
        let tmpArray = JSON.parse(JSON.stringify(writeOffDetail));
        let tmpOrgFeeAmountTotal = 0; //原始費用
        let tmpDedAmountTotal = 0; //折扣
        let tmpFeeAmountTotal = 0; //應收
        let tmpReceivedAmountTotal = 0; //累計費用
        let tmpBankFeesTotal = 0; //累計手續費
        if(action === 'view') {
            tmpArray.forEach((i) => {
                i.ReceiveAmount = 0; //本次實收(暫時)
                i.BankFee = 0; //本次手續費(暫時)
                i.BRAmount = 0; //總金額(暫時)
                // i.BankFees = 0; //累積手續費(暫時)
                // i.ShortAmount = 0; //短繳
                // i.OverAmount = 0; //重溢繳
                tmpOrgFeeAmountTotal = tmpOrgFeeAmountTotal + i.OrgFeeAmount;
                tmpDedAmountTotal = tmpDedAmountTotal + i.DedAmount;
                tmpFeeAmountTotal = tmpFeeAmountTotal + i.FeeAmount;
                tmpReceivedAmountTotal = tmpReceivedAmountTotal + i.ReceivedAmount;
                tmpBankFeesTotal = tmpBankFeesTotal + i.BankFees;
                i.OverAmount = (Number(i.ReceiveAmount.toString().replaceAll(',', '')) + Number(i.ReceivedAmount.toString().replaceAll(',', ''))) - Number(i.FeeAmount.toString().replaceAll(',', '')) 
                    <= 0 ? 0 : 
                (Number(i.ReceiveAmount.toString().replaceAll(',', '')) + Number(i.ReceivedAmount.toString().replaceAll(',', ''))) - Number(i.FeeAmount.toString().replaceAll(',', ''));
                
                i.ShortAmount = Number(i.FeeAmount.toString().replaceAll(',', '')) -  Number(i.ReceivedAmount.toString().replaceAll(',', '')) -  Number(i.BankFees.toString().replaceAll(',', '')) - Number(i.BRAmount.toString().replaceAll(',', ''))
                    <= 0 ? 0 :
                Number(i.FeeAmount.toString().replaceAll(',', '')) -  Number(i.ReceivedAmount.toString().replaceAll(',', '')) -  Number(i.BankFees.toString().replaceAll(',', '')) - Number(i.BRAmount.toString().replaceAll(',', ''));
            });
            orgFeeAmountTotal.current = tmpOrgFeeAmountTotal; //原始費用
            dedAmountTotal.current = tmpDedAmountTotal; //折扣
            feeAmountTotal.current = tmpFeeAmountTotal; //應收
            receivedAmountTotal.current = tmpReceivedAmountTotal; //累計費用
            bankFeesTotal.current = tmpBankFeesTotal; //累計手續費
            setToWriteOffDetailInfo(tmpArray);
        } else {
            tmpArray.forEach((i) => {
                // i.ReceiveAmount = 0; //本次實收(暫時)
                // i.BankFees = 0; //累積手續費(暫時)
                // i.BankFee = 0; //本次手續費(暫時)
                // i.BRAmount = 0; //總金額(暫時)
                // i.ShortAmount = 0; //短繳
                // i.OverAmount = 0; //重溢繳
                tmpOrgFeeAmountTotal = tmpOrgFeeAmountTotal + i.OrgFeeAmount;
                tmpDedAmountTotal = tmpDedAmountTotal + i.DedAmount;
                tmpFeeAmountTotal = tmpFeeAmountTotal + i.FeeAmount;
                tmpReceivedAmountTotal = tmpReceivedAmountTotal + i.ReceivedAmount;
                tmpBankFeesTotal = tmpBankFeesTotal + i.BankFees;
                console.log(i.ReceiveAmount);
                console.log(i.ReceivedAmount)
                i.OverAmount = (Number(i.ReceiveAmount.toString().replaceAll(',', '')) + Number(i.ReceivedAmount.toString().replaceAll(',', ''))) - Number(i.FeeAmount.toString().replaceAll(',', '')) 
                    <= 0 ? 0 : 
                (Number(i.ReceiveAmount.toString().replaceAll(',', '')) + Number(i.ReceivedAmount.toString().replaceAll(',', ''))) - Number(i.FeeAmount.toString().replaceAll(',', ''));
                
                i.ShortAmount = Number(i.FeeAmount.toString().replaceAll(',', '')) -  Number(i.ReceivedAmount.toString().replaceAll(',', '')) -  Number(i.BankFees.toString().replaceAll(',', '')) - Number(i.BRAmount.toString().replaceAll(',', ''))
                    <= 0 ? 0 :
                Number(i.FeeAmount.toString().replaceAll(',', '')) -  Number(i.ReceivedAmount.toString().replaceAll(',', '')) -  Number(i.BankFees.toString().replaceAll(',', '')) - Number(i.BRAmount.toString().replaceAll(',', ''));
            });
            orgFeeAmountTotal.current = tmpOrgFeeAmountTotal; //原始費用
            dedAmountTotal.current = tmpDedAmountTotal; //折扣
            feeAmountTotal.current = tmpFeeAmountTotal; //應收
            receivedAmountTotal.current = tmpReceivedAmountTotal; //累計費用
            bankFeesTotal.current = tmpBankFeesTotal; //累計手續費
            setToWriteOffDetailInfo(tmpArray);
        }
   
    };

    const saveData = () => {
        let tmpArray = {};
        tmpArray = {
            WriteOffDetailList: toWriteOffDetailInfo
        };
        console.log('tmpArray=>>', tmpArray);
        fetch(saveWriteOff, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then(() => {
                writeOffInitQuery();
                handleClose();
            })
            .catch((e) => console.log('e1=>', e));
    };

    const handleClose = () => {
        handleDialogClose();
        setToWriteOffDetailInfo([]);
        // setToWriteOffMasterInfo({});
        orgFeeAmountTotal.current = 0; //原始費用
        dedAmountTotal.current = 0; //折抵費用
        feeAmountTotal.current = 0; //應繳費用
        receivedAmountTotal.current = 0; //累計費用
    };

    useEffect(() => {
        if (writeOffDetail?.length > 0 && isDialogOpen) {
            initData();
        }
    }, [writeOffDetail, isDialogOpen]);

    return (
        <Dialog maxWidth="xxl" open={isDialogOpen}>
            <BootstrapDialogTitle>{action !== 'view' ? '收款銷帳作業' : '已銷帳明細'}</BootstrapDialogTitle>
            <DialogContent>
                <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 10 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container spacing={0} display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 10 }}>
                            <Grid item sm={1} md={1} lg={1}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.7rem' ,xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    會員：
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <TextField value={writeOffInfo?.PartyName} fullWidth disabled={true} variant="outlined" size="small" />
                            </Grid>
                            <Grid item sm={1} md={1} lg={1}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.7rem' ,xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    發票截止日期：
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <TextField
                                    value={dayjs(writeOffInfo?.DueDate).format('YYYY/MM/DD')}
                                    fullWidth
                                    disabled={true}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item sm={1} md={1} lg={1}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.7rem' ,xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    海纜名稱：
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <TextField value={writeOffInfo?.SubmarineCable} fullWidth disabled={true} variant="outlined" size="small" />
                            </Grid>
                            <Grid item sm={1} md={1} lg={1}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.7rem' ,xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    海纜作業：
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <TextField value={writeOffInfo?.WorkTitle} fullWidth disabled={true} variant="outlined" size="small" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <MainCard title="帳單明細列表">
                            <TableContainer component={Paper} sx={{ maxHeight: window.screen.height * 0.5 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">發票號碼</StyledTableCell>
                                            <StyledTableCell align="center">費用項目</StyledTableCell>
                                            <StyledTableCell align="center">計帳段號</StyledTableCell>
                                            <StyledTableCell align="center">原始費用</StyledTableCell>
                                            <StyledTableCell align="center">抵扣</StyledTableCell>
                                            <StyledTableCell align="center">應收</StyledTableCell>
                                            <StyledTableCell align="center">累計實收</StyledTableCell>
                                            <StyledTableCell align="center">累計手續費</StyledTableCell>
                                            {action === 'view' ? '' : <StyledTableCell align="center">本次手續費</StyledTableCell>}
                                            {action === 'view' ? '' : <StyledTableCell align="center">本次實收</StyledTableCell>}
                                            {action === 'view' ? '' : <StyledTableCell align="center">本次總金額</StyledTableCell>}
                                            <StyledTableCell align="center">重溢繳</StyledTableCell>
                                            <StyledTableCell align="center">短繳</StyledTableCell>
                                            <StyledTableCell align="center">收款日期</StyledTableCell>
                                            <StyledTableCell align="center">摘要說明</StyledTableCell>
                                            <StyledTableCell align="center">收費狀態</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {toWriteOffDetailInfo?.map((row, id) => {
                                            tmpBankFee = tmpBankFee + Number(row.BankFee.toString().replaceAll(',', ''));//本次手續費
                                            tmpreceiveAmount = tmpreceiveAmount + Number(row.ReceiveAmount.toString().replaceAll(',', '')); //本次實收
                                            tmpTotal = tmpTotal + row.BRAmount; //實收加總
                                            tmpOverAmount = tmpOverAmount + row.OverAmount; //溢繳加總
                                            tmpShortAmount = tmpShortAmount +  row.ShortAmount; //短繳加總
                                            return (
                                                <TableRow
                                                    key={id + row?.InvoiceNo + row?.FeeItem + row?.OrgFeeAmount}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center" sx={{ minWidth: 75 }}>
                                                        {row?.InvoiceNo}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ minWidth: 75 }}>
                                                        {row?.FeeItem}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ minWidth: 75 }}>
                                                        {row?.BillMilestone}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {handleNumber(row?.OrgFeeAmount.toFixed(2))}
                                                    </TableCell>
                                                    {/* 折抵 */}
                                                    <TableCell align="center">
                                                        {handleNumber(row?.DedAmount.toFixed(2))}
                                                    </TableCell>
                                                    {/* 應繳 */}
                                                    <TableCell align="center">
                                                        {handleNumber(row?.FeeAmount.toFixed(2))}
                                                    </TableCell>
                                                    {/* 累計實收 */}
                                                    <TableCell align="center">
                                                        {handleNumber(row?.ReceivedAmount.toFixed(2))}
                                                    </TableCell>
                                                    {/* 累計手續費 */}
                                                    <TableCell align="center">
                                                        {handleNumber(row?.BankFees.toFixed(2))}
                                                    </TableCell>
                                                    {/* 本次手續費 */}
                                                    {action === 'view' ? (
                                                        ''
                                                    ) : (
                                                        <TableCell align="center">
                                                            <TextField
                                                                // inputProps={{ step: '.01' }}
                                                                sx={{ minWidth: 75 }}
                                                                size="small"
                                                                fullWidth
                                                                value={handleNumber(row.BankFee)}
                                                                // type="number"
                                                                onChange={(e) => changeBankFee(e.target.value, row.BillDetailID)}
                                                            />
                                                        </TableCell>
                                                    )}
                                                    {/* 本次實收 */}
                                                    {action === 'view' ? (
                                                        ''
                                                    ) : (
                                                        <TableCell align="center">
                                                            <TextField
                                                                // inputProps={{ step: '.01' }}
                                                                sx={{ minWidth: 75 }}
                                                                size="small"
                                                                value={handleNumber(row.ReceiveAmount)}
                                                                // type="number"
                                                                onChange={(e) => {
                                                                    changeReceiveAmount(e.target.value, row.BillDetailID);
                                                                }}
                                                            />
                                                        </TableCell>
                                                    )}
                                                    {/* 本次總金額 */}
                                                    {action === 'view' ? (
                                                        ''
                                                    ) : (
                                                        <TableCell align="center">
                                                            {handleNumber(row?.BRAmount.toFixed(2))}
                                                        </TableCell>
                                                    )}
                                                    {/* 重溢繳 */}
                                                    {/* 重溢繳 : 本次實收+累計實收-應繳 > 0，則顯示其金額差額 */}
                                                    <TableCell align="center">
                                                        {handleNumber(row?.OverAmount.toFixed(2))}
                                                    </TableCell>
                                                    {/* 短繳 */}
                                                    {/* 短繳：本次實收+累計實收-應繳 (應該是負值或0) 取正值 跟 手續費比，如果大於 則顯示此正值的金額(顯示的金額不用減掉手續費) */}
                                                    {/* 短繳：應繳金額-累計實收金額-總金額(含手續費)  5/25以後 */}
                                                    <TableCell align="center">
                                                        {/* {tmpTotalAmount >= 0
                                                            ? '0.00'
                                                            : Math.abs(tmpTotalAmount) > Number(row.BankFees)
                                                            ? handleNumber(Math.abs(tmpTotalAmount).toFixed(2))
                                                            : '0.00'} */}
                                                        {/* 5/25以後 */}
                                                        {handleNumber(row?.ShortAmount.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {action === 'view' ? (
                                                            row.ReceiveDate
                                                        ) : (
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DesktopDatePicker
                                                                    // inputFormat="YYYY/MM/DD"
                                                                    value={row.ReceiveDate}
                                                                    // value={dayjs(row.ReceiveDate).format('YYYY/MM/DD')}
                                                                    onChange={(e) => {
                                                                        changeReceiveDate(e, row.BillDetailID);
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField size="small" sx={{ minWidth: 150 }} {...params} />
                                                                    )}
                                                                />
                                                            </LocalizationProvider>
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {action === 'view' ? (
                                                            row.Note
                                                        ) : (
                                                            <TextField
                                                                size="small"
                                                                sx={{ minWidth: 75 }}
                                                                value={row.Note}
                                                                onChange={(e) => {
                                                                    changeNote(e.target.value, row.BillDetailID);
                                                                }}
                                                            />
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Select
                                                            disabled={action === 'view'}
                                                            value={row.Status}
                                                            label="會員"
                                                            onChange={(e) => changeState(e.target.value, row.BillDetailID)}
                                                        >
                                                            <MenuItem value={'OK'}>正常繳款</MenuItem>
                                                            <MenuItem value={'OVER'}>重溢繳</MenuItem>
                                                            <MenuItem value={'PARTIAL'}>部分收款</MenuItem>
                                                            <MenuItem value={'INCOMPLETE'}>尚未收款</MenuItem>
                                                        </Select>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <StyledTableCell className="totalAmount" align="center">
                                                Total
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center" />
                                            <StyledTableCell className="totalAmount" align="center" />
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(orgFeeAmountTotal.current.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(dedAmountTotal.current.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(feeAmountTotal.current.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(receivedAmountTotal.current.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(bankFeesTotal.current.toFixed(2))}
                                            </StyledTableCell>
                                            {action === 'view' ? (
                                                ''
                                            ) : (
                                                <StyledTableCell className="totalAmount" align="center">
                                                    {handleNumber(tmpBankFee.toFixed(2))}
                                                </StyledTableCell>
                                            )}
                                            {action === 'view' ? (
                                                ''
                                            ) : (
                                                <StyledTableCell className="totalAmount" align="center">
                                                    {handleNumber(tmpreceiveAmount.toFixed(2))}
                                                </StyledTableCell>
                                            )}
                                            {action === 'view' ? (
                                                ''
                                            ) : (
                                                <StyledTableCell className="totalAmount" align="center">
                                                    {handleNumber(tmpTotal.toFixed(2))}
                                                </StyledTableCell>
                                            )}
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(tmpOverAmount.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                {handleNumber(tmpShortAmount.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </MainCard>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                        {action === 'view' ? (
                            ''
                        ) : (
                            <Box
                                sx={{
                                    fontSize: '12px',
                                    m: 1,
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    justifyContent: 'end',
                                    alignItems: 'center'
                                }}
                            >
                                <Box sx={{ color: 'red', mr: 2.5 }}>(提示：若有費用項目還未完成收款，原則上不用勾選)</Box>
                                <Box>
                                    <Checkbox checked={isComplete} onChange={handleChange} size="small" sx={{ p: 0 }} />
                                    確認此帳單完成銷帳作業
                                </Box>
                            </Box>
                        )}
                    </Grid> */}
                </Grid>
            </DialogContent>
            <DialogActions>
                {action === 'view' ? (
                    ''
                ) : (
                    <Box
                        sx={{
                            fontSize: '12px',
                            m: 1,
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center'
                        }}
                    >
                        <Button sx={{ mr: '0.05rem' }} disabled={action === 'view'} variant="contained" onClick={saveData}>
                            暫存
                        </Button>
                        {/* <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={initData}>
                    Reset
                </Button> */}
                    </Box>
                )}

                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleClose}>
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WriteOffWork;
