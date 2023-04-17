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

import { addParties, getPartiesAllInfo, deleteParties, editParties } from 'components/apis.jsx';
import { makeStyles } from '@material-ui/core/styles';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setMessageStateOpen, setPartiesList } from 'store/reducers/dropdown';

// icon
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.gary,
        color: theme.palette.common.black,
        paddingTop: '0rem',
        paddingBottom: '0rem',
        fontSize: '0.3rem'
    },
    [`&.${tableCellClasses.body}`]: {
        paddingTop: '0.1rem',
        paddingBottom: '0.1rem',
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

const columns1 = [
    { id: '海纜名稱', label: '海纜名稱', align: 'center' },
    { id: '海纜作業', label: '海纜作業', align: 'center' }
];

const columns2 = [
    {
        id: '會員名稱',
        label: '會員名稱',

        align: 'center'
    },
    { id: '會員代碼', label: '會員代碼', align: 'center' },
    {
        id: '公司名稱',
        label: '公司名稱',

        align: 'center'
    },
    {
        id: '公司地址',
        label: '公司地址',

        align: 'center'
    },
    {
        id: '聯絡窗口',
        label: '聯絡窗口',

        align: 'center'
    },
    {
        id: '電子郵件',
        label: '電子郵件',

        align: 'center'
    },
    {
        id: '電話',
        label: '電話',

        align: 'center'
    }
];

const columns3 = [
    { id: 'Bank A/C Name', label: 'Bank A/C Name', align: 'center' },
    {
        id: 'Bank Name',
        label: 'Bank Name',
        align: 'center'
    },
    {
        id: 'Branch',
        label: 'Branch',
        align: 'center'
    },
    {
        id: 'Bank Address',
        label: 'Bank Address',
        align: 'center'
    }
];

const columns4 = [
    {
        id: 'A/C No.',
        label: 'A/C No.',
        align: 'center'
    },
    {
        id: 'Saving A/C No.',
        label: 'Saving A/C No.',
        align: 'center'
    },
    {
        id: 'SWIFT Code',
        label: 'SWIFT Code',
        align: 'center'
    },
    {
        id: 'ACH No',
        label: 'ACH No',
        align: 'center'
    },
    {
        id: 'SWIFT Code',
        label: 'SWIFT Code',
        align: 'center'
    },
    {
        id: 'Wire/Routing',
        label: 'Wire/Routing',
        align: 'center'
    }
];

const PartyDataList = ({ maxHei }) => {
    const dispatch = useDispatch();
    const { subCableList } = useSelector((state) => state.dropdown); //海纜名稱下拉選單
    const [infoList, setInfoList] = useState([]);
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

    const [isColumn1Open, setIsColumn1Open] = useState(false);
    const [isColumn2Open, setIsColumn2Open] = useState(false);
    const [isColumn3Open, setIsColumn3Open] = useState(false);
    const [isColumn4Open, setIsColumn4Open] = useState(false);

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
        fetch(getPartiesAllInfo, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setInfoList(data);
                    // dispatch(setPartiesList({ partiesList: data }));
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
            BankAcctNo: accountNo,
            SavingAcctNo: savingAccountNo,
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
        setAccountNoEdit(row.BankAcctNo);
        setSavingAccountNoEdit(row.SavingAcctNo);
        setSWIFTCodeEdit(row.SWIFTCode);
        setIBANEdit(row.IBAN);
        setACHNoEdit(row.ACHNo);
        setWireRoutingEdit(row.WireRouting);
        setBankNameEdit(row.BankName);
        setBranchEdit(row.Branch);
        setBankAddressEdit(row.BankAddress);
    };

    const copyPartyInfo = (row) => {
        setCode(row.PartyCode);
        setSubmarineCable(row.SubmarineCable);
        setWorkTitle(row.WorkTitle);
        setPartyName(row.PartyName);
        setAddress(row.Address);
        setContact(row.Contact);
        setEmail(row.Email);
        setTel(row.Tel);
        setCompanyName(row.CompanyName);
        setBankAcctName(row.BankAcctName);
        setAccountNo(row.BankAcctNo);
        setSavingAccountNo(row.SavingAcctNo);
        setSWIFTCode(row.SWIFTCode);
        setIBAN(row.IBAN);
        setACHNo(row.ACHNo);
        setWireRouting(row.WireRouting);
        setBankName(row.BankName);
        setBranch(row.Branch);
        setBankAddress(row.BankAddress);
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
            BankAcctNo: accountNoEdit,
            SavingAcctNo: savingAccountNoEdit,
            SWIFTCode: sWIFTCodeEdit,
            IBAN: iBANEdit,
            ACHNo: aCHNoEdit,
            WireRouting: wireRoutingEdit,
            BankName: bankNameEdit,
            Branch: branchEdit,
            BankAddress: bankAddressEdit
        };
        fetch(editParties, { method: 'POST', body: JSON.stringify(tmpArray), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
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
        <TableContainer id="tableContainer" component={Paper} sx={{ maxHeight: maxHei }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow></TableRow>
                    <TableRow>
                        <StyledTableCell align="center">Action</StyledTableCell>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        {isColumn1Open ? (
                            columns1.map((column, id) => {
                                return (
                                    <StyledTableCell key={column.id} align={column.align}>
                                        {id === 0 ? (
                                            <Button
                                                sx={{ p: 0, minWidth: '30px' }}
                                                onClick={() => {
                                                    setIsColumn1Open(!isColumn1Open);
                                                }}
                                            >
                                                {isColumn1Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                            </Button>
                                        ) : (
                                            ''
                                        )}
                                        {column.label}
                                    </StyledTableCell>
                                );
                            })
                        ) : (
                            <StyledTableCell key={columns1[0].id} align={columns1[0].align}>
                                <Button
                                    sx={{ p: 0, minWidth: '30px' }}
                                    onClick={() => {
                                        setIsColumn1Open(!isColumn1Open);
                                    }}
                                >
                                    {isColumn1Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                </Button>
                                {columns1[0].label}
                            </StyledTableCell>
                        )}
                        {isColumn2Open ? (
                            columns2.map((column, id) => {
                                return (
                                    <StyledTableCell key={column.id} align={column.align}>
                                        {id === 0 ? (
                                            <Button
                                                sx={{ p: 0, minWidth: '30px' }}
                                                onClick={() => {
                                                    setIsColumn2Open(!isColumn2Open);
                                                }}
                                            >
                                                {isColumn2Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                            </Button>
                                        ) : (
                                            ''
                                        )}
                                        {column.label}
                                    </StyledTableCell>
                                );
                            })
                        ) : (
                            <StyledTableCell key={columns2[0].id} align={columns2[0].align}>
                                <Button
                                    sx={{ p: 0, minWidth: '30px' }}
                                    onClick={() => {
                                        setIsColumn2Open(!isColumn2Open);
                                    }}
                                >
                                    {isColumn2Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                </Button>
                                {columns2[0].label}
                            </StyledTableCell>
                        )}
                        {isColumn3Open ? (
                            columns3.map((column, id) => {
                                return (
                                    <StyledTableCell key={column.id} align={column.align}>
                                        {id === 0 ? (
                                            <Button
                                                sx={{ p: 0, minWidth: '30px' }}
                                                onClick={() => {
                                                    setIsColumn3Open(!isColumn3Open);
                                                }}
                                            >
                                                {isColumn3Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                            </Button>
                                        ) : (
                                            ''
                                        )}
                                        {column.label}
                                    </StyledTableCell>
                                );
                            })
                        ) : (
                            <StyledTableCell key={columns3[0].id} align={columns3[0].align}>
                                <Button
                                    sx={{ p: 0, minWidth: '30px' }}
                                    onClick={() => {
                                        setIsColumn3Open(!isColumn3Open);
                                    }}
                                >
                                    {isColumn3Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                </Button>
                                {columns3[0].label}
                            </StyledTableCell>
                        )}
                        {isColumn4Open ? (
                            columns4.map((column, id) => {
                                return (
                                    <StyledTableCell key={column.id} align={column.align}>
                                        {id === 0 ? (
                                            <Button
                                                sx={{ p: 0, minWidth: '30px' }}
                                                onClick={() => {
                                                    setIsColumn4Open(!isColumn4Open);
                                                }}
                                            >
                                                {isColumn4Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                            </Button>
                                        ) : (
                                            ''
                                        )}
                                        {column.label}
                                    </StyledTableCell>
                                );
                            })
                        ) : (
                            <StyledTableCell key={columns4[0].id} align={columns4[0].align}>
                                <Button
                                    sx={{ p: 0, minWidth: '30px' }}
                                    onClick={() => {
                                        setIsColumn4Open(!isColumn4Open);
                                    }}
                                >
                                    {isColumn4Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                </Button>
                                {columns4[0].label}
                            </StyledTableCell>
                        )}
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
                                        <StyledTableCell align="center">
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexFlow: isColumn2Open ? 'column' : 'row',
                                                    justifyContent: 'center',
                                                    '& button': { mx: { md: 0.1, lg: 0.1, xl: 0.3 }, my: 0.2, p: 0, fontSize: 1 }
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
                                                    color="success"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        copyPartyInfo(row);
                                                    }}
                                                >
                                                    複製
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
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                        {isColumn1Open ? (
                                            <>
                                                <StyledTableCell align="center">{row.SubmarineCable}</StyledTableCell>
                                                <StyledTableCell align="center">{row.WorkTitle}</StyledTableCell>
                                            </>
                                        ) : (
                                            <StyledTableCell align="center">{row.SubmarineCable}</StyledTableCell>
                                        )}
                                        {isColumn2Open ? (
                                            <>
                                                <StyledTableCell align="center">{row.PartyName}</StyledTableCell>
                                                <StyledTableCell align="center">{row.PartyCode}</StyledTableCell>
                                                <StyledTableCell align="center">{row.CompanyName}</StyledTableCell>
                                                <StyledTableCell align="center">{row.Address}</StyledTableCell>
                                                <StyledTableCell align="center">{row.Contact}</StyledTableCell>
                                                <StyledTableCell align="center">{row.Email}</StyledTableCell>
                                                <StyledTableCell align="center">{row.Tel}</StyledTableCell>
                                            </>
                                        ) : (
                                            <StyledTableCell align="center">{row.PartyName}</StyledTableCell>
                                        )}
                                        {isColumn3Open ? (
                                            <>
                                                <StyledTableCell align="center">{row.BankAcctName}</StyledTableCell>
                                                <StyledTableCell align="center">{row.BankName}</StyledTableCell>
                                                <StyledTableCell align="center">{row.Branch}</StyledTableCell>
                                                <StyledTableCell align="center">{row.BankAddress}</StyledTableCell>
                                            </>
                                        ) : (
                                            <StyledTableCell align="center">{row.BankAcctName}</StyledTableCell>
                                        )}
                                        {isColumn4Open ? (
                                            <>
                                                <StyledTableCell align="center">{row.BankAcctNo}</StyledTableCell>
                                                <StyledTableCell align="center">{row.SavingAcctNo}</StyledTableCell>
                                                <StyledTableCell align="center">{row.SWIFTCode}</StyledTableCell>
                                                <StyledTableCell align="center">{row.IBAN}</StyledTableCell>
                                                <StyledTableCell align="center">{row.ACHNo}</StyledTableCell>
                                                <StyledTableCell align="center">{row.WireRouting}</StyledTableCell>
                                            </>
                                        ) : (
                                            <StyledTableCell align="center">{row.BankAcctNo}</StyledTableCell>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <StyledTableCell align="center">
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexFlow: isColumn2Open ? 'column' : 'row',
                                                    justifyContent: 'center',
                                                    '& button': { mx: { md: 0.6, lg: 1, xl: 1.8 }, my: 0.2, p: 0, fontSize: 1 }
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
                                        {isColumn1Open ? (
                                            <>
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
                                            </>
                                        ) : (
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
                                        )}
                                        {isColumn2Open ? (
                                            <>
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
                                                        sx={{ width: '3rem' }}
                                                        value={codeEdit}
                                                        onChange={(e) => {
                                                            setCodeEdit(e.target.value);
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
                                            </>
                                        ) : (
                                            <TableCell align="center">
                                                <TextField
                                                    size="small"
                                                    value={partyNameEdit}
                                                    onChange={(e) => {
                                                        setPartyNameEdit(e.target.value);
                                                    }}
                                                />
                                            </TableCell>
                                        )}
                                        {isColumn3Open ? (
                                            <>
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
                                        ) : (
                                            <TableCell align="center">
                                                <TextField
                                                    size="small"
                                                    value={bankAcctNameEdit}
                                                    onChange={(e) => {
                                                        setBankAcctNameEdit(e.target.value);
                                                    }}
                                                />
                                            </TableCell>
                                        )}
                                        {isColumn4Open ? (
                                            <>
                                                <TableCell align="center">
                                                    <TextField
                                                        size="small"
                                                        value={accountNoEdit}
                                                        disabled={savingAccountNoEdit?.length > 0 || !!savingAccountNoEdit}
                                                        onChange={(e) => {
                                                            setAccountNoEdit(e.target.value);
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <TextField
                                                        size="small"
                                                        value={savingAccountNoEdit}
                                                        disabled={accountNoEdit?.length > 0 || !!accountNoEdit}
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
                                            </>
                                        ) : (
                                            <TableCell align="center">
                                                <TextField
                                                    size="small"
                                                    value={accountNoEdit}
                                                    onChange={(e) => {
                                                        setAccountNoEdit(e.target.value);
                                                    }}
                                                />
                                            </TableCell>
                                        )}
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
                                    flexFlow: isColumn2Open ? 'column' : 'row',
                                    justifyContent: 'center',
                                    '& button': { mx: { md: 0.6, lg: 1, xl: 1.8 }, my: 0.2, p: 0, fontSize: 1 }
                                }}
                            >
                                <Button color="primary" variant="outlined" onClick={addPartyInfo}>
                                    新增
                                </Button>
                                <Button color="success" variant="outlined" onClick={infoInit}>
                                    清除
                                </Button>
                            </Box>
                        </TableCell>
                        <TableCell align="center"></TableCell>
                        {isColumn1Open ? (
                            <>
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
                                    <Select
                                        size="small"
                                        value={workTitle}
                                        label="填寫海纜作業"
                                        onChange={(e) => setWorkTitle(e.target.value)}
                                    >
                                        <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                                        <MenuItem value={'Construction'}>Construction</MenuItem>
                                        <MenuItem value={'O&M'}>O&M</MenuItem>
                                    </Select>
                                </TableCell>
                            </>
                        ) : (
                            <TableCell align="center">
                                <Select size="small" value={submarineCable} onChange={(e) => setSubmarineCable(e.target.value)}>
                                    {subCableList.map((i) => (
                                        <MenuItem key={i.CableName} value={i.CableName}>
                                            {i.CableName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                        )}
                        {isColumn2Open ? (
                            <>
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
                                        sx={{ width: '3rem' }}
                                        value={code}
                                        onChange={(e) => {
                                            setCode(e.target.value);
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
                            </>
                        ) : (
                            <TableCell align="center">
                                <TextField
                                    size="small"
                                    value={partyName}
                                    onChange={(e) => {
                                        setPartyName(e.target.value);
                                    }}
                                />
                            </TableCell>
                        )}
                        {isColumn3Open ? (
                            <>
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
                            </>
                        ) : (
                            <TableCell align="center">
                                <TextField
                                    size="small"
                                    value={bankAcctName}
                                    onChange={(e) => {
                                        setBankAcctName(e.target.value);
                                    }}
                                />
                            </TableCell>
                        )}
                        {isColumn4Open ? (
                            <>
                                <TableCell align="center">
                                    <TextField
                                        size="small"
                                        value={accountNo}
                                        disabled={savingAccountNo?.length > 0 || !!savingAccountNo}
                                        onChange={(e) => {
                                            setAccountNo(e.target.value);
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        size="small"
                                        value={savingAccountNo}
                                        disabled={accountNo?.length > 0 || !!accountNo}
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
                            </>
                        ) : (
                            <TableCell align="center">
                                <TextField
                                    size="small"
                                    value={accountNo}
                                    onChange={(e) => {
                                        setAccountNo(e.target.value);
                                    }}
                                />
                            </TableCell>
                        )}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PartyDataList;
