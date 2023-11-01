// import { useState } from 'react';

// project import
import LiabilityTerminate from './liabilityTerminate';

// material-ui
import { Typography, Button, Table, Box } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';
import { useState } from 'react';

const LiabilityDataList = ({ listInfo, setDialogAction, setIsDialogOpen, setEditItem, apiQuery }) => {
    const [dialogTerminate, setDialogTerminate] = useState(false);
    const [terminateInfo, setTerminateInfo] = useState({});

    const handleDialogClose = () => {
        setDialogTerminate(false);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: theme.palette.common.gary,
            color: theme.palette.common.black,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        }
    }));

    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                            <StyledTableCell align="center">帳務計費段</StyledTableCell>
                            <StyledTableCell align="center">會員名稱</StyledTableCell>
                            <StyledTableCell align="center">攤分比例</StyledTableCell>
                            <StyledTableCell align="center">異動原因</StyledTableCell>
                            <StyledTableCell align="center">終止日期</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listInfo?.map((row, id) => {
                            return (
                                <TableRow
                                    key={row.BillMilestone + row.PartyName + row.SubmarineCable}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">{row.BillMilestone}</StyledTableCell>
                                    <StyledTableCell align="center">{row.PartyName}</StyledTableCell>
                                    <StyledTableCell align="center">{`${row.LBRatio}%`}</StyledTableCell>
                                    <StyledTableCell align="center">{row.ModifyNote}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.EndDate ? dayjs(row.EndDate).format('YYYY/MM/DD') : ''}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                '& button': { mx: { sm: 0.3, md: 0.3, lg: 0.6, xl: 1.5 }, p: 0 }
                                            }}
                                        >
                                            {row.EndDate ? (
                                                ''
                                            ) : (
                                                <Button
                                                    color="primary"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        setDialogAction('Edit');
                                                        setIsDialogOpen(true);
                                                        setEditItem(id);
                                                    }}
                                                >
                                                    編輯
                                                </Button>
                                            )}
                                            {/* {row.EndDate ? (
                                                ''
                                            ) : (
                                                <Button
                                                    color="success"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        setDialogAction('Split');
                                                        setIsDialogOpen(true);
                                                        setEditItem(id);
                                                    }}
                                                >
                                                    分段
                                                </Button>
                                            )} //3/30 暫時註解分段 */}
                                            {row.EndDate ? (
                                                ''
                                            ) : (
                                                <Button
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        setDialogTerminate(true);
                                                        setTerminateInfo({
                                                            BillMilestone: row.BillMilestone,
                                                            PartyName: row.PartyName,
                                                            LBRawID: row.LBRawID,
                                                            EndDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
                                                        });
                                                    }}
                                                >
                                                    終止
                                                </Button>
                                            )}
                                        </Box>
                                    </StyledTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <LiabilityTerminate
                dialogTerminate={dialogTerminate}
                handleDialogClose={handleDialogClose}
                terminateInfo={terminateInfo}
                apiQuery={apiQuery}
            />
        </>
    );
};

export default LiabilityDataList;
