import { useState, useRef } from 'react';

// project import
import { handleNumber } from 'components/commonFunction';
import BillUpload from './billUpload';
import AttachmentUpload from './attachmentUpload';
import BillDetail from './billDetail';
// material-ui
import { Button, Table, Box } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';

import { useDispatch } from 'react-redux';
import { setMessageStateOpen, setIsLoading } from 'store/reducers/dropdown';

import { downloadBillMaster, downloadBillMasterAttachment } from 'components/apis.jsx';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.black,
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

const IsSendDataList = ({ listInfo }) => {
    const dispatch = useDispatch();
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isAttachUploadOpen, setIsAttachUploadOpen] = useState(false);
    const itemID = useRef(-1);
    const [modifyItem, setModifyItem] = useState([]);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const isDetailClose = () => {
        setIsDetailOpen(false);
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

    const handleDownload = (id) => {
        const tmpApi = `${downloadBillMaster}/${id}`;
        dispatch(setIsLoading({ isLoading: true }));
        console.log('tmpApi=>>', tmpApi);
        fetch(tmpApi, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                // 解析 content-disposition 来获取文件名
                const contentDisposition = res.headers.get('content-disposition');
                let filename = 'default.pdf'; // 默认文件名
                if (contentDisposition.includes("filename*=utf-8''")) {
                    const filenameEncoded = contentDisposition.split("filename*=utf-8''")[1];
                    filename = decodeURIComponent(filenameEncoded);
                } else {
                    const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                    if (filenameMatch && filenameMatch[1]) {
                        filename = filenameMatch[1];
                    }
                }

                return res.blob().then((blob) => ({ blob, filename }));
            })
            .then(({ blob, filename }) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                dispatch(setIsLoading({ isLoading: false }));
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('handleDownload error:', error);
                dispatch(setIsLoading({ isLoading: false }));
                dispatch(
                    setMessageStateOpen({
                        messageStateOpen: {
                            isOpen: true,
                            severity: 'error',
                            message: '尚未上傳檔案',
                        },
                    }),
                );
                // 处理错误
            });
    };

    const handleAttacDownload = (id) => {
        let tmpApi = `${downloadBillMasterAttachment}/${id}`;
        console.log('tmpApi=>>', tmpApi);
        dispatch(setIsLoading({ isLoading: true }));
        fetch(tmpApi, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => {
                // 解析 content-disposition 来获取文件名
                const contentDisposition = res.headers.get('content-disposition');
                let filename = 'default.pdf'; // 默认文件名
                if (contentDisposition.includes("filename*=utf-8''")) {
                    const filenameEncoded = contentDisposition.split("filename*=utf-8''")[1];
                    filename = decodeURIComponent(filenameEncoded);
                } else {
                    const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                    if (filenameMatch && filenameMatch[1]) {
                        filename = filenameMatch[1];
                    }
                }

                return res.blob().then((blob) => ({ blob, filename }));
            })
            .then(({ blob, filename }) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                dispatch(setIsLoading({ isLoading: false }));
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('handleAttacDownload error:', error);
                dispatch(setIsLoading({ isLoading: false }));
                dispatch(
                    setMessageStateOpen({
                        messageStateOpen: {
                            isOpen: true,
                            severity: 'error',
                            message: '尚未上傳檔案',
                        },
                    }),
                );
                // 处理错误
            });
    };

    return (
        <>
            <BillDetail
                modifyItem={modifyItem}
                isDetailOpen={isDetailOpen}
                isDetailClose={isDetailClose}
            />
            <BillUpload
                isUploadOpen={isUploadOpen}
                handleUploadClose={handleUploadClose}
                itemID={itemID.current}
            />
            <AttachmentUpload
                isAttachUploadOpen={isAttachUploadOpen}
                handleAttachUploadClose={handleAttachUploadClose}
                itemID={itemID.current}
            />
            <TableContainer component={Paper} sx={{ maxHeight: window.screen.height * 0.5 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">會員</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">帳單號碼</StyledTableCell>
                            <StyledTableCell align="center">帳單日期</StyledTableCell>
                            <StyledTableCell align="center">截止日</StyledTableCell>
                            <StyledTableCell align="center">明細數</StyledTableCell>
                            <StyledTableCell align="center">總金額</StyledTableCell>
                            <StyledTableCell align="center">已寄送</StyledTableCell>
                            <StyledTableCell align="center">狀態</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listInfo?.map((row, id) => {
                            return (
                                <TableRow
                                    key={
                                        row.BillMaster?.BillingNo +
                                        row.BillMaster?.FeeAmountSum +
                                        id
                                    }
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.BillMaster.PartyName}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.BillMaster.SubmarineCable}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.BillMaster.WorkTitle}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.BillMaster.BillingNo}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {dayjs(row.BillMaster.IssueDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {dayjs(row.BillMaster.DueDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.BillDetail ? row.BillDetail.length : 0}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {handleNumber(row.BillMaster.FeeAmountSum)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">是</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.BillMaster.Status === 'TEMPORARY'
                                            ? '暫存'
                                            : row.BillMaster.Status === 'COMPLETE'
                                            ? '完成付款'
                                            : row.BillMaster.Status === 'TO_WRITEOFF'
                                            ? '待銷帳'
                                            : row.BillMaster.Status === 'INITIAL'
                                            ? '待抵扣'
                                            : row.BillMaster.Status}
                                        {/* '已抵扣' */}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                '& button': {
                                                    mx: { sm: 0.2, md: 0.2, lg: 0.2, xl: 1 },
                                                    p: 0,
                                                },
                                            }}
                                        >
                                            <Button
                                                color="success"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    setModifyItem(row.BillDetail);
                                                    setIsDetailOpen(true);
                                                }}
                                            >
                                                檢視
                                            </Button>
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleUploadOpen(row.BillMaster?.BillMasterID);
                                                }}
                                            >
                                                上傳帳單
                                            </Button>
                                            <Button
                                                color="info"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleAttachUploadOpen(
                                                        row.BillMaster?.BillMasterID,
                                                    );
                                                }}
                                            >
                                                上傳附件
                                            </Button>
                                            <Button
                                                color="warning"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleDownload(row.BillMaster?.BillMasterID);
                                                }}
                                            >
                                                下載帳單
                                            </Button>
                                            <Button
                                                color="error"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    handleAttacDownload(
                                                        row.BillMaster?.BillMasterID,
                                                    );
                                                }}
                                            >
                                                下載附件
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

export default IsSendDataList;
