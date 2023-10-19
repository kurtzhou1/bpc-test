import { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    TextField,
    Checkbox,
    Autocomplete,
    Table,
    Tabs,
    Tab
} from '@mui/material';

// day
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// project import
import MainCard from 'components/MainCard';
import { BootstrapDialogTitle, TabPanel } from 'components/commonFunction';
import { handleNumber } from 'components/commonFunction';
// table
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// api
import { queryToDecutBill } from 'components/apis.jsx';

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
        BillMaster: {
            BillingNo: '03UP-CT2303300920',
            PONo: '',
            WorkTitle: 'Upgrade',
            PartyName: 'CT',
            DueDate: '2023-03-30T05:20:03',
            ReceivedAmountSum: 73494,
            IsPro: false,
            URI: 's3://cht-deploy-bucket-1/OpenAI API串接課程_3-30.pdf',
            SubmarineCable: 'TPE',
            BillMasterID: 2,
            IssueDate: '2023-03-30T09:20:47',
            FeeAmountSum: 73494,
            BankFees: 0,
            Status: 'COMPLETE'
        },
        BillDetail: [
            {
                SubmarineCable: 'TPE',
                OverAmount: 0,
                Status: 'OK',
                BillMasterID: 2,
                WorkTitle: 'Upgrade',
                ShortAmount: 0,
                BillDetailID: 5,
                BillMilestone: '11_BM1',
                ToCBAmount: 0,
                WKMasterID: 1,
                FeeItem: 'BM1: Contract Agreement\n',
                PaidAmount: 63398,
                InvoiceNo: '503041',
                OrgFeeAmount: 63398,
                ShortOverReason: null,
                InvDetailID: 2,
                DedAmount: 0,
                WriteOffDate: '2023-05-18T11:12:11',
                PartyName: 'CT',
                FeeAmount: 63398,
                ReceiveDate: '2023-01-03T00:00:00',
                SupplierName: 'Ciena-US',
                ReceivedAmount: 63398,
                Note: '無欠手續費'
            },
            {
                SubmarineCable: 'TPE',
                OverAmount: 0,
                Status: 'OK',
                BillMasterID: 2,
                WorkTitle: 'Upgrade',
                ShortAmount: 0,
                BillDetailID: 6,
                BillMilestone: '11_BM1',
                ToCBAmount: 0,
                WKMasterID: 2,
                FeeItem: 'BM1: Contract Agreement\n',
                PaidAmount: 7360,
                InvoiceNo: '15328',
                OrgFeeAmount: 7360,
                ShortOverReason: null,
                InvDetailID: 6,
                DedAmount: 0,
                WriteOffDate: '2023-05-18T11:12:11',
                PartyName: 'CT',
                FeeAmount: 7360,
                ReceiveDate: '2023-01-03T00:00:00',
                SupplierName: 'Ciena-US',
                ReceivedAmount: 7360,
                Note: '無欠手續費'
            },
            {
                SubmarineCable: 'TPE',
                OverAmount: 0,
                Status: 'OK',
                BillMasterID: 2,
                WorkTitle: 'Upgrade',
                ShortAmount: 0,
                BillDetailID: 7,
                BillMilestone: '11_BM1',
                ToCBAmount: 0,
                WKMasterID: 2,
                FeeItem: 'Services Tax of Japan\n',
                PaidAmount: 736,
                InvoiceNo: '15328',
                OrgFeeAmount: 736,
                ShortOverReason: null,
                InvDetailID: 7,
                DedAmount: 0,
                WriteOffDate: '2023-05-18T11:12:11',
                PartyName: 'CT',
                FeeAmount: 736,
                ReceiveDate: '2023-01-03T00:00:00',
                SupplierName: 'Ciena-US',
                ReceivedAmount: 736,
                Note: '無欠手續費'
            },
            {
                SubmarineCable: 'TPE',
                OverAmount: 0,
                Status: 'OK',
                BillMasterID: 2,
                WorkTitle: 'Upgrade',
                ShortAmount: 0,
                BillDetailID: 8,
                BillMilestone: '11_BM1',
                ToCBAmount: 0,
                WKMasterID: 3,
                FeeItem: 'CBP Fee for UPG#11 (BM1)\n',
                PaidAmount: 0,
                InvoiceNo: 'TPE-UPG11-221021',
                OrgFeeAmount: 2000,
                ShortOverReason: null,
                InvDetailID: 11,
                DedAmount: 0,
                WriteOffDate: '2023-05-18T11:12:11',
                PartyName: 'CT',
                FeeAmount: 2000,
                ReceiveDate: '2023-01-03T00:00:00',
                SupplierName: 'CHT',
                ReceivedAmount: 2000,
                Note: '無欠手續費'
            }
        ]
    }
];

const ResearchBillDetail = ({ datailInfo }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false); //檢視
    const [billMasterInfo, setBillMasterInfo] = useState({});
    const [billDetailInfo, setBillDetailInfo] = useState([]);
    const totalPaidAmount = useRef(0);

    const initData = () => {
        totalPaidAmount.current = 0;
        setBillMasterInfo({});
        setBillDetailInfo([]);
    };

    const viewBillDetail = (id) => {
        let tmpQuery = queryToDecutBill + '/BillMasterID=' + id;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    let tmpAmount = 0;
                    data.forEach((i) => {
                        console.log('i=>>', i);
                        setBillMasterInfo(i.BillMaster);
                        setBillDetailInfo(i.BillDetail);
                        i.BillDetail.forEach((row) => {
                            tmpAmount = tmpAmount + row.PaidAmount;
                        });
                    });
                    totalPaidAmount.current = tmpAmount;
                    setIsDialogOpen(true);
                }
            })
            .catch((e) => console.log('e1=>', e));
        // setIsDialogOpen(true);
    };

    const handleClose = () => {
        initData();
        setIsDialogOpen(false);
    };

    // useEffect(() => {
    //     let tmpAmount = 0;
    //     fakeData.forEach((i) => {
    //         console.log('i=>>', i);
    //         setBillMasterInfo(i.BillMaster);
    //         setBillDetailInfo(i.BillDetail);
    //         i.BillDetail.forEach((row) => {
    //             tmpAmount = tmpAmount + row.PaidAmount;
    //         });
    //     });
    //     totalPaidAmount.current = tmpAmount;
    // });

    return (
        <>
            <Dialog maxWidth="md" fullWidth open={isDialogOpen}>
                <BootstrapDialogTitle>帳單明細</BootstrapDialogTitle>
                <DialogContent>
                    <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                        <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                帳單號碼：
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <TextField value={billMasterInfo.BillingNo} fullWidth variant="outlined" size="small" disabled />
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                帳單到期日：
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        inputFormat="YYYY/MM/DD"
                                        value={billMasterInfo.DueDate}
                                        disabled
                                        renderInput={(params) => <TextField size="small" {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">費用項目</StyledTableCell>
                                            <StyledTableCell align="center">計帳段號</StyledTableCell>
                                            <StyledTableCell align="center">會員</StyledTableCell>
                                            <StyledTableCell align="center">應收金額</StyledTableCell>
                                            <StyledTableCell align="center">已實收金額</StyledTableCell>
                                            <StyledTableCell align="center">已實付金額</StyledTableCell>
                                            <StyledTableCell align="center">摘要說明</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {billDetailInfo?.map((row, id) => {
                                            return (
                                                <TableRow
                                                    key={row.FeeItem + row.BillMilestone + row.PartyName + id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{row.FeeItem}</TableCell>
                                                    <TableCell align="center">{row.BillMilestone}</TableCell>
                                                    <TableCell align="center">{row.PartyName}</TableCell>
                                                    <TableCell align="center">${handleNumber(row.OrgFeeAmount.toFixed(2))}</TableCell>
                                                    <TableCell align="center">${handleNumber(row.ReceivedAmount.toFixed(2))}</TableCell>
                                                    <TableCell align="center">${handleNumber(row.PaidAmount.toFixed(2))}</TableCell>
                                                    <TableCell align="center">{row.Note}</TableCell>
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
                                                ${handleNumber(billMasterInfo.FeeAmountSum?.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                ${handleNumber(billMasterInfo.ReceivedAmountSum?.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">
                                                ${handleNumber(totalPaidAmount.current?.toFixed(2))}
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ mr: '0.05rem' }}
                        variant="contained"
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        關閉
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">帳單號碼</StyledTableCell>
                            <StyledTableCell align="center">計帳段號</StyledTableCell>
                            <StyledTableCell align="center">會員</StyledTableCell>
                            <StyledTableCell align="center">帳單到期日</StyledTableCell>
                            <StyledTableCell align="center">應收金額</StyledTableCell>
                            <StyledTableCell align="center">已實收金額</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datailInfo?.map((row, id) => {
                            return (
                                <TableRow
                                    key={row?.BillingNo + row?.BillMilestone + row?.PartyName}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{row.BillingNo}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMilestone}</StyledTableCell>
                                    <StyledTableCell align="center">{row.PartyName}</StyledTableCell>
                                    <StyledTableCell align="center"> {dayjs(row.DueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                    <StyledTableCell align="center">${handleNumber(row.FeeAmountSum)}</StyledTableCell>
                                    <StyledTableCell align="center">${handleNumber(row.ReceivedAmountSum)}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                '& button': { mx: { md: 0.3, lg: 0.7, xl: 1.5 }, p: 0 }
                                            }}
                                        >
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                onClick={() => {
                                                    viewBillDetail(row.BillMasterID);
                                                }}
                                            >
                                                檢視帳單明細
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

export default ResearchBillDetail;
