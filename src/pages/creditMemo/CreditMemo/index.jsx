import { useEffect, useState } from 'react';
import { Grid, Button, IconButton, Box, Tabs, Tab } from '@mui/material';
// import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import CreditBalanceToCN from './creditBalanceToCN';
import CreditMemoDataList from './creditMemoDataList';
import { TabPanel } from 'components/commonFunction';
import CreditMemoQuery from './creditMemoQuery';
import { creditMemoView } from 'components/apis';

const CreditMemo = () => {
    // const [value, setValue] = useState(0);
    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    const [listInfo, setListInfo] = useState([]);

    const initQuery = () => {
        fetch(creditMemoView, { method: 'POST', body: JSON.stringify({}) })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setListInfo(data);
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        initQuery();
    }, []);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <CreditMemoQuery
                    // value={value}
                    setListInfo={setListInfo}
                    // queryApi={queryApi}
                />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="Credit Memo資料列表">
                    {/* <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="CB轉CN" {...a11yProps(0)} />
              <Tab label="CN列表" {...a11yProps(1)} />
            </Tabs>
          </Box> */}
                    {/* <TabPanel value={value} index={0}>
            <CreditBalanceToCN
              listInfo={listInfo}
              setDialogAction={setDialogAction}
              setIsDialogOpen={setIsDialogOpen}
              setEditItem={setEditItem}
              deletelistInfoItem={deletelistInfoItem}
            />
          </TabPanel> */}
                    {/* <TabPanel value={value} index={1}> */}
                    <CreditMemoDataList listInfo={listInfo} />
                    {/* </TabPanel> */}
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default CreditMemo;
