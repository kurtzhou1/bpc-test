import { useState, useRef } from 'react';
import { Grid, Box, Tabs, Tab } from '@mui/material';
// import { styled } from '@mui/material/styles';

// project import
import { TabPanel } from 'components/commonFunction';
import MainCard from 'components/MainCard';
import ToWriteOffDataList from './toWriteOffDataList';
import WriteOffedDataList from './writeOffedDataList';
import WriteOffQuery from './writeOffQuery';

const WriteOffInvoice = () => {
    const [value, setValue] = useState(0);
    const queryApi = useRef('/Status=TO_WRITEOFF');
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
    const writeOffQuery = () => {
        fetch(queryApi.current, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setListInfo(data);
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <WriteOffQuery setListInfo={setListInfo} queryApi={queryApi} value={value} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title={`${value === 0 ? '待銷帳' : '已銷帳'}帳單資料列表`}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="待銷帳" {...a11yProps(0)} />
                            <Tab label="已銷帳" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        {/* <ToWriteOffDataList listInfo={listInfo} writeOffQuery={writeOffQuery} /> */}
                        <ToWriteOffDataList listInfo={listInfo} writeOffQuery={writeOffQuery} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <WriteOffedDataList listInfo={listInfo} />
                        {/* <WriteOffedDataList listInfo={fakeData} /> */}
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default WriteOffInvoice;
