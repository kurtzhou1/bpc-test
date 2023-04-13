import { useEffect, useState, useRef } from 'react';

// project import
import MainCard from 'components/MainCard';
import { TextField } from '@mui/material/index';
import { handleNumber } from 'components/commonFunction';

// material-ui
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button, Table } from '@mui/material';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import Textarea from '@mui/joy/Textarea';

// table
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const CreateInvoiceDetail = ({
    setInvoiceDetailInfo,
    bmStoneList,
    invoiceDetailInfo,
    action,
    itemDetailInitial,
    billMilestone,
    setBillMilestone,
    feeItem,
    setFeeItem,
    feeAmount,
    setFeeAmount
}) => {
    const [isEdit, setIsEdit] = useState(false);
    // const [editItem, setEditItem] = useState();
    const editItem = useRef();

    const createData = (FeeItem, BillMilestone, FeeAmount) => {
        return { FeeItem, BillMilestone, FeeAmount };
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

    const itemDetailAdd = () => {
        let tmpArray = invoiceDetailInfo;
        tmpArray.push(createData(feeItem, billMilestone, Number(feeAmount.replaceAll(',', ''))));
        // tmpArray.reverse();
        setInvoiceDetailInfo([...tmpArray]);
        itemDetailInitial();
    };

    const itemDetailDelete = (id) => {
        let tmpArray = invoiceDetailInfo;
        tmpArray.splice(id, 1);
        setInvoiceDetailInfo([...tmpArray]);
    };

    const itemDetailEdit = (id) => {
        setIsEdit(true);
        editItem.current = id;
        let tmpArray = invoiceDetailInfo[id];
        setBillMilestone(tmpArray.BillMilestone);
        setFeeItem(tmpArray.FeeItem);
        setFeeAmount(handleNumber(tmpArray.FeeAmount));
    };

    const itemDetailSave = () => {
        setIsEdit(false);
        let tmpArray = invoiceDetailInfo.map((i) => i);
        tmpArray.splice(editItem.current, 1);
        tmpArray.push(createData(feeItem, billMilestone, Number(feeAmount.replaceAll(',', ''))));
        tmpArray.reverse();
        setInvoiceDetailInfo([...tmpArray]);
        itemDetailInitial();
        editItem.current = 0;
    };

    const itemDetailCancel = () => {
        itemDetailInitial();
        setIsEdit(false);
    };

    useEffect(() => {
        itemDetailInitial();
    }, []);

    return (
        <MainCard title={`${action === 'Edit' ? '編輯' : ''}發票明細檔`} sx={{ height: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={1}>
                {/* row1 */}
                <Grid item xs={12} sm={6} md={2} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        記帳段號：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <FormControl fullWidth>
                        <InputLabel size="small" id="billMilestone" disabled={action === 'View'}>
                            選擇記帳段號
                        </InputLabel>
                        <Select
                            value={billMilestone}
                            disabled={action === 'View'}
                            label="發票供應商"
                            size="small"
                            onChange={(e) => setBillMilestone(e.target.value)}
                        >
                            {bmStoneList.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        費用金額：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={feeAmount}
                        disabled={action === 'View'}
                        // type="number"
                        size="small"
                        label="填寫費用金額"
                        onChange={(e) => setFeeAmount(handleNumber(e.target.value))}
                    />
                </Grid>
                {/* row2 */}
                <Grid item md={2} lg={2}>
                    <Typography
                        variant="h5"
                        size="small"
                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}
                    >
                        費用項目：
                    </Typography>
                </Grid>
                <Grid item md={10} lg={10}>
                    <StyledEngineProvider injectFirst>
                        <CssVarsProvider>
                            <Textarea
                                required
                                value={feeItem}
                                placeholder="填寫費用項目"
                                disabled={action === 'View'}
                                minRows={2}
                                maxRows={2}
                                onChange={(e) => setFeeItem(e.target.value)}
                            />
                        </CssVarsProvider>
                    </StyledEngineProvider>
                </Grid>
                {action !== 'View' ? (
                    <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="end" alignItems="center">
                        {isEdit ? (
                            <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={itemDetailSave}>
                                儲存
                            </Button>
                        ) : (
                            <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={itemDetailAdd}>
                                新增
                            </Button>
                        )}
                        {isEdit ? (
                            <Button sx={{ ml: '0.25rem' }} variant="contained" onClick={itemDetailCancel}>
                                取消
                            </Button>
                        ) : (
                            <Button sx={{ ml: '0.25rem' }} variant="contained" onClick={itemDetailInitial}>
                                清除
                            </Button>
                        )}
                    </Grid>
                ) : (
                    ''
                )}
                <Grid item xs={12} sm={12} lg={12}>
                    <TableContainer component={Paper} sx={{ maxHeight: { lg: 200, md: 275 } }}>
                        <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">費用項目</StyledTableCell>
                                    <StyledTableCell align="center">記帳段號</StyledTableCell>
                                    <StyledTableCell align="center">費用項目</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {invoiceDetailInfo?.map((row, id) => (
                                    <TableRow
                                        key={row.FeeItem + row.BillMilestone}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row">
                                            {row.FeeItem}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.BillMilestone}</StyledTableCell>
                                        <StyledTableCell align="center">{handleNumber(row.FeeAmount)}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            {action !== 'View' ? (
                                                <>
                                                    <Button
                                                        color="primary"
                                                        onClick={() => {
                                                            itemDetailEdit(id);
                                                        }}
                                                    >
                                                        編輯
                                                    </Button>
                                                    <Button
                                                        color="error"
                                                        onClick={() => {
                                                            itemDetailDelete(id);
                                                        }}
                                                    >
                                                        刪除
                                                    </Button>
                                                </>
                                            ) : (
                                                ''
                                            )}
                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CreateInvoiceDetail;
