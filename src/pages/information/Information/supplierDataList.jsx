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

import { addSuppliers, getSuppliersInfo, deleteSuppliers, editSuppliers } from 'components/apis.jsx';

const ToCombineDataList = ({ listInfo, BootstrapDialogTitle, apiQuery }) => {
    const fakeData = [
        {
            SupplierID: 1,
            submarineCable: 'NEC',
            workTitle: '+886',
            Fax: '+886',
            partyName: 'Taiwan',
            SWIFTCode: 'google.com',
            IBAN: 'XXX',
            BankName: '123',
            BankAddress: '123'
        },
        {
            SupplierID: 2,
            submarineCable: 'NEC',
            workTitle: '+886',
            Fax: '+886',
            partyName: 'Taiwan',
            SWIFTCode: 'google.com',
            IBAN: 'XXX',
            BankName: '123',
            BankAddress: '123'
        }
    ];
    const [infoList, setInfoList] = useState(fakeData);
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [partyName, setpartyName] = useState(''); //會員名稱

    const [sWIFTCode, setSWIFTCode] = useState(''); //國際銀行代碼
    const [iBAN, setIBAN] = useState(''); //國際銀行帳戶號碼
    const [bankName, setBankName] = useState(''); //銀行名稱
    const [bankAddress, setBankAddress] = useState(''); //銀行地址
    const supplierID = useRef(-1);
    const [submarineCableEdit, setSubmarineCableEdit] = useState(''); //供應商編輯
    const [workTitleEdit, setWorkTitleEdit] = useState(''); //帳號名稱編輯
    const [partyNameEdit, setpartyNameEdit] = useState(''); //銀行帳號編輯
    const [sWIFTCodeEdit, setSWIFTCodeEdit] = useState(''); //國際銀行代碼編輯
    const [iBANEdit, setIBANEdit] = useState(''); //國際銀行帳戶號碼編輯
    const [bankNameEdit, setBankNameEdit] = useState(''); //銀行名稱編輯
    const [bankAddressEdit, setBankAddressEdit] = useState(''); //銀行地址編輯
    // const [editItem, setEditItem] = useState(-1);

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

    const editInfoInit = () => {
        supplierID.current = -1;
        setSubmarineCableEdit('');
        setWorkTitleEdit('');
        setpartyNameEdit('');
        setSWIFTCodeEdit('');
        setIBANEdit('');
        setBankNameEdit('');
        setBankAddressEdit('');
        querySuppliersInfo();
    };

    const querySuppliersInfo = () => {
        fetch(getSuppliersInfo, { method: 'GET' })
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
            submarineCable: submarineCable,
            workTitle: workTitle,
            partyName: partyName,
            SWIFTCode: sWIFTCode,
            IBAN: iBAN,
            BankName: bankName,
            BankAddress: bankAddress
        };
        fetch(addSuppliers, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then((data) => {
                alert('新增供應商資料成功');
                querySuppliersInfo();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const deleteSupplierInfo = (row) => {
        fetch(deleteSuppliers, { method: 'POST', body: JSON.stringify(row) })
            .then((res) => res.json())
            .then(() => {
                alert('刪除供應商資料成功');
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const editSupplierInfo = (row) => {
        // setEditItem(id);
        supplierID.current = row.SupplierID;
        setSubmarineCableEdit(row.submarineCable);
        setWorkTitleEdit(row.workTitle);
        setpartyNameEdit(row.partyName);
        setSWIFTCodeEdit(row.SWIFTCode);
        setIBANEdit(row.IBAN);
        setBankNameEdit(row.BankName);
        setBankAddressEdit(row.BankAddress);
    };

    const saveEditSupplierInfo = () => {
        let tmpArray = {
            SupplierID: supplierID.current,
            submarineCable: submarineCableEdit,
            workTitle: workTitleEdit,
            partyName: partyNameEdit,
            SWIFTCode: sWIFTCodeEdit,
            IBAN: iBANEdit,
            BankName: bankNameEdit,
            BankAddress: bankAddressEdit
        };
        fetch(editSuppliers, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then((data) => {
                console.log('????=>>', data);
                alert('更新供應商資料成功');
                editInfoInit();
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
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center">供應商名稱</StyledTableCell>
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
                        return (
                            <TableRow
                                // key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {row.SupplierID !== supplierID.current ? (
                                    <>
                                        <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                        <StyledTableCell align="center">{row.submarineCable}</StyledTableCell>
                                        <StyledTableCell align="center">{row.workTitle}</StyledTableCell>
                                        <StyledTableCell align="center">{row.partyName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.SWIFTCode}</StyledTableCell>
                                        <StyledTableCell align="center">{row.IBAN}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BankName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.BankAddress}</StyledTableCell>
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
                                                value={partyNameEdit}
                                                onChange={(e) => {
                                                    setpartyNameEdit(e.target.value);
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
                                                value={bankNameEdit}
                                                onChange={(e) => {
                                                    setBankNameEdit(e.target.value);
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
                    <TableRow
                        // key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                // style={{ width: '30%' }}
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
                                value={partyName}
                                onChange={(e) => {
                                    setpartyName(e.target.value);
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
                                value={bankName}
                                onChange={(e) => {
                                    setBankName(e.target.value);
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

export default ToCombineDataList;
