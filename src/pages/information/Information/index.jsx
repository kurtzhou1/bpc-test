import { useEffect, useState } from 'react';
import { Grid, Button, IconButton, Box, Tabs, Tab, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';

// project import
import { TabPanel } from 'components/commonFunction';
import MainCard from 'components/MainCard';
import SupplierDataList from './supplierDataList';
import PartyDataList from './partyDataList';
import CorporatesDataList from './corporatesDataList';
import ContractDataList from './contractDataList';
import SubmarineCableDataList from './submarineCableDataList';

import CableWorkDataList from './cableWorkDataList';
import ContractTypeDataList from './contractTypeDataList';
import PartiesByContractDataList from './partiesByContractDataList';
import SuppliersByContractDataList from './SuppliersByContractDataList';
import CBPBankAccount from './cBPBankAccount';

const Information = () => {
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

    // 以下都無用的
    const fakeData = [
        {
            CBType: 'MWG',
            PartyName: 'CHT',
            InvoiceNo: '234567',
            BillingNo: '12345',
            SubmarineCable: 'SJC',
            WorkTitle: 'Upgrade',
            CurrAmount: 1234,
            CreateDate: '2023-01-01 12:12:!2',
            Note: '測試'
        }
    ];

    const [listInfo, setListInfo] = useState(fakeData);
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

    //新增
    const addLiability = (list) => {
        console.log('list=>>', list);
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

    //儲存編輯
    const saveEdit = () => {
        setEditItem(NaN);
        deletelistInfoItem(editItem);
        addLiability();
        setIsListEdit(false);
        itemDetailInitial();
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
            {/* <Grid item xs={12} display="flex" justifyContent="right">
                <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={handleDialogOpen}>
                    + 新增Credit Balance
                </Button>
                <CreditBalanceAdd
                    handleDialogClose={handleDialogClose}
                    addLiability={addLiability}
                    saveEdit={saveEdit}
                    partyName={partyName}
                    setPartyName={setPartyName}
                    isDialogOpen={isDialogOpen}
                    billMilestone={billMilestone}
                    setBillMilestone={setBillMilestone}
                    dialogAction={dialogAction}
                    lBRatio={lBRatio}
                    setLBRatio={setLBRatio}
                />
            </Grid> */}
            <h2>基本資料管理</h2>
            <Grid item xs={12}>
                <MainCard
                    title={`${
                        value == 0
                            ? '供應商'
                            : value == 1
                            ? '會員'
                            : value == 2
                            ? '聯盟'
                            : value == 3
                            ? '合約'
                            : value == 4
                            ? '海纜代號'
                            : value == 5
                            ? '海纜作業'
                            : value == 6
                            ? '合約種類'
                            : value == 7
                            ? '合約會員'
                            : value == 8
                            ? '合約廠商'
                            : '聯盟金融帳戶'
                    }資料列表`}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="海纜代號" {...a11yProps(0)} />
                            <Tab label="供應商" {...a11yProps(1)} />
                            <Tab label="會員" {...a11yProps(2)} />
                            <Tab label="聯盟" {...a11yProps(3)} />
                            <Tab label="合約" {...a11yProps(4)} />
                            <Tab label="海纜作業" {...a11yProps(5)} />
                            <Tab label="合約種類" {...a11yProps(6)} />
                            <Tab label="合約會員" {...a11yProps(7)} />
                            <Tab label="合約廠商" {...a11yProps(8)} />
                            <Tab label="聯盟金融帳戶" {...a11yProps(9)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <SubmarineCableDataList />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SupplierDataList />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <PartyDataList />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <CorporatesDataList />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <ContractDataList />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <CableWorkDataList />
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        <ContractTypeDataList />
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                        <PartiesByContractDataList />
                    </TabPanel>
                    <TabPanel value={value} index={8}>
                        <SuppliersByContractDataList />
                    </TabPanel>
                    <TabPanel value={value} index={9}>
                        <CBPBankAccount />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Information;
