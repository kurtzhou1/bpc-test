import { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    IconButton,
    TextField,
    Checkbox,
    Autocomplete,
    Table
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import dayjs from 'dayjs';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// project import
import MainCard from 'components/MainCard';
import { handleNumber } from 'components/commonFunction';

// table
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const CreditBalanceDeduct = ({ cblistInfo }) => {
    console.log('cblistInfo=>>', cblistInfo);
    const [listInfo, setListInfo] = useState(cblistInfo);
    // const [editItem, setEditItem] = useState(NaN);
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(0);

    // const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    // const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const itemDetailInitial = () => {
        setPartyName([]);
        setLBRatio('');
        setIsEdit(false);
    };

    // //編輯
    // const editlistInfoItem = () => {
    //     let tmpArray = listInfo[editItem];

    //     if (tmpArray) {
    //         setPartyName([tmpArray?.PartyName]);
    //         setLBRatio(tmpArray?.LbRatio);
    //     }
    //     setIsEdit(true);
    // };

    //新增
    const addList = () => {
        let tmpArray = listInfo.map((i) => i);
        console.log('=>>', partyName);
        let partyArray = partyName;
        partyArray.forEach((e) => {
            tmpArray.push({
                BillMilestone: billMilestone,
                PartyName: e,
                LBRatio: lBRatio
            });
        });
        setListInfo([...tmpArray]);
        itemDetailInitial();
    };

    //刪除
    const deletelistInfoItem = (deleteItem) => {
        let tmpArray = listInfo.map((i) => i);
        tmpArray.splice(deleteItem, 1);
        setListInfo([...tmpArray]);
    };

    // useEffect(() => {
    //     if (editItem >= 0) {
    //         editlistInfoItem();
    //         // setIsListEdit(true);
    //     }
    // }, [editItem]);

    const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };

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

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center">費用種類</StyledTableCell>
                        <StyledTableCell align="center">原始剩餘金額</StyledTableCell>
                        <StyledTableCell align="center">此次抵購金額</StyledTableCell>
                        <StyledTableCell align="center">日期</StyledTableCell>
                        <StyledTableCell align="center">發票明細ID</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listInfo?.map((row, id) => {
                        return (
                            <TableRow
                                // key={row.InvoiceWKMaster?.invoiceNo + row.InvoiceWKMaster?.supplierName + id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                <StyledTableCell align="center">{row.CBType}</StyledTableCell>
                                <StyledTableCell align="center">{`$${handleNumber(row.CurrAmount)}`}</StyledTableCell>
                                <StyledTableCell align="center">{`$${handleNumber(row.CurrAmount)}`}</StyledTableCell>
                                <StyledTableCell align="center">{dayjs(row.BillingNo).format('YYYYMMDD')}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceNo}</StyledTableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CreditBalanceDeduct;
