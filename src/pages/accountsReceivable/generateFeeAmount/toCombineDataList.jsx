import { useState, useRef, useEffect } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
import { combineInvo, isBillNoCheckOK, invoCombine, generateBillNoCovert } from 'components/apis';
// material-ui
import {
    Typography,
    Button,
    Table,
    Dialog,
    DialogContent,
    Grid,
    FormControl,
    DialogActions,
    TextField,
    Checkbox,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';
// day
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.gary,
        color: theme.palette.common.black,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
    },
    [`&.${tableCellClasses.body}.totalAmount`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        backgroundColor: '#CFD8DC',
    },
}));

const ToCombineDataList = ({
    handleDialogClose,
    isDialogOpen,
    dataList,
    cbToCn,
    setCbToCn,
    receivableQuery,
    initList,
}) => {
    const dispatch = useDispatch();
    const [issueDate, setIssueDate] = useState(new Date()); //發票日期
    const [poNo, setPoNo] = useState(''); //PO號碼
    const [billList, setBillList] = useState({});
    const [billingNo, setBillingNo] = useState('');
    const billingNoOld = useRef('');
    const sendComBineData = useRef({}); //按下合併帳單時送出的資料
    const totalAmount = useRef(0);
    const isAll = useRef(false);

    let tmpBMArray = [];

    const handleChange = (event) => {
        setCbToCn({ ...cbToCn, [event.target.value]: event.target.checked });
    };

    const handleChangeAll = () => {
        isAll.current = !isAll.current;
        let tmpObj = {};
        if (isAll.current) {
            dataList.forEach((i) => {
                tmpObj[i?.InvDetailID] = true;
            });
            setCbToCn(tmpObj);
        } else {
            initList();
        }
    };

    const handleCancel = () => {
        handleDialogClose();
        setIssueDate(new Date());
        setPoNo('');
        setBillingNo('');
        billingNoOld.current = '';
        totalAmount.current = 0;
    };

    //自動產生號碼
    const billNoGenerate = () => {
        let tmpArray = {
            BillingNo: billingNoOld.current,
        };
        fetch(generateBillNoCovert, {
            method: 'POST',
            body: JSON.stringify(tmpArray),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.BillingNo.length > 0) {
                    setBillingNo(data.BillingNo);
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    //合併帳單
    const handleCombine = () => {
        //haha
        if (billingNo === '') {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請填寫帳單號碼',
                    },
                }),
            );
        } else {
            console.log('billingNo=>>', billingNo);
            let tmpArray = {
                BillingNo: billingNo,
            };
            billList.BillMaster.BillingNo = billingNo;
            billList.DueDate = dayjs(issueDate).format('YYYY-MM-DD HH:mm:ss');
            billList.PONo = poNo;
            delete billList.BillMaster.SupplierName;
            console.log('billList=>>', billList.DueDate);
            fetch(isBillNoCheckOK, {
                method: 'POST',
                body: JSON.stringify(tmpArray),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.isExist) {
                        fetch(invoCombine, {
                            method: 'POST',
                            body: JSON.stringify(billList),
                        })
                            .then((res) => res.json())
                            .then(() => {
                                dispatch(
                                    setMessageStateOpen({
                                        messageStateOpen: {
                                            isOpen: true,
                                            severity: 'success',
                                            message: '合併帳單成功',
                                        },
                                    }),
                                );
                                //資料初始化
                                setIssueDate(new Date());
                                setPoNo('');
                                setBillingNo('');
                                handleDialogClose();
                                receivableQuery();
                            })
                            .catch((e) => console.log('e1=>', e));
                    } else {
                        dispatch(
                            setMessageStateOpen({
                                messageStateOpen: {
                                    isOpen: true,
                                    severity: 'error',
                                    message: '帳單號碼已重複',
                                },
                            }),
                        );
                    }
                })
                .catch((e) => console.log('e1=>', e));
        }
    };

    useEffect(() => {
        console.log('cbToCn=>>', cbToCn);
        if (Object.keys(cbToCn).length === 0) {
            let tmpObj = {};
            dataList.forEach((i) => {
                tmpObj[i?.InvDetailID] = false;
            });
        } else {
            let tmpSendArray = [];
            let tmpArray = dataList.filter((i) => {
                return cbToCn[i?.InvDetailID];
            });
            tmpArray.forEach((i) => {
                tmpSendArray.push(i);
            });
            sendComBineData.current = { InvoiceDetail: tmpSendArray }; //按下合併帳單時，送出的資料
        }
    }, [dataList, cbToCn]);

    useEffect(() => {
        if (isDialogOpen) {
            console.log('sendComBineData.current=>>', sendComBineData.current);
            let tmpAmount = 0;
            fetch(combineInvo, {
                method: 'POST',
                body: JSON.stringify(sendComBineData.current),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data=>>>', data);
                    if (data?.PartyName === 'PartyName is not unique') {
                        dispatch(
                            setMessageStateOpen({
                                messageStateOpen: {
                                    isOpen: true,
                                    severity: 'error',
                                    message: '請選擇同一會員進行合併帳單',
                                },
                            }),
                        );
                    } else if (data?.SubmarineCable === 'SubmarineCable is not unique') {
                        dispatch(
                            setMessageStateOpen({
                                messageStateOpen: {
                                    isOpen: true,
                                    severity: 'error',
                                    message: '請選擇同一海纜進行合併帳單',
                                },
                            }),
                        );
                    } else {
                        setBillList(data);
                        billingNoOld.current = data.BillMaster.BillingNo;
                        data.BillDetail.forEach((i) => {
                            tmpAmount = tmpAmount + i.OrgFeeAmount;
                        });
                        totalAmount.current = tmpAmount;
                    }
                })
                .catch((e) => console.log('e1=>', e));
        }
    }, [isDialogOpen]);

    return (
        <>
            <Dialog maxWidth="md" fullWidth open={isDialogOpen}>
                <BootstrapDialogTitle>合併帳單作業</BootstrapDialogTitle>
                <DialogContent>
                    <Grid
                        container
                        spacing={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid
                            item
                            lg={2}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography
                                variant="h5"
                                sx={{ fontSize: { lg: '0.7rem', xl: '0.88rem' } }}
                            >
                                帳單到期日期：
                            </Typography>
                        </Grid>
                        <Grid item lg={2}>
                            <FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        inputFormat="YYYY/MM/DD"
                                        value={issueDate}
                                        onChange={(e) => {
                                            setIssueDate(e);
                                        }}
                                        renderInput={(params) => (
                                            <TextField size="small" {...params} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            lg={1}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography
                                variant="h5"
                                sx={{ fontSize: { lg: '0.7rem', xl: '0.88rem' } }}
                            >
                                PO號碼：
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3} md={2} lg={2}>
                            <TextField
                                value={poNo}
                                fullWidth
                                variant="outlined"
                                size="small"
                                // type="number"
                                label="填寫Po號碼"
                                onChange={(e) => {
                                    setPoNo(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            md={2}
                            lg={2}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography
                                variant="h5"
                                sx={{ fontSize: { lg: '0.7rem', xl: '0.88rem' } }}
                            >
                                帳單號碼：
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3} md={2} lg={2}>
                            <TextField
                                value={billingNo}
                                fullWidth
                                variant="outlined"
                                size="small"
                                // type="number"
                                label="填寫帳單號碼"
                                onChange={(e) => {
                                    setBillingNo(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            md={1}
                            lg={1}
                            display="flex"
                            justifyContent="start"
                            alignItems="center"
                        >
                            <Button
                                sx={{ ml: '0.rem' }}
                                variant="contained"
                                size="small"
                                onClick={billNoGenerate}
                            >
                                自動產生
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table sx={{ minWidth: 300 }} stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">會員</StyledTableCell>
                                            <StyledTableCell align="center">
                                                發票號碼
                                            </StyledTableCell>
                                            <StyledTableCell align="center">供應商</StyledTableCell>
                                            <StyledTableCell align="center">
                                                海纜名稱
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                發票日期
                                            </StyledTableCell>
                                            <StyledTableCell align="center">總金額</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {billList?.BillDetail?.map((row, id) => {
                                            return (
                                                <TableRow
                                                    key={row.PartyName + id}
                                                    sx={{
                                                        '&:last-child td, &:last-child th': {
                                                            border: 0,
                                                        },
                                                    }}
                                                >
                                                    <TableCell align="center">
                                                        {row.PartyName}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.InvoiceNo}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.SupplierName}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.SubmarineCable}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {dayjs(row.IssueDate).format('YYYY/MM/DD')}
                                                    </TableCell>
                                                    <TableCell align="center">{`$${handleNumber(
                                                        row.FeeAmount?.toFixed(2),
                                                    )}`}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        <TableRow
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                            }}
                                        >
                                            <StyledTableCell className="totalAmount" align="center">
                                                Total
                                            </StyledTableCell>
                                            <StyledTableCell
                                                className="totalAmount"
                                                align="center"
                                            ></StyledTableCell>
                                            <StyledTableCell
                                                className="totalAmount"
                                                align="center"
                                            ></StyledTableCell>
                                            <StyledTableCell
                                                className="totalAmount"
                                                align="center"
                                            ></StyledTableCell>
                                            <StyledTableCell
                                                className="totalAmount"
                                                align="center"
                                            ></StyledTableCell>
                                            <StyledTableCell
                                                className="totalAmount"
                                                align="center"
                                            >{`$${handleNumber(
                                                totalAmount.current?.toFixed(2),
                                            )}`}</StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleCombine}>
                        合併
                    </Button>
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleCancel}>
                        關閉
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ maxHeight: window.screen.height * 0.5 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">
                                <Checkbox onChange={handleChangeAll} />
                            </StyledTableCell>
                            <StyledTableCell align="center">項目</StyledTableCell>
                            <StyledTableCell align="center">會員</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">計帳段號</StyledTableCell>
                            <StyledTableCell align="center">發票號碼</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">發票日期</StyledTableCell>
                            <StyledTableCell align="center">總金額</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataList.map((row, id) => {
                            tmpBMArray = [];
                            return (
                                <TableRow
                                    key={row?.FeeItem + row?.InvoiceNo + id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">
                                        <Checkbox
                                            value={row?.InvDetailID}
                                            onChange={handleChange}
                                            checked={cbToCn[row?.InvDetailID] || false}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{row?.FeeItem}</TableCell>
                                    <TableCell align="center">{row?.PartyName}</TableCell>
                                    <TableCell align="center">{row?.SubmarineCable}</TableCell>
                                    <TableCell align="center">{row?.WorkTitle}</TableCell>
                                    <TableCell align="center">{row?.BillMilestone}</TableCell>
                                    <TableCell align="center">{row?.InvoiceNo}</TableCell>
                                    <TableCell align="center">{row?.SupplierName}</TableCell>
                                    <TableCell align="center">
                                        {dayjs(row?.IssueDate).format('YYYY/MM/DD')}
                                    </TableCell>
                                    <TableCell align="center">{`$${handleNumber(
                                        row?.FeeAmountPost.toFixed(2),
                                    )}`}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ToCombineDataList;
