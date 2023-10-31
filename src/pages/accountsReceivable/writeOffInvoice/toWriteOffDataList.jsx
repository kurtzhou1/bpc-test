import { useState, useRef } from 'react';

// project import
import WriteOffWork from './writeOffWork';
import { handleNumber } from 'components/commonFunction';
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

// material-ui
import { Button, Table, Box } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';

// api
import { getWriteOffDetail, submitWriteOff, completeWriteOff } from 'components/apis';

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

const fakeData = [
    {
      "BillMaster": {
        "SubmarineCable": "NCP",
        "BillMasterID": 5,
        "PartyName": "CHT",
        "DueDate": "2023-04-21T00:00:00",
        "FeeAmountSum": 44920.55,
        "BankFees": 448.0,
        "Status": "TO_WRITEOFF",
        "URI": "s3://cht-deploy-bucket-1/Bill/CHT.pdf",
        "BillingNo": "01UP-CI2304181137",
        "PONo": "",
        "WorkTitle": "Upgrade",
        "IssueDate": "2023-04-21T00:00:00",
        "ReceivedAmountSum": 44806.29,
        "IsPro": false,
        "IsSent": true,
        "AttachedURI": null
      },
      "BillDetail": [
        {
          "InvDetailID": 36,
          "DedAmount": 0.0,
          "BankFees": 10.0,
          "BillDetailID": 18,
          "PartyName": "CHT",
          "FeeAmount": 951.32,
          "ShortOverReason": null,
          "SupplierName": "CHT",
          "ReceivedAmount": 960.0,
          "WriteOffDate": "2023-10-20T13:48:10",
          "BillMasterID": 5,
          "SubmarineCable": "NCP",
          "OverAmount": 8.68,
          "ReceiveDate": "2023-10-18T10:45:00",
          "WorkTitle": "Upgrade",
          "ShortAmount": 0.0,
          "Note": null,
          "WKMasterID": 26,
          "BillMilestone": "2022.B_BM0",
          "ToCBAmount": 8.68,
          "Status": "OVER",
          "InvoiceNo": "CHT-NCPUPG2022.B-230418",
          "FeeItem": "CBP Handling Fee_NCP Upgrade 2022.B BM0",
          "PaidAmount": 0.0,
          "OrgFeeAmount": 951.32
        },
        {
          "InvDetailID": 41,
          "DedAmount": 0.0,
          "BankFees": 185.0,
          "BillDetailID": 19,
          "PartyName": "CHT",
          "FeeAmount": 14629.94,
          "ShortOverReason": null,
          "SupplierName": "Ciena-US",
          "ReceivedAmount": 14635.0,
          "WriteOffDate": "2023-10-20T13:48:10",
          "BillMasterID": 5,
          "SubmarineCable": "NCP",
          "OverAmount": 5.06,
          "ReceiveDate": "2023-10-18T12:30:00",
          "WorkTitle": "Upgrade",
          "ShortAmount": 0.0,
          "Note": null,
          "WKMasterID": 23,
          "BillMilestone": "2022.B_BM0",
          "ToCBAmount": 5.06,
          "Status": "OVER",
          "InvoiceNo": "88561",
          "FeeItem": "BM0: Contract Agreement",
          "PaidAmount": 0.0,
          "OrgFeeAmount": 14629.94
        },
        {
          "InvDetailID": 49,
          "DedAmount": 0.0,
          "BankFees": 200.0,
          "BillDetailID": 20,
          "PartyName": "CHT",
          "FeeAmount": 27135.2,
          "ShortOverReason": null,
          "SupplierName": "Ciena-US",
          "ReceivedAmount": 27035.2,
          "WriteOffDate": "2023-10-20T13:48:10",
          "BillMasterID": 5,
          "SubmarineCable": "NCP",
          "OverAmount": 0.0,
          "ReceiveDate": "2023-10-18T10:45:00",
          "WorkTitle": "Upgrade",
          "ShortAmount": 0.0,
          "Note": null,
          "WKMasterID": 24,
          "BillMilestone": "2022.B_BM0",
          "ToCBAmount": 0.0,
          "Status": "OK",
          "InvoiceNo": "504893",
          "FeeItem": "BM0: Contract Agreement",
          "PaidAmount": 0.0,
          "OrgFeeAmount": 27135.2
        },
        {
          "InvDetailID": 54,
          "DedAmount": 0.0,
          "BankFees": 53.0,
          "BillDetailID": 21,
          "PartyName": "CHT",
          "FeeAmount": 2204.09,
          "ShortOverReason": null,
          "SupplierName": "Ciena-JP",
          "ReceivedAmount": 2176.09,
          "WriteOffDate": "2023-10-20T13:48:10",
          "BillMasterID": 5,
          "SubmarineCable": "NCP",
          "OverAmount": 0.0,
          "ReceiveDate": "2023-10-18T12:30:00",
          "WorkTitle": "Upgrade",
          "ShortAmount": 0.0,
          "Note": null,
          "WKMasterID": 25,
          "BillMilestone": "2022.B_BM0",
          "ToCBAmount": 0.0,
          "Status": "OK",
          "InvoiceNo": "16150",
          "FeeItem": "BM0: Contract Agreement",
          "PaidAmount": 0.0,
          "OrgFeeAmount": 2204.09
        }
      ]
    }
  ]



const ToWriteOffDataList = ({ listInfo, writeOffInitQuery }) => {
    
    const [isDialogOpen, setIsDialogOpen] = useState(false); //折抵作業
    const writeOffInfo = useRef({});
    // const writeOffDetail = useRef([]);
    const [writeOffDetail, setWriteOffDetail] = useState([]);
    let tmpBMArray = [];
    const dispatch = useDispatch();

    const handleDialogClose = () => {
        writeOffInfo.current = {};
        setWriteOffDetail([]);
        setIsDialogOpen(false);
    };

    const handleDialogOpen = (info) => {
        let tmpArray = info.BillDetail.map((i) => i);
        writeOffInfo.current = info.BillMaster;
        setWriteOffDetail(tmpArray);
        setIsDialogOpen(true);
    };

    const handleWriteOff = (id) => {
        let tmpQuery = getWriteOffDetail + '/BillMasterID=' + id;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('銷帳作業=>>', data);
                if (Array.isArray(data)) {
                    setWriteOffDetail(data);
                    setIsDialogOpen(true);
                }
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    };

    const sendWriteOffWork = (info) => {
        let tmpArray = {};
        tmpArray = {
            BillMaster: info.BillMaster
        };
        console.log('tmpArray=>>', tmpArray);
        fetch(submitWriteOff, { method: 'POST', body: JSON.stringify(tmpArray) })
        .then((res) => res.json())
        .then(() => {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '銷帳紀錄送出成功' } }));
            writeOffInitQuery();
        })
        .catch((e) => console.log('e1=>', e));
    };

    const handleFinish = (id) => {
        let tmpQuery = completeWriteOff + '/BillMasterID=' + id;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then(() => {
                 dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '完成銷帳成功' } }));
                 writeOffInitQuery();
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    }

    return (
        <>
            <WriteOffWork
                isDialogOpen={isDialogOpen}
                handleDialogClose={handleDialogClose}
                writeOffInfo={writeOffInfo.current}
                writeOffDetail={writeOffDetail}
                writeOffInitQuery={writeOffInitQuery}
                action="writeOff"
            />
            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">計帳段號</StyledTableCell>
                            <StyledTableCell align="center">會員</StyledTableCell>
                            <StyledTableCell align="center">帳單號碼</StyledTableCell>
                            <StyledTableCell align="center">帳單日期</StyledTableCell>
                            <StyledTableCell align="center">到期日期</StyledTableCell>
                            <StyledTableCell align="center">明細數量</StyledTableCell>
                            <StyledTableCell align="center">總金額</StyledTableCell>
                            <StyledTableCell align="center">累計手續費金額</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listInfo?.map((row, id) => {
                            tmpBMArray = [];
                            row.BillDetail.forEach((i) => {
                                if (!tmpBMArray.includes(i.BillMilestone)) {
                                    tmpBMArray.push(i.BillMilestone);
                                }
                            });
                            return (
                                <TableRow key={row?.BillMaster?.BillingNo + row?.BillMaster?.PartyName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.BillMaster?.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.BillMaster?.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">{tmpBMArray.join(',')}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.BillMaster?.PartyName}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.BillMaster?.BillingNo}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {dayjs(row?.BillMaster?.IssueDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{dayjs(row?.BillMaster?.DueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillDetail?.length}</StyledTableCell>
                                    <StyledTableCell align="center">{handleNumber(row?.BillMaster?.FeeAmountSum)}</StyledTableCell>
                                    <StyledTableCell align="center">{handleNumber(row?.BillMaster?.BankFees)}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', '& button': { mx: 1, p: 0 } }}>
                                            <Button
                                                color="primary"
                                                // 
                                                size="small"
                                                variant="outlined"
                                                sx={{fontSize: '12px'}}
                                                onClick={() => {
                                                    handleWriteOff(row.BillMaster.BillMasterID);
                                                    // handleDialogOpen(row);
                                                }}
                                            >
                                                銷帳作業
                                            </Button>
                                            <Button
                                                color="success"
                                                // 
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    sendWriteOffWork(row);
                                                }}
                                            >
                                                銷帳紀錄送出
                                            </Button>
                                            <Button
                                                color="info"
                                                // 
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleFinish(row.BillMaster.BillMasterID);
                                                    // handleDialogOpen(row);
                                                }}
                                            >
                                                完成銷帳
                                            </Button>
                                        </Box>
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

export default ToWriteOffDataList;
