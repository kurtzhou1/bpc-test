import { useState, useRef } from 'react';
import { Grid, Button } from '@mui/material';
// import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import ResearchBillQuery from './researchBillQuery';
import ResearchBillDataList from './researchBillDataList';
import ResearchBillDetail from './researchBillDetail';

// redux
import { useSelector } from 'react-redux';

const ResearchBill = () => {
    const { partiesList, subCableList } = useSelector((state) => state.dropdown); //供應商下拉選單 + 海纜名稱下拉選單
    const queryApi = useRef('/all');
    const [listInfo, setListInfo] = useState([]);
    const [datailInfo, setDetailInfo] = useState([]);
    const [isDetailShow, setIsDetailShow] = useState(false);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <ResearchBillQuery setListInfo={setListInfo} partiesList={partiesList} subCableList={subCableList} queryApi={queryApi} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="發票資料列表">
                    <ResearchBillDataList listInfo={listInfo} setIsDetailShow={setIsDetailShow} />
                </MainCard>
            </Grid>
            <Grid item xs={12}>
                <MainCard title="帳單明細列表">
                    <ResearchBillDetail datailInfo={datailInfo} isDetailShow={isDetailShow} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ResearchBill;
