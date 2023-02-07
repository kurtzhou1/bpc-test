import { useState } from 'react';

// project import

// material-ui
import {
    Typography,
    Button,
    Table,
    Dialog,
    DialogContent,
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

import { toBillDataapi } from 'components/apis.jsx';

const ToBillDataList = ({ listInfo, setEditItem, deletelistInfoItem, BootstrapDialogTitle }) => {
    const fakeData = [
        {
            TotalAmount: 5582012.72,
            InvoiceMaster: [
                {
                    InvMasterID: 1,
                    WKMasterID: 1,
                    InvoiceNo: 'DT0170168-1',
                    PartyName: 'Edge',
                    SupplierName: 'NEC',
                    SubmarineCable: 'SJC2',
                    WorkTitle: 'Construction',
                    IssueDate: '2022-09-09T00:00:00',
                    DueDate: '2022-11-08T00:00:00',
                    IsPro: false,
                    ContractType: 'SC',
                    Status: ''
                }
            ],
            InvoiceDetail: [
                {
                    WKMasterID: 1,
                    WKDetailID: 1,
                    InvMasterID: 1,
                    InvoiceNo: 'DT0170168-1',
                    PartyName: 'Edge',
                    SupplierName: 'NEC',
                    SubmarineCable: 'SJC2',
                    WorkTitle: 'Construction',
                    BillMilestone: 'BM9a',
                    FeeItem: 'BM9a Sea...',
                    LBRatio: 28.5714285714,
                    FeeAmountPre: 1288822.32,
                    FeeAmountPost: 368234.95,
                    Difference: 0
                }
            ]
        }
    ];
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [toBillDataInfo, setToBillDataInfo] = useState(fakeData);
    const [diffNumber, setDiffNumber] = useState(0);
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

    const toBillData = (wKMasterID) => {
        console.log('wKMasterID=>>', wKMasterID);
        let tmpQuery = '/' + 'WKMasterID=' + wKMasterID;
        tmpQuery = toBillDataapi + tmpQuery;
        console.log('tmpQuery=>>', tmpQuery);
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('查詢成功=>>', data);
                setToBillDataInfo(data);
                // setListInfo(data);
                // initQuery();
            })
            .catch((e) => console.log('e1=>>', e));
        setIsDialogOpen(true);
        // fetch(tmpQuery, { method: 'GET' })
        // .then((res) => res.json())
        // .then((data) => {
        //     console.log('查詢成功=>>', data);
        //     setListInfo(data);
        //     initQuery();
        // })
        // .catch((e) => console.log('e1=>>', e));
    };

    const useStyles = (theme) => ({
        textField: {
            width: '10%',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingBottom: 0,
            marginTop: 0,
            fontWeight: 500,
            color: 'pink'
        },
        input: {
            color: 'white',
            width: '10%',
            color: 'pink'
        }
    });
    const classes = useStyles();

    console.log('toBillDataInfo=>>', toBillDataInfo[0].InvoiceDetail);

    return (
        <>
            <Dialog onClose={handleDialogClose} maxWidth="lg" fullWidth open={isDialogOpen}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                    發票查詢
                </BootstrapDialogTitle>
                <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
                    <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">費用項目</StyledTableCell>
                                <StyledTableCell align="center">費用金額</StyledTableCell>
                                <StyledTableCell align="center">會員</StyledTableCell>
                                <StyledTableCell align="center">攤分比例</StyledTableCell>
                                <StyledTableCell align="center">攤分後金額</StyledTableCell>
                                <StyledTableCell align="center">調整尾差值</StyledTableCell>
                                <StyledTableCell align="center">總費用金額</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {toBillDataInfo[0].InvoiceDetail?.map((row, id) => {
                                console.log('row=>>', row);
                                return (
                                    <TableRow
                                        key={row?.WKMasterID + row?.WKDetailID}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell align="center">{row.FeeItem}</StyledTableCell>
                                        <StyledTableCell align="center">{`$${row.FeeAmountPre}`}</StyledTableCell>
                                        <StyledTableCell align="center">{row.PartyName}</StyledTableCell>
                                        <StyledTableCell align="center">{`${row.LBRatio}%`}</StyledTableCell>
                                        <StyledTableCell align="center">{`$${row.FeeAmountPost}`}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            $
                                            <TextField
                                                type="number"
                                                size="small"
                                                className={classes.textField}
                                                onChange={(e) => {
                                                    setDiffNumber(e.target.value);
                                                }}
                                                InputLabelProps={{
                                                    className: classes.input
                                                }}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{`$${row.FeeAmountPost + diffNumber}`}</StyledTableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <DialogActions>
                    {/* {dialogAction === 'Edit' ? (
                        <>
                            <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={saveEdit}>
                                儲存
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={addLiability}>
                                新增
                            </Button>
                        </>
                    )} */}
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">工作主檔ID</StyledTableCell>
                            <StyledTableCell align="center">發票代碼</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">合約種類</StyledTableCell>
                            <StyledTableCell align="center">發票日期</StyledTableCell>
                            <StyledTableCell align="center">明細數量</StyledTableCell>
                            <StyledTableCell align="center">總價</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
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
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.WKMasterID}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.InvoiceNo}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.SupplierName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {dayjs(row.InvoiceWKMaster.IssueDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKDetail.length}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.TotalAmount}</StyledTableCell>
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
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ToBillDataList;
