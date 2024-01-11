import { useState, useRef } from 'react';
import { Grid } from '@mui/material';
// project import
import MainCard from 'components/MainCard';
import IsSendDataList from './isSendDataList';
import ReceivableQuery from './receivableQuery';

const GenerateFeeAmount = () => {
  const [listInfo, setListInfo] = useState([]);
  const queryApi = useRef('/Status=TO_MERGE');

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

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <ReceivableQuery setListInfo={setListInfo} queryApi={queryApi} />
      </Grid>
      <Grid item xs={12}>
        <MainCard title="帳單資料列表">
          <IsSendDataList dataList={listInfo} receivableQuery={receivableQuery} />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default GenerateFeeAmount;
