import { useEffect, useState, useRef } from 'react';
import { Grid, Button, FormControl, InputLabel, Select, MenuItem, Box, TextField, Checkbox, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import JournalQuery from './journalQuery';
import ToBillDataList from './toBillDataList';
import { TabPanel } from 'components/commonFunction';

// dialog
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

//icon
import Autocomplete from '@mui/material/Autocomplete';

// api
import { queryInvoice } from 'components/apis.jsx';

const CreateJournal = () => {
    const [listInfo, setListInfo] = useState([]);
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(0); //分頁Page
    const queryApi = useRef('');
    const apiQuery = () => {
        let tmpQuery = '/';
        tmpQuery = tmpQuery + 'Status=BILLED&Status=PAYING&Status=COMPLETE';
        tmpQuery = queryInvoice + tmpQuery;
        queryApi.current = tmpQuery;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('查詢成功=>>', data);
                setListInfo(data);
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        apiQuery();
    }, [value]);

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                            <Tab label="尚未立帳" {...a11yProps(0)} />
                        </Tabs>
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
