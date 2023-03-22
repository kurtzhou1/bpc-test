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

import { addSuppliers, supplierNameList, deleteSuppliers, editSuppliers } from 'components/apis.jsx';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const SupplierDataList = ({}) => {
    const dispatch = useDispatch();
    const [infoList, setInfoList] = useState([]);
    const [supplierName, setSupplierName] = useState(''); //供應商
    const [bankAcctName, setBankAcctName] = useState(''); //帳號名稱
    const [bankAcctNo, setBankAcctNo] = useState(''); //銀行帳號
    const [savingbankAcctNo, setSavingBankAcctNo] = useState(''); //銀行帳號
    const [sWIFTCode, setSWIFTCode] = useState(''); //國際銀行代碼
    const [iBAN, setIBAN] = useState(''); //國際銀行帳戶號碼
    const [bankName, setBankName] = useState(''); //銀行名稱
    const [branch, setBranch] = useState(''); //分行名稱
    const [bankAddress, setBankAddress] = useState(''); //銀行地址
    const [aCHNo, setaCHno] = useState(''); //ACH NO
    const [wireRouting, setWireRouting] = useState(''); //Wire/Routing
    const supplierID = useRef(-1);
    const [supplierNameEdit, setSupplierNameEdit] = useState(''); //供應商編輯
    const [bankAcctNameEdit, setBankAcctNameEdit] = useState(''); //帳號名稱編輯
    const [bankAcctNoEdit, setBankAcctNoEdit] = useState(''); //銀行帳號1編輯
    const [savingBankAcctNoEdit, setSavingBankAcctNoEdit] = useState(''); //銀行帳號2編輯
    const [sWIFTCodeEdit, setSWIFTCodeEdit] = useState(''); //國際銀行代碼編輯
    const [iBANEdit, setIBANEdit] = useState(''); //國際銀行帳戶號碼編輯
    const [bankNameEdit, setBankNameEdit] = useState(''); //銀行名稱編輯
    const [branchEdit, setBranchEdit] = useState(''); //分行名稱
    const [bankAddressEdit, setBankAddressEdit] = useState(''); //銀行地址編輯
    const [aCHNoEdit, setaCHnoEdit] = useState(''); //ACH NO編輯
    const [wireRoutingEdit, setWireRoutingEdit] = useState(''); //Wire/Routing編輯

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
        setSupplierName('');
        setBankAcctName('');
        setBankAcctNo('');
        setSWIFTCode('');
        setIBAN('');
        setBankName('');
        setBankAddress('');
        setSavingBankAcctNo('');
        setaCHno('');
        setWireRouting('');
    };

    const editInfoInit = () => {
        supplierID.current = -1;
        setSupplierNameEdit('');
        setBankAcctNameEdit('');
        setBankAcctNoEdit('');
        setSWIFTCodeEdit('');
        setIBANEdit('');
        setBankNameEdit('');
        setBankAddressEdit('');
        setSavingBankAcctNoEdit('');
        setWireRoutingEdit('');
        setaCHnoEdit('');
    };

    const querySuppliersInfo = () => {
        fetch(supplierNameList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('取得Suppliers資料成功=>', data);
                if (Array.isArray(data)) {
                    setInfoList(data);
                }
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const addSupplierInfo = () => {
        let tmpArray = {
            SupplierName: supplierName,
            BankAcctName: bankAcctName,
            Branch: branch,
            BankAcctNo: bankAcctNo,
            SWIFTCode: sWIFTCode,
            IBAN: iBAN,
            BankName: bankName,
            BankAddress: bankAddress,
            ACHNo: aCHNo,
            WireRouting: wireRouting
        };
        console.log('addSupplierInfo=>>', tmpArray);
        fetch(addSuppliers, { method: 'POST', body: JSON.stringify(tmpArray), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '新增供應商資料成功' } }));
                infoInit();
                querySuppliersInfo();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const deleteSupplierInfo = (row) => {
        fetch(deleteSuppliers, { method: 'POST', body: JSON.stringify(row), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '刪除供應商資料成功' } }));
                querySuppliersInfo();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const editSupplierInfo = (row) => {
        // setEditItem(id);
        supplierID.current = row.SupplierID;
        setSupplierNameEdit(row.SupplierName);
        setBankAcctNameEdit(row.BankAcctName);
        setBranchEdit(row.Branch);
        setBankAcctNoEdit(row.BankAcctNo);
        setSWIFTCodeEdit(row.SWIFTCode);
        setIBANEdit(row.IBAN);
        setBankNameEdit(row.BankName);
        setBankAddressEdit(row.BankAddress);
        setaCHnoEdit(row.ACHNo);
        setWireRoutingEdit(row.WireRouting);
    };

    const saveEditSupplierInfo = () => {
        let tmpArray = {
            SupplierID: supplierID.current,
            SupplierName: supplierNameEdit,
            BankAcctName: bankAcctNameEdit,
            Branch: branchEdit,
            BankAcctNo1: bankAcctNoEdit,
            BankAcctNo2: savingBankAcctNoEdit,
            SWIFTCode: sWIFTCodeEdit,
            IBAN: iBANEdit,
            BankName: bankNameEdit,
            BankAddress: bankAddressEdit,
            ACHNo: aCHNoEdit,
            WireRouting: wireRoutingEdit
        };
        fetch(editSuppliers, { method: 'POST', body: JSON.stringify(tmpArray), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((data) => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '更新供應商資料成功' } }));
                editInfoInit();
                querySuppliersInfo();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    useEffect(() => {
        querySuppliersInfo();
    }, []);

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">No.</StyledTableCell>
                        <StyledTableCell align="center">供應商名稱</StyledTableCell>
                        <StyledTableCell align="center">Bank Name</StyledTableCell>
                        <StyledTableCell align="center">Branch Name</StyledTableCell>
                        <StyledTableCell align="center">Bank Address</StyledTableCell>
                        <StyledTableCell align="center">Account Name</StyledTableCell>
                        <StyledTableCell align="center">Account No.</StyledTableCell>
                        <StyledTableCell align="center">Saving Account No.</StyledTableCell>
                        <StyledTableCell align="center">ACH No</StyledTableCell>
                        <StyledTableCell align="center">Wire/Routing</StyledTableCell>
                        <StyledTableCell align="center">SWIFT Code</StyledTableCell>
                        <StyledTableCell align="center">IBAN</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {infoList?.map((row, id) => {
                        return (
                            <TableRow
                                // key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {row.SupplierID !== supplierID.current ? (
                                    <>
                                        <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                        <StyledTableCell align="center">{row.SupplierName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BankName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Branch}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BankAddress}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BankAcctName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BankAcctNo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.SavingAcctNo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.ACHNo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.WireRouting}</StyledTableCell>
                                        <StyledTableCell align="center">{row.SWIFTCode}</StyledTableCell>
                                        <StyledTableCell align="center">{row.IBAN}</StyledTableCell>
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
                                                        editSupplierInfo(row);
                                                    }}
                                                >
                                                    編輯
                                                </Button>
                                                <Button
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        deleteSupplierInfo(row);
                                                    }}
                                                >
                                                    刪除
                                                </Button>
                                            </Box>
                                        </StyledTableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                // style={{ width: '30%' }}
                                                value={supplierNameEdit}
                                                onChange={(e) => {
                                                    setSupplierNameEdit(e.target.value);
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
                                                value={bankAcctNoEdit}
                                                disabled={savingBankAcctNoEdit.length > 0}
                                                onChange={(e) => {
                                                    setBankAcctNoEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={savingBankAcctNoEdit}
                                                disabled={bankAcctNoEdit.length > 0}
                                                onChange={(e) => {
                                                    setSavingBankAcctNoEdit(e.target.value);
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
                                                        saveEditSupplierInfo();
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
                                value={supplierName}
                                onChange={(e) => {
                                    setSupplierName(e.target.value);
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
                                value={bankAcctNo}
                                disabled={savingbankAcctNo.length > 0}
                                onChange={(e) => {
                                    setBankAcctNo(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                disabled={bankAcctNo.length > 0}
                                value={savingbankAcctNo}
                                onChange={(e) => {
                                    setSavingBankAcctNo(e.target.value);
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    '& button': { mx: { md: 0.6, lg: 1, xl: 1.8 }, p: 0, fontSize: 1 }
                                }}
                            >
                                <Button color="success" variant="outlined" onClick={addSupplierInfo}>
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

export default SupplierDataList;
