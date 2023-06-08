import { useEffect, useState, useRef } from 'react';
import { Grid, Button, IconButton, Box, Tabs, Tab, Typography, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';

// project import
import { TabPanel } from 'components/commonFunction';
import MainCard from 'components/MainCard';
import ToPaymentDataList from './toPaymentDataList';
import PaymentedDataList from './paymentedDataList';
import InvalidatedDataList from './invalidatedDataList';
import SupplierPaymentQuery from './supplierPaymentQuery';

const fakeData = [
    {
        InvoiceWKMaster: {
            WKMasterID: 8,
            SupplierName: 'CHT',
            WorkTitle: 'Upgrade',
            IssueDate: '2022-11-07T04:43:41',
            PartyName: '',
            IsRecharge: false,
            TotalAmount: 6000.0,
            CreateDate: '2023-04-17T16:54:51',
            Status: 'PAYING',
            SubmarineCable: 'TPE',
            InvoiceNo: 'TPE-UPG11-221102',
            ContractType: 'SC',
            DueDate: '2022-12-22T04:43:41',
            IsPro: false,
            IsLiability: true,
            PaidAmount: 200.0,
            PaidDate: '2023-05-25T19:22:25'
        },
        BillDetailList: [
            {
                WKMasterID: 8,
                BillMilestone: 'BM2',
                ToCBAmount: 0.0,
                InvoiceNo: 'TPE-UPG11-221102',
                FeeItem: 'CBP Fee BM2 UPG11',
                PaidAmount: 0.0,
                InvDetailID: 11,
                OrgFeeAmount: 31699.0,
                ShortOverReason: null,
                PartyName: 'KT',
                DedAmount: 1000.0,
                WriteOffDate: '2023-04-28T09:41:57',
                SupplierName: 'CHT',
                FeeAmount: 0.0,
                ReceiveDate: null,
                SubmarineCable: 'TPE',
                ReceivedAmount: 31699.0,
                Note: null,
                BillMasterID: 1,
                WorkTitle: 'Upgrade',
                OverAmount: 0.0,
                Status: 'OK',
                BillDetailID: 1,
                ShortAmount: 0.0
            },
            {
                WKMasterID: 8,
                BillMilestone: 'BM2',
                ToCBAmount: 0.0,
                InvoiceNo: 'TPE-UPG11-221102',
                FeeItem: 'CBP Fee BM2 UPG11',
                PaidAmount: 100.0,
                InvDetailID: 13,
                OrgFeeAmount: 2000.0,
                ShortOverReason: '',
                PartyName: 'CT',
                DedAmount: 0.0,
                WriteOffDate: '2023-05-25T18:06:31',
                SupplierName: 'CHT',
                FeeAmount: 2000.0,
                ReceiveDate: '2023-04-24T15:00:00',
                SubmarineCable: 'TPE',
                ReceivedAmount: 990.0,
                Note: '',
                BillMasterID: 2,
                WorkTitle: 'Upgrade',
                OverAmount: 0.0,
                Status: 'PARTIAL',
                BillDetailID: 13,
                ShortAmount: 1010.0
            },
            {
                WKMasterID: 8,
                BillMilestone: 'BM2',
                ToCBAmount: 0.0,
                InvoiceNo: 'TPE-UPG11-221102',
                FeeItem: 'CBP Fee BM2 UPG11',
                PaidAmount: 100.0,
                InvDetailID: 12,
                OrgFeeAmount: 3000.0,
                ShortOverReason: null,
                PartyName: 'CU',
                DedAmount: 0.0,
                WriteOffDate: '2023-05-25T20:59:04',
                SupplierName: 'CHT',
                FeeAmount: 3000.0,
                ReceiveDate: null,
                SubmarineCable: 'TPE',
                ReceivedAmount: 1990.0,
                Note: null,
                BillMasterID: 3,
                WorkTitle: 'Upgrade',
                OverAmount: 0.0,
                Status: 'PARTIAL',
                BillDetailID: 17,
                ShortAmount: 1010.0
            }
        ],
        ReceivedAmountSum: 2980.0
    },
    {
        InvoiceWKMaster: {
            WKMasterID: 9,
            SupplierName: 'Ciena-US',
            WorkTitle: 'Upgrade',
            IssueDate: '2022-10-29T04:46:50',
            PartyName: '',
            IsRecharge: false,
            TotalAmount: 24288.0,
            CreateDate: '2023-04-17T16:54:51',
            Status: 'PAYING',
            SubmarineCable: 'TPE',
            InvoiceNo: '15428',
            ContractType: 'SC',
            DueDate: '2022-12-29T04:46:50',
            IsPro: false,
            IsLiability: true,
            PaidAmount: 1708.0,
            PaidDate: '2023-05-25T21:08:11'
        },
        BillDetailList: [
            {
                WKMasterID: 9,
                BillMilestone: 'BM2',
                ToCBAmount: 0.0,
                InvoiceNo: '15428',
                FeeItem: 'Provisional Network Acceptance',
                PaidAmount: 0.0,
                InvDetailID: 14,
                OrgFeeAmount: 3680.0,
                ShortOverReason: null,
                PartyName: 'KT',
                DedAmount: 3680.0,
                WriteOffDate: '2023-04-28T09:41:57',
                SupplierName: 'Ciena-US',
                FeeAmount: 0.0,
                ReceiveDate: null,
                SubmarineCable: 'TPE',
                ReceivedAmount: 0.0,
                Note: null,
                BillMasterID: 1,
                WorkTitle: 'Upgrade',
                OverAmount: 0.0,
                Status: 'OK',
                BillDetailID: 2,
                ShortAmount: 0.0
            },
            {
                WKMasterID: 9,
                BillMilestone: 'BM2',
                ToCBAmount: 0.0,
                InvoiceNo: '15428',
                FeeItem: 'Tax-Provisional Network Acceptance',
                PaidAmount: 0.0,
                InvDetailID: 15,
                OrgFeeAmount: 368.0,
                ShortOverReason: null,
                PartyName: 'KT',
                DedAmount: 368.0,
                WriteOffDate: '2023-04-28T09:41:57',
                SupplierName: 'Ciena-US',
                FeeAmount: 0.0,
                ReceiveDate: null,
                SubmarineCable: 'TPE',
                ReceivedAmount: 0.0,
                Note: null,
                BillMasterID: 1,
                WorkTitle: 'Upgrade',
                OverAmount: 0.0,
                Status: 'OK',
                BillDetailID: 3,
                ShortAmount: 0.0
            },
            {
                WKMasterID: 9,
                BillMilestone: 'BM2',
                ToCBAmount: 0.0,
                InvoiceNo: '15428',
                FeeItem: 'Provisional Network Acceptance',
                PaidAmount: 1360.0,
                InvDetailID: 18,
                OrgFeeAmount: 7360.0,
                ShortOverReason: null,
                PartyName: 'CT',
                DedAmount: 0.0,
                WriteOffDate: '2023-05-25T18:06:31',
                SupplierName: 'Ciena-US',
                FeeAmount: 7360.0,
                ReceiveDate: '2023-04-24T15:00:00',
                SubmarineCable: 'TPE',
                ReceivedAmount: 2360.0,
                Note: null,
                BillMasterID: 2,
                WorkTitle: 'Upgrade',
                OverAmount: 0.0,
                Status: 'PARTIAL',
                BillDetailID: 14,
                ShortAmount: 5000.0
            },
            {
                WKMasterID: 9,
                BillMilestone: 'BM2',
                ToCBAmount: 0.0,
                InvoiceNo: '15428',
                FeeItem: 'Tax-Provisional Network Acceptance',
                PaidAmount: 136.0,
                InvDetailID: 18,
                OrgFeeAmount: 736.0,
                ShortOverReason: null,
                PartyName: 'CT',
                DedAmount: 0.0,
                WriteOffDate: '2023-05-25T18:06:31',
                SupplierName: 'Ciena-US',
                FeeAmount: 736.0,
                ReceiveDate: '2023-04-24T15:00:00',
                SubmarineCable: 'TPE',
                ReceivedAmount: 136.0,
                Note: null,
                BillMasterID: 2,
                WorkTitle: 'Upgrade',
                OverAmount: 0.0,
                Status: 'PARTIAL',
                BillDetailID: 15,
                ShortAmount: 600.0
            },
            {
                WKMasterID: 9,
                BillMilestone: 'BM2',
                ToCBAmount: 0.0,
                InvoiceNo: '15428',
                FeeItem: 'Provisional Network Acceptance',
                PaidAmount: 40.0,
                InvDetailID: 16,
                OrgFeeAmount: 11040.0,
                ShortOverReason: null,
                PartyName: 'CU',
                DedAmount: 0.0,
                WriteOffDate: '2023-05-25T20:59:04',
                SupplierName: 'Ciena-US',
                FeeAmount: 11040.0,
                ReceiveDate: '2023-04-24T15:00:00',
                SubmarineCable: 'TPE',
                ReceivedAmount: 40.0,
                Note: null,
                BillMasterID: 3,
                WorkTitle: 'Upgrade',
                OverAmount: 0.0,
                Status: 'PARTIAL',
                BillDetailID: 18,
                ShortAmount: 11000.0
            },
            {
                WKMasterID: 9,
                BillMilestone: 'BM2',
                ToCBAmount: 0.0,
                InvoiceNo: '15428',
                FeeItem: 'Tax-Provisional Network Acceptance',
                PaidAmount: 104.0,
                InvDetailID: 17,
                OrgFeeAmount: 1104.0,
                ShortOverReason: null,
                PartyName: 'CU',
                DedAmount: 0.0,
                WriteOffDate: '2023-05-25T20:59:04',
                SupplierName: 'Ciena-US',
                FeeAmount: 1104.0,
                ReceiveDate: '2023-04-24T15:00:00',
                SubmarineCable: 'TPE',
                ReceivedAmount: 1104.0,
                Note: null,
                BillMasterID: 3,
                WorkTitle: 'Upgrade',
                OverAmount: 0.0,
                Status: 'OK',
                BillDetailID: 19,
                ShortAmount: 11000.0
            }
        ],
        ReceivedAmountSum: 3640.0
    },
    {
        InvoiceWKMaster: {
            WKMasterID: 10,
            SupplierName: 'Ciena-US',
            WorkTitle: 'Upgrade',
            IssueDate: '2022-10-29T04:51:48',
            PartyName: '',
            IsRecharge: false,
            TotalAmount: 190194.0,
            CreateDate: '2023-04-17T16:54:51',
            Status: 'PAYING',
            SubmarineCable: 'TPE',
            InvoiceNo: '503418',
            ContractType: 'SC',
            DueDate: '2022-12-29T04:51:48',
            IsPro: false,
            IsLiability: true,
            PaidAmount: 0.0,
            PaidDate: null
        },
        BillDetailList: [
            {
                WKMasterID: 10,
                BillMilestone: 'BM2',
                ToCBAmount: 0.0,
                InvoiceNo: '503418',
                FeeItem: 'BM2 - Provisional Network Acceptance',
                PaidAmount: 0.0,
                InvDetailID: 20,
                OrgFeeAmount: 31699.0,
                ShortOverReason: null,
                PartyName: 'KT',
                DedAmount: 31699.0,
                WriteOffDate: '2023-04-28T09:41:57',
                SupplierName: 'Ciena-US',
                FeeAmount: 0.0,
                ReceiveDate: null,
                SubmarineCable: 'TPE',
                ReceivedAmount: 0.0,
                Note: null,
                BillMasterID: 1,
                WorkTitle: 'Upgrade',
                OverAmount: 0.0,
                Status: 'OK',
                BillDetailID: 4,
                ShortAmount: 0.0
            },
            {
                WKMasterID: 10,
                BillMilestone: 'BM2',
                ToCBAmount: 0.0,
                InvoiceNo: '503418',
                FeeItem: 'BM2 - Provisional Network Acceptance',
                PaidAmount: 0.0,
                InvDetailID: 18,
                OrgFeeAmount: 63398.0,
                ShortOverReason: '',
                PartyName: 'CT',
                DedAmount: 0.0,
                WriteOffDate: '2023-05-25T18:06:31',
                SupplierName: 'Ciena-US',
                FeeAmount: 63398.0,
                ReceiveDate: '2023-04-24T15:00:00',
                SubmarineCable: 'TPE',
                ReceivedAmount: 0.0,
                Note: '',
                BillMasterID: 2,
                WorkTitle: 'Upgrade',
                OverAmount: 0.0,
                Status: 'INCOMPLETE',
                BillDetailID: 16,
                ShortAmount: 63398.0
            },
            {
                WKMasterID: 10,
                BillMilestone: 'BM2',
                ToCBAmount: 0.0,
                InvoiceNo: '503418',
                FeeItem: 'BM2 - Provisional Network Acceptance',
                PaidAmount: 0.0,
                InvDetailID: 21,
                OrgFeeAmount: 95097.0,
                ShortOverReason: null,
                PartyName: 'CU',
                DedAmount: 0.0,
                WriteOffDate: '2023-05-25T20:59:04',
                SupplierName: 'Ciena-US',
                FeeAmount: 95097.0,
                ReceiveDate: null,
                SubmarineCable: 'TPE',
                ReceivedAmount: 0.0,
                Note: null,
                BillMasterID: 3,
                WorkTitle: 'Upgrade',
                OverAmount: 0.0,
                Status: 'INCOMPLETE',
                BillDetailID: 20,
                ShortAmount: 95097.0
            }
        ],
        ReceivedAmountSum: 0.0
    }
];

const SupplierPayment = () => {
    const [value, setValue] = useState(0);
    const queryApi = useRef('/Status=PAYING');
    const [cbToCn, setCbToCn] = useState({}); //勾選合併狀態
    const [isSend, setIsSend] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    const [listInfo, setListInfo] = useState([]);
    const supplierPaymentQuery = () => {
        fetch(queryApi.current, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setListInfo(data);
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    };

    const sendPaymentData = () => {
        if (Object.values(cbToCn).indexOf(true) > -1) {
            setIsSend(true); //打開的時候才會觸發合併API
        } else {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請至少勾選一筆發票項目' } }));
        }
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <SupplierPaymentQuery setListInfo={setListInfo} queryApi={queryApi} value={value} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title={`${value == 0 ? '待確認' : value == 1 ? '已確認' : '函稿'}資料列表`}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="待確認" {...a11yProps(0)} />
                            <Tab label="已確認" {...a11yProps(1)} />
                            {/* <Tab label="函稿" {...a11yProps(2)} /> */}
                        </Tabs>
                        {value == 0 ? (
                            <>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        right: 5,
                                        top: 4
                                    }}
                                    onClick={() => {
                                        sendPaymentData();
                                    }}
                                >
                                    付款送出(進入函稿)
                                </Button>
                            </>
                        ) : (
                            ''
                        )}
                    </Box>
                    <TabPanel value={value} index={0}>
                        {/* <ToPaymentDataList listInfo={listInfo} /> */}
                        <ToPaymentDataList
                            listInfo={listInfo}
                            cbToCn={cbToCn}
                            setCbToCn={setCbToCn}
                            isSend={isSend}
                            setIsSend={setIsSend}
                            supplierPaymentQuery={supplierPaymentQuery}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PaymentedDataList listInfo={fakeData} />
                    </TabPanel>
                    {/* <TabPanel value={value} index={2}>
                        <InvalidatedDataList />
                    </TabPanel> */}
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default SupplierPayment;
