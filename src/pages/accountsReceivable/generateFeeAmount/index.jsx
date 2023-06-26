import { useEffect, useState, useRef } from 'react';
import { Grid, Button, IconButton, Box, Tabs, Tab, Typography, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import { TabPanel } from 'components/commonFunction';
import ToCombineDataList from './toCombineDataList';
import ToDeductDataList from './toDeductDataList';
import DeductedDataList from './deductedDataList';
import SignedDataList from './signedDataList';
import InvalidatedDataList from './invalidatedDataList';
import DraftDataList from './draftDataList';

import ReceivableQuery from './receivableQuery';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const GenerateFeeAmount = () => {
    const [value, setValue] = useState(0);
    const [listInfo, setListInfo] = useState([]);
    // const [dataList, setDataList] = useState([]);
    const dispatch = useDispatch();
    const queryApi = useRef('/Status=TO_MERGE');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [cbToCn, setCbToCn] = useState({}); //勾選合併狀態
    // const totalCombineAmount = useRef(0); //勾選合併帳單總金額
    const handleChange = (event, newValue) => {
        setListInfo([]);
        // setDataList([]);
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };
    const handleDialogOpen = () => {
        if (Object.values(cbToCn).indexOf(true) > -1) {
            setIsDialogOpen(true); //打開的時候才會觸發合併API
        } else {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請至少勾選一筆發票項目' } }));
        }
    };

    const initList = () => {
        setCbToCn({});
    };

    //初始化查詢
    const receivableQuery = () => {
        let tmpQuery = queryApi.current;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setListInfo(data);
                }
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    };

    useEffect(() => {
        if (value != 0) {
            initList();
        }
    }, [value]);

    console.log('cbToCn=>>', cbToCn);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <ReceivableQuery value={value} setListInfo={setListInfo} queryApi={queryApi} />
            </Grid>
            <Grid item xs={12}>
                <MainCard
                    title={`${
                        value == 0 ? '待合併' : value == 1 ? '待抵扣' : value == 2 ? '已抵扣' : value == 3 ? '已簽核' : '已作廢'
                    }帳單資料列表`}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="待合併" {...a11yProps(0)} />
                            <Tab label="待抵扣" {...a11yProps(1)} />
                            <Tab label="已抵扣" {...a11yProps(2)} />
                            <Tab label="已簽核" {...a11yProps(3)} />
                            <Tab label="已作廢" {...a11yProps(4)} />
                        </Tabs>
                        {value == 0 ? (
                            <>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        right: 80,
                                        top: 4
                                    }}
                                    onClick={() => {
                                        handleDialogOpen();
                                    }}
                                >
                                    + 合併帳單
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 4
                                    }}
                                    onClick={initList}
                                >
                                    Reset
                                </Button>
                            </>
                        ) : (
                            ''
                        )}
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ToCombineDataList
                            handleDialogClose={handleDialogClose}
                            isDialogOpen={isDialogOpen}
                            dataList={listInfo}
                            // totalCombineAmount={totalCombineAmount}
                            cbToCn={cbToCn}
                            setCbToCn={setCbToCn}
                            receivableQuery={receivableQuery}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ToDeductDataList dataList={listInfo} receivableQuery={receivableQuery} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <DeductedDataList dataList={listInfo} receivableQuery={receivableQuery} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <SignedDataList dataList={listInfo} receivableQuery={receivableQuery} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <InvalidatedDataList dataList={listInfo} />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default GenerateFeeAmount;
