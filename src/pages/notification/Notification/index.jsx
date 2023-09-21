import { useEffect, useState } from 'react';
import { Grid, Button, IconButton, Box, Tabs, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';

// project import
import { TabPanel } from 'components/commonFunction';
import MainCard from 'components/MainCard';
import RuleAdd from './ruleAdd';
import MemberBillDataList from './memberBillDataList';
import InvoiceNotificationDataList from './invoiceNotificationDataList';
import BillNotificationDataList from './billNotificationDataList';
import NotificationQuery from './notificationQuery';

// api
import {
    billMilestoneLiabilityList,
    submarineCableLiabilityList,
    partiesLiabilityList,
    workTitleLiabilityList,
    queryLiability,
    compareLiability,
    updateLiability
} from 'components/apis.jsx';

const Information = () => {
    const tableH = document.getElementById('tableContainer')?.offsetTop;
    const [isDialogOpen, setIsDialogOpen] = useState(false); //簽核
    const maxHei = window.screen.height - tableH - 270;
    const [listInfo, setListInfo] = useState([]);
    const [partiesList, setPartiesList] = useState([]); //會員名稱下拉選單
    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
    const [workTitleList, setWorkTitleList] = useState([]); //海纜作業下拉選單
    const [bmStoneList, setBmStoneList] = useState([]); //計帳段號下拉選單(需要選擇海纜名稱或海纜作業才能出現)
    const [value, setValue] = useState(0);

    const handleAddRuleOpen = () => {
        setIsDialogOpen(true);
    };

    const handleAddRuleClose = () => {
        setIsDialogOpen(false);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        fetch(billMilestoneLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setBmStoneList(data);
            })
            .catch((e) => console.log('e1=>', e));
        fetch(submarineCableLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('????=>>', data)
                setSubmarineCableList(data);
            })
            .catch((e) => console.log('e1=>', e));
        fetch(partiesLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setPartiesList(data);
            })
            .catch((e) => console.log('e1=>', e));
        fetch(workTitleLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setWorkTitleList(data);
            })
            .catch((e) => console.log('e1=>', e));
    }, []);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} display="flex" justifyContent="right">
                <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={handleAddRuleOpen}>
                    + 新增提醒通知規則
                </Button>
                <RuleAdd
                    isDialogOpen={isDialogOpen}
                    handleAddRuleClose={handleAddRuleClose}
                    value={value}
                    partiesList={partiesList}
                    submarineCableList={submarineCableList}
                    workTitleList={workTitleList}
                />
            </Grid>
            <Grid item xs={12}>
                <NotificationQuery
                    setListInfo={setListInfo}
                    partiesList={partiesList}
                    submarineCableList={submarineCableList}
                    workTitleList={workTitleList}
                    value={value}
                    // queryApi={queryApi}
                />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="資料列表">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="會員帳單" {...a11yProps(0)} />
                            <Tab label="發票內部通知" {...a11yProps(1)} />
                            <Tab label="帳單內部通知" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <MemberBillDataList listInfo={listInfo}  />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <InvoiceNotificationDataList listInfo={listInfo} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <BillNotificationDataList listInfo={listInfo} />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Information;