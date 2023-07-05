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

import { addSubmarineCables, submarineCableList, deleteSubmarineCables, editSubmarineCables } from 'components/apis.jsx';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen, setSubmarineCableList } from 'store/reducers/dropdown';

const SubmarineCableDataList = ({ maxHei }) => {
    const dispatch = useDispatch();
    const fakeData = [
        {
            CableID: 1,
            CableCode: 'NEC',
            CableName: 'NEC',
            Note: '+886'
        },
        {
            CableID: 2,
            CableCode: 'NEC#2',
            CableName: 'NEC#2',
            Note: '+888'
        }
    ];
    const [infoList, setInfoList] = useState(fakeData);
    const [cableName, setCableName] = useState(''); //海纜名稱
    const [cableCode, setCableCode] = useState(''); //代碼
    const [note, setNote] = useState(''); //摘要
    const cableIDEdit = useRef(-1);
    const [cableCodeEdit, setCableCodeEdit] = useState(''); //代碼編輯
    const [cableNameEdit, setCableNameEdit] = useState(''); //供應商編輯
    const [noteEdit, setNoteEdit] = useState(''); //帳號名稱編輯

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
        setCableCode('');
        setCableName('');
        setNote('');
    };

    const editInfoInit = () => {
        cableIDEdit.current = -1;
        setCableCodeEdit('');
        setCableNameEdit('');
        setNoteEdit('');
    };

    const querySubmarineCablesInfo = () => {
        fetch(submarineCableList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('取得海纜資料成功=>', data);
                if (Array.isArray(data)) {
                    setInfoList(data);
                    dispatch(setSubmarineCableList({ subCableList: data }));
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    const addPartyInfo = () => {
        let tmpArray = {
            CableCode: cableCode,
            CableName: cableName,
            Note: note
        };
        fetch(addSubmarineCables, { method: 'POST', body: JSON.stringify(tmpArray), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '新增海纜資料成功' } }));
                infoInit();
                querySubmarineCablesInfo();
            })
            .catch((e) => console.log('e1=>', e));
    };

    const deletePartyInfo = (row) => {
        fetch(deleteSubmarineCables, { method: 'POST', body: JSON.stringify(row), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '刪除海纜資料成功' } }));
                querySubmarineCablesInfo();
            })
            .catch((e) => console.log('e1=>', e));
    };

    const editPartyInfo = (row) => {
        cableIDEdit.current = row.CableID;
        setCableCodeEdit(row.CableCode);
        setCableNameEdit(row.CableName);
        setNoteEdit(row.Note);
    };

    const saveEditPartyInfo = () => {
        let tmpArray = {
            CableID: cableIDEdit.current,
            CableCode: cableCodeEdit,
            CableName: cableNameEdit,
            Note: noteEdit
        };
        fetch(editSubmarineCables, { method: 'POST', body: JSON.stringify(tmpArray), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '更新海纜資料成功' } }));
                editInfoInit();
                querySubmarineCablesInfo();
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        querySubmarineCablesInfo();
    }, []);

    return (
        <TableContainer component={Paper} sx={{ maxHeight: maxHei }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Action</StyledTableCell>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center">代碼</StyledTableCell>
                        <StyledTableCell align="center">海纜名稱</StyledTableCell>
                        <StyledTableCell align="center">摘要</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                // style={{ width: '30%' }}
                                value={cableCode}
                                onChange={(e) => {
                                    setCableCode(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                // style={{ width: '30%' }}
                                value={cableName}
                                onChange={(e) => {
                                    setCableName(e.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                size="small"
                                value={note}
                                onChange={(e) => {
                                    setNote(e.target.value);
                                }}
                            />
                        </TableCell>
                    </TableRow>
                    {infoList?.map((row, id) => {
                        return (
                            <TableRow
                                // key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {row.CableID !== cableIDEdit.current ? (
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
                                        <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                        <StyledTableCell align="center">{row.CableCode}</StyledTableCell>
                                        <StyledTableCell align="center">{row.CableName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Note}</StyledTableCell>
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
                                                    關閉
                                                </Button>
                                            </Box>
                                        </StyledTableCell>
                                        <TableCell align="center">{id + 1}</TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                // style={{ width: '30%' }}
                                                value={cableCodeEdit}
                                                onChange={(e) => {
                                                    setCableCodeEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                // style={{ width: '30%' }}
                                                value={cableNameEdit}
                                                onChange={(e) => {
                                                    setCableNameEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                value={noteEdit}
                                                onChange={(e) => {
                                                    setNoteEdit(e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SubmarineCableDataList;
