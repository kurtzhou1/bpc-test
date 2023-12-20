import { useState, useRef, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
// import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import CreditBalanceQuery from './creditBalanceQuery';
import CreditBalanceDataList from './creditBalanceDataList';

// api
import { getPartiesInfoList, submarineCableInfoList } from 'components/apis';

const CreditBalance = () => {
    const queryApi = useRef('/all');
    const [listInfo, setListInfo] = useState([]);
    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
    const [partiesList, setPartiesList] = useState([]); //會員下拉選單
    const [cbToCn, setCbToCn] = useState({}); //勾選合併狀態

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
        <Grid container spacing={1}>
            <Grid item xs={12} display="flex" justifyContent="right">
            </Grid>
            <Grid item xs={12}>
                <CreditBalanceQuery setListInfo={setListInfo} partiesList={partiesList} submarineCableList={submarineCableList} queryApi={queryApi} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="Credit Balance資料列表">
                    <CreditBalanceDataList listInfo={listInfo} cbToCn={cbToCn} setCbToCn={setCbToCn} />
                </MainCard>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" sx={{ mx: 1 }}>
                    送出退費
                </Button>
            </Grid>
        </Grid>
    );
};

export default CreditBalance;
