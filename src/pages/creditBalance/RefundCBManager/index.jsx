import { useState, useRef, useEffect } from 'react';
import { Grid, Button, Typography, TextField } from '@mui/material';
// import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import CreditBalanceQuery from './refundCBManagerQuery';
import CreditBalanceDataList from './refundCBManagerDataList';

import { BootstrapDialogTitle } from 'components/commonFunction';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// api
import { getPartiesInfoList, submarineCableInfoList, refundView, cBRefund } from 'components/apis';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const CreditBalance = () => {
  const queryApi = useRef('/all');
  const [listInfo, setListInfo] = useState([]);
  const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
  const [partiesList, setPartiesList] = useState([]); //會員下拉選單
  const [cbToCn, setCbToCn] = useState({}); //勾選合併狀態
  const [cbRefundData, setCbRefundData] = useState([]);
  const [infoTerminal, setInfoTerminal] = useState(false); //作廢
  const [note, setNote] = useState('');
  const dispatch = useDispatch();

  const creditBalanceQuery = () => {
    let tmpQuery = '/all';
    tmpQuery = refundView + tmpQuery;
    queryApi.current = tmpQuery;
    fetch(tmpQuery, { method: 'GET' })
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
    console.log('cbToCn=>>', cbToCn);
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
              messageStateOpen: { isOpen: true, severity: 'success', message: '送出成功' },
            }),
          );
          creditBalanceQuery();
        })
        .catch((e) => console.log('e1=>', e));
    } else {
      dispatch(
        setMessageStateOpen({
          messageStateOpen: { isOpen: true, severity: 'error', message: '請至少勾選一筆項目' },
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
    creditBalanceQuery();
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} display="flex" justifyContent="right"></Grid>
        <Grid item xs={12}>
          <CreditBalanceQuery
            setListInfo={setListInfo}
            partiesList={partiesList}
            submarineCableList={submarineCableList}
            queryApi={queryApi}
          />
        </Grid>
        <Grid item xs={12}>
          <MainCard title="Credit Balance資料列表">
            <CreditBalanceDataList listInfo={listInfo} cbToCn={cbToCn} setCbToCn={setCbToCn} />
          </MainCard>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" sx={{ mx: 1 }} onClick={() => sendRefund()}>
            產生退費函稿
          </Button>
        </Grid>
      </Grid>
      {/* <Dialog maxWidth="xs" fullWidth open={infoTerminal}>
        <BootstrapDialogTitle>確認終止訊息</BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
              <Typography
                variant="h5"
                sx={{
                  fontSize: { lg: '0.7rem', xl: '0.88rem' },
                  ml: { lg: '0.5rem', xl: '1.5rem' },
                }}
              >
                是否確定終止此Credit Balance資料
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
              <TextField
                fullWidth
                variant="outlined"
                value={note}
                size="small"
                label="填寫終止原因"
                onChange={(e) => setNote(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={() => sendRefund()}>
            確定
          </Button>
          <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={() => setInfoTerminal(false)}>
            關閉
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default CreditBalance;
