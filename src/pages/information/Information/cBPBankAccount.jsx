import { useState, useRef, useEffect } from 'react';

// project import
import { handleNumber } from 'components/commonFunction';
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
    TextField,
    Box
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';

import dayjs from 'dayjs';

import { addCBPBankAccount, getCBPBankAccountInfo, deleteCBPBankAccount, editCBPBankAccount } from 'components/apis.jsx';

const CBPBankAccount = ({}) => {
    const fakeData = [
        {
            CorpID: 1,
            CorpName: 'NEC',
            AcctName: '+886',
            AcctNo: 'Taiwan',
            SWIFTCode: 'XXX',
            IBAN: '123',
            Name: '123',
            Address: 'google.com'
        },
        {
            CorpID: 2,
            CorpName: 'NEC',
            AcctName: '+886',
            AcctNo: 'Taiwan',
            SWIFTCode: 'XXX',
            IBAN: '123',
            Name: '123',
            Address: 'google.com'
        }
    ];
    const [infoList, setInfoList] = useState(fakeData);
    const [corpName, setCorpName] = useState(''); //聯盟代號
    const [acctName, setAcctName] = useState(''); //海纜作業
    const [acctNo, setAcctNo] = useState(''); //會員名稱
    const [sWIFTCode, setSWIFTCode] = useState(''); //聯繫窗口
    const [iBAN, setIBAN] = useState(''); //電子郵件
    const [name, setName] = useState(''); //電話
    const [address, setAddress] = useState(''); //公司地址
    const corpID = useRef(-1);
    const [corpNameEdit, setCorpNameEdit] = useState(''); //供應商編輯
    const [acctNameEdit, setAcctNameEdit] = useState(''); //帳號名稱編輯
    const [acctNoEdit, setAcctNoEdit] = useState(''); //銀行帳號編輯
    const [sWIFTCodeEdit, setSWIFTCodeEdit] = useState(''); //國際銀行帳戶號碼編輯
    const [iBANEdit, setIBANEdit] = useState(''); //銀行名稱編輯
    const [nameEdit, setNameEdit] = useState(''); //銀行地址編輯
    const [addressEdit, setAddressEdit] = useState(''); //國際銀行代碼編輯

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

    const infoInit = () => {
        setCorpName('');
        setAcctName('');
        setAcctNo('');
        setSWIFTCodeEdit('');
        setSWIFTCode('');
        setIBAN('');
        setName('');
        setAddress('');
    };

    const editInfoInit = () => {
        corpID.current = -1;
        setCorpNameEdit('');
        setAcctNameEdit('');
        setAcctNoEdit('');
        setSWIFTCodeEdit('');
        setIBANEdit('');
        setNameEdit('');
        setAddressEdit('');
        queryCBPBankAccountInfo();
    };

    const queryCBPBankAccountInfo = () => {
        fetch(getCBPBankAccountInfo, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('取得CBPBankAccount資料成功=>', data);
                if (Array.isArray(data)) {
                    setInfoList(data);
                }
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const addCBPBankAccountInfo = () => {
        let tmpArray = {
            CorpName: corpName,
            AcctName: acctName,
            AcctNo: acctNo,
            SWIFTCode: sWIFTCode,
            IBAN: iBAN,
            Name: name,
            Address: address
        };
        console.log('tmpArray=>>', tmpArray);
        fetch(addCBPBankAccount, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then(() => {
                alert('新增會員資料成功');
                infoInit();
                queryCBPBankAccountInfo();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const deleteCBPBankAccountInfo = (row) => {
        fetch(deleteCBPBankAccount, { method: 'POST', body: JSON.stringify(row) })
            .then((res) => res.json())
            .then(() => {
                alert('刪除會員資料成功');
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const editCBPBankAccountInfo = (row) => {
        console.log(row, row.CorpID);
        corpID.current = row.CorpID;
        setCorpNameEdit(row.CorpName);
        setAcctNameEdit(row.AcctName);
        setAcctNoEdit(row.AcctNo);
        setSWIFTCodeEdit(row.SWIFTCode);
        setIBANEdit(row.IBAN);
        setNameEdit(row.Name);
        setAddressEdit(row.Address);
    };

    const saveEditCBPBankAccountInfo = () => {
        let tmpArray = {
            PartyID: corpID.current,
            CorpName: corpNameEdit,
            AcctName: acctNameEdit,
            AcctNo: acctNoEdit,
            SWIFTCode: sWIFTCodeEdit,
            IBAN: iBANEdit,
            Name: nameEdit,
            Address: addressEdit
        };
        console.log('123=>>', tmpArray);
        fetch(editCBPBankAccount, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then((data) => {
                alert('更新會員資料成功');
                editInfoInit();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    useEffect(() => {
        queryCBPBankAccountInfo();
    }, []);

    console.log('corpID.current=>>', corpID.current);
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center">聯盟代號/名稱</StyledTableCell>
                        <StyledTableCell align="center">帳號名稱</StyledTableCell>
                        <StyledTableCell align="center">銀行帳號</StyledTableCell>
                        <StyledTableCell align="center">國際銀行代碼</StyledTableCell>
                        <StyledTableCell align="center">國際銀行帳戶號碼</StyledTableCell>
                        <StyledTableCell align="center">銀行名稱</StyledTableCell>
                        <StyledTableCell align="center">銀行地址</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {infoList?.map((row, id) => {
                        console.log('infoList=>>', infoList);
                        return (
                            <TableRow
                                // key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {row.CorpID !== corpID.current ? (
                                    <>
                                        <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                        <StyledTableCell align="center">{row.CorpName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.AcctName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.AcctNo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.SWIFTCode}</StyledTableCell>
                                        <StyledTableCell align="center">{row.IBAN}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Name}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Address}</StyledTableCell>
                                        <StyledTableCell align="center">
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
                                                        editCBPBankAccountInfo(row);
                                                    }}
                                                >
                                                    編輯
                                                </Button>
                                                <Button
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        deleteCBPBankAccountInfo(row);
                                                    }}
                                                >
                                                    刪除
                                                </Button>
                                            </Box>
                                        </StyledTableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell align="center">{id + 1}</TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                // style={{ width: '30%' }}
                                                value={corpNameEdit}
                                                onChange={(e) => {
                                                    setCorpNameEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={acctNameEdit}
                                                onChange={(e) => {
                                                    setAcctNameEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={acctNoEdit}
                                                onChange={(e) => {
                                                    setAcctNoEdit(e.target.value);
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
                                                value={nameEdit}
                                                onChange={(e) => {
                                                    setNameEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <StyledTableCell align="center">
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
                                                        saveEditCBPBankAccountInfo();
                                                    }}
                                                >
                                                    儲存
                                                </Button>
                                                <Button
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        editInfoInit();
                                                    }}
                                                >
                                                    取消
                                                </Button>
                                            </Box>
                                        </StyledTableCell>
                                    </>
                                )}
                            </TableRow>
                        );
                    })}
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                // style={{ width: '30%' }}
                                value={corpName}
                                onChange={(e) => {
                                    setCorpName(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={acctName}
                                onChange={(e) => {
                                    setAcctName(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={acctNo}
                                onChange={(e) => {
                                    setAcctNo(e.target.value);
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
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    '& button': { mx: { md: 0.6, lg: 1, xl: 1.8 }, p: 0, fontSize: 1 }
                                }}
                            >
                                <Button color="success" variant="outlined" onClick={addCBPBankAccountInfo}>
                                    新增
                                </Button>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CBPBankAccount;
