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

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// project import
import MainCard from 'components/MainCard';
import { BootstrapDialogTitle, TabPanel } from 'components/commonFunction';

// table
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

// print
import './styles.css';

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
    }
}));

const BillDraftMake = ({ isDialogOpen, handleDialogClose, billInfo }) => {
    const [contact, setContact] = useState('');

    const [cblistInfo, setCbListInfo] = useState(billInfo);
    const [isDefault, setIsDefault] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [subject1, setSubject1] = useState('TPE Cable Network Upgrade#12 Central Billing Party'); //主旨1
    const [subject2, setSubject2] = useState(''); //主旨2
    const [subject3, setSubject3] = useState('Invoice'); //主旨3
    const [number, setNumber] = useState(''); //連絡電話
    const [date, setDate] = useState(''); //發文日期
    const [receipient, setRecipient] = useState(''); //受文者
    const [tel, setTel] = useState(''); //連絡電話
    const [email, setEmail] = useState(''); //聯絡信箱

    const [acctNo, setAcctNo] = useState(''); //聯盟銀行帳號
    const [iBAN, setIBAN] = useState(''); //受款者IBAN
    const [supplierBank, setSupplierBank] = useState(''); //受款者銀行
    const [branchNo, setBranchNo] = useState(''); //受款者分行
    const [cableName, setCableName] = useState(''); //海纜資訊
    const [wireRouting, setWireRouting] = useState(''); //Wire Routing
    const [supplierAcctNumber, setSupplierAcctNumber] = useState(''); //受款者銀行帳號
    const [supplierAcctName, setSupplierAcctName] = useState(''); //受款者銀行戶名
    const [supplierSWIFTCode, setSupplierSWIFTCode] = useState(''); //受款者國際銀行代碼
    const [supplierBankAddress, setSupplierBankAddress] = useState(''); //受款者銀行地址

    const [isOne, setIsOne] = useState(false);

    const itemDetailInitial = () => {
        setPartyName([]);
        setLBRatio('');
        setIsEdit(false);
    };

    const handlePrint = (v) => {
        setIsOne(v);
        window.print();
    };

    const styles = {
        paperContainer: {
            // backgroundImage: `url(${'https://itbrief.com.au/uploads/story/2021/08/19/GettyImages-1219077605.webp'})`,
            backgroundImage: `url(${'https://imarketing.iwant-in.net/wp-content/uploads/2020/10/2020_07_12_P1_123RF.jpg'})`,
            backgroundSize: 'cover',
            // color: 'white',
            color: '#000079',
            width: '10rem',
            height: '5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem'
        }
    };

    return (
        <Dialog onClose={handleDialogClose} maxWidth="lg" fullWidth open={isDialogOpen}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose} className="no-print">
                產製帳單
            </BootstrapDialogTitle>
            <DialogContent dividers className="no-print">
                <Grid container spacing={1} className="no-print">
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <MainCard title="聯絡窗口及會員資訊" sx={{ width: '100%' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        聯絡窗口：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="demo-simple-select-label">選擇聯絡窗口</InputLabel>
                                        <Select value={contact} label="會員" onChange={(e) => setContact(e.target.value)}>
                                            <MenuItem value={'張OO'}>張OO</MenuItem>
                                            <MenuItem value={'林OO'}>林OO</MenuItem>
                                            <MenuItem value={'陳XX'}>陳XX</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        發文日期：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={date}
                                        size="small"
                                        label="填寫會員代號"
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Grid>
                                {/* <Grid item xs={3} sm={3} md={3} lg={3} xl={6} /> */}
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        受文者：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={receipient}
                                        size="small"
                                        label="填寫剩餘金額"
                                        onChange={(e) => setRecipient(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        聯絡人員：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={contact}
                                        size="small"
                                        label="填寫摘要"
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        聯絡電話：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={tel}
                                        size="small"
                                        label="填寫摘要"
                                        onChange={(e) => setTel(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        E-mail：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={email}
                                        size="small"
                                        label="填寫摘要"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="start">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        主旨：
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="center">
                                    <Grid
                                        container
                                        spacing={2}
                                        // sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center' }}
                                    >
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
                                </Grid>
                            </Grid>
                        </MainCard>
                        <MainCard title="聯盟金融帳戶資訊" sx={{ width: '100%' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        聯盟銀行帳號：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <FormControl fullWidth size="small">
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            // disabled={billInfo.length > 0}
                                            value={acctNo}
                                            size="small"
                                            label="填寫銀行帳號"
                                            onChange={(e) => setAcctNo(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        受款者IBAN：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={iBAN}
                                        size="small"
                                        label="填寫IBAN"
                                        onChange={(e) => setIBAN(e.target.value)}
                                    />
                                </Grid>
                                {/* <Grid item xs={3} sm={3} md={3} lg={3} xl={6} /> */}
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        受款者銀行：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={supplierBank}
                                        size="small"
                                        label="填寫銀行"
                                        onChange={(e) => setSupplierBank(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        受款者分行：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={branchNo}
                                        size="small"
                                        label="填寫分行"
                                        onChange={(e) => setBranchNo(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        海纜資訊：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={cableName}
                                        size="small"
                                        label="填寫海纜"
                                        onChange={(e) => setCableName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        Wire Routing：
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={wireRouting}
                                        size="small"
                                        label="填寫海纜"
                                        onChange={(e) => setWireRouting(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        受款者銀行帳號：
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={supplierAcctNumber}
                                        size="small"
                                        label="填寫帳號"
                                        onChange={(e) => setSupplierAcctNumber(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        受款者銀行戶名：
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={supplierAcctName}
                                        size="small"
                                        label="填寫戶名"
                                        onChange={(e) => setSupplierAcctName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        受款者國際銀行代碼：
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={supplierSWIFTCode}
                                        size="small"
                                        label="填寫代碼"
                                        onChange={(e) => setSupplierSWIFTCode(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' } }}>
                                        受款者銀行地址：
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={supplierBankAddress}
                                        size="small"
                                        label="填寫地址"
                                        onChange={(e) => setSupplierBankAddress(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <Typography sx={{ fontFamily: 'DFKai-sb', fontWeight: 'bold' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ m: 1 }}>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>
                                        <Paper style={styles.paperContainer} />
                                    </Box>
                                </Box>
                                <Box sx={{ m: 1 }}>
                                    <Box sx={{ fontSize: '12px', textAlign: 'right' }}>No. 31, Ai-kuo&nbsp;East&nbsp;Road</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'right' }}>Taipei 106 Taiwan</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'right' }}>{`Tel：${email}`}</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'right' }}>{`Fax：${email}`}</Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    fontSize: subject1.length <= 50 ? '18px' : '15px',
                                    mt: 1,
                                    // display: 'flex',
                                    // flexWrap: 'nowrap',
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
                                    // display: 'flex',
                                    // flexWrap: 'nowrap',
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {subject2}
                            </Box>
                            <Box sx={{ fontSize: '24px', m: 1, textAlign: 'center' }}>{subject3}</Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ m: 1, with: '50%' }}>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>BILL TO：</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>
                                        China United Network Communications Group Company Limited. International Dept.
                                    </Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>ADDR：No ASDASDASDASDASDADASDADS100033</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>ATTN：Mr. Wang Kai</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>E-mail:PPPPPPP@gmail.com</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>Tel.:+86-10-6625990</Box>
                                </Box>
                                <Box sx={{ m: 1, with: '50%' }}>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>Invoice No. TEWTWETWET</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>(Please Refer To This Invoice No. On Remittance)</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>Issue Date：</Box>
                                    <Box sx={{ fontSize: '12px', textAlign: 'left' }}>Due Date：</Box>
                                </Box>
                            </Box>
                            <Box sx={{ fontSize: '12px', m: 1, display: 'flex', justifyContent: 'space-between' }}>
                                <Box>PO No 1234567890</Box>
                                <Box>(Currencv:USD)</Box>
                            </Box>
                            <Box>
                                <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
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
                                            {/* {dataList?.map((row, id) => {
                            return ( */}
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <StyledTableCell align="center">1</StyledTableCell>
                                                <StyledTableCell align="center">2</StyledTableCell>
                                                <StyledTableCell align="center">3</StyledTableCell>
                                                <StyledTableCell align="center">4</StyledTableCell>
                                                <StyledTableCell align="center">5</StyledTableCell>
                                                <StyledTableCell align="center">6</StyledTableCell>
                                            </TableRow>
                                            {/* ); })} */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;</Box>
                            <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;</Box>
                            <Box sx={{ m: 1, fontSize: '12px' }}>Certified by:</Box>
                            <Box sx={{ fontSize: '12px', m: 1, display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '50%' }}>
                                    <Box sx={{}}>&nbsp;&nbsp;</Box>
                                    <Box sx={{}}>&nbsp;&nbsp;</Box>
                                    <Box sx={{}}>———————————————</Box>
                                    <Box sx={{}}>Hsuan-Lung Liu</Box>
                                    <Box sx={{}}>Director, TPE Upgrade CBP</Box>
                                    <Box sx={{}}>International Business Group,</Box>
                                    <Box sx={{}}>Chunghwa Telecom Co., Ltd.</Box>
                                    <Box sx={{}}>E-mail: lsl008@cht.com.tw</Box>
                                    <Box sx={{}}>Tel.: +886-2-2344-3912</Box>
                                    <Box sx={{}}>Fax: +886-2-2344-5940</Box>
                                </Box>
                                <Box sx={{ width: '50%' }}>
                                    <Box>Payment by Telegraphic Transfer to</Box>
                                    <Box>Bank Name: Mega International Commercial Bank Co., Ltd</Box>
                                    <Box>Branch Address: 100 Chi Lin Rd., Taipei, Taiwan, 104</Box>
                                    <Box>A/C Name:</Box>
                                    <Box>International Business Group Chunghwa Telecom Co., Ltd.</Box>
                                    <Box>Company Addr: 31 Aikuo E. Rd., Taipei, Taiwan, 106</Box>
                                    <Box>AC No.: 00753-110022</Box>
                                    <Box>IBAN:</Box>
                                    <Box>Swift: ICBCTWTP007</Box>
                                    <Box>ACH:</Box>
                                    <Box>Wire/Routing:</Box>
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
                        handlePrint(true);
                    }}
                >
                    列印函稿
                </Button>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handlePrint(false);
                    }}
                >
                    列印函
                </Button>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleDialogClose();
                    }}
                >
                    取消
                </Button>
            </DialogActions>
            <Grid container spacing={1} className="no-show">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography sx={{ fontFamily: 'DFKai-sb', fontWeight: 'bold' }}>
                        <Box sx={{ fontSize: '32px', m: 2 }}>
                            中華電信股份有限公司國際電信分公司&nbsp;&nbsp;&nbsp;函{isOne ? '' : '(稿)'}
                        </Box>
                        <Box sx={{ fontSize: '20px', textAlign: 'right' }}>地址：106&nbsp;台北市愛國東路31號</Box>
                        <Box sx={{ fontSize: '20px', textAlign: 'right' }}>{`聯絡方式：${contact}(${tel})`}</Box>
                        <Box sx={{ fontSize: '20px', textAlign: 'right' }}>{`e-mail：${email}`}</Box>

                        <Box sx={{ fontSize: '20px' }}>發文日期：中華民國112年01月30日</Box>
                        <Box sx={{ fontSize: '20px' }}>{`發文字號：${number}`}</Box>
                        <Box sx={{ fontSize: '20px' }}>速別：最速件</Box>
                        <Box sx={{ fontSize: '20px' }}>密等及解密條件或保密期限：</Box>
                        <Box sx={{ fontSize: '20px' }}>附件： 如文</Box>
                        <Box sx={{ fontSize: '22px' }}>
                            主旨：
                            {isDefault === 'true' || isDefault === true
                                ? `請電匯CIENA JP以支付${subject1}，淨額為美金${subject2}元(US$48,576.00)，請查照。`
                                : subject3}
                        </Box>
                        <Box sx={{ fontSize: '22px' }}>說明：</Box>
                        <Box sx={{ fontSize: '20px' }}>一、請貴分行自本分公司之帳戶(帳號{acctNo})匯至以下帳戶</Box>
                        <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;&nbsp;&nbsp;Account Name: {supplierAcctName}.</Box>
                        <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;&nbsp;&nbsp;Bank: {supplierBank}</Box>
                        <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;&nbsp;&nbsp;Address：{supplierBankAddress}</Box>
                        <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;&nbsp;&nbsp;Account Number: {supplierAcctNumber}</Box>
                        <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;&nbsp;&nbsp;IBAN: {iBAN}</Box>
                        <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;&nbsp;&nbsp;SWIFT: {supplierSWIFTCode}</Box>
                        <Box sx={{ fontSize: '20px' }}>二、本款項請即時匯出，匯款時請附加說明：</Box>
                        <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;&nbsp;&nbsp;Invoice No.15328/15428, {cableName}, US$48,576.00</Box>
                        <Box sx={{ fontSize: '20px' }}>三、本款項為全額到行。</Box>
                        <Box sx={{ fontSize: '20px' }}>四、檢附貴行外幣活期存款第007-53-110022號帳戶同額美金取款憑條乙紙。</Box>
                        {isOne ? (
                            ''
                        ) : (
                            <>
                                <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;</Box>
                                <Box sx={{ fontSize: '20px' }}>分公司總經理&nbsp;&nbsp;&nbsp;吳&nbsp;O&nbsp;O</Box>
                                <Box sx={{ fontSize: '20px' }}>主辦單位簽核：(簽核原則:由上而下，由左而右)：</Box>
                                <Box sx={{ fontSize: '20px' }}>判後：</Box>
                                <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;國際電信分公司會計駐點</Box>
                                <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;</Box>
                                <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;</Box>
                                <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;</Box>
                                <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;國際電信分公司行政管理處(總務科)</Box>
                                <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;</Box>
                                <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;</Box>
                                <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;</Box>
                                <Box sx={{ fontSize: '20px' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;決行：CBP Director((策略暨事業規劃處&nbsp;處長)
                                </Box>
                                <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;</Box>
                                <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;</Box>
                                <Box sx={{ fontSize: '20px' }}>&nbsp;&nbsp;</Box>
                            </>
                        )}
                    </Typography>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default BillDraftMake;
