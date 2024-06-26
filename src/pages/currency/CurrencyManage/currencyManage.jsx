import { useEffect, useState, useRef } from 'react';
import {
    Box,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Checkbox,
    Autocomplete,
    Table,
} from '@mui/material';

// day
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// table
import { TableBody, TableHead, TableContainer, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// project
import { BootstrapDialogTitle } from 'components/commonFunction';

// api
// redux
import { useDispatch } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.gary,
        color: theme.palette.common.black,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
    },
}));

const CurrencyManage = ({ handleCurrencyManageClose, isCurrencyOpen }) => {
    const dispatch = useDispatch();
    const [listInfo, setListInfo] = useState([]);
    const [cableName, setCableName] = useState(''); //海纜名稱
    const [cableCode, setCableCode] = useState(''); //代碼
    const [note, setNote] = useState(''); //摘要
    const cableIDEdit = useRef(-1);
    const [cableCodeEdit, setCableCodeEdit] = useState(''); //代碼編輯
    const [cableNameEdit, setCableNameEdit] = useState(''); //供應商編輯
    const [noteEdit, setNoteEdit] = useState(''); //帳號名稱編輯

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    //刪除
    const deletelistInfoItem = (deleteItem) => {
        let tmpArray = listInfo.map((i) => i);
        tmpArray.splice(deleteItem, 1);
        setListInfo([...tmpArray]);
    };

    return (
        <Dialog maxWidth="sm" fullWidth open={isCurrencyOpen}>
            <BootstrapDialogTitle>貨幣管理</BootstrapDialogTitle>
            <DialogContent dividers>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} stickyHeader>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">NO</StyledTableCell>
                                <StyledTableCell align="center">貨幣代碼</StyledTableCell>
                                <StyledTableCell align="center">貨幣中文</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">
                                    <TextField
                                        size="small"
                                        value={cableCode}
                                        onChange={(e) => {
                                            setCableCode(e.target.value);
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        size="small"
                                        value={cableName}
                                        onChange={(e) => {
                                            setCableName(e.target.value);
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            '& button': { mx: { md: 0.6, lg: 1, xl: 1.8 }, p: 0 },
                                        }}
                                    >
                                        <Button color="success" variant="outlined">
                                            新增
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            {[]?.map((row, id) => {
                                return (
                                    <TableRow
                                        key={row.CableCode + id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {row.CableID !== cableIDEdit.current ? (
                                            <>
                                                <StyledTableCell align="center">
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            '& button': {
                                                                mx: { md: 0.6, lg: 1, xl: 1.8 },
                                                                p: 0,
                                                            },
                                                        }}
                                                    >
                                                        <Button color="primary" variant="outlined">
                                                            編輯
                                                        </Button>
                                                        <Button color="error" variant="outlined">
                                                            刪除
                                                        </Button>
                                                    </Box>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {id + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {row.CableCode}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {row.CableName}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {row.Note}
                                                </StyledTableCell>
                                            </>
                                        ) : (
                                            <>
                                                <StyledTableCell align="center">
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            '& button': {
                                                                mx: { md: 0.6, lg: 1, xl: 1.8 },
                                                                p: 0,
                                                            },
                                                        }}
                                                    >
                                                        <Button color="primary" variant="outlined">
                                                            儲存
                                                        </Button>
                                                        <Button color="error" variant="outlined">
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
            </DialogContent>
        </Dialog>
    );
};

export default CurrencyManage;
