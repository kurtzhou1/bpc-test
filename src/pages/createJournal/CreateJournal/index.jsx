import { useEffect, useState, useRef } from 'react';
import { Grid, Box, Tabs, Tab } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import JournalQuery from './journalQuery';
import ToBillDataList from './toBillDataList';
import BilledDataList from './billedDataList';
import InvalidateDataList from './invalidateDataList';
import { TabPanel } from 'components/commonFunction';

// api
import { queryInvoice } from 'components/apis.jsx';
// import dayjs from 'dayjs';

const CreateJournal = () => {
    const [listInfo, setListInfo] = useState([]);
    const [value, setValue] = useState(0);
    const [supplierName, setSupplierName] = useState('All'); //供應商
    const [submarineCable, setSubmarineCable] = useState('All'); //海纜名稱
    const [issueDate, setIssueDate] = useState([null, null]); //發票日期
    // const isFirst = useRef(true);
    const queryApi = useRef({});
    const initQuery = () => {
        setSupplierName('All');
        setSubmarineCable('All');
        setIssueDate([null, null]);
    };

    const apiQuery = () => {
        // let tmpQuery = '/';
        let tmpArray = {};
        if (value === '0' || value === 0) {
            // tmpQuery = tmpQuery + 'Status=' + 'VALIDATED' + '&';
            tmpArray.Status = 'VALIDATED';
        } else if (value === '1' || value === 1) {
            // tmpQuery = tmpQuery + 'Status=' + 'BILLED' + '&';
            tmpArray.Status = 'BILLED';
        } else {
            // tmpQuery = tmpQuery + 'Status=' + 'INVALID' + '&';
            tmpArray.Status = 'INVALID';
        }
        console.log('tmpArray=>>', tmpArray);
        fetch(queryInvoice, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then((data) => {
                console.log('查詢成功=>>', data);
                setListInfo(data);
            })
            .catch((e) => console.log('e1=>', e));
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    const handleChange = (event, newValue) => {
        initQuery();
        setListInfo([]);
        setValue(newValue);
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <JournalQuery
                    setListInfo={setListInfo}
                    queryApi={queryApi}
                    invoiceStatus={value}
                    supplierName={supplierName}
                    setSupplierName={setSupplierName}
                    submarineCable={submarineCable}
                    setSubmarineCable={setSubmarineCable}
                    issueDate={issueDate}
                    setIssueDate={setIssueDate}
                    initQuery={initQuery}
                />
            </Grid>
            <Grid item xs={12}>
                <MainCard
                    title={`${
                        value === 0 ? '尚未立帳' : value === 1 ? '已立帳' : '已作廢'
                    }發票資料列表`}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="尚未立帳" {...a11yProps(0)} />
                            <Tab label="已立帳" {...a11yProps(1)} />
                            <Tab label="已作廢" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ToBillDataList listInfo={listInfo} apiQuery={apiQuery} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <BilledDataList listInfo={listInfo} apiQuery={apiQuery} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <InvalidateDataList listInfo={listInfo} apiQuery={apiQuery} />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default CreateJournal;
