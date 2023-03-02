import { useState, useRef } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
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
    TextField
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';

import dayjs from 'dayjs';
// day
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { toBillDataapi, sendJounary } from 'components/apis.jsx';

const ToCombineDataList = ({ handleDialogClose, isDialogOpen }) => {
    // const fakeData = {
    //     TotalAmount: 5582012.72,
    //     InvoiceMaster: [
    //         {
    //             InvMasterID: 1,
    //             WKMasterID: 1,
    //             InvoiceNo: 'DT0170168-1',
    //             PartyName: 'Edge',
    //             SupplierName: 'NEC',
    //             SubmarineCable: 'SJC2',
    //             WorkTitle: 'Construction',
    //             IssueDate: '2022-09-09T00:00:00',
    //             DueDate: '2022-11-08T00:00:00',
    //             IsPro: false,
    //             ContractType: 'SC',
    //             Status: ''
    //         }
    //     ],
    //     InvoiceDetail: [
    //         {
    //             WKMasterID: 1,
    //             WKDetailID: 1,
    //             InvMasterID: 1,
    //             InvoiceNo: 'DT0170168-1',
    //             PartyName: 'Edge',
    //             SupplierName: 'NEC',
    //             SubmarineCable: 'SJC2',
    //             WorkTitle: 'Construction',
    //             BillMilestone: 'BM9a',
    //             FeeItem: 'BM9a Sea...',
    //             LBRatio: 28.5714285714,
    //             FeeAmountPre: 1288822.32,
    //             FeeAmountPost: 368234.95,
    //             Difference: 0
    //         },
    //         {
    //             WKMasterID: 2,
    //             WKDetailID: 2,
    //             InvMasterID: 2,
    //             InvoiceNo: 'DT0170168-2',
    //             PartyName: 'Edge',
    //             SupplierName: 'NEC',
    //             SubmarineCable: 'SJC2',
    //             WorkTitle: 'Construction',
    //             BillMilestone: 'BM9a',
    //             FeeItem: 'BM9a Sea...',
    //             LBRatio: 28.5714285714,
    //             FeeAmountPre: 1288844.44,
    //             FeeAmountPost: 368244.44,
    //             Difference: 0
    //         }
    //     ]
    // };

    const toBillDataMain = useRef();
    const [toBillDataInfo, setToBillDataInfo] = useState([]); //發票明細檔
    const [totalAmount, setTotalAmount] = useState([]); //發票總金額
    const [currentAmount, setCurrentAmount] = useState(''); //目前金額
    const [issueDate, setIssueDate] = useState(new Date()); //發票日期
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: theme.palette.common.gary,
            color: theme.palette.common.black,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        },
        [`&.${tableCellClasses.body}.totalAmount`]: {
            fontSize: 14,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem',
            backgroundColor: '#CFD8DC'
        }
    }));

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
        <>
            <Dialog onClose={handleDialogClose} maxWidth="lg" fullWidth open={isDialogOpen}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                    立帳作業
                </BootstrapDialogTitle>
                <DialogContent>
                    <Grid container spacing={1} display="flex">
                        <Grid item xs={6} sm={3} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                                發票日期：
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3} md={2} lg={2}>
                            <FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        inputFormat="YYYY/MM/DD"
                                        value={issueDate}
                                        onChange={(e) => {
                                            setIssueDate(e);
                                        }}
                                        renderInput={(params) => <TextField size="small" {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={3} md={2} lg={2} display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                                帳單號碼：
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3} md={2} lg={2}>
                            <TextField
                                // value={totalAmount}
                                fullWidth
                                variant="outlined"
                                size="small"
                                // type="number"
                                label="填寫帳單號碼"
                                onChange={(e) => {
                                    // setTotalAmount(handleNumber(e.target.value));
                                }}
                            />
                        </Grid>
                        <Grid item xs={0} sm={0} md={4} lg={4} />
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">會員</StyledTableCell>
                                            <StyledTableCell align="center">發票代碼</StyledTableCell>
                                            <StyledTableCell align="center">供應商</StyledTableCell>
                                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                                            <StyledTableCell align="center">合約種類</StyledTableCell>
                                            <StyledTableCell align="center">發票日期</StyledTableCell>
                                            <StyledTableCell align="center">總金額</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {toBillDataInfo.map((row, id) => {
                                            let afterDiff = row.FeeAmountPost + row.Difference;
                                            return (
                                                <TableRow
                                                    key={row.FeeAmountPre + row?.PartyName + row?.LBRatio}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{row.FeeItem}</TableCell>
                                                    <TableCell align="center">{`$${handleNumber(row.FeeAmountPre)}`}</TableCell>
                                                    <TableCell align="center">{row.PartyName}</TableCell>
                                                    <TableCell align="center">{`${row.LBRatio}%`}</TableCell>
                                                    <TableCell align="center">{`$${handleNumber(row.FeeAmountPost)}`}</TableCell>
                                                    <TableCell align="center">
                                                        <TextField
                                                            label="$"
                                                            size="small"
                                                            type="number"
                                                            style={{ width: '30%' }}
                                                            // value={diffNumber}
                                                            onChange={(e) => {
                                                                changeDiff(e.target.value, id);
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">{`$${handleNumber(afterDiff.toFixed(2))}`}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <StyledTableCell className="totalAmount" align="center">
                                                Total
                                            </StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center"></StyledTableCell>
                                            <StyledTableCell className="totalAmount" align="center">{`$${handleNumber(
                                                123456
                                            )}`}</StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <DialogContentText sx={{ fontSize: '20px', mt: '0.5rem' }}>總金額：${handleNumber(totalAmount)}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={sendJounaryInfo}>
                        合併
                    </Button>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">會員</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">發票代碼</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">合約種類</StyledTableCell>
                            <StyledTableCell align="center">發票日期</StyledTableCell>
                            <StyledTableCell align="center">明細數量</StyledTableCell>
                            <StyledTableCell align="center">總價</StyledTableCell>
                            <StyledTableCell align="center">處理狀態</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {listInfo?.map((row, id) => {
                            return (
                                <TableRow
                                    key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.WKMasterID}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.InvoiceNo}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.SupplierName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {dayjs(row.InvoiceWKMaster.IssueDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKDetail.length}</StyledTableCell>
                                    <StyledTableCell align="center">{handleNumber(row.InvoiceWKMaster.TotalAmount)}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button
                                            color="primary"
                                            onClick={() => {
                                                toBillData(row.InvoiceWKMaster.WKMasterID);
                                            }}
                                        >
                                            立帳作業
                                        </Button>
                                    </StyledTableCell>
                                </TableRow>
                            );
                        })} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ToCombineDataList;
