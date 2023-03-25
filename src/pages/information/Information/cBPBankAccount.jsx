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

import { addCorporates, getCorporatesInfo, deleteCorporates, editCorporates } from 'components/apis.jsx';
// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const Corporates = ({}) => {
    const dispatch = useDispatch();
    const fakeData = [
        {
            CorpID: 1,
            CorpName: 'NEC',
            AcctName: '+886',
            AcctNo: 'Taiwan',
            SavingAcctNo: '123',
            ACHNo: 'ACHNo',
            WireRouting: '123',
            SWIFTCode: 'XXX',
            Branch: 'branch',
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
            SavingAcctNo: '123',
            ACHNo: 'ACHNo',
            WireRouting: '123',
            Branch: 'branch',
            IBAN: '123',
            Name: '123',
            Address: 'google.com'
        }
    ];
    const [infoList, setInfoList] = useState(fakeData);
    const [corpName, setCorpName] = useState(''); //聯盟代號
    const [acctName, setAcctName] = useState(''); //海纜作業
    const [acctNo, setAcctNo] = useState(''); //會員名稱
    const [savingbankAcctNo, setSavingBankAcctNo] = useState(''); //銀行帳號2
    const [sWIFTCode, setSWIFTCode] = useState(''); //聯繫窗口
    const [aCHNo, setaCHno] = useState(''); //ACH NO
    const [wireRouting, setWireRouting] = useState(''); //Wire/Routing
    const [branch, setBranch] = useState('');
    const [iBAN, setIBAN] = useState(''); //電子郵件
    const [name, setName] = useState(''); //電話
    const [address, setAddress] = useState(''); //公司地址
    const corpID = useRef(-1);
    const [corpNameEdit, setCorpNameEdit] = useState(''); //供應商編輯
    const [acctNameEdit, setAcctNameEdit] = useState(''); //帳號名稱編輯
    const [acctNoEdit, setAcctNoEdit] = useState(''); //銀行帳號編輯
    const [savingBankAcctNoEdit, setSavingBankAcctNoEdit] = useState(''); //銀行帳號2編輯
    const [sWIFTCodeEdit, setSWIFTCodeEdit] = useState(''); //國際銀行帳戶號碼編輯
    const [iBANEdit, setIBANEdit] = useState(''); //銀行名稱編輯
    const [nameEdit, setNameEdit] = useState(''); //銀行地址編輯
    const [addressEdit, setAddressEdit] = useState(''); //國際銀行代碼編輯
    const [aCHNoEdit, setaCHnoEdit] = useState(''); //ACH NO編輯
    const [wireRoutingEdit, setWireRoutingEdit] = useState(''); //Wire/Routing編輯
    const [branchEdit, setBranchEdit] = useState('');

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
        setSavingBankAcctNo('');
        setaCHno('');
        setWireRouting('');
        setBranch('');
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
        setSavingBankAcctNoEdit('');
        setaCHnoEdit('');
        setWireRoutingEdit('');
        setBranchEdit('');
    };

    const queryCorporatesInfo = () => {
        fetch(getCorporatesInfo, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('取得Corporates資料成功=>', data);
                if (Array.isArray(data)) {
                    setInfoList(data);
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    const addCorporatesInfo = () => {
        let tmpArray = {
            CorpName: corpName,
            AcctName: acctName,
            AcctNo: acctNo,
            SavingAcctNo: savingbankAcctNo,
            SWIFTCode: sWIFTCode,
            IBAN: iBAN,
            ACHNo: aCHNo,
            WireRouting: wireRouting,
            Name: name,
            Branch: branch,
            Address: address
        };
        console.log('tmpArray=>>', tmpArray);
        fetch(addCorporates, { method: 'POST', body: JSON.stringify(tmpArray), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                dispatch(
                    setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '新增聯盟金融帳戶資料成功' } })
                );
                infoInit();
                queryCorporatesInfo();
            })
            .catch((e) => console.log('e1=>', e));
    };

    const deleteCorporatesInfo = (row) => {
        fetch(deleteCorporates, { method: 'POST', body: JSON.stringify(row), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                dispatch(
                    setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '刪除聯盟金融帳戶資料成功' } })
                );
                queryCorporatesInfo();
            })
            .catch((e) => console.log('e1=>', e));
    };

    const editCorporatesInfo = (row) => {
        console.log(row, row.CorpID);
        corpID.current = row.CorpID;
        setCorpNameEdit(row.CorpName);
        setAcctNameEdit(row.AcctName);
        setAcctNoEdit(row.AcctNo);
        setSWIFTCodeEdit(row.SWIFTCode);
        setIBANEdit(row.IBAN);
        setNameEdit(row.Name);
        setAddressEdit(row.Address);
        setSavingBankAcctNoEdit(row.SavingAcctNo);
        setaCHnoEdit(row.ACHNo);
        setWireRoutingEdit(row.WireRouting);
        setBranchEdit(row.Branch);
    };

    const saveEditCorporatesInfo = () => {
        let tmpArray = {
            PartyID: corpID.current,
            CorpName: corpNameEdit,
            AcctName: acctNameEdit,
            AcctNo: acctNoEdit,
            SavingAcctNo: savingBankAcctNoEdit,
            SWIFTCode: sWIFTCodeEdit,
            IBAN: iBANEdit,
            ACHNo: aCHNoEdit,
            WireRouting: wireRoutingEdit,
            Name: nameEdit,
            Branch: branchEdit,
            Address: addressEdit
        };
        console.log('123=>>', tmpArray);
        fetch(editCorporates, { method: 'POST', body: JSON.stringify(tmpArray), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((data) => {
                dispatch(
                    setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '更新聯盟金融帳戶資料成功' } })
                );
                editInfoInit();
                queryCorporatesInfo();
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        queryCorporatesInfo();
    }, []);

    console.log('corpID.current=>>', corpID.current);
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center">聯盟代號/名稱</StyledTableCell>
                        <StyledTableCell align="center">Account Name</StyledTableCell>
                        <StyledTableCell align="center">Account No.</StyledTableCell>
                        <StyledTableCell align="center">Saving Account No.</StyledTableCell>
                        <StyledTableCell align="center">SWIFT Code</StyledTableCell>
                        <StyledTableCell align="center">IBAN</StyledTableCell>
                        <StyledTableCell align="center">ACH No</StyledTableCell>
                        <StyledTableCell align="center">Wire/Routing</StyledTableCell>
                        <StyledTableCell align="center">Bank Name</StyledTableCell>
                        <StyledTableCell align="center">Branch Name</StyledTableCell>
                        <StyledTableCell align="center">Bank Address</StyledTableCell>
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
                                        <StyledTableCell align="center">{row.SavingAcctNo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.SWIFTCode}</StyledTableCell>
                                        <StyledTableCell align="center">{row.IBAN}</StyledTableCell>
                                        <StyledTableCell align="center">{row.ACHNo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.WireRouting}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Name}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Branch}</StyledTableCell>
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
                                                        editCorporatesInfo(row);
                                                    }}
                                                >
                                                    編輯
                                                </Button>
                                                <Button
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        deleteCorporatesInfo(row);
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
                                                disabled={savingBankAcctNoEdit.length > 0}
                                                value={acctNoEdit}
                                                onChange={(e) => {
                                                    setAcctNoEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                disabled={acctNoEdit.length > 0}
                                                value={savingBankAcctNoEdit}
                                                onChange={(e) => {
                                                    setSavingBankAcctNoEdit(e.target.value);
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
                                                    setaCHnoEdit(e.target.value);
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
                                                value={nameEdit}
                                                onChange={(e) => {
                                                    setNameEdit(e.target.value);
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
                                                value={addressEdit}
                                                onChange={(e) => {
                                                    setAddressEdit(e.target.value);
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
                                                        saveEditCorporatesInfo();
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
                                disabled={savingbankAcctNo.length > 0}
                                onChange={(e) => {
                                    setAcctNo(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={savingbankAcctNo}
                                disabled={acctNo.length > 0}
                                onChange={(e) => {
                                    setSavingBankAcctNo(e.target.value);
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
                                    setaCHno(e.target.value);
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
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
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
                                <Button color="success" variant="outlined" onClick={addCorporatesInfo}>
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

export default Corporates;
