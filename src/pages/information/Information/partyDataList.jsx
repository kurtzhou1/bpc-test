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

import { addParties, getPartiesInfoList, deleteParties, editParties } from 'components/apis.jsx';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const PartyDataList = ({}) => {
    const dispatch = useDispatch();
    const fakeData = [
        {
            PartyID: 1,
            SubmarineCable: 'NEC',
            WorkTitle: '+886',
            PartyName: 'Taiwan',
            Address: 'google.com',
            Contact: 'XXX',
            Email: '123',
            Tel: '123'
        },
        {
            PartyID: 2,
            SubmarineCable: 'NEC',
            WorkTitle: '+886',
            PartyName: 'Taiwan',
            Address: 'google.com',
            Contact: 'XXX',
            Email: '123',
            Tel: '123'
        }
    ];
    const [infoList, setInfoList] = useState(fakeData);
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [partyName, setPartyName] = useState(''); //會員名稱
    const [address, setAddress] = useState(''); //公司地址
    const [contact, setContact] = useState(''); //聯繫窗口
    const [email, setEmail] = useState(''); //電子郵件
    const [tel, setTel] = useState(''); //電話
    const partyID = useRef(-1);
    const [submarineCableEdit, setSubmarineCableEdit] = useState(''); //供應商編輯
    const [workTitleEdit, setWorkTitleEdit] = useState(''); //帳號名稱編輯
    const [partyNameEdit, setPartyNameEdit] = useState(''); //銀行帳號編輯
    const [addressEdit, setAddressEdit] = useState(''); //國際銀行代碼編輯
    const [contactEdit, setContactEdit] = useState(''); //國際銀行帳戶號碼編輯
    const [emailEdit, setEmailEdit] = useState(''); //銀行名稱編輯
    const [telEdit, setTelEdit] = useState(''); //銀行地址編輯

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
        setSubmarineCable('');
        setWorkTitle('');
        setPartyName('');
        setAddress('');
        setContactEdit('');
        setContact('');
        setEmail('');
        setTel('');
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
    };

    const queryPartiesInfo = () => {
        fetch(getPartiesInfoList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('取得Parties資料成功=>', data);
                if (Array.isArray(data)) {
                    setInfoList(data);
                }
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const addPartyInfo = () => {
        let tmpArray = {
            SubmarineCable: submarineCable,
            WorkTitle: workTitle,
            PartyName: partyName,
            Address: address,
            Contact: contact,
            Email: email,
            Tel: tel
        };
        console.log('tmpArray=>>', tmpArray);
        fetch(addParties, { method: 'POST', body: JSON.stringify(tmpArray), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '新增會員資料成功' } }));
                infoInit();
                queryPartiesInfo();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const deletePartyInfo = (row) => {
        fetch(deleteParties, { method: 'POST', body: JSON.stringify(row), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '刪除會員資料成功' } }));
                queryPartiesInfo();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const editPartyInfo = (row) => {
        // setEditItem(id);
        partyID.current = row.PartyID;
        setSubmarineCableEdit(row.SubmarineCable);
        setWorkTitleEdit(row.WorkTitle);
        setPartyNameEdit(row.PartyName);
        setAddressEdit(row.Address);
        setContactEdit(row.Contact);
        setEmailEdit(row.Email);
        setTelEdit(row.Tel);
    };

    const saveEditPartyInfo = () => {
        let tmpArray = {
            PartyID: partyID.current,
            SubmarineCable: submarineCableEdit,
            WorkTitle: workTitleEdit,
            PartyName: partyNameEdit,
            Address: addressEdit,
            Contact: contactEdit,
            Email: emailEdit,
            Tel: telEdit
        };
        console.log('123=>>', tmpArray);
        fetch(editParties, { method: 'POST', body: JSON.stringify(tmpArray), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((data) => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '更新會員資料成功' } }));
                editInfoInit();
                queryPartiesInfo();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    useEffect(() => {
        queryPartiesInfo();
    }, []);

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center">海纜名稱</StyledTableCell>
                        <StyledTableCell align="center">海纜作業</StyledTableCell>
                        <StyledTableCell align="center">會員名稱</StyledTableCell>
                        <StyledTableCell align="center">公司地址</StyledTableCell>
                        <StyledTableCell align="center">聯絡窗口</StyledTableCell>
                        <StyledTableCell align="center">電子郵件</StyledTableCell>
                        <StyledTableCell align="center">電話</StyledTableCell>
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
                                {row.PartyID !== partyID.current ? (
                                    <>
                                        <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                        <StyledTableCell align="center">{row.SubmarineCable}</StyledTableCell>
                                        <StyledTableCell align="center">{row.WorkTitle}</StyledTableCell>
                                        <StyledTableCell align="center">{row.PartyName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Address}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Contact}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Email}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Tel}</StyledTableCell>
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
                                                    setPartyNameEdit(e.target.value);
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
                                                        saveEditPartyInfo();
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
                                    setPartyName(e.target.value);
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
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PartyDataList;
