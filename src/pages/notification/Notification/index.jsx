import { useEffect, useState } from 'react';
import { Grid, Button, Box, Tabs, Tab } from '@mui/material';
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
    submarineCableLiabilityList,
    partiesLiabilityList,
    getSysInvNotifyRule,
} from 'components/apis.jsx';

const Information = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [listInfo, setListInfo] = useState([]);
    const [partiesList, setPartiesList] = useState([]); //會員名稱下拉選單
    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
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
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    const handleChange = (event, newValue) => {
        setListInfo([]);
        setValue(newValue);
    };

    const initQuery = () => {
        let tmpArray = {};
        if (value === 1 || value === '1') {
            fetch(getSysInvNotifyRule, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
                },
                body: JSON.stringify(tmpArray),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('initQuery=>>', data);
                    setListInfo(data);
                })
                .catch((e) => console.log('e1=>', e));
        }
    };

    useEffect(() => {
        fetch(submarineCableLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setSubmarineCableList(data);
            })
            .catch((e) => console.log('e1=>', e));
        fetch(partiesLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setPartiesList(data);
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
                    action={'Add'}
                    initQuery={initQuery}
                />
            </Grid>
            <Grid item xs={12}>
                <NotificationQuery
                    setListInfo={setListInfo}
                    partiesList={partiesList}
                    submarineCableList={submarineCableList}
                    value={value}
                />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="通知列表">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="會員帳單" {...a11yProps(0)} />
                            <Tab label="發票內部通知" {...a11yProps(1)} />
                            <Tab label="帳單內部通知" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <MemberBillDataList listInfo={listInfo} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <InvoiceNotificationDataList
                            listInfo={listInfo}
                            partiesList={partiesList}
                            submarineCableList={submarineCableList}
                            initQuery={initQuery}
                        />
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
