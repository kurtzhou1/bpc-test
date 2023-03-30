import { useState, useRef, useEffect } from 'react';

// project import
import { handleNumber } from 'components/commonFunction';
// material-ui
import { Button, Table, TextField, Box, Select, MenuItem } from '@mui/material';
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
import { useDispatch, useSelector } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const Corporates = ({}) => {
    const dispatch = useDispatch();
    const { subCableList } = useSelector((state) => state.dropdown); //供應商下拉選單 + 海纜名稱下拉選單
    const fakeData = [
        {
            CorpID: 1,
            // CorpName: 'NEC',
            SubmarineCable: 'SJC2', //海纜名稱
            WorkTitle: 'Construction', //海纜作業
            Address: 'google.com', //聯盟地址
            BankAcctName: '+886', //銀行帳號名稱
            BankAcctNo: 'Taiwan', //銀行帳號1
            SavingAcctNo: '123', //銀行帳號2
            SWIFTCode: 'XXX', //國際銀行代碼
            IBAN: '123', //國際銀行代碼
            ACHNo: 'ACHNo', //ACH號碼
            WireRouting: '123', //WireRouting
            BankName: '123', //銀行名稱
            Branch: 'branch', //分行名稱
            BranchAddress: 'BranchAddress' //分行地址
        },
        {
            CorpID: 2,
            // CorpName: 'NEC',
            BankAcctName: '+886',
            BankAcctNo: 'Taiwan',
            SWIFTCode: 'XXX',
            SavingAcctNo: '123',
            ACHNo: 'ACHNo',
            WireRouting: '123',
            Branch: 'branch',
            IBAN: '123',
            BankName: '123',
            Address: 'google.com',
            WorkTitle: 'Construction',
            SubmarineCable: 'SJC2',
            BranchAddress: 'BranchAddress'
        }
    ];
    const [infoList, setInfoList] = useState(fakeData);
    // const [corpName, setCorpName] = useState(''); //聯盟代號
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
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [submarineCableEdit, setSubmarineCableEdit] = useState(''); //供應商編輯
    const [workTitleEdit, setWorkTitleEdit] = useState(''); //帳號名稱編輯
    const [branchAddress, setBranchAddress] = useState('');
    const [branchAddressEdit, setBranchAddressEdit] = useState('');
    const corpID = useRef(-1);
    // const [corpNameEdit, setCorpNameEdit] = useState(''); //供應商編輯
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
            paddingBottom: '0.2rem',
            fontSize: '0.5rem'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem',
            fontSize: '0.5rem'
        }
    }));

    const infoInit = () => {
        // setCorpName('');
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
        setSubmarineCable('');
        setWorkTitle('');
        setBranchAddress('');
    };

    const editInfoInit = () => {
        corpID.current = -1;
        // setCorpNameEdit('');
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
        setSubmarineCableEdit('');
        setWorkTitleEdit('');
        setBranchAddressEdit('');
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
            // CorpName: corpName,
            BankAcctName: acctName,
            BankAcctNo: acctNo,
            SavingAcctNo: savingbankAcctNo,
            SWIFTCode: sWIFTCode,
            IBAN: iBAN,
            ACHNo: aCHNo,
            WireRouting: wireRouting,
            BankName: name,
            Branch: branch,
            Address: address,
            SubmarineCable: submarineCable,
            WorkTitle: workTitle,
            BranchAddress: branchAddress
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
        // setCorpNameEdit(row.CorpName);
        setAcctNameEdit(row.BankAcctName);
        setAcctNoEdit(row.BankAcctNo);
        setSWIFTCodeEdit(row.SWIFTCode);
        setIBANEdit(row.IBAN);
        setNameEdit(row.BankName);
        setAddressEdit(row.Address);
        setSavingBankAcctNoEdit(row.SavingAcctNo);
        setaCHnoEdit(row.ACHNo);
        setWireRoutingEdit(row.WireRouting);
        setBranchEdit(row.Branch);
        setSubmarineCableEdit(row.SubmarineCable);
        setWorkTitleEdit(row.WorkTitle);
        setBranchAddressEdit(row.BranchAddress);
    };

    const saveEditCorporatesInfo = () => {
        let tmpArray = {
            PartyID: corpID.current,
            // CorpName: corpNameEdit,
            BankAcctName: acctNameEdit,
            BankAcctNo: acctNoEdit,
            SavingAcctNo: savingBankAcctNoEdit,
            SWIFTCode: sWIFTCodeEdit,
            IBAN: iBANEdit,
            ACHNo: aCHNoEdit,
            WireRouting: wireRoutingEdit,
            BankName: nameEdit,
            Branch: branchEdit,
            Address: addressEdit,
            SubmarineCable: submarineCableEdit,
            WorkTitle: workTitleEdit,
            BranchAddress: branchAddress
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

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow sx={{ fontSize: '50px' }}>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        {/* <StyledTableCell align="center">聯盟代號/名稱</StyledTableCell> */}
                        <StyledTableCell align="center">海纜名稱</StyledTableCell>
                        <StyledTableCell align="center">海纜作業</StyledTableCell>
                        <StyledTableCell align="center">地址</StyledTableCell>
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
                                        <StyledTableCell align="center">
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexFlow: 'column',
                                                    justifyContent: 'center',
                                                    '& button': { mx: { md: 0.6, lg: 1, xl: 1.8 }, my: 0.2, p: 0, fontSize: 1 }
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
                                        <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                        {/* <StyledTableCell align="center">{row.CorpName}</StyledTableCell> */}
                                        <StyledTableCell align="center">{row.SubmarineCable}</StyledTableCell>
                                        <StyledTableCell align="center">{row.WorkTitle}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BranchAddress}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BankAcctName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BankAcctNo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.SavingAcctNo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.SWIFTCode}</StyledTableCell>
                                        <StyledTableCell align="center">{row.IBAN}</StyledTableCell>
                                        <StyledTableCell align="center">{row.ACHNo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.WireRouting}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BankName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Branch}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BranchAddress}</StyledTableCell>
                                    </>
                                ) : (
                                    <>
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
                                        <TableCell sx={{ fontSize: '0.5rem' }} align="center">
                                            {id + 1}
                                        </TableCell>
                                        {/* <TableCell align="center">
                                            <TextField
                                                size="small"
                                                // style={{ width: '30%' }}
                                                value={corpNameEdit}
                                                onChange={(e) => {
                                                    setCorpNameEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell> */}
                                        <TableCell align="center">
                                            <Select
                                                size="small"
                                                value={submarineCableEdit}
                                                onChange={(e) => setSubmarineCableEdit(e.target.value)}
                                            >
                                                {subCableList.map((i) => (
                                                    <MenuItem key={i.CableName} value={i.CableName}>
                                                        {i.CableName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Select
                                                size="small"
                                                value={workTitleEdit}
                                                label="填寫海纜作業"
                                                onChange={(e) => setWorkTitleEdit(e.target.value)}
                                            >
                                                <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                                                <MenuItem value={'Construction'}>Construction</MenuItem>
                                                <MenuItem value={'O&M'}>O&M</MenuItem>
                                            </Select>
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
                                                value={branchAddressEdit}
                                                onChange={(e) => {
                                                    setBranchAddressEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        );
                    })}
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                        <TableCell align="center"></TableCell>
                        {/* <TableCell align="center">
                            <TextField
                                size="small"
                                value={corpName}
                                onChange={(e) => {
                                    setCorpName(e.target.value);
                                }}
                            />
                        </TableCell> */}
                        <TableCell align="center">
                            <Select size="small" value={submarineCable} onChange={(e) => setSubmarineCable(e.target.value)}>
                                {subCableList.map((i) => (
                                    <MenuItem key={i.CableName} value={i.CableName}>
                                        {i.CableName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </TableCell>
                        <TableCell align="center">
                            <Select size="small" value={workTitle} label="填寫海纜作業" onChange={(e) => setWorkTitle(e.target.value)}>
                                <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                                <MenuItem value={'Construction'}>Construction</MenuItem>
                                <MenuItem value={'O&M'}>O&M</MenuItem>
                            </Select>
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
                                value={branchAddress}
                                onChange={(e) => {
                                    setBranchAddress(e.target.value);
                                }}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Corporates;
