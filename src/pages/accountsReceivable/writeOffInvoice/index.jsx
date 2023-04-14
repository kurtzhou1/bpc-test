import { useEffect, useState } from 'react';
import { Grid, Button, IconButton, Box, Tabs, Tab, Typography, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';

// project import
import { TabPanel } from 'components/commonFunction';
import MainCard from 'components/MainCard';
import ToWriteOffDataList from './toWriteOffDataList';
import WriteOffedDataList from './writeOffedDataList';
// import InvalidatedDataList from './invalidatedDataList';
import WriteOffQuery from './writeOffQuery';

const fakeData = [
    {
        BillMaster: {
            SupplierName: 'NEC',
            BillMasterID: 1,
            WorkTitle: 'Construction',
            IssueDate: '2023-04-13T00:00:00',
            DueDate: '2023-04-30T00:00:00',
            ReceivedAmountSum: 0,
            IsPro: false,
            URI: 's3://cht-deploy-bucket-1/SJC2 Cable Network  Central Billing Party.pdf',
            BillingNo: '02CO-TC2304131513',
            PONo: '',
            SubmarineCable: 'SJC2',
            PartyName: 'TICC',
            FeeAmountSum: 398695.2,
            BankFees: null,
            Status: 'TO_WRITEOFF'
        },
        BillDetail: [
            {
                BillDetailID: 1,
                BillMilestone: 'BM9a',
                ShortOverReason: null,
                WKMasterID: 1,
                FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
                WriteOffDate: null,
                InvoiceNo: 'DT0170168-1',
                OrgFeeAmount: 92058.74,
                ReceiveDate: null,
                InvDetailID: 5,
                DedAmount: 0,
                Note: null,
                PartyName: 'TICC',
                FeeAmount: 92058.74,
                ToCBAmount: null,
                SupplierName: 'NEC',
                ReceivedAmount: 0,
                Status: 'INCOMPLETE',
                SubmarineCable: 'SJC2',
                OverAmount: 0,
                BillMasterID: 1,
                WorkTitle: 'Construction',
                ShortAmount: 0
            },
            {
                BillDetailID: 2,
                BillMilestone: 'BM9a',
                ShortOverReason: null,
                WKMasterID: 1,
                FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
                WriteOffDate: null,
                InvoiceNo: 'DT0170168-1',
                OrgFeeAmount: 84159.14,
                ReceiveDate: null,
                InvDetailID: 6,
                DedAmount: 0,
                Note: null,
                PartyName: 'TICC',
                FeeAmount: 84159.14,
                ToCBAmount: null,
                SupplierName: 'NEC',
                ReceivedAmount: 0,
                Status: 'INCOMPLETE',
                SubmarineCable: 'SJC2',
                OverAmount: 0,
                BillMasterID: 1,
                WorkTitle: 'Construction',
                ShortAmount: 0
            },
            {
                BillDetailID: 3,
                BillMilestone: 'BM12',
                ShortOverReason: null,
                WKMasterID: 2,
                FeeItem: 'BM12 Branching Units (100%)-Equipment',
                WriteOffDate: null,
                InvoiceNo: 'DT0170168-2',
                OrgFeeAmount: 116235.78,
                ReceiveDate: null,
                InvDetailID: 25,
                DedAmount: 10,
                Note: null,
                PartyName: 'TICC',
                FeeAmount: 116225.78,
                ToCBAmount: null,
                SupplierName: 'NEC',
                ReceivedAmount: 0,
                Status: 'INCOMPLETE',
                SubmarineCable: 'SJC2',
                OverAmount: 0,
                BillMasterID: 1,
                WorkTitle: 'Construction',
                ShortAmount: 0
            },
            {
                BillDetailID: 4,
                BillMilestone: 'BM12',
                ShortOverReason: null,
                WKMasterID: 2,
                FeeItem: 'BM12 Branching Units (100%)-Service',
                WriteOffDate: null,
                InvoiceNo: 'DT0170168-2',
                OrgFeeAmount: 106261.54,
                ReceiveDate: null,
                InvDetailID: 26,
                DedAmount: 10,
                Note: null,
                PartyName: 'TICC',
                FeeAmount: 106251.54,
                ToCBAmount: null,
                SupplierName: 'NEC',
                ReceivedAmount: 0,
                Status: 'INCOMPLETE',
                SubmarineCable: 'SJC2',
                OverAmount: 0,
                BillMasterID: 1,
                WorkTitle: 'Construction',
                ShortAmount: 0
            }
        ]
    }
];

const WriteOffInvoice = () => {
    const [value, setValue] = useState(0);

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState('');

    const [billMilestone, setBillMilestone] = useState(''); //記帳段號
    const [partyName, setPartyName] = useState([]); //會員名稱
    const [lBRatio, setLBRatio] = useState(''); //攤分比例
    const [editItem, setEditItem] = useState(NaN);
    const [modifyNote, setModifyNote] = useState('');

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
        setDialogAction('add');
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const itemDetailInitial = () => {
        setBillMilestone('');
        setPartyName([]);
        setLBRatio('');
        setModifyNote('');
    };

    //編輯
    const editlistInfoItem = () => {
        let tmpArray = listInfo[editItem];
        if (tmpArray) {
            setBillMilestone(tmpArray?.billMilestone);
            partyName.current = tmpArray?.partyName;
            setLBRatio(tmpArray?.lBRatio);
            setModifyNote(tmpArray?.modifyNote);
        }
    };

    useEffect(() => {
        itemDetailInitial();
        if (editItem >= 0) {
            editlistInfoItem();
            setIsDialogOpen(true);
        }
    }, [editItem]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <WriteOffQuery setListInfo={setListInfo} />
            </Grid>
            <Grid item xs={12}>
                {/* <MainCard title={`${value == 0 ? '待銷帳' : value == 1 ? '已銷帳' : '已作廢'}帳單資料列表`}> */}
                <MainCard title={`${value == 0 ? '待銷帳' : '已銷帳'}帳單資料列表`}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="待銷帳" {...a11yProps(0)} />
                            <Tab label="已銷帳" {...a11yProps(1)} />
                            {/* <Tab label="已作廢" {...a11yProps(2)} /> */}
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ToWriteOffDataList listInfo={listInfo} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <WriteOffedDataList />
                    </TabPanel>
                    {/* <TabPanel value={value} index={2}>
                        <InvalidatedDataList />
                    </TabPanel> */}
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default WriteOffInvoice;
