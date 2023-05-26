import { useState, useRef } from 'react';

// project import
import PaymentWork from './paymentWork';
import { handleNumber } from 'components/commonFunction';
import MainCard from 'components/MainCard';
import GenerateFeeTerminate from './generateFeeTerminate';

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
    Box,
    Paper
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { alpha, styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// icon
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import dayjs from 'dayjs';

import { toBillDataapi, sendJounary } from 'components/apis.jsx';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.gary,
        color: theme.palette.common.black,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        border: '1px solid #EEEEEE'
    },
    [`&.${tableCellClasses.body}.totalAmount`]: {
        fontSize: 14,
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        backgroundColor: '#CFD8DC'
    }
}));

const ToWriteOffDataList = ({ listInfo }) => {
    const [isColumn2Open, setIsColumn2Open] = useState(true);
    const [isColumn3Open, setIsColumn3Open] = useState(true);
    const [isColumn4Open, setIsColumn4Open] = useState(true);
    // let tmpBMArray = [];

    const fakeData = {
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
                FeeAmountPost: 369234.95,
                Difference: 0
            },
            {
                WKMasterID: 2,
                WKDetailID: 2,
                InvMasterID: 2,
                InvoiceNo: 'DT0170168-2',
                PartyName: 'Edge',
                SupplierName: 'NEC',
                SubmarineCable: 'SJC2',
                WorkTitle: 'Construction',
                BillMilestone: 'BM9a',
                FeeItem: 'BM12a Under the Sea',
                LBRatio: 28.5714285714,
                FeeAmountPre: 1288844.44,
                FeeAmountPost: 368244.44,
                Difference: 0
            }
        ]
    };

    const columns1 = [
        { id: '海纜名稱', label: '海纜名稱', minWidth: '90px', align: 'center', className: '' },
        { id: '海纜作業', label: '海纜作業', minWidth: '90px', align: 'center' },
        { id: '計帳段號', label: '計帳段號', minWidth: '90px', align: 'center' }
    ];

    const columns2 = [
        { id: 'Suppliers', label: 'Suppliers', minWidth: '90px', align: 'center', className: '' },
        {
            id: "Supplier's Invoice No.",
            label: "Supplier's Invoice No.",
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Amt(USD)',
            label: 'Amt(USD)',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'dueDate',
            label: 'DueDate',
            minWidth: '90px',
            align: 'center'
        }
    ];

    const columns3 = [
        {
            id: 'Invoice#(CBP to Party)',
            label: 'Invoice#(CBP to Party)',
            minWidth: '90px',
            align: 'center'
        },

        {
            id: 'Party',
            label: 'Party',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Description',
            label: 'Description',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Amount Billed(USD)',
            label: 'Amount Billed(USD)',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Due Date',
            label: 'Due Date',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Received Amt(USD)',
            label: 'Received Amt(USD)',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Diff',
            label: 'Diff',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Remark',
            label: 'Remark',
            minWidth: '90px',
            align: 'center'
        }
    ];

    const columns4 = [
        {
            id: 'Amt(USD)',
            label: 'Amt(USD)',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Remittance Date',
            label: 'Remittance Date',
            minWidth: '90px',
            align: 'center'
        },
        {
            id: 'Diff',
            label: 'Diff',
            minWidth: '90px',
            align: 'center'
        }
    ];

    const [isDialogOpen, setIsDialogOpen] = useState(false); //折抵作業
    const editPaymentInfo = useRef({});
    const actionName = useRef('');

    const handleDialogOpen = (info) => {
        // let tmpArray = info.BillDetail.map((i) => i);
        editPaymentInfo.current = info;
        // setWriteOffDetail(tmpArray);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        editPaymentInfo.current = {};
        setWriteOffDetail([]);
        setIsDialogOpen(false);
    };

    return (
        <>
            <PaymentWork
                isDialogOpen={isDialogOpen}
                handleDialogClose={handleDialogClose}
                editPaymentInfo={editPaymentInfo.current}
                actionName={actionName.current}
            />
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        {/* <TableRow>
                            <StyledTableCell align="center" colSpan={3}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={isColumn2Open ? 4 : 1}>
                                <Button
                                    onClick={() => {
                                        setIsColumn2Open(!isColumn2Open);
                                    }}
                                >
                                    {isColumn2Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                </Button>
                                {isColumn2Open ? '供應商發票' : ''}
                            </StyledTableCell>
                            <StyledTableCell align="center" colSpan={isColumn3Open ? 8 : 1}>
                                <Button
                                    onClick={() => {
                                        setIsColumn3Open(!isColumn3Open);
                                    }}
                                >
                                    {isColumn3Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                </Button>
                                {isColumn3Open ? '會員帳單明細與付款資訊' : ''}
                            </StyledTableCell>
                            <StyledTableCell align="center" colSpan={isColumn4Open ? 3 : 1}>
                                <Button
                                    onClick={() => {
                                        setIsColumn4Open(!isColumn4Open);
                                    }}
                                >
                                    {isColumn4Open ? <DoNotDisturbOnIcon /> : <AddCircleIcon />}
                                </Button>
                                {isColumn4Open ? '匯出金額給供應商' : ''}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            {columns1.map((column) => {
                                return (
                                    <StyledTableCell key={column.id} align={column.align} className={column.className}>
                                        {column.label}
                                    </StyledTableCell>
                                );
                            })}
                            {isColumn2Open ? (
                                columns2.map((column) => {
                                    return (
                                        <StyledTableCell key={column.id} align={column.align}>
                                            {column.label}
                                        </StyledTableCell>
                                    );
                                })
                            ) : (
                                <StyledTableCell key={columns2[0].id} align={columns2[0].align}>
                                    {columns2[0].label}
                                </StyledTableCell>
                            )}
                            {isColumn3Open ? (
                                columns3.map((column) => {
                                    return (
                                        <StyledTableCell key={column.id} align={column.align}>
                                            {column.label}
                                        </StyledTableCell>
                                    );
                                })
                            ) : (
                                <StyledTableCell key={columns3[0].id} align={columns3[0].align}>
                                    {columns3[0].label}
                                </StyledTableCell>
                            )}
                            {isColumn4Open ? (
                                columns4.map((column) => {
                                    return (
                                        <StyledTableCell key={column.id} align={column.align}>
                                            {column.label}
                                        </StyledTableCell>
                                    );
                                })
                            ) : (
                                <StyledTableCell key={columns4[0].id} align={columns4[0].align}>
                                    {columns4[0].label}
                                </StyledTableCell>
                            )}
                        </TableRow> */}
                        <TableRow>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">會員代碼</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">發票到期日</StyledTableCell>
                            <StyledTableCell align="center">總金額</StyledTableCell>
                            <StyledTableCell align="center">累計實收金額</StyledTableCell>
                            <StyledTableCell align="center">累計實付金額</StyledTableCell>
                            <StyledTableCell align="center">本次付款金額</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                            <StyledTableCell align="center">摘要說明</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listInfo?.map((row, id) => {
                            // tmpBMArray = [];
                            // row?.BillDetailList.forEach((i) => {
                            //     if (!tmpBMArray.includes(i.BillMilestone)) {
                            //         tmpBMArray.push(i.BillMilestone);
                            //     }
                            // });
                            return (
                                <TableRow key={row.WKMasterID + row.InvoiceNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.InvoiceNo}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.SupplierName}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {dayjs(row?.InvoiceWKMaster?.DueDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{handleNumber(row?.InvoiceWKMaster?.TotalAmount)}</StyledTableCell>
                                    <StyledTableCell align="center">{handleNumber(row?.InvoiceWKMaster?.PaidAmount)}</StyledTableCell>
                                    <StyledTableCell align="center">{handleNumber(row?.ReceivedAmountSum)}</StyledTableCell>
                                    <StyledTableCell align="center">{handleNumber(0)}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', '& button': { mx: 1, p: 0, fontSize: 1 } }}>
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDialogOpen(row.BillDetailList);
                                                }}
                                            >
                                                編輯付款資訊
                                            </Button>
                                        </Box>
                                    </StyledTableCell>
                                </TableRow>
                            );
                        })}
                        {/* {listInfo?.map((row) => {
                            tmpBMArray = [];
                            row?.BillDetailList.forEach((i) => {
                                if (!tmpBMArray.includes(i.BillMilestone)) {
                                    tmpBMArray.push(i.BillMilestone);
                                }
                            });
                            return (
                                <TableRow key={row.WKMasterID + row.InvoiceNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.InvoiceWKMaster?.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">{tmpBMArray.join(',')}</StyledTableCell>
                                    {isColumn2Open ? (
                                        <>
                                            <StyledTableCell align="center">{row?.InvoiceWKMaster?.SupplierName}</StyledTableCell>
                                            <StyledTableCell align="center">{row?.InvoiceWKMaster?.InvoiceNo}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {handleNumber(row?.InvoiceWKMaster?.TotalAmount)}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{dayjs(row?.DueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                        </>
                                    ) : (
                                        <StyledTableCell align="center">{row.SupplierName}</StyledTableCell>
                                    )}
                                    {isColumn3Open ? (
                                        <>
                                            <StyledTableCell align="center">{'No. 12345678'}</StyledTableCell>
                                            <StyledTableCell align="center">{row.PartyName}</StyledTableCell>
                                            <StyledTableCell align="center">{'測試檔案資料'}</StyledTableCell>
                                            <StyledTableCell align="center">{handleNumber(123456789)}</StyledTableCell>
                                            <StyledTableCell align="center">{dayjs(row.IssueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                            <StyledTableCell align="center">{handleNumber(123456789)}</StyledTableCell>
                                            <StyledTableCell align="center">{handleNumber(1)}</StyledTableCell>
                                            <StyledTableCell align="center">{'N/A'}</StyledTableCell>
                                        </>
                                    ) : (
                                        <StyledTableCell align="center">{'No. 12345678'}</StyledTableCell>
                                    )}
                                    {isColumn4Open ? (
                                        <>
                                            <StyledTableCell align="center">{handleNumber(123456789)}</StyledTableCell>
                                            <StyledTableCell align="center">{dayjs(row.IssueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                            <StyledTableCell align="center">{handleNumber(1)}</StyledTableCell>
                                        </>
                                    ) : (
                                        <StyledTableCell align="center">{handleNumber(123456789)}</StyledTableCell>
                                    )}
                                </TableRow>
                            );
                        })} */}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* </Paper> */}
        </>
    );
};

export default ToWriteOffDataList;
