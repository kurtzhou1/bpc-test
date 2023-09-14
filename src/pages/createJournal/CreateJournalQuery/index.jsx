import { useEffect, useState, useRef } from 'react';
import { Grid } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import JournalQuery from './journalQuery';
import ToBillDataList from './toBillDataList';
import { TabPanel } from 'components/commonFunction';

// api
import { queryInvoice } from 'components/apis.jsx';

const CreateJournal = () => {
    const [listInfo, setListInfo] = useState([]);
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(0); //分頁Page
    const queryApi = useRef({});
    const apiQuery = () => {
        // let tmpQuery = '/';
        let tmpArray = {Status:['BILLED', 'PAYING', 'COMPLETE']};
        // tmpQuery = tmpQuery + 'Status=BILLED&Status=PAYING&Status=COMPLETE';
        // tmpQuery = queryInvoice + tmpQuery;
        queryApi.current = tmpArray;
        fetch(queryInvoice, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then((data) => {
                console.log('查詢成功=>>', data);
                setListInfo(data);
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        apiQuery();
    }, []);

    // const a11yProps = (index) => {
    //     return {
    //         id: `simple-tab-${index}`,
    //         'aria-controls': `simple-tabpanel-${index}`
    //     };
    // };

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <JournalQuery setListInfo={setListInfo} queryApi={queryApi} invoiceStatus={value} setPage={setPage} />
            </Grid>
            <Grid item xs={12}>
                {/* <MainCard title={`${value === 0 ? '尚未立帳' : value === 1 ? '已立帳' : '已作廢'}發票資料列表`}> */}
                <MainCard title="發票資料列表">    
                    {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                         label="尚未立帳" {...a11yProps(0)} />
                    </Box> */}
                    <TabPanel value={value} index={0}>
                        <ToBillDataList listInfo={listInfo} page={page} setPage={setPage} />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default CreateJournal;
