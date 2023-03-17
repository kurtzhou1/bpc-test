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

const GenerateFeeAmount = () => {
    const [value, setValue] = useState(1);
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

    // 以下都無用的
    const fakeData = [
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
                    BillDetailID: 1,
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
                    BillDetailID: 1,
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
                    BillDetailID: 1,
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
                    BillDetailID: 1,
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

    const [listInfo, setListInfo] = useState(fakeData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [billMilestone, setBillMilestone] = useState(''); //記帳段號
    const [partyName, setPartyName] = useState([]); //會員名稱
    const [lBRatio, setLBRatio] = useState(''); //攤分比例
    const [editItem, setEditItem] = useState(NaN);
    const [modifyNote, setModifyNote] = useState('');
    const totalCombineAmount = useRef(0); //勾選合併帳單總金額

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const itemDetailInitial = () => {
        setBillMilestone('');
        setPartyName([]);
        setLBRatio('');
        setModifyNote('');
    };

    //新增
    const addLiability = (list) => {
        if (list.length > 0) {
            let tmpArray = listInfo.map((i) => i);
            list.forEach((i) => {
                tmpArray.push({
                    BillMilestone: i.BillMilestone,
                    PartyName: i.PartyName,
                    LBRatio: i.LbRatio,
                    createTime: new Date(),
                    modifyNote: modifyNote.trim() === '' ? '' : modifyNote
                });
            });

            setListInfo([...tmpArray]);
            handleDialogClose();
            itemDetailInitial();
        }
    };

    //刪除
    const deletelistInfoItem = (deleteItem) => {
        let tmpArray = listInfo.map((i) => i);
        tmpArray.splice(deleteItem, 1);
        setListInfo([...tmpArray]);
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

    const handleDialogOpen = () => {
        if (totalCombineAmount.current > 0) {
            setIsDialogOpen(true);
        } else {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請至少勾選一筆發票項目' } }));
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
                <ReceivableQuery value={value} setListInfo={setListInfo} />
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
                            <Tab label="draft初稿" {...a11yProps(3)} />
                            <Tab label="已簽核" {...a11yProps(4)} />
                            <Tab label="已作廢" {...a11yProps(5)} />
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
                            listInfo={listInfo}
                            totalCombineAmount={totalCombineAmount}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ToDeductDataList listInfo={listInfo} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <DeductedDataList />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <DraftDataList />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <SignedDataList />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <InvalidatedDataList />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default GenerateFeeAmount;
