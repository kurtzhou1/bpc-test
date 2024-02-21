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
                    <CreditMemoDataList listInfo={listInfo} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default CreditMemo;
