import { useState, useRef, useEffect } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
import { queryCB, sendDuctInfo } from 'components/apis';
import MainCard from 'components/MainCard';
// material-ui
import {
  Typography,
  Button,
  Table,
  Dialog,
  DialogContent,
  Grid,
  DialogActions,
  TextField,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.gary,
    color: theme.palette.common.black,
    paddingTop: '0.2rem',
    paddingBottom: '0.2rem',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingTop: '0.2rem',
    paddingBottom: '0.2rem',
  },
  [`&.${tableCellClasses.body}.totalAmount`]: {
    fontSize: 14,
    paddingTop: '0.2rem',
    paddingBottom: '0.2rem',
    backgroundColor: '#CFD8DC',
  },
}));

const ToDeductWork = ({
  isDeductOpen,
  handleDeductClose,
  cbData,
  writeOffInfo,
  toWriteOffDetailInfo,
  setToWriteOffDetailInfo,
  setCBWriteOff,
}) => {
  const dispatch = useDispatch();
  const [isDeductWorkOpen, setIsDeductWorkOpen] = useState(false);
  const [cbDataList, setCbDataList] = useState([]); //可折抵的Data List
  const [tmpCBArray, setTmpCBArray] = useState([]); //折抵資料(畫面中顯示的)
  const tmpDeductArray = useRef([]);
  // let dedAmount = useRef(0); //總折抵資料加總(上)
  const editItem = useRef(''); //當前編輯明細項目

  const resetData = () => {
    let tmpWriteOffDetailInfo = [...toWriteOffDetailInfo];
    let tmpTempDeductArray = [...tmpDeductArray.current];
    tmpWriteOffDetailInfo.forEach((i) => {
      if (
        i.BillMasterID === cbData.current?.BillMasterID &&
        i.BillDetailID === cbData.current?.BillDetailID
      ) {
        i.CBWriteOffAmount = 0;
      }
    });
    tmpTempDeductArray.forEach((i, index) => {
      if (i.BillDetailID === cbData.current?.BillDetailID) {
        tmpTempDeductArray.splice(index, 1);
      }
    });
    tmpDeductArray.current = tmpTempDeductArray;
    setToWriteOffDetailInfo(tmpWriteOffDetailInfo);
  };

  const deductWork = (data) => {
    let tmpArrayFiliter = tmpDeductArray.current.filter(
      (i) => i.BillDetailID === data.BillDetailID,
    );
    if (tmpArrayFiliter.length === 0) {
      let tmpQuery =
        queryCB +
        '/SubmarineCable=' +
        writeOffInfo.SubmarineCable +
        '&WorkTitle=' +
        writeOffInfo.WorkTitle +
        '&PartyName=' +
        writeOffInfo.PartyName;
      console.log('tmpQuery=>>', tmpQuery);
      fetch(tmpQuery, { method: 'GET' })
        .then((res) => res.json())
        .then((response) => {
          if (Array.isArray(response) && response?.length > 0) {
            setCbDataList(response);
          } else {
            dispatch(
              setMessageStateOpen({
                messageStateOpen: { isOpen: true, severity: 'error', message: '無可折抵項目' },
              }),
            );
          }
        })
        .catch((e) => console.log('e1=>', e));
    } else {
      setTmpCBArray(tmpArrayFiliter[0].CB);
    }
    editItem.current = data.BillDetailID;
    setIsDeductWorkOpen(true);
  };

  const changeDiff = (currAmount, maxValue, value, cbid) => {
    //原始可折抵金額,可折抵金額,目前輸入值
    let resule = 0;
    let tmpArrayFiliter = tmpCBArray.filter((i) => i.CBID === cbid);
    let tmpArray = tmpCBArray.map((i) => i);
    if (tmpArrayFiliter.length > 0) {
      tmpArray.forEach((i) => {
        if (i.CBID === cbid) {
          if (Number(maxValue) === 0 || Number(value) <= 0) {
            //如果可折抵金額已經為0 或 輸入數字為負數，則回傳0
            resule = Number(currAmount);
            i.TransAmount = 0;
          } else if (Number(value) >= Number(maxValue)) {
            resule = Number(value) === Number(maxValue) ? Number(value) : Number(maxValue);
            i.TransAmount = Number(value) === Number(maxValue) ? Number(value) : Number(maxValue);
          } else if (Number(value) >= Number(currAmount)) {
            resule = Number(currAmount);
            i.TransAmount = Number(currAmount);
          } else {
            resule = Number(value);
            i.TransAmount = Number(value);
          }
        }
      });
    } else {
      tmpArray.push({
        CBID: cbid,
        TransAmount:
          Number(maxValue) === 0 || Number(value) < 0
            ? 0
            : Number(value) > Number(maxValue)
            ? Number(maxValue)
            : Number(value) > Number(currAmount)
            ? Number(currAmount)
            : Number(value),
      });
    }
    setTmpCBArray(tmpArray); //秀於畫面中抵扣
  };

  const saveDeduct = () => {
    let tmpWriteOffDetailInfo = [...toWriteOffDetailInfo];
    let deductAmount = 0;
    let tmpArrayFiliter = tmpDeductArray.current.filter((i) => i.BillDetailID === editItem.current);
    let tmpArray = tmpDeductArray.current.map((i) => i);
    if (tmpArrayFiliter.length > 0) {
      tmpArray.forEach((i) => {
        if (i.BillDetailID === editItem.current) {
          i.CB = tmpCBArray;
        }
      });
    } else {
      tmpArray.push({ BillDetailID: editItem.current, CB: tmpCBArray });
    }
    tmpArray.forEach((i1) => {
      // i1.CB.forEach((i2) => {
      //     console.log('i2=>>', i2);
      //     deductAmount = deductAmount + i2.TransAmount;
      // });
      if (i1.BillDetailID === cbData.current?.BillDetailID) {
        i1.CB.forEach((i2) => {
          // tmpDeductAmountForOneItem = tmpDeductAmountForOneItem + i3.TransAmount;
          deductAmount = deductAmount + i2.TransAmount;
        });
      }
    });
    tmpWriteOffDetailInfo.forEach((i) => {
      if (
        i.BillMasterID === cbData.current?.BillMasterID &&
        i.BillDetailID === cbData.current?.BillDetailID
      ) {
        i.CBWriteOffAmount = deductAmount;
      }
    });
    setToWriteOffDetailInfo(tmpWriteOffDetailInfo);
    setCBWriteOff(tmpArray);
    tmpDeductArray.current = tmpArray;
    setTmpCBArray([]);
    setIsDeductWorkOpen(false);
    editItem.current = '';
  };

  const handleReset = () => {
    handleDeductClose();
    resetData();
    setCBWriteOff(tmpDeductArray.current);
  };

  console.log('tmpCBArray=>>', tmpCBArray);

  return (
    <Dialog maxWidth="xxl" open={isDeductOpen}>
      <BootstrapDialogTitle>折抵作業</BootstrapDialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ fontSize: 10 }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <MainCard title="帳單明細列表">
              <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">計帳段號</StyledTableCell>
                      <StyledTableCell align="center">費用項目</StyledTableCell>
                      <StyledTableCell align="center">累計實收</StyledTableCell>
                      {/* <StyledTableCell align="center">費用金額</StyledTableCell> */}
                      <StyledTableCell align="center">折抵金額</StyledTableCell>
                      <StyledTableCell align="center">應收金額</StyledTableCell>
                      {/* <StyledTableCell align="center">總金額</StyledTableCell> */}
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center">{cbData.current?.BillMilestone}</TableCell>
                      <TableCell align="center">{cbData.current?.FeeItem}</TableCell>
                      <TableCell align="center">{`$${handleNumber(
                        cbData.current?.ReceivedAmount?.toFixed(2),
                      )}`}</TableCell>
                      {/* <TableCell align="center">{`$${handleNumber(cbData.current?.OrgFeeAmount?.toFixed(2))}`}</TableCell> */}
                      <TableCell align="center">{`$${handleNumber(
                        cbData.current?.CBWriteOffAmount?.toFixed(2),
                      )}`}</TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color:
                            cbData.current?.OrgFeeAmount - cbData.current?.CBWriteOffAmount >= 0
                              ? 'black'
                              : 'red',
                        }}
                      >{`$${handleNumber(
                        (cbData.current?.OrgFeeAmount - cbData.current?.CBWriteOffAmount)?.toFixed(
                          2,
                        ),
                      )}`}</TableCell>
                      {/* <TableCell align="center">{`$${handleNumber(
                        cbData.current?.FeeAmount?.toFixed(2),
                      )}`}</TableCell> */}
                      <TableCell align="center">
                        <Button
                          color="primary"
                          variant={
                            editItem.current === cbData.current?.BillDetailID
                              ? 'contained'
                              : 'outlined'
                          }
                          size="small"
                          onClick={() => {
                            deductWork(cbData.current);
                          }}
                        >
                          折抵
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
          </Grid>
          {isDeductWorkOpen ? (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <MainCard title={`可折抵CB`}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                      <Table sx={{ minWidth: 300 }} stickyHeader>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">CB種類</StyledTableCell>
                            <StyledTableCell align="center">可折抵金額</StyledTableCell>
                            <StyledTableCell align="center">摘要說明</StyledTableCell>
                            <StyledTableCell align="center">折抵金額</StyledTableCell>
                            <StyledTableCell align="center">剩餘可折抵金額</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cbDataList.map((row, id) => {
                            let tmpDeducted = 0; //已經於別的項目折抵的金額
                            let deductFee = 0; //可折抵金額
                            let afterDiff = 0; //剩餘可折抵金額
                            //其他項目目前折抵金額-開始
                            tmpDeductArray.current.forEach((i1) => {
                              if (i1.BillDetailID !== editItem.current) {
                                i1.CB.forEach((i2) => {
                                  if (i2.CBID === row.CBID) {
                                    tmpDeducted = tmpDeducted + i2.TransAmount;
                                  }
                                });
                              }
                            });
                            tmpDeducted = tmpDeducted.toFixed(2);
                            //其他項目目前折抵金額-結束
                            //當前項目目前折抵金額-開始
                            let tmpArray = tmpCBArray.filter((i) => i.CBID === row.CBID);
                            let deductNumber = tmpArray[0] ? tmpArray[0].TransAmount : 0;
                            deductFee = row.CurrAmount - tmpDeducted;
                            afterDiff =
                              row.CurrAmount - tmpDeducted > 0 ? row.CurrAmount - tmpDeducted : 0;
                            return (
                              <TableRow
                                key={row.CBID + row?.BLDetailID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell align="center">{id + 1}</TableCell>
                                <TableCell align="center">{row.CBType}</TableCell>
                                <TableCell align="center">
                                  {handleNumber(deductFee.toFixed(2))}
                                </TableCell>
                                <TableCell align="center">{row.Note}</TableCell>
                                <TableCell align="center">
                                  <TextField
                                    label="$"
                                    size="small"
                                    type="number"
                                    style={{ width: '50%' }}
                                    value={deductNumber}
                                    onChange={(e) => {
                                      changeDiff(
                                        row.CurrAmount,
                                        deductFee.toFixed(2),
                                        e.target.value,
                                        row.CBID,
                                      );
                                    }}
                                  />
                                </TableCell>
                                <TableCell align="center">{`$${handleNumber(
                                  afterDiff.toFixed(2),
                                )}`}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="end">
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      sx={{ ml: '0.5rem', mt: '0.5rem' }}
                      onClick={() => {
                        saveDeduct();
                      }}
                    >
                      儲存
                    </Button>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
        {/* <DialogContentText sx={{ fontSize: '20px', mt: '0.5rem' }}>總金額：${handleNumber(totalAmount)}</DialogContentText> */}
      </DialogContent>
      <DialogActions>
        <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleReset}>
          Reset
        </Button>
        <Button
          sx={{ mr: '0.05rem' }}
          variant="contained"
          onClick={() => {
            // initData();
            setIsDeductWorkOpen(false);
            handleDeductClose();
            editItem.current = '';
          }}
        >
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ToDeductWork;
