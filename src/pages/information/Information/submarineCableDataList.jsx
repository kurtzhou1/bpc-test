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

import { addSubmarineCables, getSubmarineCablesInfo, deleteSubmarineCables, editSubmarineCables } from 'components/apis.jsx';

const SubmarineCableDataList = ({}) => {
    const fakeData = [
        {
            CorpID: 1,
            cableName: 'NEC',
            SubmarineCable: '+886'
        },
        {
            CorpID: 2,
            cableName: 'NEC#2',
            SubmarineCable: '+888'
        }
    ];
    const [infoList, setInfoList] = useState(fakeData);
    const [cableName, setCableName] = useState(''); //海纜名稱
    const [note, setNote] = useState(''); //摘要
    const cableID = useRef(-1);
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
        setCableName('');
        setNote('');
    };

    const editInfoInit = () => {
        cableID.current = -1;
        setCableNameEdit('');
        setNoteEdit('');
    };

    const querySubmarineCablesInfo = () => {
        fetch(getSubmarineCablesInfo, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('取得海纜資料成功=>', data);
                if (Array.isArray(data)) {
                    setInfoList(data);
                }
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const addPartyInfo = () => {
        let tmpArray = {
            cableName: cableName,
            note: note
        };
        console.log('tmpArray=>>', tmpArray);
        fetch(addSubmarineCables, { method: 'POST', body: JSON.stringify(tmpArray), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                alert('新增海纜資料成功');
                infoInit();
                querySubmarineCablesInfo();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const deletePartyInfo = (row) => {
        fetch(deleteSubmarineCables, { method: 'POST', body: JSON.stringify(row), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                alert('刪除海纜資料成功');
                querySubmarineCablesInfo();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    const editPartyInfo = (row) => {
        cableID.current = row.CableID;
        setCableNameEdit(row.CableName);
        setNoteEdit(row.Note);
    };

    const saveEditPartyInfo = () => {
        let tmpArray = {
            CorpID: cableID.current,
            cableName: cableNameEdit,
            note: noteEdit
        };
        console.log('123=>>', tmpArray);
        fetch(editSubmarineCables, { method: 'POST', body: JSON.stringify(tmpArray), headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then(() => {
                alert('更新海纜資料成功');
                editInfoInit();
                querySubmarineCablesInfo();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    useEffect(() => {
        querySubmarineCablesInfo();
    }, []);

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center">海纜名稱</StyledTableCell>
                        <StyledTableCell align="center">摘要</StyledTableCell>
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
                                {row.CableID !== cableID.current ? (
                                    <>
                                        <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                        <StyledTableCell align="center">{row.CableName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Note}</StyledTableCell>
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

export default SubmarineCableDataList;
