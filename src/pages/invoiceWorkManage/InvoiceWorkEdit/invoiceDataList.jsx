import { useState } from 'react';

// project import
import MoreVertIcon from '@mui/icons-material/MoreVert';

// material-ui
import { Typography, Button, Table, IconButton, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

//<InfoCircleOutlined />
import { InfoCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const InvoiceDataList = ({ listInfo, setAction, setModifyItem }) => {
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

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const ITEM_HEIGHT = 48;
    const options1 = ['View', 'Validated', 'Edit', 'Delete'];
    const options2 = ['View', '作廢'];

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center">發票號碼</StyledTableCell>
                        <StyledTableCell align="center">供應商</StyledTableCell>
                        <StyledTableCell align="center">海纜名稱</StyledTableCell>
                        <StyledTableCell align="center">合約種類</StyledTableCell>
                        <StyledTableCell align="center">發票日期</StyledTableCell>
                        <StyledTableCell align="center">明細數量</StyledTableCell>
                        <StyledTableCell align="center">總金額</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listInfo?.map((row, itemID) => {
                        return (
                            <TableRow
                                key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="center">{itemID + 1}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.InvoiceNo}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.SupplierName}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.SubmarineCable}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.ContractType}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {dayjs(row.InvoiceWKMaster?.IssueDate).format('YYYY/MM/DD')}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKDetail.length}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster.TotalAmount}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.InvoiceWKMaster.Status === 'TEMPORARY' ? '暫存' : 'Validated'}
                                </StyledTableCell>
                                <TableCell align="center">
                                    {row.InvoiceWKMaster.Status === 'TEMPORARY' ? (
                                        <>
                                            {options1.map((option) => {
                                                return (
                                                    <Button
                                                        // color="primary"
                                                        color={
                                                            option === 'View'
                                                                ? 'primary'
                                                                : option === 'Validated'
                                                                ? 'success'
                                                                : option === 'Edit'
                                                                ? 'warning'
                                                                : 'error'
                                                        }
                                                        // variant="outlined"
                                                        key={option}
                                                        size="small"
                                                        onClick={() => {
                                                            setModifyItem(itemID);
                                                            setAction(option);
                                                        }}
                                                    >
                                                        {option}
                                                    </Button>
                                                );
                                            })}
                                        </>
                                    ) : (
                                        <>
                                            {options2.map((option) => {
                                                return (
                                                    <Button
                                                        color={option === 'View' ? 'primary' : 'error'}
                                                        key={option}
                                                        onClick={() => {
                                                            setModifyItem(itemID);
                                                            setAction(option);
                                                        }}
                                                    >
                                                        {option}
                                                    </Button>
                                                );
                                            })}
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default InvoiceDataList;
