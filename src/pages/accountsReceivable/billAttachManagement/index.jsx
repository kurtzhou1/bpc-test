import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
// project import
import MainCard from 'components/MainCard';
import IsSendDataList from './isSendDataList';
import ReceivableQuery from './receivableQuery';
import { queryToDecutBill } from 'components/apis';

const GenerateFeeAmount = () => {
    const [listInfo, setListInfo] = useState([]);

    //初始化查詢
    const initialQuery = () => {
        fetch(queryToDecutBill, { method: 'POST', body: JSON.stringify({}) })
            .then((res) => res.json())
            .then((data) => {
                // console.log('data=>>', data);
                if (Array.isArray(data)) {
                    setListInfo(data);
                }
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    };

    useEffect(() => {
        if (listInfo.length === 0) {
            initialQuery();
        }
    }, [listInfo]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <ReceivableQuery setListInfo={setListInfo} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="帳單資料列表">
                    <IsSendDataList listInfo={listInfo} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default GenerateFeeAmount;
