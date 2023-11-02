import { useState, useRef, useEffect } from 'react';
import { Grid, Button, Box, Tabs, Tab } from '@mui/material';

// project import
import { TabPanel } from 'components/commonFunction';
import MainCard from 'components/MainCard';
import ToPaymentDataList from './toPaymentDataList';
import PaymentedDataList from './paymentedDataList';
import SupplierPaymentQuery from './supplierPaymentQuery';

import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

import { querySupplierPayment } from 'components/apis';

const fakeData = [
    {
      "InvoiceWKMaster": {
        "ContractType": "SC",
        "DedAmount": 0.0,
        "IssueDate": "2023-04-10T12:00:00",
        "PaidAmount": 0.0,
        "InvoiceNo": "88561",
        "DueDate": "2023-06-09T12:00:00",
        "CreateDate": "2023-04-18T10:53:44",
        "WKMasterID": 23,
        "PartyName": "",
        "PaidDate": null,
        "SupplierName": "Ciena-US",
        "IsPro": false,
        "Status": "PAYING",
        "SubmarineCable": "NCP",
        "IsRecharge": false,
        "URI": null,
        "WorkTitle": "Upgrade",
        "IsLiability": true,
        "AttachedURI": null,
        "TotalAmount": 123028.76,
        "NewDedAmount": 0.0
      },
      "BillDetailList": [
        {
          "BillDetailID": -1,
          "BillMasterID": -1,
          "BillingNo": "",
          "WKMasterID": -1,
          "InvoiceNo": "88561",
          "InvDetailID": 39,
          "PartyName": "Microsoft",
          "SupplierName": "Ciena-US",
          "SubmarineCable": "NCP",
          "WorkTitle": "Upgrade",
          "BillMilestone": "2022.B_BM0",
          "FeeItem": "BM0: Contract Agreement",
          "OrgFeeAmount": 69062.7,
          "DedAmount": 0,
          "FeeAmount": 0,
          "ReceivedAmount": 0,
          "OverAmount": 0,
          "ShortAmount": 0,
          "ShortOverReason": "",
          "WriteOffDate": "",
          "ReceiveDate": "",
          "Note": "",
          "ToCBAmount": 0,
          "PaidAmount": 0,
          "Status": ""
        },
        {
          "BillDetailID": -1,
          "BillMasterID": -1,
          "BillingNo": "",
          "WKMasterID": -1,
          "InvoiceNo": "88561",
          "InvDetailID": 40,
          "PartyName": "CM",
          "SupplierName": "Ciena-US",
          "SubmarineCable": "NCP",
          "WorkTitle": "Upgrade",
          "BillMilestone": "2022.B_BM0",
          "FeeItem": "BM0: Contract Agreement",
          "OrgFeeAmount": 7883.37,
          "DedAmount": 0,
          "FeeAmount": 0,
          "ReceivedAmount": 0,
          "OverAmount": 0,
          "ShortAmount": 0,
          "ShortOverReason": "",
          "WriteOffDate": "",
          "ReceiveDate": "",
          "Note": "",
          "ToCBAmount": 0,
          "PaidAmount": 0,
          "Status": ""
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
          "ReceivedAmount": 14629.94,
          "WriteOffDate": "2023-10-31T12:12:06",
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
          "OrgFeeAmount": 14629.94,
          "BillingNo": "01UP-CI2304181137"
        },
        {
          "BillDetailID": -1,
          "BillMasterID": -1,
          "BillingNo": "",
          "WKMasterID": -1,
          "InvoiceNo": "88561",
          "InvDetailID": 42,
          "PartyName": "KT",
          "SupplierName": "Ciena-US",
          "SubmarineCable": "NCP",
          "WorkTitle": "Upgrade",
          "BillMilestone": "2022.B_BM0",
          "FeeItem": "BM0: Contract Agreement",
          "OrgFeeAmount": 21639.21,
          "DedAmount": 0,
          "FeeAmount": 0,
          "ReceivedAmount": 0,
          "OverAmount": 0,
          "ShortAmount": 0,
          "ShortOverReason": "",
          "WriteOffDate": "",
          "ReceiveDate": "",
          "Note": "",
          "ToCBAmount": 0,
          "PaidAmount": 0,
          "Status": ""
        },
        {
          "BillDetailID": -1,
          "BillMasterID": -1,
          "BillingNo": "",
          "WKMasterID": -1,
          "InvoiceNo": "88561",
          "InvDetailID": 43,
          "PartyName": "CU",
          "SupplierName": "Ciena-US",
          "SubmarineCable": "NCP",
          "WorkTitle": "Upgrade",
          "BillMilestone": "2022.B_BM0",
          "FeeItem": "BM0: Contract Agreement",
          "OrgFeeAmount": 9813.54,
          "DedAmount": 0,
          "FeeAmount": 0,
          "ReceivedAmount": 0,
          "OverAmount": 0,
          "ShortAmount": 0,
          "ShortOverReason": "",
          "WriteOffDate": "",
          "ReceiveDate": "",
          "Note": "",
          "ToCBAmount": 0,
          "PaidAmount": 0,
          "Status": ""
        }
      ],
      "CMList": [
        {
          "CMID": 1,
          "CMNo": "88561",
          "InvoiceNo": "88561",
          "SubmarineCable": "NCP",
          "CurrAmount": 3000.0,
          "CreateDate": "2023-10-27T12:00:00",
          "Note": "TEST_CM",
          "WKMasterID": 23,
          "CMType": "COMPENSATE",
          "SupplierName": "Ciena-US",
          "WorkTitle": "Upgrade",
          "IssueDate": "2023-04-10T12:00:00",
          "LastUpdDate": null,
          "DedAmount": 0.0
        }
      ],
      "ReceivedAmountSum": 14629.94
    }
  ]

const SupplierPayment = () => {
    const [value, setValue] = useState(0);
    const queryApi = useRef('/Status=PAYING');
    const [cbToCn, setCbToCn] = useState({}); //勾選合併狀態
    const [isSend, setIsSend] = useState(false);
    const dispatch = useDispatch();

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
        let tmpQuery = querySupplierPayment;
        if (value === 0) {
            tmpQuery = tmpQuery + '/Status=PAYING';
        } else if (value === 1) {
            tmpQuery = tmpQuery + '/Status=COMPLETE';
        }
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setListInfo(data);
            })
            .catch((e) => {
                setListInfo([]);
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '查無資料' } }));
            });
    };

    const sendPaymentData = () => {
        if (Object.values(cbToCn).indexOf(true) > -1) {
            setIsSend(true); //打開的時候才會觸發合併API
        } else {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請至少勾選一筆發票項目' } }));
        }
    };

    useEffect(() => {
        supplierPaymentQuery();
    }, [value]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <SupplierPaymentQuery setListInfo={setListInfo} queryApi={queryApi} value={value} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title={`${value === 0 ? '待確認' : '已確認'}資料列表`}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="待確認" {...a11yProps(0)} />
                            <Tab label="已確認" {...a11yProps(1)} />
                        </Tabs>
                        {value === 0 ? (
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
                                    付款送出
                                </Button>
                            </>
                        ) : (
                            ''
                        )}
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ToPaymentDataList
                            listInfo={listInfo}
                            // listInfo={fakeData}
                            cbToCn={cbToCn}
                            setCbToCn={setCbToCn}
                            isSend={isSend}
                            setIsSend={setIsSend}
                            supplierPaymentQuery={supplierPaymentQuery}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PaymentedDataList listInfo={listInfo} />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default SupplierPayment;
