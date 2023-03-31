import { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    Box,
    TextField,
    Checkbox,
    Table,
    Tab,
    RadioGroup,
    FormControlLabel,
    Radio,
    TableCell,
    Paper,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

// day
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// day
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// project import
import MainCard from 'components/MainCard';
import { BootstrapDialogTitle, TabPanel, handleNumber } from 'components/commonFunction';

// table
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

// print
import './styles.css';

import { generateBillData, contactUser } from 'components/apis.jsx';
import Logo from 'assets/images/logo.png';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // color: theme.palette.common.black,
        padding: '0.1rem',
        fontFamily: 'DFKai-sb',
        fontSize: '8px',
        background: '#fff',
        border: 'black 1px solid'
    },
    [`&.${tableCellClasses.body}`]: {
        padding: '0.1rem',
        fontFamily: 'DFKai-sb',
        fontSize: '8px',
        background: '#fff',
        border: 'black 1px solid !important'
    },
    [`&.${tableCellClasses.body}.totalAmountFirst`]: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        borderRight: 'initial !important',
        fontWeight: 'bold'
    },
    [`&.${tableCellClasses.body}.totalAmount`]: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        borderRight: 'initial !important',
        borderLeft: 'initial !important',
        fontWeight: 'bold'
    },
    [`&.${tableCellClasses.body}.totalAmountFinal`]: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        border: 'black 1px solid !important',
        borderLeft: 'black 2px solid !important',
        fontWeight: 'bold'
    }
}));

const fakeData = {
    ContactWindowAndSupervisorInformation: {
        Company: 'CHT',
        Address: 'test-address',
        Tel: '123456789',
        Fax: '123456789',
        DirectorName: '郭贊章',
        DTel: '123456789',
        DFax: '123456789'
    },
    PartyInformation: {
        Company: 'Edge Company',
        Address: 'test address',
        Contact: 'test contact name',
        Email: 'test@testmail.com',
        Tel: '123456789'
    },
    CorporateInformation: {
        BankName: 'test-name',
        Branch: 'test-branch',
        BranchAddress: 'test-address',
        BankAcctName: 'test-acctname',
        BankAcctNo: 'test-acctno',
        SavingAcctNo: 'test-savingaccntno',
        IBAN: 'test-iban',
        SWIFTCode: 'test-swiftcode',
        ACHNo: 'test-achno',
        WireRouting: 'test-wirerouting',
        Address: 'Address'
    },
    DetailInformation: [
        {
            Supplier: 'NEC Corporation, Submarine Network Division',
            InvNumber: '02CO-CI2303301838',
            Description: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
            AmountBilled: 1288822.32,
            Liability: 7.1428571429,
            YourShare: 92058.74
        },
        {
            Supplier: 'NEC Corporation, Submarine Network Division',
            InvNumber: '02CO-CI2303301838',
            Description: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
            AmountBilled: 1178227.94,
            Liability: 7.1428571429,
            YourShare: 84159.14
        },
        {
            Supplier: 'NEC Corporation, Submarine Network Division',
            InvNumber: '02CO-CI2303301838',
            Description: 'BM12 Branching Units (100%)-Equipment',
            AmountBilled: 1627300.92,
            Liability: 7.1428571429,
            YourShare: 116235.78
        },
        {
            Supplier: 'NEC Corporation, Submarine Network Division',
            InvNumber: '02CO-CI2303301838',
            Description: 'BM12 Branching Units (100%)-Service',
            AmountBilled: 1487661.54,
            Liability: 7.1428571429,
            YourShare: 106261.54
        },
        {
            Supplier: 'NEC Corporation, Submarine Network Division',
            InvNumber: 'test',
            Description: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
            AmountBilled: -10,
            Liability: 100,
            YourShare: -10
        },
        {
            Supplier: 'NEC Corporation, Submarine Network Division',
            InvNumber: 'test',
            Description: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
            AmountBilled: -10,
            Liability: 100,
            YourShare: -10
        }
    ],
    InvoiceNo: '02CO-EG2303251517'
};

//
const fakeData2 = [
    {
        UserName: '張增益',
        UserID: 'chang_ty',
        Company: 'CHT',
        Address: 'test-address',
        Tel: '123456789',
        Fax: '123456789',
        DirectorName: '郭贊章',
        DTel: '123456789',
        DFax: '123456789'
    },
    {
        UserName: '李心儀',
        UserID: 'chang_ty33',
        Company: 'CHT#2',
        Address: 'test-address#2',
        Tel: '123456789#2',
        Fax: '123456789',
        DirectorName: '郭贊',
        DTel: '123456789',
        DFax: '123456789'
    }
];

const BillDraftMake = ({ isDialogOpen, handleDialogClose, billMasterID, pONo }) => {
    const [dataList, setDataList] = useState([]);
    const [contact, setContact] = useState('chang_ty');
    const [contactList, setContactList] = useState(fakeData2);
    const [contactInfo, setContactInfo] = useState({});
    const [partyInfo, setPartyInfo] = useState(fakeData.PartyInformation);
    const [submarineCableInfo, setSubmarineCableInfo] = useState(fakeData.CorporateInformation);
    const [datailInfo, setDetailInfo] = useState(fakeData.DetailInformation);
    const totalAmount = useRef(0);
    const [issueDate, setIssueDate] = useState(new Date()); //發票日期
    const [dueDate, setDueDate] = useState(new Date()); //發票日期

    const [subject1, setSubject1] = useState('TPE Cable Network Upgrade#12 Central Billing Party'); //主旨1
    const [subject2, setSubject2] = useState(''); //主旨2
    const [subject3, setSubject3] = useState('Invoice'); //主旨3

    const itemDetailInitial = () => {
        // setDataList([]);
        setContact('');
        // setContactList([]);
        // setPartyInfo('');
        // setSubmarineCableInfo?('');
    };

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        let tmpAmount = 0;
        let tmpData = {
            BillMasterID: billMasterID,
            UserID: 'chang_ty'
        };
        fetch(generateBillData, { method: 'POST', body: JSON.stringify(tmpData) })
            .then((res) => res.json())
            .then((data) => {
                console.log('data抓取成功=>>', data);
                setDataList(data);
                setPartyInfo(data.PartyInformation);
                setSubmarineCableInfo(data.CorporateInformation);
                setContactInfo(data.ContactWindowAndSupervisorInformation);
                setDetailInfo(data.DetailInformation);
                data.DetailInformation.forEach((i) => {
                    tmpAmount = tmpAmount + i.YourShare;
                });
                totalAmount.current = tmpAmount;
            })
            .catch((e) => console.log('e1=>', e));
        fetch(contactUser, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('user data=>>', data);
                if (Array.isArray(data)) {
                    setContactList(data);
                }
            })
            .catch((e) => console.log('e1=>', e));
    }, [billMasterID]);
    useEffect(() => {
        let arrayFiliter = [];
        if (contact.length > 0) {
            arrayFiliter = contactList.filter((i) => {
                return i.UserID === contact;
            });
        } else {
            arrayFiliter = contactList.filter((i) => {
                return i.UserID === 'chang_ty';
            });
        }
        setContactInfo(arrayFiliter[0]);
    }, [contact]);

    useEffect(() => {
        let tmpAmount = 0;
        datailInfo.forEach((i) => {
            tmpAmount = tmpAmount + i.YourShare;
        });
        totalAmount.current = tmpAmount;
    }, [datailInfo]);

    console.log('setDataList=>>', dataList);
    console.log('contactList=>>', contactList);

    return (
        <Dialog onClose={handleDialogClose} maxWidth="xl" fullWidth open={isDialogOpen}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose} className="no-print">
                產製帳單
            </BootstrapDialogTitle>
            <DialogContent dividers className="no-print">
                <Grid container spacing={1} className="no-print">
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <MainCard title="聯絡窗口及主管資訊" sx={{ width: '100%' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        窗口人員：
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="demo-simple-select-label">選擇聯絡窗口</InputLabel>
                                        <Select value={contact} label="會員" onChange={(e) => setContact(e.target.value)}>
                                            {contactList.map((i) => (
                                                <MenuItem key={i.UserName} value={i.UserID}>
                                                    {i.UserName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </MainCard>
                        <MainCard title="帳單資訊" sx={{ width: '100%' }}>
                            <Grid container spacing={1} display="flex">
                                <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="start">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        主旨：
                                    </Typography>
                                </Grid>
                                <Grid container item xs={12} sm={12} md={12} lg={12} spacing={2} display="flex" justifyContent="center">
                                    <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={subject1}
                                            size="small"
                                            label="第一行主旨"
                                            inputProps={{ maxLength: 65 }}
                                            onChange={(e) => setSubject1(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={subject2}
                                            size="small"
                                            label="第二行主旨"
                                            inputProps={{ maxLength: 65 }}
                                            onChange={(e) => setSubject2(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="start">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        帳單種類：
                                    </Typography>
                                </Grid>
                                <Grid container item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="center">
                                    <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={subject3}
                                            size="small"
                                            inputProps={{ maxLength: 65 }}
                                            onChange={(e) => setSubject3(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        開立日期：
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
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
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        到期日期：
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <FormControl>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DesktopDatePicker
                                                inputFormat="YYYY/MM/DD"
                                                value={dueDate}
                                                onChange={(e) => {
                                                    setDueDate(e);
                                                }}
                                                renderInput={(params) => <TextField size="small" {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                    {/* 表單開始 */}
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Typography sx={{ fontFamily: 'DFKai-sb', fontWeight: 'bold' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ m: 1 }}>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>
                                        <Box
                                            component="img"
                                            sx={{
                                                width: '10rem',
                                                height: 'auto'
                                            }}
                                            src={Logo}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ m: 1 }}>
                                    <Box sx={{ fontSize: '12px', textAlign: 'right' }}>{contactInfo?.Address}</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'right' }}>Tel：{contactInfo?.Tel}</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'right' }}>Fax：{contactInfo?.Fax}</Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    fontSize: subject1.length <= 50 ? '18px' : '15px',
                                    mt: 1,
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {subject1}
                            </Box>
                            <Box
                                sx={{
                                    fontSize: subject2.length <= 50 ? '18px' : '15px',
                                    mt: 1,
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {subject2}
                            </Box>
                            <Box sx={{ fontSize: '24px', m: 1, textAlign: 'center' }}>{subject3}</Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ m: 1, minWidth: '50%', with: '50%' }}>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>BILL TO：</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>{partyInfo?.Company}</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>ADDR：{partyInfo?.Address}</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>ATTN：{partyInfo?.Contact}</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>E-mail:{partyInfo?.Email}</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>Tel:{partyInfo?.Tel}</Box>
                                </Box>
                                <Box sx={{ m: 1, minWidth: '50%', with: '50%' }}>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>Invoice No. {dataList.InvoiceNo}</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>(Please Refer To This Invoice No. On Remittance)</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>
                                        Issue Date：{dayjs(issueDate).format('YYYY/MM/DD')}
                                    </Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>Due Date：{dayjs(dueDate).format('YYYY/MM/DD')}</Box>
                                </Box>
                            </Box>
                            <Box sx={{ fontSize: '12px', m: 1, display: 'flex', justifyContent: 'space-between' }}>
                                <Box>{pONo.length > 0 ? `PO No ${pONo}` : 0}</Box>
                                <Box>(Currencv:USD)</Box>
                            </Box>
                            <Box>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">Supplier</StyledTableCell>
                                                <StyledTableCell align="center">INV. No.</StyledTableCell>
                                                <StyledTableCell align="center">Description</StyledTableCell>
                                                <StyledTableCell align="center">Amount Billed</StyledTableCell>
                                                <StyledTableCell align="center">Liability</StyledTableCell>
                                                <StyledTableCell align="center">Your share</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {datailInfo?.map((row) => {
                                                return (
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <StyledTableCell align="center">{row.Supplier}</StyledTableCell>
                                                        <StyledTableCell align="left">{row.InvNumber}</StyledTableCell>
                                                        <StyledTableCell align="left">{row.Description}</StyledTableCell>
                                                        <StyledTableCell align="right">{row.AmountBilled.toFixed(2)}</StyledTableCell>
                                                        <StyledTableCell align="right">{row.Liability.toFixed(10)}%</StyledTableCell>
                                                        <StyledTableCell align="right">{row.YourShare.toFixed(2)}</StyledTableCell>
                                                    </TableRow>
                                                );
                                            })}
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <StyledTableCell align="center" className="totalAmountFirst"></StyledTableCell>
                                                <StyledTableCell align="center" className="totalAmount"></StyledTableCell>
                                                <StyledTableCell align="center" className="totalAmount"></StyledTableCell>
                                                <StyledTableCell align="center" className="totalAmount"></StyledTableCell>
                                                <StyledTableCell align="right" className="totalAmount">
                                                    Total
                                                </StyledTableCell>
                                                <StyledTableCell align="right" className="totalAmountFinal">
                                                    {handleNumber(totalAmount.current.toFixed(2))}
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            <Box sx={{ m: 1, fontSize: '12px' }}>Certified by:</Box>
                            <Box sx={{ fontSize: '12px', m: 1, display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                                    <Box sx={{}}>———————————————</Box>
                                    <Box sx={{}}>{contactInfo?.DirectorName}</Box>
                                    <Box sx={{}}>Director, CBP</Box>
                                    <Box sx={{}}>{contactInfo?.Company}</Box>
                                    <Box sx={{}}>Tel: {contactInfo?.DTel}</Box>
                                    <Box sx={{}}>Fax: {contactInfo?.DFax}</Box>
                                </Box>
                                <Box sx={{ width: '50%' }}>
                                    <Box>Payment by Telegraphic Transfer to</Box>
                                    <Box>Bank Name: {submarineCableInfo?.BankName}</Box>
                                    <Box>Branch Name: {submarineCableInfo?.Branch}</Box>
                                    <Box>Branch Address: {submarineCableInfo?.BranchAddress}</Box>
                                    <Box>A/C Name:{submarineCableInfo?.BankAcctName}</Box>
                                    <Box>Company Addr:{submarineCableInfo?.Address}</Box>
                                    <Box>
                                        A/C No.:
                                        {submarineCableInfo?.BankAcctNo.length !== 0
                                            ? submarineCableInfo?.BankAcctNo
                                            : submarineCableInfo?.SavingAcctNo}
                                    </Box>
                                    <Box>IBAN: {submarineCableInfo?.IBAN}</Box>
                                    <Box>Swift: {submarineCableInfo?.SWIFTCode}</Box>
                                    <Box>ACH:{submarineCableInfo?.ACHNo}</Box>
                                    <Box>Wire/Routing:{submarineCableInfo?.WireRouting}</Box>
                                </Box>
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className="no-print">
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handlePrint();
                    }}
                >
                    列印
                </Button>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleDialogClose();
                        itemDetailInitial();
                    }}
                >
                    取消
                </Button>
            </DialogActions>
            {/* 列印開始 */}
            <Grid container spacing={1} className="no-show">
                {/* <Grid container spacing={1}> */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography sx={{ fontFamily: 'DFKai-sb', fontWeight: 'bold' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ m: 1 }}>
                                <Box sx={{ fontSize: '18px', textAlign: 'left' }}>
                                    <Box
                                        component="img"
                                        sx={{
                                            width: '10rem',
                                            height: 'auto'
                                        }}
                                        src={Logo}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ m: 1 }}>
                                <Box sx={{ fontSize: '18px', textAlign: 'right' }}>{contactInfo?.Address}</Box>
                                <Box sx={{ fontSize: '18px', textAlign: 'right' }}>Tel：{contactInfo?.Tel}</Box>
                                <Box sx={{ fontSize: '18px', textAlign: 'right' }}>Fax：{contactInfo?.Fax}</Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                fontSize: subject1.length <= 50 ? '26px' : '23px',
                                mt: 1,
                                textAlign: 'center',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {subject1}
                        </Box>
                        <Box
                            sx={{
                                fontSize: subject2.length <= 50 ? '26px' : '23px',
                                mt: 1,
                                textAlign: 'center',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {subject2}
                        </Box>
                        <Box sx={{ fontSize: '30px', m: 1, textAlign: 'center' }}>{subject3}</Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ m: 1, minWidth: '50%', with: '50%' }}>
                                <Box sx={{ fontSize: '18px', textAlign: 'left' }}>BILL TO：</Box>
                                <Box sx={{ fontSize: '18px', textAlign: 'left' }}>{partyInfo?.Company}</Box>
                                <Box sx={{ fontSize: '18px', textAlign: 'left' }}>ADDR：{partyInfo?.Address}</Box>
                                <Box sx={{ fontSize: '18px', textAlign: 'left' }}>ATTN：{partyInfo?.Contact}</Box>
                                <Box sx={{ fontSize: '18px', textAlign: 'left' }}>E-mail:{partyInfo?.Email}</Box>
                                <Box sx={{ fontSize: '18px', textAlign: 'left' }}>Tel:{partyInfo?.Tel}</Box>
                            </Box>
                            <Box sx={{ m: 1, minWidth: '50%', with: '50%' }}>
                                <Box sx={{ fontSize: '18px', textAlign: 'left' }}>Invoice No. {dataList.InvoiceNo}</Box>
                                <Box sx={{ fontSize: '18px', textAlign: 'left' }}>(Please Refer To This Invoice No. On Remittance)</Box>
                                <Box sx={{ fontSize: '18px', textAlign: 'left' }}>Issue Date：{dayjs(issueDate).format('YYYY/MM/DD')}</Box>
                                <Box sx={{ fontSize: '18px', textAlign: 'left' }}>Due Date：{dayjs(dueDate).format('YYYY/MM/DD')}</Box>
                            </Box>
                        </Box>
                        <Box sx={{ fontSize: '18px', m: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Box>{pONo.length > 0 ? `PO No ${pONo}` : 0}</Box>
                            <Box>(Currencv:USD)</Box>
                        </Box>
                        <Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Supplier</StyledTableCell>
                                            <StyledTableCell align="center">INV. No.</StyledTableCell>
                                            <StyledTableCell align="center">Description</StyledTableCell>
                                            <StyledTableCell align="center">Amount Billed</StyledTableCell>
                                            <StyledTableCell align="center">Liability</StyledTableCell>
                                            <StyledTableCell align="center">Your share</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {datailInfo?.map((row) => {
                                            return (
                                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <StyledTableCell align="center">{row.Supplier}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.InvNumber}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.Description}</StyledTableCell>
                                                    <StyledTableCell align="right">{row.AmountBilled.toFixed(2)}</StyledTableCell>
                                                    <StyledTableCell align="right">{row.Liability.toFixed(10)}%</StyledTableCell>
                                                    <StyledTableCell align="right">{row.YourShare.toFixed(2)}</StyledTableCell>
                                                </TableRow>
                                            );
                                        })}
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <StyledTableCell align="center" className="totalAmountFirst"></StyledTableCell>
                                            <StyledTableCell align="center" className="totalAmount"></StyledTableCell>
                                            <StyledTableCell align="center" className="totalAmount"></StyledTableCell>
                                            <StyledTableCell align="center" className="totalAmount"></StyledTableCell>
                                            <StyledTableCell align="right" className="totalAmount">
                                                Total
                                            </StyledTableCell>
                                            <StyledTableCell align="right" className="totalAmountFinal">
                                                {handleNumber(totalAmount.current.toFixed(2))}
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box sx={{ m: 1, fontSize: '18px' }}>&nbsp;&nbsp;&nbsp;</Box>
                        <Box sx={{ m: 1, fontSize: '18px' }}>&nbsp;&nbsp;&nbsp;</Box>
                        <Box sx={{ m: 1, fontSize: '18px' }}>&nbsp;&nbsp;&nbsp;</Box>
                        <Box sx={{ m: 1, fontSize: '18px' }}>Certified by:</Box>
                        <Box sx={{ fontSize: '18px', m: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                                <Box sx={{}}>———————————————</Box>
                                <Box sx={{}}>{contactInfo?.DirectorName}</Box>
                                <Box sx={{}}>Director, CBP</Box>
                                <Box sx={{}}>{contactInfo?.Company}</Box>
                                <Box sx={{}}>Email: {contactInfo?.DEmail}</Box>
                                <Box sx={{}}>Tel: {contactInfo?.DTel}</Box>
                                <Box sx={{}}>Fax: {contactInfo?.DFax}</Box>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Box>Payment by Telegraphic Transfer to</Box>
                                <Box>Bank Name: {submarineCableInfo?.BankName}</Box>
                                <Box>Branch Name: {submarineCableInfo?.Branch}</Box>
                                <Box>Branch Address: {submarineCableInfo?.BranchAddress}</Box>
                                <Box>A/C Name:{submarineCableInfo?.AcctName}</Box>
                                <Box>Company Addr:{submarineCableInfo?.Address}</Box>
                                <Box>
                                    A/C No.:
                                    {submarineCableInfo?.BankAcctNo.length !== 0
                                        ? submarineCableInfo?.BankAcctNo
                                        : submarineCableInfo?.SavingAcctNo}
                                </Box>
                                <Box>IBAN: {submarineCableInfo?.IBAN}</Box>
                                <Box>Swift: {submarineCableInfo?.SWIFTCode}</Box>
                                <Box>ACH:{submarineCableInfo?.ACHNo}</Box>
                                <Box>Wire/Routing:{submarineCableInfo?.WireRouting}</Box>
                            </Box>
                        </Box>
                    </Typography>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default BillDraftMake;
