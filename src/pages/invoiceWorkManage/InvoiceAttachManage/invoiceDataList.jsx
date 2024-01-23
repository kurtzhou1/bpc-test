import { useState, useRef } from 'react';

// project import
import { handleNumber } from 'components/commonFunction';
import InvoiceUpload from './invoiceUpload';
import AttachmentUpload from './attachmentUpload';
import { downloadInvoiceWKMaster, downloadInvoiceWKMasterAttachment } from 'components/apis.jsx';

// material-ui
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  Button,
  Table,
  Box,
  TableContainer,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';
import dayjs from 'dayjs';

const InvoiceDataList = ({ listInfo, setModifyItem, setIsDetailOpen, page, setPage }) => {
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAttachUploadOpen, setIsAttachUploadOpen] = useState(false);
  const itemID = useRef(-1);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listInfo.length) : 0;
  let tmpBMArray = [];
  const dispatch = useDispatch();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUploadClose = () => {
    setIsUploadOpen(false);
  };

  const handleUploadOpen = (id) => {
    itemID.current = id;
    setIsUploadOpen(true);
  };

  const handleAttachUploadClose = () => {
    setIsAttachUploadOpen(false);
  };

  const handleAttachUploadOpen = (id) => {
    itemID.current = id;
    setIsAttachUploadOpen(true);
  };

  const handleDownload = (id, name) => {
    let tmpApi = downloadInvoiceWKMaster + '/' + id;
    console.log('tmpApi=>>', tmpApi);
    fetch(tmpApi, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        console.log('res=>>', res);
        // return res.blob();
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.blob();
      })
      .then((data) => {
        console.log('data=>>', data);
        if (data.size > 40) {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(data);
          link.download = `${name.split('/')[name.split('/').length - 1]}.pdf`;
          link.click();
        } else {
          dispatch(
            setMessageStateOpen({
              messageStateOpen: { isOpen: true, severity: 'error', message: '尚未上傳檔案' },
            }),
          );
        }
      })
      .catch((e) => console.log('e1=>', e));
  };

  const handleAttacDownload = (id, name) => {
    let tmpApi = downloadInvoiceWKMasterAttachment + '/' + id;
    console.log('tmpApi=>>', tmpApi);
    fetch(tmpApi, {
      method: 'POST',
    })
      .then((res) => {
        console.log('res=>>', res);
        return res.blob();
      })
      .then((blob) => {
        if (blob.size > 40) {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${name.split('/')[name.split('/').length - 1]}.pdf`;
          link.click();
        } else {
          dispatch(
            setMessageStateOpen({
              messageStateOpen: { isOpen: true, severity: 'error', message: '尚未上傳檔案' },
            }),
          );
        }
      })
      .catch((e) => console.log('e1=>', e));
  };

  return (
    <>
      <InvoiceUpload
        isUploadOpen={isUploadOpen}
        handleUploadClose={handleUploadClose}
        itemID={itemID.current}
      />
      <AttachmentUpload
        isAttachUploadOpen={isAttachUploadOpen}
        handleAttachUploadClose={handleAttachUploadClose}
        itemID={itemID.current}
      />
      <TableContainer component={Paper} sx={{ maxHeight: window.screen.height * 0.4 }}>
        <Table sx={{ minWidth: 300 }} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">NO</StyledTableCell>
              <StyledTableCell align="center">發票號碼</StyledTableCell>
              <StyledTableCell align="center">供應商</StyledTableCell>
              <StyledTableCell align="center">海纜名稱</StyledTableCell>
              <StyledTableCell align="center">海纜作業</StyledTableCell>
              <StyledTableCell align="center">計帳段號</StyledTableCell>
              <StyledTableCell align="center">發票到期日</StyledTableCell>
              <StyledTableCell align="center">明細數量</StyledTableCell>
              <StyledTableCell align="center">總金額</StyledTableCell>
              <StyledTableCell align="center">累計實付金額</StyledTableCell>
              <StyledTableCell align="center">累計減項金額</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? listInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : listInfo
            )?.map((row, itemID) => {
              tmpBMArray = [];
              row.InvoiceWKDetail.forEach((i) => {
                if (!tmpBMArray.includes(i.BillMilestone)) {
                  tmpBMArray.push(i.BillMilestone);
                }
              });
              return (
                <TableRow
                  key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo + itemID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell align="center">{itemID + 1}</StyledTableCell>
                  <StyledTableCell align="center">{row.InvoiceWKMaster?.InvoiceNo}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.InvoiceWKMaster?.SupplierName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.InvoiceWKMaster?.SubmarineCable}
                  </StyledTableCell>
                  <StyledTableCell align="center">{tmpBMArray.join(',')}</StyledTableCell>
                  <StyledTableCell align="center">{row.InvoiceWKMaster?.WorkTitle}</StyledTableCell>
                  <StyledTableCell align="center">
                    {dayjs(row.InvoiceWKMaster?.DueDate).format('YYYY/MM/DD')}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.InvoiceWKDetail.length}</StyledTableCell>
                  <StyledTableCell align="center">
                    {handleNumber(row.InvoiceWKMaster.TotalAmount)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {handleNumber(row.InvoiceWKMaster.TotalAmount)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {handleNumber(row.InvoiceWKMaster.TotalAmount)}
                  </StyledTableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        '& button': { mx: { md: 0.2, lg: 0.2, xl: 1 }, p: 0 },
                      }}
                    >
                      <Button
                        color="success"
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setModifyItem(row.InvoiceWKDetail);
                          setIsDetailOpen(true);
                        }}
                      >
                        檢視
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          handleUploadOpen(row.InvoiceWKMaster?.WKMasterID);
                        }}
                      >
                        上傳發票
                      </Button>
                      <Button
                        color="info"
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          handleAttachUploadOpen(row.InvoiceWKMaster?.WKMasterID);
                        }}
                      >
                        上傳附件
                      </Button>
                      <Button
                        color="warning"
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          handleDownload(row.InvoiceWKMaster?.WKMasterID, row.InvoiceWKMaster?.URI);
                        }}
                      >
                        下載發票
                      </Button>
                      <Button
                        color="error"
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          handleAttacDownload(
                            row.InvoiceWKMaster?.WKMasterID,
                            row.InvoiceWKMaster?.AttachedURI,
                          );
                        }}
                      >
                        下載附件
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <StyledTableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 15, 20, 25, { label: 'All', value: -1 }]}
                colSpan={12}
                count={listInfo.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default InvoiceDataList;
