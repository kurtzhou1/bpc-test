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
                            <TableRow key={row.InvoiceWKMaster?.invoiceNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell align="center">{itemID + 1}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.InvoiceNo}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.SupplierName}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.SubmarineCable}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.ContractType}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.IssueDate}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKDetail.length}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster.TotalAmount}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.InvoiceWKMaster.Status === 'TEMPORARY' ? '暫存' : '???'}
                                </StyledTableCell>
                                <TableCell align="center">
                                    <IconButton
                                        aria-label="more"
                                        id="long-button"
                                        aria-controls={open ? 'long-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={(e) => {
                                            handleClick(e);
                                            setModifyItem(itemID);
                                        }}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    {row.InvoiceWKMaster.Status === 'VALIDATED' ? (
                                        <Menu
                                            id="long-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'long-button'
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: ITEM_HEIGHT * 4.5,
                                                    width: '20ch'
                                                }
                                            }}
                                        >
                                            {options2.map((option) => {
                                                return (
                                                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                                        <ListItemIcon>
                                                            <InfoCircleOutlined fontSize="small" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            onClick={() => {
                                                                setAction(option);
                                                            }}
                                                        >
                                                            {option}
                                                        </ListItemText>
                                                    </MenuItem>
                                                );
                                            })}
                                        </Menu>
                                    ) : (
                                        <Menu
                                            id="long-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'long-button'
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: ITEM_HEIGHT * 4.5,
                                                    width: '20ch'
                                                }
                                            }}
                                        >
                                            {options1.map((option) => {
                                                return (
                                                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                                        <ListItemIcon>
                                                            <InfoCircleOutlined fontSize="small" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            onClick={() => {
                                                                setAction(option);
                                                            }}
                                                        >
                                                            {option}
                                                        </ListItemText>
                                                    </MenuItem>
                                                );
                                            })}
                                        </Menu>
                                    )}
                                    {/* <Button color="primary">編輯</Button>
                                    <Button color="error">刪除</Button> */}
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
