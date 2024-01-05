import { useState, useRef } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
import CorrespondenceQuery from './correspondenceQuery';
import MainCard from 'components/MainCard';
import CorrespondenceMake from './correspondenceMake';
// material-ui
import {
  Typography,
  Button,
  Table,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  FormControl,
  InputLabel,
  Select,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';

import dayjs from 'dayjs';

import { getPayDraftStream } from 'components/apis.jsx';

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
}));

const ToEditDataList = ({ listInfo, initQuery }) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const payDraftID = useRef(-1);
  const handleDialogOpen = (id) => {
    payDraftID.current = id;
    setIsDialogOpen(true);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    payDraftID.current = -1;
  };
  const handleDownload = (id) => {
    let tmpArray = {
      PayDraftID: id,
      DownloadTemplate: true,
    };
    fetch(getPayDraftStream, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify(tmpArray),
    })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `付款函稿.docx`;
        link.click();
      })
      .catch((e) => console.log('e=>', e));
  };

  const handleComplete = (id) => {
    let tmpArray = {
      PayDraftID: id,
      Status: 'COMPLETE',
    };
    fetch(getPayDraftStream, { method: 'POST', body: JSON.stringify(tmpArray) })
      .then((res) => res.json())
      .then(() => {
        dispatch(
          setMessageStateOpen({
            messageStateOpen: { isOpen: true, severity: 'success', message: '確認完成函稿成功' },
          }),
        );
      })
      .catch(() =>
        dispatch(
          setMessageStateOpen({
            messageStateOpen: { isOpen: true, severity: 'error', message: '確認完成函稿不成功' },
          }),
        ),
      );
    initQuery();
  };
  return (
    <>
      <CorrespondenceMake
        isDialogOpen={isDialogOpen}
        payDraftID={payDraftID.current}
        handleDialogClose={handleDialogClose}
      />
      <TableContainer component={Paper} sx={{ maxHeight: window.screen.height * 0.45 }}>
        <Table sx={{ minWidth: 300 }} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">供應商</StyledTableCell>
              <StyledTableCell align="center">發票號碼</StyledTableCell>
              <StyledTableCell align="center">海纜名稱</StyledTableCell>
              <StyledTableCell align="center">海纜作業</StyledTableCell>
              <StyledTableCell align="center">匯款總金額</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listInfo.map((row) => {
              return (
                <TableRow
                  key={row?.PayDraftID + row?.PayMID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell align="center">{row?.Payee}</StyledTableCell>
                  <StyledTableCell align="center">{row?.InvoiceNo}</StyledTableCell>
                  <StyledTableCell align="center">{row?.SubmarineCable}</StyledTableCell>
                  <StyledTableCell align="center">{row?.WorkTitle}</StyledTableCell>
                  <StyledTableCell align="center">{row?.TotalFeeAmount}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        '& button': { mx: { sm: 0.3, md: 0.3, lg: 0.6, xl: 1.5 }, p: 0 },
                      }}
                    >
                      <Button
                        color="primary"
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          handleDialogOpen(row?.PayDraftID);
                        }}
                      >
                        製作函稿
                      </Button>
                      <Button
                        color="success"
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          handleDownload(row?.PayDraftID);
                        }}
                      >
                        下載
                      </Button>
                      <Button
                        color="warning"
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          handleComplete(row?.PayDraftID);
                        }}
                      >
                        確認完成函稿
                      </Button>
                    </Box>
                  </StyledTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ToEditDataList;
