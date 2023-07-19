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
import dayjs from 'dayjs';

const CreateJournal = () => {
    const [listInfo, setListInfo] = useState([]);
    const [value, setValue] = useState(0);
    const isFirst = useRef(true);
    const queryApi = useRef(queryInvoice + '/all');
    const apiQuery = () => {
        let tmpQuery = '/';

        if (value === '0' || value === 0) {
            tmpQuery = tmpQuery + 'Status=' + 'VALIDATED' + '&';
        } else if (value === '1' || value === 1) {
            tmpQuery = tmpQuery + 'Status=' + 'BILLED' + '&';
        } else {
            tmpQuery = tmpQuery + 'Status=' + 'INVALID' + '&';
        }

        if (tmpQuery.includes('&')) {
            tmpQuery = tmpQuery.slice(0, -1);
        }

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

    const orderDate = (data) => {
        data.sort((a, b) => {
            return dayjs(b.InvoiceWKMaster.CreateDate).diff(dayjs(a.InvoiceWKMaster.CreateDate));
        });
    };

    const firstApiQuery = () => {
        let tmpQuery = '/';
        tmpQuery = tmpQuery + 'Status=' + 'all' + '&';
        if (tmpQuery.includes('&')) {
            tmpQuery = tmpQuery.slice(0, -1);
        }

        tmpQuery = queryInvoice + tmpQuery;
        queryApi.current = tmpQuery;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                orderDate(data);
                data = data.slice(0, 5);
                setListInfo(data);
                isFirst.current = false;
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        if (isFirst.current) {
            firstApiQuery();
        } else {
            apiQuery();
        }
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
                <JournalQuery setListInfo={setListInfo} queryApi={queryApi} invoiceStatus={value} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title={`${value === 0 ? '尚未立帳' : value === 1 ? '已立帳' : '已作廢'}發票資料列表`}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="尚未立帳" {...a11yProps(0)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ToBillDataList listInfo={listInfo} apiQuery={apiQuery} />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default CreateJournal;
