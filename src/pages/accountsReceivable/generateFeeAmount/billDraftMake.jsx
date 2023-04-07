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
import Logo1 from 'assets/images/logo1.png';
import Logo2 from 'assets/images/logo2.gif';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        padding: '0.1rem',
        fontFamily: 'Microsoft JhengHei,Arial',
        fontSize: '8px',
        background: '#fff',
        border: 'black 1.5px solid',
        textAlign: 'center'
    },
    [`&.${tableCellClasses.head}.theTopFirst`]: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        borderTop: 'black 3px solid',
        borderLeft: 'black 3px solid'
    },
    [`&.${tableCellClasses.head}.top`]: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        borderLeft: 'initial !important',
        borderTop: 'black 3px solid'
    },
    [`&.${tableCellClasses.head}.theTopFinal`]: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        borderLeft: 'initial !important',
        borderTop: 'black 3px solid',
        borderRight: 'black 3px solid'
    },
    [`&.${tableCellClasses.body}.theSecondFirst`]: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        borderTop: 'initial !important',
        borderLeft: 'black 3px solid !important'
    },
    [`&.${tableCellClasses.body}.theSecond`]: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        borderTop: 'initial !important',
        borderLeft: 'initial !important'
    },
    [`&.${tableCellClasses.body}.theSecondFinal`]: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        borderTop: 'initial !important',
        borderLeft: 'initial !important',
        borderRight: 'black 3px solid !important'
    },
    [`&.${tableCellClasses.body}`]: {
        padding: '0.1rem',
        fontFamily: 'Microsoft JhengHei,Arial',
        fontSize: '8px',
        background: '#fff',
        border: 'black 1.5px solid !important'
    },
    [`&.${tableCellClasses.body}.totalAmountFirst`]: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        fontWeight: 'bold',
        borderTop: 'initial !important',
        borderRight: 'initial !important',
        borderLeft: 'black 3px solid !important',
        borderBottom: 'black 3px solid !important'
    },
    [`&.${tableCellClasses.body}.totalAmount`]: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        borderTop: 'initial !important',
        borderRight: 'initial !important',
        borderLeft: 'initial !important',
        borderBottom: 'black 3px solid !important',
        fontWeight: 'bold'
    },
    [`&.${tableCellClasses.body}.totalAmountFinal`]: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        borderTop: 'initial !important',
        borderRight: 'black 3px solid !important',
        borderBottom: 'black 3px solid !important',
        fontWeight: 'bold'
    }
}));

const fakeData = {
    ContactWindowAndSupervisorInformation: {
        Company: 'International Business Group,\r\nChunghwa Telecom Co., Ltd.',
        Address: 'No. 31 Aikuo E. Rd., Taipei, Taiwan, 106',
        Tel: '02-23443897',
        Fax: '02-23443897',
        DirectorName: 'Hsuan-Lung Liu',
        DTel: '+886-2-2344-3912',
        DFax: '+886-2-2322-5940',
        DEmail: 'lsl008@cht.com.tw'
    },
    PartyInformation: {
        Company: 'Chunghwa Telecom Co., Ltd. Network Technology Group',
        Address: '31, Aikuo East Road, Taipei, Taiwan 106',
        Contact: '黃宏杰',
        Email: 'hj-hwang@cht.com.tw',
        Tel: '03-9772252'
    },
    CorporateInformation: {
        BankName: 'Bank of Taiwan, Hsinyi Branch',
        Branch: '',
        BranchAddress: '31 Aikuo E. Rd., Taipei, Taiwan, 106',
        BankAcctName: 'SJC2 Central Billing Party of Chunghwa Telecom (International Business Group)',
        BankAcctNo: '054007501968',
        SavingAcctNo: '',
        IBAN: '',
        SWIFTCode: 'BKTWTWTP054',
        ACHNo: '',
        WireRouting: '',
        Address: '88, Sec. 2, Sinyi Road, Taipei'
    },
    DetailInformation: [
        {
            Supplier: 'NEC Corporation, Submarine Network Division',
            InvNumber: 'DT0170168-1',
            Description: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
            BilledAmount: 1288822.32,
            Liability: 7.1428571429,
            ShareAmount: 92058.74
        },
        {
            Supplier: 'NEC Corporation, Submarine Network Division',
            InvNumber: 'DT0170168-1',
            Description: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
            BilledAmount: 1178227.94,
            Liability: 7.1428571429,
            ShareAmount: 84159.14
        },
        {
            Supplier: 'NEC Corporation, Submarine Network Division',
            InvNumber: 'DT0170168-1',
            Description: 'BM12 Branching Units (100%)-Equipment',
            BilledAmount: 1627300.92,
            Liability: 7.1428571429,
            ShareAmount: 116235.78
        },
        {
            Supplier: 'NEC Corporation, Submarine Network Division',
            InvNumber: 'DT0170168-1',
            Description: 'BM12 Branching Units (100%)-Service',
            BilledAmount: 1487661.54,
            Liability: 7.1428571429,
            ShareAmount: 106261.54
        },
        {
            Supplier: 'NEC Corporation, Submarine Network Division',
            InvNumber: 'test',
            Description: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
            BilledAmount: -10,
            Liability: 100,
            ShareAmount: -10
        },
        {
            Supplier: 'NEC Corporation, Submarine Network Division',
            InvNumber: 'test',
            Description: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
            BilledAmount: -10,
            Liability: 100,
            ShareAmount: -10
        }
    ],
    InvoiceNo: '02CO-CI2303301838'
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

const BillDraftMake = ({ isDialogOpen, handleDialogClose, billMasterID, pONo, submarineCableName }) => {
    const [dataList, setDataList] = useState([]);
    const [contact, setContact] = useState('chang_ty');
    const [contactList, setContactList] = useState(fakeData2);
    const [contactInfo, setContactInfo] = useState(fakeData.ContactWindowAndSupervisorInformation);
    const [partyInfo, setPartyInfo] = useState(fakeData.PartyInformation);
    const [submarineCableInfo, setSubmarineCableInfo] = useState(fakeData.CorporateInformation);
    const [datailInfo, setDetailInfo] = useState(fakeData.DetailInformation);
    const totalAmount = useRef(0);
    const [issueDate, setIssueDate] = useState(new Date()); //發票日期
    const [dueDate, setDueDate] = useState(new Date()); //發票日期
    const [logo, setLogo] = useState(1);

    const [subject1, setSubject1] = useState(''); //主旨1
    // const [subject2, setSubject2] = useState(''); //主旨2
    const [subject3, setSubject3] = useState('Invoice'); //主旨3

    const itemDetailInitial = () => {
        // setDataList([]);
        setContact('');
        // setContactList([]);
        // setPartyInfo('');
        // setSubmarineCableInfo?('');
    };

    const handleDownload = () => {
        let tmpData = {
            BillMasterID: billMasterID,
            UserID: 'chang_ty',
            IssueDate: dayjs(issueDate).format('YYYY/MM/DD'),
            DueDate: dayjs(dueDate).format('YYYY/MM/DD'),
            WorkTitle: subject1,
            InvoiceName: subject3,
            logo: logo,
            GetTemplate: false
        };
        fetch(generateBillData, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: JSON.stringify(tmpData)
        })
            .then((res) => {
                console.log('res=>>', res);
                return res.blob();
            })
            .then((blob) => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `${submarineCableName} Cable Network ${subject1} Central Billing Party.docx`;
                link.click();
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        if (isDialogOpen) {
            let tmpAmount = 0;
            console.log('billMasterID=>>', billMasterID);
            let tmpData = {
                BillMasterID: billMasterID,
                UserID: 'chang_ty',
                GetTemplate: true
            };
            fetch(generateBillData, { method: 'POST', body: JSON.stringify(tmpData) })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data抓取成功=>>', data);
                    setDataList(data);
                    setContactInfo(data.ContactWindowAndSupervisorInformation);
                    setPartyInfo(data.PartyInformation);
                    setSubmarineCableInfo(data.CorporateInformation);
                    setDetailInfo(data.DetailInformation);
                    data.DetailInformation.forEach((i) => {
                        console.log('i.ShareAmount=>>', i.ShareAmount);
                        tmpAmount = tmpAmount + i.ShareAmount;
                    });
                    console.log('tmpAmount=>>', tmpAmount);
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
        }
    }, [billMasterID, isDialogOpen]);
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
            tmpAmount = tmpAmount + i.ShareAmount;
        });
        totalAmount.current = tmpAmount;
    }, [datailInfo]);

    return (
        <Dialog
            onClose={() => {
                itemDetailInitial();
                handleDialogClose();
            }}
            maxWidth="xl"
            fullWidth
            open={isDialogOpen}
        >
            <BootstrapDialogTitle id="customized-dialog-title" className="no-print">
                產製帳單
            </BootstrapDialogTitle>
            <DialogContent dividers className="no-print">
                <Grid container spacing={1} className="no-print">
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <MainCard title="聯絡窗口及主管資訊" sx={{ width: '100%' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        標示：
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="demo-simple-select-label">選擇標示</InputLabel>
                                        <Select value={logo} label="Logo" onChange={(e) => setLogo(e.target.value)}>
                                            <MenuItem value={1}>新Logo</MenuItem>
                                            <MenuItem value={2}>舊Logo</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
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
                                    {/* <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={subject2}
                                            size="small"
                                            label="第二行主旨"
                                            inputProps={{ maxLength: 65 }}
                                            onChange={(e) => setSubject2(e.target.value)}
                                        />
                                    </Grid> */}
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
                        <Typography sx={{ fontFamily: 'Microsoft JhengHei,Arial' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ m: 1, width: '50%' }}>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>
                                        <Box
                                            component="img"
                                            sx={{
                                                width: '15rem',
                                                height: 'auto'
                                            }}
                                            src={logo === 1 ? Logo1 : Logo2}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ m: 1, width: '20%' }} />
                                <Box sx={{ m: 1, width: '30%' }}>
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
                                    whiteSpace: 'nowrap',
                                    fontWeight: 'bold'
                                }}
                            >
                                {submarineCableName} Cable Network {subject1} Central Billing Party
                            </Box>
                            {/* <Box
                                sx={{
                                    fontSize: subject2.length <= 50 ? '18px' : '15px',
                                    mt: 1,
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',
                                    fontWeight: 'bold'
                                }}
                            >
                                {subject2}
                            </Box> */}
                            <Box sx={{ fontSize: '24px', m: 1, textAlign: 'center', fontWeight: 'bold' }}>{subject3}</Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ m: 1, minWidth: '40%', with: '40%' }}>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>BILL TO：</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>{partyInfo?.Company}</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>ADDR：{partyInfo?.Address}</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>ATTN：{partyInfo?.Contact}</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>E-mail：{partyInfo?.Email}</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>Tel：{partyInfo?.Tel}</Box>
                                </Box>
                                <Box sx={{ m: 1, minWidth: '30%', with: '30%' }} />
                                <Box sx={{ m: 1, minWidth: '30%', with: '30%' }}>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>Invoice No.： {dataList.InvoiceNo}</Box>
                                    <Box sx={{ fontSize: '8px', textAlign: 'left' }}>(Please Refer To This Invoice No. On Remittance)</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>
                                        Issue Date：{dayjs(issueDate).format('YYYY/MM/DD')}
                                    </Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>Due Date：{dayjs(dueDate).format('YYYY/MM/DD')}</Box>
                                </Box>
                            </Box>
                            <Box sx={{ fontSize: '12px', m: 1, display: 'flex', justifyContent: 'space-between' }}>
                                <Box>{pONo?.length > 0 ? `PO No. ${pONo}` : ''}</Box>
                                <Box>(Currency：USD)</Box>
                            </Box>
                            <Box>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell className="theTopFirst">Supplier</StyledTableCell>
                                                <StyledTableCell className="top">INV. No.</StyledTableCell>
                                                <StyledTableCell className="top">Description</StyledTableCell>
                                                <StyledTableCell className="top">Billed Amount</StyledTableCell>
                                                <StyledTableCell className="top">Liability</StyledTableCell>
                                                <StyledTableCell className="theTopFinal">Share Amount</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {datailInfo?.map((row) => {
                                                return (
                                                    <TableRow>
                                                        <StyledTableCell align="center" className="theSecondFirst">
                                                            {row.Supplier}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="left" className="theSecond">
                                                            {row.InvNumber}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="left" className="theSecond">
                                                            {row.Description}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="right" className="theSecond">
                                                            {handleNumber(row.BilledAmount.toFixed(2))}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="right" className="theSecond">
                                                            {row.Liability.toFixed(10)}%
                                                        </StyledTableCell>
                                                        <StyledTableCell align="right" className="theSecondFinal">
                                                            {handleNumber(row.ShareAmount.toFixed(2))}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                );
                                            })}
                                            <TableRow>
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
                            <Box sx={{ m: 1, fontSize: '12px' }}>Certified by：</Box>
                            <Box sx={{ fontSize: '12px', m: 1, display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                                    <Box sx={{}}>———————————————</Box>
                                    <Box sx={{}}>{contactInfo?.DirectorName}</Box>
                                    <Box sx={{}}>Director, CBP</Box>
                                    <Box sx={{}}>{contactInfo?.Company}</Box>
                                    <Box sx={{}}>Tel： {contactInfo?.DTel}</Box>
                                    <Box sx={{}}>Fax： {contactInfo?.DFax}</Box>
                                </Box>
                                <Box sx={{ width: '50%' }}>
                                    <Box>Payment by Telegraphic Transfer to：</Box>
                                    <Box>Bank Name： {submarineCableInfo?.BankName}</Box>
                                    <Box>Branch Name： {submarineCableInfo?.Branch}</Box>
                                    <Box>Branch Address： {submarineCableInfo?.BranchAddress}</Box>
                                    <Box>A/C Name：{submarineCableInfo?.BankAcctName}</Box>
                                    <Box>Company Addr：{submarineCableInfo?.Address}</Box>
                                    <Box>
                                        A/C No.:
                                        {submarineCableInfo?.BankAcctNo.length !== 0
                                            ? submarineCableInfo?.BankAcctNo
                                            : submarineCableInfo?.SavingAcctNo}
                                    </Box>
                                    <Box>IBAN： {submarineCableInfo?.IBAN}</Box>
                                    <Box>Swift： {submarineCableInfo?.SWIFTCode}</Box>
                                    <Box>ACH：{submarineCableInfo?.ACHNo}</Box>
                                    <Box>Wire/Routing：{submarineCableInfo?.WireRouting}</Box>
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
                        // window.print();
                        handleDownload();
                    }}
                >
                    下載
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
            {/* <Grid container spacing={1} className="no-show">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography sx={{ fontFamily: 'Microsoft JhengHei,Arial', lineHeight: '1.2' }}>
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
                            <Box sx={{ m: 1, width: '20%' }} />
                            <Box sx={{ fontSize: '14px', m: 1, width: '30%' }}>
                                <Box sx={{ textAlign: 'right' }}>{contactInfo?.Address}</Box>
                                <Box sx={{ textAlign: 'right' }}>Tel：{contactInfo?.Tel}</Box>
                                <Box sx={{ textAlign: 'right' }}>Fax：{contactInfo?.Fax}</Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                fontSize: subject1.length <= 50 ? '26px' : '23px',
                                mt: 1,
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                fontWeight: 'bold'
                            }}
                        >
                            {subject1}
                        </Box>
                        <Box
                            sx={{
                                fontSize: subject2.length <= 50 ? '26px' : '23px',
                                mt: 1,
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                fontWeight: 'bold'
                            }}
                        >
                            {subject2}
                        </Box>
                        <Box sx={{ fontSize: '30px', m: 1, textAlign: 'center', fontWeight: 'bold' }}>{subject3}</Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ m: 1, minWidth: '40%', with: '40%', fontSize: '14px' }}>
                                <Box sx={{ textAlign: 'left' }}>BILL TO：</Box>
                                <Box sx={{ textAlign: 'left' }}>{partyInfo?.Company}</Box>
                                <Box sx={{ textAlign: 'left' }}>ADDR：{partyInfo?.Address}</Box>
                                <Box sx={{ textAlign: 'left' }}>ATTN：{partyInfo?.Contact}</Box>
                                <Box sx={{ textAlign: 'left' }}>E-mail：{partyInfo?.Email}</Box>
                                <Box sx={{ textAlign: 'left' }}>Tel：{partyInfo?.Tel}</Box>
                            </Box>
                            <Box sx={{ m: 1, minWidth: '30%', with: '30%' }} />
                            <Box sx={{ m: 1, minWidth: '30%', with: '30%' }}>
                                <Box sx={{ fontSize: '14px', textAlign: 'left' }}>Invoice No.： {dataList.InvoiceNo}</Box>
                                <Box sx={{ fontSize: '10px', textAlign: 'left' }}>(Please Refer To This Invoice No. On Remittance)</Box>
                                <Box sx={{ fontSize: '14px', textAlign: 'left' }}>Issue Date：{dayjs(issueDate).format('YYYY/MM/DD')}</Box>
                                <Box sx={{ fontSize: '14px', textAlign: 'left' }}>Due Date：{dayjs(dueDate).format('YYYY/MM/DD')}</Box>
                            </Box>
                        </Box>
                        <Box sx={{ fontSize: '14px', m: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Box>{pONo.length > 0 ? `PO No. ${pONo}` : 0}</Box>
                            <Box>(Currency：USD)</Box>
                        </Box>
                        <Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell className="theTopFirst">Supplier</StyledTableCell>
                                            <StyledTableCell className="top">INV. No.</StyledTableCell>
                                            <StyledTableCell className="top">Description</StyledTableCell>
                                            <StyledTableCell className="top">Billed Amount</StyledTableCell>
                                            <StyledTableCell className="top">Liability</StyledTableCell>
                                            <StyledTableCell className="theTopFinal">Share Amount</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {datailInfo?.map((row) => {
                                            return (
                                                <TableRow>
                                                    <StyledTableCell align="center" className="theSecondFirst">
                                                        {row.Supplier}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left" className="theSecond">
                                                        {row.InvNumber}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left" className="theSecond">
                                                        {row.Description}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right" className="theSecond">
                                                        {handleNumber(row.BilledAmount.toFixed(2))}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right" className="theSecond">
                                                        {row.Liability.toFixed(10)}%
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right" className="theSecondFinal">
                                                        {handleNumber(row.ShareAmount.toFixed(2))}
                                                    </StyledTableCell>
                                                </TableRow>
                                            );
                                        })}
                                        <TableRow>
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
                        <Box sx={{ m: 1, fontSize: '14px' }}>&nbsp;&nbsp;&nbsp;</Box>
                        <Box sx={{ m: 1, fontSize: '14px' }}>&nbsp;&nbsp;&nbsp;</Box>
                        <Box sx={{ m: 1, fontSize: '14px' }}>Certified by：</Box>
                        <Box sx={{ fontSize: '14px', m: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                                <Box sx={{}}>———————————————</Box>
                                <Box sx={{}}>{contactInfo?.DirectorName}</Box>
                                <Box sx={{}}>Director, CBP</Box>
                                <Box sx={{}}>{contactInfo?.Company}</Box>
                                <Box sx={{}}>Email： {contactInfo?.DEmail}</Box>
                                <Box sx={{}}>Tel： {contactInfo?.DTel}</Box>
                                <Box sx={{}}>Fax： {contactInfo?.DFax}</Box>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Box>Payment by Telegraphic Transfer to：</Box>
                                <Box>Bank Name： {submarineCableInfo?.BankName}</Box>
                                <Box>Branch Name： {submarineCableInfo?.Branch}</Box>
                                <Box>Branch Address： {submarineCableInfo?.BranchAddress}</Box>
                                <Box>A/C Name：{submarineCableInfo?.AcctName}</Box>
                                <Box>Company Addr：{submarineCableInfo?.Address}</Box>
                                <Box>
                                    A/C No.：
                                    {submarineCableInfo?.BankAcctNo.length !== 0
                                        ? submarineCableInfo?.BankAcctNo
                                        : submarineCableInfo?.SavingAcctNo}
                                </Box>
                                <Box>IBAN： {submarineCableInfo?.IBAN}</Box>
                                <Box>Swift： {submarineCableInfo?.SWIFTCode}</Box>
                                <Box>ACH：{submarineCableInfo?.ACHNo}</Box>
                                <Box>Wire/Routing：{submarineCableInfo?.WireRouting}</Box>
                            </Box>
                        </Box>
                    </Typography>
                </Grid>
            </Grid> */}
        </Dialog>
    );
};

export default BillDraftMake;
