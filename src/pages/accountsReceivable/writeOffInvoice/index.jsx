import { useState, useEffect } from 'react';
import { Grid, Box, Tabs, Tab } from '@mui/material';
// import { styled } from '@mui/material/styles';

// project import
import { TabPanel } from 'components/commonFunction';
import MainCard from 'components/MainCard';
import ToWriteOffDataList from './toWriteOffDataList';
import WriteOffedDataList from './writeOffedDataList';
import WriteOffQuery from './writeOffQuery';
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

// api
import { queryToDecutBill } from 'components/apis';

const WriteOffInvoice = () => {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();
    const handleChange = (event, newValue) => {
        setListInfo([]);
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    const [listInfo, setListInfo] = useState([]);
    const writeOffInitQuery = () => {
        let tmpQuery =
            queryToDecutBill + (value === 0 ? '/Status=TO_WRITEOFF' : '/Status=COMPLETE');
        fetch(tmpQuery, {
            method: 'GET',
            Authorization: 'Bearer' + localStorage.getItem('accessToken') ?? '',
        })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setListInfo(data);
                } else {
                    setListInfo([]);
                    dispatch(
                        setMessageStateOpen({
                            messageStateOpen: {
                                isOpen: true,
                                severity: 'info',
                                message: '查無資料',
                            },
                        }),
                    );
                }
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <WriteOffQuery setListInfo={setListInfo} value={value} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title={`${value === 0 ? '待銷帳' : '已銷帳'}帳單資料列表`}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="待銷帳" {...a11yProps(0)} />
                            <Tab label="已銷帳" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ToWriteOffDataList
                            listInfo={listInfo}
                            writeOffInitQuery={writeOffInitQuery}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <WriteOffedDataList listInfo={listInfo} />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default WriteOffInvoice;
