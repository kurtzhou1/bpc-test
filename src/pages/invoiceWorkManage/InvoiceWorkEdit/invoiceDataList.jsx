import { useState } from 'react';

// project import
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { handleNumber } from 'components/commonFunction';

// material-ui
import { Typography, Button, Table, IconButton, Menu, MenuItem, ListItemText, ListItemIcon, Box } from '@mui/material';
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

    // const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const options1 = ['View', 'Validate', 'Edit', 'Delete'];
    const options2 = ['View', '作廢'];

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
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
                                <StyledTableCell align="center">{handleNumber(row.InvoiceWKMaster.TotalAmount)}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.InvoiceWKMaster.Status === 'TEMPORARY'
                                        ? '暫存'
                                        : row.InvoiceWKMaster.Status === 'VALIDATED'
                                        ? '已確認'
                                        : row.InvoiceWKMaster.Status === 'BILLED'
                                        ? '已立帳'
                                        : row.InvoiceWKMaster.Status === 'PAYING'
                                        ? '付款中'
                                        : row.InvoiceWKMaster.Status === 'COMPLETE'
                                        ? '完成付款'
                                        : '作廢'}
                                </StyledTableCell>
                                <TableCell align="center">
                                    {row.InvoiceWKMaster.Status === 'TEMPORARY' ? (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                '& button': { mx: { md: 0.3, lg: 0.7, xl: 1.5 }, p: 0, fontSize: 1 }
                                            }}
                                        >
                                            {options1.map((option) => {
                                                return (
                                                    <Button
                                                        color={
                                                            option === 'View'
                                                                ? 'primary'
                                                                : option === 'Validate'
                                                                ? 'success'
                                                                : option === 'Edit'
                                                                ? 'warning'
                                                                : 'error'
                                                        }
                                                        // variant="outlined"
                                                        key={option}
                                                        variant="outlined"
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
                                        </Box>
                                    ) : row.InvoiceWKMaster.Status === 'VALIDATED' ? (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                '& button': { mx: { md: 0.6, lg: 1, xl: 1.8 }, p: 0, fontSize: 1 }
                                            }}
                                        >
                                            {options2.map((option) => {
                                                return (
                                                    <Button
                                                        color={option === 'View' ? 'primary' : 'error'}
                                                        key={option}
                                                        variant="outlined"
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
                                        </Box>
                                    ) : (
                                        ''
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
