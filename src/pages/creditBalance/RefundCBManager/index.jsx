import { useState, useRef, useEffect } from 'react';
import { Grid, Button, Box, Tabs, Tab } from '@mui/material';
// import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import CreditBalanceQuery from './refundCBManagerQuery';
import RefundCBManagerDataList from './refundCBManagerDataList';
import RefundDraftDataList from './refundDraftDataList';
import { TabPanel } from 'components/commonFunction';
import { BootstrapDialogTitle } from 'components/commonFunction';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// api
import {
    getPartiesInfoList,
    submarineCableInfoList,
    refundView,
    cBRefund,
    cBRefundView,
} from 'components/apis';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const CreditBalance = () => {
    const queryApi = useRef({});
    const [value, setValue] = useState(0);
    const [listInfo, setListInfo] = useState([]);
    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
    const [partiesList, setPartiesList] = useState([]); //會員下拉選單
    const [cbToCn, setCbToCn] = useState({}); //勾選合併狀態
    const dispatch = useDispatch();

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

    const creditBalanceQuery = () => {
        fetch(refundView, { method: 'POST', body: JSON.stringify(queryApi.current) })
            .then((res) => res.json())
            .then((data) => {
                console.log('查詢成功=>>', data);
                if (Array.isArray(data)) {
                    setListInfo(data);
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    const sendRefund = () => {
        let tmpArray = [];
        listInfo.forEach((i) => {
            if (cbToCn[i.CBID]) tmpArray.push({ CBStateID: i.CBID });
        });
        console.log('tmpArray=>>', tmpArray);
        if (tmpArray.length > 0) {
            fetch(cBRefund, {
                method: 'POST',
                body: JSON.stringify(tmpArray),
            })
                .then((res) => res.json())
                .then(() => {
                    dispatch(
                        setMessageStateOpen({
                            messageStateOpen: {
                                isOpen: true,
                                severity: 'success',
                                message: '送出成功',
                            },
                        }),
                    );
                    creditBalanceQuery();
                })
                .catch((e) => console.log('e1=>', e));
        } else {
            dispatch(
                setMessageStateOpen({
                    messageStateOpen: {
                        isOpen: true,
                        severity: 'error',
                        message: '請至少勾選一筆項目',
                    },
                }),
            );
        }
    };

    useEffect(() => {
        //海纜名稱
        fetch(submarineCableInfoList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setSubmarineCableList(data);
            })
            .catch((e) => console.log('e1=>', e));
        //會員名稱
        fetch(getPartiesInfoList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setPartiesList(data);
            })
            .catch((e) => console.log('e1=>', e));
    }, []);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} display="flex" justifyContent="right" />
                <Grid item xs={12}>
                    <CreditBalanceQuery
                        value={value}
                        setListInfo={setListInfo}
                        partiesList={partiesList}
                        submarineCableList={submarineCableList}
                        queryApi={queryApi}
                    />
                </Grid>
                <Grid item xs={12}>
                    <MainCard
                        title={`${
                            value === 0 ? '已退費CB' : value === 1 ? '退費函稿' : '已完成'
                        }資料列表`}
                    >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange}>
                                <Tab label="已退費CB" {...a11yProps(0)} />
                                <Tab label="退費函稿" {...a11yProps(1)} />
                                <Tab label="已完成" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <RefundCBManagerDataList
                                listInfo={listInfo}
                                cbToCn={cbToCn}
                                setCbToCn={setCbToCn}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <RefundDraftDataList listInfo={listInfo} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <RefundCBManagerDataList
                                listInfo={listInfo}
                                cbToCn={cbToCn}
                                setCbToCn={setCbToCn}
                            />
                        </TabPanel>
                    </MainCard>
                </Grid>
                {value === 0 ? (
                    <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                        <Button variant="contained" sx={{ mx: 1 }} onClick={sendRefund}>
                            產生退費函稿
                        </Button>
                    </Grid>
                ) : null}
            </Grid>
        </>
    );
};

export default CreditBalance;
