import { useState, useRef } from 'react';

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

import { toBillDataapi, sendJounary } from 'components/apis.jsx';

const ToCombineDataList = ({ listInfo, BootstrapDialogTitle, apiQuery }) => {
    const fakeData = [
        { supplierName: 'NEC', telephone: '+886', fax: '+886', address: 'Taiwan', email: 'google.com', name: 'XXX' },
        { supplierName: 'NEC', telephone: '+886', fax: '+886', address: 'Taiwan', email: 'google.com', name: 'XXX' }
    ];

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const toBillDataMain = useRef();
    const [toBillDataInfo, setToBillDataInfo] = useState([]); //發票明細檔
    const [totalAmount, setTotalAmount] = useState([]); //發票總金額
    const [currentAmount, setCurrentAmount] = useState(''); //目前金額
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

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    //立帳作業
    const toBillData = (wKMasterID) => {
        console.log('立帳作業wKMasterID=>>', wKMasterID);
        let tmpQuery = '/' + 'WKMasterID=' + wKMasterID;
        tmpQuery = toBillDataapi + tmpQuery;
        console.log('tmpQuery=>>', tmpQuery);
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('立帳成功=>>', data);
                let tmpAmount = 0;
                if (Array.isArray(data)) {
                    toBillDataMain.current = data ? data.InvoiceMaster : [];
                    setToBillDataInfo(data ? data.InvoiceDetail : []);
                    setTotalAmount(data ? data.TotalAmount : 0);
                    data.InvoiceDetail.forEach((i) => {
                        tmpAmount = tmpAmount + i.FeeAmountPost + i.Difference;
                    });
                    setCurrentAmount(tmpAmount.toFixed(2));
                }
            })
            .catch((e) => console.log('e1=>>', e));
        setIsDialogOpen(true);
    };

    const changeDiff = (diff, id) => {
        let tmpArray = toBillDataInfo.map((i) => i);
        let tmpAmount = 0;
        tmpArray[id].Difference = Number(diff);
        tmpArray.forEach((i) => {
            tmpAmount = tmpAmount + i.FeeAmountPost + i.Difference;
        });
        setToBillDataInfo(tmpArray);
        setCurrentAmount(tmpAmount.toFixed(2));
    };

    // 送出立帳(新增)
    const sendJounaryInfo = () => {
        let tmpArray = toBillDataMain.current.map((i) => i);
        tmpArray.forEach((i) => {
            delete i.InvMasterID;
        });
        let tmpData = {
            TotalAmount: totalAmount,
            InvoiceMaster: tmpArray,
            InvoiceDetail: toBillDataInfo
        };
        fetch(sendJounary, { method: 'POST', body: JSON.stringify(tmpData) })
            .then((res) => res.json())
            .then((data) => {
                console.log('立帳成功=>>', data);
                alert('送出立帳成功');
                apiQuery();
                handleDialogClose();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
            <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">NO</StyledTableCell>
                        <StyledTableCell align="center">供應商名稱</StyledTableCell>
                        <StyledTableCell align="center">電話</StyledTableCell>
                        <StyledTableCell align="center">傳真</StyledTableCell>
                        <StyledTableCell align="center">地址</StyledTableCell>
                        <StyledTableCell align="center">E-mail</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fakeData?.map((row, id) => {
                        return (
                            <TableRow
                                // key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                <StyledTableCell align="center">{row.supplierName}</StyledTableCell>
                                <StyledTableCell align="center">{row.telephone}</StyledTableCell>
                                <StyledTableCell align="center">{row.fax}</StyledTableCell>
                                <StyledTableCell align="center">{row.address}</StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center">{row.name}</StyledTableCell>
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
                                                toBillData(row.InvoiceWKMaster.WKMasterID);
                                            }}
                                        >
                                            編輯
                                        </Button>
                                        <Button
                                            color="error"
                                            variant="outlined"
                                            onClick={() => {
                                                toBillData(row.InvoiceWKMaster.WKMasterID);
                                            }}
                                        >
                                            刪除
                                        </Button>
                                    </Box>
                                </StyledTableCell>
                            </TableRow>
                        );
                    })}
                    <TableRow
                        // key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center">
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    '& button': { mx: { md: 0.6, lg: 1, xl: 1.8 }, p: 0, fontSize: 1 }
                                }}
                            >
                                <Button
                                    color="success"
                                    variant="outlined"
                                    onClick={() => {
                                        toBillData(row.InvoiceWKMaster.WKMasterID);
                                    }}
                                >
                                    新增
                                </Button>
                            </Box>
                        </StyledTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ToCombineDataList;
