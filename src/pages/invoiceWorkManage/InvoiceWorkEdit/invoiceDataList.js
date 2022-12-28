import { useState } from 'react';

// project import
import MoreVertIcon from '@mui/icons-material/MoreVert';

// material-ui
import { Typography, Button, Table, IconButton, Menu, MenuItem } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const InvoiceDataList = () => {
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
        console.log('event=>>', event);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const ITEM_HEIGHT = 48;
    const options = ['None', 'Atria', 'Callisto', 'Dione', 'Ganymede', 'Hangouts Call', 'Luna', 'Oberon'];

    const fakeData = [
        {
            InvoiceWKMaster: {
                invoiceNo: 'M88989',
                supplyID: '供應商1號',
                submarineCable: '海纜海纜',
                contractType: '合約種類2號',
                issueDate: '2022/12/28',
                totalAmount: 98989898898,
                Status: 'TEMP'
            },
            InvoiceWKDetail: [
                { billMilestone: '第一段', feeType: '收費種類1', feeItem: '收費項目2', feeAmount: 123123123 },
                { billMilestone: '第二段', feeType: '收費種類2', feeItem: '收費項目3', feeAmount: 123123123 }
            ]
        }
    ];

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center">工作主檔ID</StyledTableCell>
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
                    {fakeData?.map((row, id) => {
                        return (
                            <TableRow
                                key={row.InvoiceWKMaster?.invoiceNo + row.InvoiceWKMaster?.supplyID + id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="center">
                                    {row.InvoiceWKMaster.invoiceNo + row.InvoiceWKMaster?.supplyID + id}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.invoiceNo}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.supplyID}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.submarineCable}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.contractType}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster?.issueDate}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKDetail.length}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster.totalAmount}</StyledTableCell>
                                <StyledTableCell align="center">{row.InvoiceWKMaster.Status === 'TEMP' ? '暫存' : '???'}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton
                                        aria-label="more"
                                        id="long-button"
                                        aria-controls={open ? 'long-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
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
                                        {options.map((option) => (
                                            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                    {/* <Button color="primary">編輯</Button>
                                    <Button color="error">刪除</Button> */}
                                </StyledTableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default InvoiceDataList;
