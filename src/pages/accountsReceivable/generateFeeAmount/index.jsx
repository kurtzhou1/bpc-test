import { useEffect, useState, useRef } from 'react';
import { Grid, Button, IconButton, Box, Tabs, Tab, Typography, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import { TabPanel } from 'components/commonFunction';
import ToCombineDataList from './toCombineDataList';
import ToDeductDataList from './toDeductDataList';
import DeductedDataList from './deductedDataList';
import SignedDataList from './signedDataList';
import InvalidatedDataList from './invalidatedDataList';
import DraftDataList from './draftDataList';

import ReceivableQuery from './receivableQuery';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';
import { queryToCombineInvo, queryToDecutBill, quertDeductedData } from 'components/apis';

// 以下都無用的
const fakeData0 = [
    {
        InvoiceMaster: {
            InvoiceNo: 'DT0170168-11',
            WKMasterID: 1,
            PartyName: 'CHT',
            SubmarineCable: 'SJC2',
            ContractType: 'SC',
            DueDate: '2022-11-08T12:00:00',
            IsPro: false,
            InvMasterID: 9,
            SupplierName: 'NEC',
            WorkTitle: 'Construction',
            IssueDate: '2022-09-09T12:00:00',
            Status: 'TO_MERGE'
        },
        InvoiceDetail: [
            {
                WKDetailID: 1,
                InvDetailID: 33,
                PartyName: 'CHT',
                SupplierName: 'NEC',
                WorkTitle: 'Construction',
                FeeItem: 'BM12 Branching Units (100%)-Service',
                LBRatio: 7.1428571429,
                Difference: 0,
                InvMasterID: 9,
                WKMasterID: 1,
                InvoiceNo: 'DT0170168-1111111',
                SubmarineCable: 'SJC2',
                BillMilestone: 'BM12',
                FeeAmountPre: 1487661.54,
                FeeAmountPost: 106261.54
            },
            {
                WKDetailID: 2,
                InvDetailID: 332,
                PartyName: 'CHT',
                SupplierName: 'NEC',
                WorkTitle: 'Construction',
                FeeItem: 'BM12 Branching Units (100%)-Service',
                LBRatio: 7.1428571429,
                Difference: 0,
                InvMasterID: 10,
                WKMasterID: 1,
                InvoiceNo: 'DT0170168-1111111',
                SubmarineCable: 'SJC2',
                BillMilestone: 'BM12',
                FeeAmountPre: 1487661.54,
                FeeAmountPost: 1
            }
        ]
    },
    {
        InvoiceMaster: {
            InvoiceNo: 'DT0170168-22',
            WKMasterID: 2,
            PartyName: 'CHT',
            SubmarineCable: 'SJC2',
            ContractType: 'SC',
            DueDate: '2022-11-08T12:00:00',
            IsPro: true,
            InvMasterID: 10,
            SupplierName: 'NEC',
            WorkTitle: 'Construction',
            IssueDate: '2022-09-09T12:00:00',
            Status: 'TO_MERGE'
        },
        InvoiceDetail: [
            {
                WKDetailID: 1,
                InvDetailID: 33,
                PartyName: 'CHT',
                SupplierName: 'NEC',
                WorkTitle: 'Construction',
                FeeItem: 'BM12 Branching Units (100%)-Service',
                LBRatio: 7.1428571429,
                Difference: 0,
                InvMasterID: 9,
                WKMasterID: 1,
                InvoiceNo: 'DT0170168-222222',
                SubmarineCable: 'SJC2',
                BillMilestone: 'BM12',
                FeeAmountPre: 1487661.54,
                FeeAmountPost: 106261.54
            },
            {
                WKDetailID: 2,
                InvDetailID: 332,
                PartyName: 'CHT',
                SupplierName: 'NEC',
                WorkTitle: 'Construction',
                FeeItem: 'BM12 Branching Units (100%)-Service',
                LBRatio: 7.1428571429,
                Difference: 0,
                InvMasterID: 9,
                WKMasterID: 1,
                InvoiceNo: 'DT0170168-1111111',
                SubmarineCable: 'SJC2',
                BillMilestone: 'BM12',
                FeeAmountPre: 1487661.54,
                FeeAmountPost: 2
            }
        ]
    }
];

const fakeData1 = [
    {
        BillMaster: {
            BillMasterID: 1,
            BillingNo: 'string',
            PONo: 'string',
            SupplierName: 'string',
            SubmarineCable: 'string',
            WorkTitle: 'string',
            PartyName: 'string',
            IssueDate: '2023-03-14 00:00:00',
            DueDate: '2023-03-20 00:00:00',
            FeeAmountSum: 123.45,
            ReceivedAmountSum: 123.45,
            IsPro: 1,
            Status: 'string'
        },
        BillDetail: [
            {
                BillDetailID: 133333333,
                BillMasterID: 2,
                WKMasterID: 3,
                InvDetailID: 4,
                PartyName: 'string',
                SupplierName: 'string',
                SubmarineCable: 'string',
                WorkTitle: 'string',
                BillMilestone: 'string',
                FeeItem: 'string',
                OrgFeeAmount: 123.45,
                DedAmount: 13.45,
                FeeAmount: 123.45,
                ReceivedAmount: 123.45,
                OverAmount: 123.45,
                ShortAmount: 123.45,
                BankFees: 123.45,
                ToCBAmount: 123.45,
                ShortOverReason: 'string',
                WriteOffDate: '2023-03-14 00:00:00',
                ReceiveDate: '2023-03-14 00:00:00',
                Note: 'string',
                Status: 'string'
            },
            {
                BillDetailID: 23333333,
                BillMasterID: 3,
                WKMasterID: 3,
                InvDetailID: 4,
                PartyName: 'string',
                SupplierName: 'string',
                SubmarineCable: 'string',
                WorkTitle: 'string',
                BillMilestone: 'string',
                FeeItem: 'string',
                OrgFeeAmount: 123.45,
                DedAmount: 123.45,
                FeeAmount: 123.45,
                ReceivedAmount: 123.45,
                OverAmount: 123.45,
                ShortAmount: 123.45,
                BankFees: 123.45,
                ToCBAmount: 123.45,
                ShortOverReason: 'string',
                WriteOffDate: '2023-03-14 00:00:00',
                ReceiveDate: '2023-03-14 00:00:00',
                Note: 'string',
                Status: 'string'
            }
        ]
    },
    {
        BillMaster: {
            BillMasterID: 2,
            BillingNo: 'string',
            PONo: 'string',
            SupplierName: 'string',
            SubmarineCable: 'string',
            WorkTitle: 'string',
            PartyName: 'string',
            IssueDate: '2023-03-14 00:00:00',
            DueDate: '2023-03-20 00:00:00',
            FeeAmountSum: 123.45,
            ReceivedAmountSum: 123.45,
            IsPro: 1,
            Status: 'string'
        },
        BillDetail: [
            {
                BillDetailID: 111,
                BillMasterID: 2,
                WKMasterID: 3,
                InvDetailID: 4,
                PartyName: 'string',
                SupplierName: 'string',
                SubmarineCable: 'string',
                WorkTitle: 'string',
                BillMilestone: 'string',
                FeeItem: 'string',
                OrgFeeAmount: 123.45,
                DedAmount: 123.45,
                FeeAmount: 123.45,
                ReceivedAmount: 123.45,
                OverAmount: 123.45,
                ShortAmount: 123.45,
                BankFees: 123.45,
                ToCBAmount: 123.45,
                ShortOverReason: 'string',
                WriteOffDate: '2023-03-14 00:00:00',
                ReceiveDate: '2023-03-14 00:00:00',
                Note: 'string',
                Status: 'string'
            },
            {
                BillDetailID: 222,
                BillMasterID: 2,
                WKMasterID: 3,
                InvDetailID: 4,
                PartyName: 'string',
                SupplierName: 'string',
                SubmarineCable: 'string',
                WorkTitle: 'string',
                BillMilestone: 'string',
                FeeItem: 'string',
                OrgFeeAmount: 123.45,
                DedAmount: 123.45,
                FeeAmount: 123.45,
                ReceivedAmount: 123.45,
                OverAmount: 123.45,
                ShortAmount: 123.45,
                BankFees: 123.45,
                ToCBAmount: 123.45,
                ShortOverReason: 'string',
                WriteOffDate: '2023-03-14 00:00:00',
                ReceiveDate: '2023-03-14 00:00:00',
                Note: 'string',
                Status: 'string'
            }
        ]
    }
];

const fakeData2 = [
    {
        BillMaster: {
            BillMasterID: 1,
            BillingNo: 'string',
            PONo: '123',
            PartyName: 'string',
            SubmarineCable: 'string',
            WorkTitle: 'string',
            IssueDate: '2023-01-01 00:00:00',
            DueDate: '2023-01-01 00:00:00',
            FeeAmountSum: 123.45,
            ReceivedAmountSum: 123.45,
            IsPro: 0,
            Status: 'string'
        },
        data: [
            {
                BillDetail: {
                    BillDetailID: 1,
                    BillMasterID: 1,
                    WKMasterID: 1,
                    InvDetailID: 1,
                    PartyName: 'string',
                    SupplierName: 'string',
                    SubmarineCable: 'string',
                    WorkTitle: 'string',
                    BillMilestone: 'string',
                    FeeItem: 'string',
                    OrgFeeAmount: 123.45,
                    DedAmount: 123.45,
                    FeeAmount: 123.45,
                    ReceivedAmount: 123.45,
                    OverAmount: 123.45,
                    ShortAmount: 123.45,
                    BankFees: 123.45,
                    ShortOverReason: 'string',
                    WriteOffDate: '2023-03-01 00:00:00',
                    ReceiveDate: '2023-03-01 00:00:00',
                    Note: 'string',
                    ToCBAmount: 123.45,
                    Status: 'string'
                },
                CB: [
                    {
                        CBID: 1,
                        CBType: 'string',
                        BillingNo: 'string',
                        BLDetailID: 1,
                        SubmarineCable: 'string',
                        WorkTitle: 'string',
                        BillMilestone: 'string',
                        InvoiceNo: 'string',
                        CurrAmount: 123.45,
                        PartyName: 'string',
                        CreateDate: '2023-04-01 00:00:00',
                        LastUpdDate: '2023-04-01 00:00:00',
                        Note: 'string'
                    },
                    {
                        CBID: 2,
                        CBType: 'string',
                        BillingNo: 'string',
                        BLDetailID: 1,
                        SubmarineCable: 'string',
                        WorkTitle: 'string',
                        BillMilestone: 'string',
                        InvoiceNo: 'string',
                        CurrAmount: 123.45,
                        PartyName: 'string',
                        CreateDate: '2023-04-01 00:00:00',
                        LastUpdDate: '2023-04-01 00:00:00',
                        Note: 'string'
                    }
                ]
            },
            {
                BillDetail: {
                    BillDetailID: 2,
                    BillMasterID: 2,
                    WKMasterID: 2,
                    InvDetailID: 2,
                    PartyName: 'string',
                    SupplierName: 'string',
                    SubmarineCable: 'string',
                    WorkTitle: 'string',
                    BillMilestone: 'string',
                    FeeItem: 'string',
                    OrgFeeAmount: 123.45,
                    DedAmount: 123.45,
                    FeeAmount: 123.45,
                    ReceivedAmount: 123.45,
                    OverAmount: 123.45,
                    ShortAmount: 123.45,
                    BankFees: 123.45,
                    ShortOverReason: 'string',
                    WriteOffDate: '2023-03-01 00:00:00',
                    ReceiveDate: '2023-03-01 00:00:00',
                    Note: 'string',
                    ToCBAmount: 123.45,
                    Status: 'string'
                },
                CB: [
                    {
                        CBID: 1,
                        CBType: 'string',
                        BillingNo: 'string',
                        BLDetailID: 1,
                        SubmarineCable: 'string',
                        WorkTitle: 'string',
                        BillMilestone: 'string',
                        InvoiceNo: 'string',
                        CurrAmount: 123.45,
                        PartyName: 'string',
                        CreateDate: '2023-04-01 00:00:00',
                        LastUpdDate: '2023-04-01 00:00:00',
                        Note: 'string'
                    },
                    {
                        CBID: 2,
                        CBType: 'string',
                        BillingNo: 'string',
                        BLDetailID: 1,
                        SubmarineCable: 'string',
                        WorkTitle: 'string',
                        BillMilestone: 'string',
                        InvoiceNo: 'string',
                        CurrAmount: 123.45,
                        PartyName: 'string',
                        CreateDate: '2023-04-01 00:00:00',
                        LastUpdDate: '2023-04-01 00:00:00',
                        Note: 'string'
                    }
                ]
            }
        ]
    }
];

const fakeData3 = [
    {
        BillMaster: {
            SubmarineCable: 'TPE',
            BillingNo: '03UP-KT2303300924',
            PONo: '',
            PartyName: 'KT',
            DueDate: '2023-03-30T05:24:49',
            ReceivedAmountSum: 0,
            IsPro: false,
            URI: 's3://cht-deploy-bucket-1/TPE Cable Network Upgrade #11 Central Billing Party Signed.pdf',
            BillMasterID: 3,
            SupplierName: 'Ciena-US',
            WorkTitle: 'Upgrade',
            IssueDate: '2023-03-30T09:25:00',
            FeeAmountSum: 0,
            BankFees: null,
            Status: 'SIGNED'
        },
        BillDetail: [
            {
                PartyName: 'KT',
                FeeAmount: 0,
                ToCBAmount: null,
                SupplierName: 'Ciena-US',
                ReceivedAmount: 0,
                Status: 'INCOMPLETE',
                SubmarineCable: 'TPE',
                OverAmount: 0,
                BillMasterID: 3,
                WorkTitle: 'Upgrade',
                ShortAmount: 0,
                BillDetailID: 9,
                BillMilestone: '11_BM1',
                ShortOverReason: null,
                WKMasterID: 1,
                FeeItem: 'BM1: Contract Agreement \n',
                WriteOffDate: null,
                InvoiceNo: '503041',
                OrgFeeAmount: 31699,
                ReceiveDate: null,
                InvDetailID: 1,
                DedAmount: 31699,
                Note: null
            }
        ]
    }
];

const GenerateFeeAmount = () => {
    const [value, setValue] = useState(0);
    const [listInfo, setListInfo] = useState([]);
    const [dataList, setDataList] = useState([]);
    const dispatch = useDispatch();
    const queryApi = useRef('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const totalCombineAmount = useRef(0); //勾選合併帳單總金額
    const handleChange = (event, newValue) => {
        setListInfo([]);
        setDataList([]);
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };
    const handleDialogOpen = () => {
        if (totalCombineAmount.current > 0) {
            setIsDialogOpen(true); //打開的時候才會觸發合併API
        } else {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請至少勾選一筆發票項目' } }));
        }
    };

    //初始化查詢
    const receivableQuery = () => {
        let tmpQuery = queryApi.current;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setListInfo(data);
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    };

    useEffect(() => {
        if (listInfo && listInfo.length) {
            setDataList(listInfo);
        } else {
            if (value === 1) {
                setDataList(fakeData1);
            } else if (value === 2) {
                setDataList(fakeData2);
            } else if (value === 0) {
                setDataList(fakeData0);
            } else if (value === 3) {
                setDataList(fakeData3);
            } else {
                setDataList([]);
            }
        }
    }, [listInfo]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <ReceivableQuery value={value} setListInfo={setListInfo} queryApi={queryApi} />
            </Grid>
            <Grid item xs={12}>
                <MainCard
                    title={`${
                        value == 0 ? '待合併' : value == 1 ? '待抵扣' : value == 2 ? '已抵扣' : value == 3 ? '已簽核' : '已作廢'
                    }帳單資料列表`}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="待合併" {...a11yProps(0)} />
                            <Tab label="待抵扣" {...a11yProps(1)} />
                            <Tab label="已抵扣" {...a11yProps(2)} />
                            <Tab label="已簽核" {...a11yProps(3)} />
                            <Tab label="已作廢" {...a11yProps(4)} />
                        </Tabs>
                        {value == 0 ? (
                            <>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        right: 80,
                                        top: 4
                                    }}
                                    onClick={() => {
                                        handleDialogOpen();
                                    }}
                                >
                                    + 合併帳單
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 4
                                    }}
                                >
                                    Reset
                                </Button>
                            </>
                        ) : (
                            ''
                        )}
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ToCombineDataList
                            handleDialogClose={handleDialogClose}
                            isDialogOpen={isDialogOpen}
                            dataList={dataList}
                            totalCombineAmount={totalCombineAmount}
                            receivableQuery={receivableQuery}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ToDeductDataList dataList={dataList} receivableQuery={receivableQuery} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <DeductedDataList dataList={dataList} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <SignedDataList dataList={dataList} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <InvalidatedDataList dataList={dataList} />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default GenerateFeeAmount;
