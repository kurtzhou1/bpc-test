import { useRef, useState } from 'react';

// project import
import { handleNumber } from 'components/commonFunction';
// material-ui
import { Typography, Button, Table, Box, Checkbox } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
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

const CreditBalanceDataList = ({ listInfo, cbToCn, setCbToCn }) => {
  const handleChange = (event) => {
    setCbToCn({ ...cbToCn, [event.target.value]: event.target.checked });
  };

  console.log();

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
        <Table sx={{ minWidth: 300 }} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">NO</StyledTableCell>
              <StyledTableCell align="center">CB種類</StyledTableCell>
              <StyledTableCell align="center">會員</StyledTableCell>
              <StyledTableCell align="center">發票號碼</StyledTableCell>
              <StyledTableCell align="center">帳單號碼</StyledTableCell>
              <StyledTableCell align="center">計帳段號</StyledTableCell>
              <StyledTableCell align="center">海纜名稱</StyledTableCell>
              <StyledTableCell align="center">海纜作業</StyledTableCell>
              <StyledTableCell align="center">剩餘金額</StyledTableCell>
              <StyledTableCell align="center">建立日期</StyledTableCell>
              <StyledTableCell align="center">摘要說明</StyledTableCell>
              <StyledTableCell align="center">退費金額</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listInfo?.map((row, id) => {
              return (
                <TableRow
                  key={row.CBType + row.BillingNo + row.InvoiceNo + id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell align="center">
                    <Checkbox
                      value={row?.InvDetailID}
                      onChange={handleChange}
                      checked={cbToCn[row?.InvDetailID] || false}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">{id + 1}</StyledTableCell>
                  <StyledTableCell align="center">{row.CBType}</StyledTableCell>
                  <StyledTableCell align="center">{row.PartyName}</StyledTableCell>
                  <StyledTableCell align="center">{row.InvoiceNo}</StyledTableCell>
                  <StyledTableCell align="center">{row.BillingNo}</StyledTableCell>
                  <StyledTableCell align="center">{row.BillMilestone}</StyledTableCell>
                  <StyledTableCell align="center">{row.SubmarineCable}</StyledTableCell>
                  <StyledTableCell align="center">{row.WorkTitle}</StyledTableCell>
                  <StyledTableCell align="center">{`$${handleNumber(
                    row.CurrAmount,
                  )}`}</StyledTableCell>
                  <StyledTableCell align="center">
                    {' '}
                    {dayjs(row.CreateDate).format('YYYY/MM/DD')}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.Note}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        '& button': { mx: { md: 0.3, lg: 0.7, xl: 1.5 }, p: 0 },
                      }}
                    >
                      退費金額
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

export default CreditBalanceDataList;
