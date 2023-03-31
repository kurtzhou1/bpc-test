import { useState, useRef, useEffect } from 'react';

// project import
import { handleNumber } from 'components/commonFunction';
// material-ui
import { Button, Table, TextField, Box } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';

import dayjs from 'dayjs';

import { addParties, getPartiesInfoList, deleteParties, editParties } from 'components/apis.jsx';
import { makeStyles } from '@material-ui/core/styles';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen, setPartiesList } from 'store/reducers/dropdown';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.gary,
        color: theme.palette.common.black,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        fontSize: '0.3rem'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        fontSize: '0.3rem'
    }
}));

const useStyles = makeStyles({
    sticky: {
        position: 'sticky',
        left: 0,
        background: 'white',
        boxShadow: '0.5px 2px 5px grey',
        zIndex: 100
    }
});

const PartyDataList = ({}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const fakeData = [
        {
            PartyID: 1,
            PartyCode: 'NEC',
            SubmarineCable: 'NEC',
            WorkTitle: '+886',
            PartyName: 'Taiwan',
            Address: 'google.com',
            Contact: 'XXX',
            Email: 'pppp@gmail.com',
            Tel: '+886912123',
            CompanyName: 'CompanyName',
            BankAcctName: 'BankAcctName',
            AccountNo: 'AccountNo',
            SavingAccountNo: 'SavingAccountNo',
            SWIFTCode: 'SWIFTCode',
            IBAN: 'IBAN',
            ACHNo: 'ACHNo',
            WireRouting: 'WireRouting',
            BankName: 'BankName',
            Branch: 'Branch',
            BankAddress: 'BankAddress'
        },
        {
            PartyID: 2,
            PartyCode: 'NEC',
            SubmarineCable: 'NEC',
            WorkTitle: '+886',
            PartyName: 'Taiwan',
            Address: 'google.com',
            Contact: 'XXX',
            Email: 'pppp@gmail.com',
            Tel: '886912123',
            CompanyName: 1,
            BankAcctName: 2,
            AccountNo: 3,
            SavingAccountNo: 4,
            SWIFTCode: 5,
            IBAN: 6,
            ACHNo: 7,
            WireRouting: 8,
            BankName: 9,
            Branch: 0,
            BankAddress: 1111
        }
    ];
    const [infoList, setInfoList] = useState(fakeData);
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [code, setCode] = useState(''); //代碼
    const [partyName, setPartyName] = useState(''); //會員名稱
    const [address, setAddress] = useState(''); //公司地址
    const [contact, setContact] = useState(''); //聯繫窗口
    const [email, setEmail] = useState(''); //電子郵件
    const [tel, setTel] = useState(''); //電話
    const [companyName, setCompanyName] = useState('');
    const [bankAcctName, setBankAcctName] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [savingAccountNo, setSavingAccountNo] = useState('');
    const [sWIFTCode, setSWIFTCode] = useState('');
    const [iBAN, setIBAN] = useState('');
    const [aCHNo, setACHNo] = useState('');
    const [wireRouting, setWireRouting] = useState('');
    const [bankName, setBankName] = useState('');
    const [branch, setBranch] = useState('');
    const [bankAddress, setBankAddress] = useState('');
    const partyID = useRef(-1);
    const [codeEdit, setCodeEdit] = useState(''); //代碼編輯
    const [submarineCableEdit, setSubmarineCableEdit] = useState(''); //供應商編輯
    const [workTitleEdit, setWorkTitleEdit] = useState(''); //帳號名稱編輯
    const [partyNameEdit, setPartyNameEdit] = useState(''); //銀行帳號編輯
    const [addressEdit, setAddressEdit] = useState(''); //國際銀行代碼編輯
    const [contactEdit, setContactEdit] = useState(''); //國際銀行帳戶號碼編輯
    const [emailEdit, setEmailEdit] = useState(''); //銀行名稱編輯
    const [telEdit, setTelEdit] = useState('');
    const [companyNameEdit, setCompanyNameEdit] = useState('');
    const [bankAcctNameEdit, setBankAcctNameEdit] = useState('');
    const [accountNoEdit, setAccountNoEdit] = useState('');
    const [savingAccountNoEdit, setSavingAccountNoEdit] = useState('');
    const [sWIFTCodeEdit, setSWIFTCodeEdit] = useState('');
    const [iBANEdit, setIBANEdit] = useState('');
    const [aCHNoEdit, setACHNoEdit] = useState('');
    const [wireRoutingEdit, setWireRoutingEdit] = useState('');
    const [bankNameEdit, setBankNameEdit] = useState('');
    const [branchEdit, setBranchEdit] = useState('');
    const [bankAddressEdit, setBankAddressEdit] = useState('');

    const infoInit = () => {
        setSubmarineCable('');
        setWorkTitle('');
        setPartyName('');
        setAddress('');
        setContact('');
        setEmail('');
        setTel('');
        setCompanyName('');
        setBankAcctName('');
        setAccountNo('');
        setSavingAccountNo('');
        setSWIFTCode('');
        setIBAN('');
        setACHNo('');
        setWireRouting('');
        setBankName('');
        setBranch('');
        setBankAddress('');
        setCode('');
    };

    const editInfoInit = () => {
        partyID.current = -1;
        setSubmarineCableEdit('');
        setWorkTitleEdit('');
        setPartyNameEdit('');
        setAddressEdit('');
        setContactEdit('');
        setEmailEdit('');
        setTelEdit('');
        setCompanyNameEdit('');
        setBankAcctNameEdit('');
        setAccountNoEdit('');
        setSavingAccountNoEdit('');
        setSWIFTCodeEdit('');
        setIBANEdit('');
        setACHNoEdit('');
        setWireRoutingEdit('');
        setBankNameEdit('');
        setBranchEdit('');
        setBankAddressEdit('');
        setCodeEdit('');
    };

    const queryPartiesInfo = () => {
        fetch(getPartiesInfoList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setInfoList(data);
                    dispatch(setPartiesList({ partiesList: data }));
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    const addPartyInfo = () => {
        let tmpArray = {
            PartyCode: code,
            SubmarineCable: submarineCable,
            WorkTitle: workTitle,
            PartyName: partyName,
            Address: address,
            Contact: contact,
            Email: email,
            Tel: tel,
            CompanyName: companyName,
            BankAcctName: bankAcctName,
            AccountNo: accountNo,
            SavingAccountNo: savingAccountNo,
            SWIFTCode: sWIFTCode,
            IBAN: iBAN,
            ACHNo: aCHNo,
            WireRouting: wireRouting,
            BankName: bankName,
            Branch: branch,
            BankAddress: bankAddress
        };
        console.log('tmpArray=>>', tmpArray);
        fetch(addParties, { method: 'POST', body: JSON.stringify(tmpArray), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '新增會員資料成功' } }));
                infoInit();
                queryPartiesInfo();
            })
            .catch((e) => console.log('e1=>', e));
    };

    const deletePartyInfo = (row) => {
        fetch(deleteParties, { method: 'POST', body: JSON.stringify(row), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '刪除會員資料成功' } }));
                queryPartiesInfo();
            })
            .catch((e) => console.log('e1=>', e));
    };

    const editPartyInfo = (row) => {
        // setEditItem(id);
        console.log('row=>>', row);
        partyID.current = row.PartyID;
        setCodeEdit(row.PartyCode);
        setSubmarineCableEdit(row.SubmarineCable);
        setWorkTitleEdit(row.WorkTitle);
        setPartyNameEdit(row.PartyName);
        setAddressEdit(row.Address);
        setContactEdit(row.Contact);
        setEmailEdit(row.Email);
        setTelEdit(row.Tel);
        setCompanyNameEdit(row.CompanyName);
        setBankAcctNameEdit(row.BankAcctName);
        setAccountNoEdit(row.AccountNo);
        setSavingAccountNoEdit(row.SavingAccountNo);
        setSWIFTCodeEdit(row.SWIFTCode);
        setIBANEdit(row.IBAN);
        setACHNoEdit(row.ACHNo);
        setWireRoutingEdit(row.WireRouting);
        setBankNameEdit(row.BankName);
        setBranchEdit(row.Branch);
        setBankAddressEdit(row.BankAddress);
    };

    const saveEditPartyInfo = () => {
        let tmpArray = {
            PartyID: partyID.current,
            PartyCode: codeEdit,
            SubmarineCable: submarineCableEdit,
            WorkTitle: workTitleEdit,
            PartyName: partyNameEdit,
            Address: addressEdit,
            Contact: contactEdit,
            Email: emailEdit,
            Tel: telEdit,
            CompanyName: companyNameEdit,
            BankAcctName: bankAcctNameEdit,
            AccountNo: accountNoEdit,
            SavingAccountNo: savingAccountNoEdit,
            SWIFTCode: sWIFTCodeEdit,
            IBAN: iBANEdit,
            ACHNo: aCHNoEdit,
            WireRouting: wireRoutingEdit,
            BankName: bankNameEdit,
            Branch: branchEdit,
            BankAddress: bankAddressEdit
        };
        console.log('tmpArray=>>', tmpArray);
        fetch(editParties, { method: 'POST', body: JSON.stringify(tmpArray), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((data) => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '更新會員資料成功' } }));
                editInfoInit();
                queryPartiesInfo();
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        queryPartiesInfo();
    }, []);

    return (
        <TableContainer className="test-table" component={Paper} sx={{ maxHeight: 700 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" className={classes.sticky}>
                            <TableCell>Action</TableCell>
                        </StyledTableCell>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            海纜名稱
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            海纜作業
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '4rem' }}>
                            代碼
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            會員名稱
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            公司名稱
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '8rem' }}>
                            公司地址
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '5rem' }}>
                            聯絡窗口
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            電子郵件
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            電話
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            銀行帳號名稱
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            Account No.
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            Saving Account No.
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            SWIFT Code
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            ACH No
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            SWIFT Code
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            Wire/Routing
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            銀行名稱
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '6rem' }}>
                            分行名稱
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: '8rem' }}>
                            銀行地址
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {infoList?.map((row, id) => {
                        return (
                            <TableRow
                                // key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {row.PartyID !== partyID.current ? (
                                    <>
                                        <StyledTableCell align="center" className={classes.sticky}>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        '& button': { mx: { md: 0.6, lg: 1, xl: 1.8 }, p: 0, fontSize: 1 }
                                                    }}
                                                >
                                                    <Button
                                                        color="primary"
                                                        variant="outlined"
                                                        onClick={() => {
                                                            editPartyInfo(row);
                                                        }}
                                                    >
                                                        編輯
                                                    </Button>
                                                    <Button
                                                        color="error"
                                                        variant="outlined"
                                                        onClick={() => {
                                                            deletePartyInfo(row);
                                                        }}
                                                    >
                                                        刪除
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{row.SubmarineCable}</TableCell>
                                            <TableCell>{row.WorkTitle}</TableCell>
                                        </StyledTableCell>
                                        {/* <StyledTableCell align="center" className={classes.sticky}>
                                            {row.SubmarineCable}
                                        </StyledTableCell>
                                        <StyledTableCell align="center" className={classes.sticky}>
                                            {row.WorkTitle}
                                        </StyledTableCell> */}
                                        <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                        <StyledTableCell align="center">{row.PartyCode}</StyledTableCell>
                                        <StyledTableCell align="center">{row.PartyName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.CompanyName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Address}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Contact}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Email}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Tel}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BankAcctName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.AccountNo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.SavingAccountNo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.SWIFTCode}</StyledTableCell>
                                        <StyledTableCell align="center">{row.IBAN}</StyledTableCell>
                                        <StyledTableCell align="center">{row.ACHNo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.WireRouting}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BankName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Branch}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BankAddress}</StyledTableCell>
                                    </>
                                ) : (
                                    <>
                                        <StyledTableCell align="center" className={classes.sticky}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    '& button': { mx: { md: 0.6, lg: 1, xl: 1.8 }, p: 0, fontSize: 1 }
                                                }}
                                            >
                                                <Button color="primary" variant="outlined" onClick={saveEditPartyInfo}>
                                                    儲存
                                                </Button>
                                                <Button color="error" variant="outlined" onClick={editInfoInit}>
                                                    取消
                                                </Button>
                                            </Box>
                                        </StyledTableCell>
                                        <TableCell align="center">{id + 1}</TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                // style={{ width: '30%' }}
                                                value={submarineCableEdit}
                                                onChange={(e) => {
                                                    setSubmarineCableEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={workTitleEdit}
                                                onChange={(e) => {
                                                    setWorkTitleEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={codeEdit}
                                                onChange={(e) => {
                                                    setCodeEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={partyNameEdit}
                                                onChange={(e) => {
                                                    setPartyNameEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={companyNameEdit}
                                                onChange={(e) => {
                                                    setCompanyNameEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={addressEdit}
                                                onChange={(e) => {
                                                    setAddressEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={contactEdit}
                                                onChange={(e) => {
                                                    setContactEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={emailEdit}
                                                onChange={(e) => {
                                                    setEmailEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={telEdit}
                                                onChange={(e) => {
                                                    setTelEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={bankAcctNameEdit}
                                                onChange={(e) => {
                                                    setBankAcctNameEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={accountNoEdit}
                                                onChange={(e) => {
                                                    setAccountNoEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={savingAccountNoEdit}
                                                onChange={(e) => {
                                                    setSavingAccountNoEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={sWIFTCodeEdit}
                                                onChange={(e) => {
                                                    setSWIFTCodeEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={iBANEdit}
                                                onChange={(e) => {
                                                    setIBANEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={aCHNoEdit}
                                                onChange={(e) => {
                                                    setACHNoEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={wireRoutingEdit}
                                                onChange={(e) => {
                                                    setWireRoutingEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={bankNameEdit}
                                                onChange={(e) => {
                                                    setBankNameEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={branchEdit}
                                                onChange={(e) => {
                                                    setBranchEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={bankAddressEdit}
                                                onChange={(e) => {
                                                    setBankAddressEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        );
                    })}
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center" className={classes.sticky}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    '& button': { mx: { md: 0.6, lg: 1, xl: 1.8 }, p: 0, fontSize: 1 }
                                }}
                            >
                                <Button color="success" variant="outlined" onClick={addPartyInfo}>
                                    新增
                                </Button>
                            </Box>
                        </TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={submarineCable}
                                onChange={(e) => {
                                    setSubmarineCable(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={workTitle}
                                onChange={(e) => {
                                    setWorkTitle(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={partyName}
                                onChange={(e) => {
                                    setPartyName(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={companyName}
                                onChange={(e) => {
                                    setCompanyName(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={contact}
                                onChange={(e) => {
                                    setContact(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={tel}
                                onChange={(e) => {
                                    setTel(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={bankAcctName}
                                onChange={(e) => {
                                    setBankAcctName(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={accountNo}
                                onChange={(e) => {
                                    setAccountNo(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={savingAccountNo}
                                onChange={(e) => {
                                    setSavingAccountNo(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={sWIFTCode}
                                onChange={(e) => {
                                    setSWIFTCode(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={iBAN}
                                onChange={(e) => {
                                    setIBAN(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={aCHNo}
                                onChange={(e) => {
                                    setACHNo(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={wireRouting}
                                onChange={(e) => {
                                    setWireRouting(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={bankName}
                                onChange={(e) => {
                                    setBankName(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={branch}
                                onChange={(e) => {
                                    setBranch(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={bankAddress}
                                onChange={(e) => {
                                    setBankAddress(e.target.value);
                                }}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PartyDataList;
