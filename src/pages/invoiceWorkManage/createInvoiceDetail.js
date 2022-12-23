import { useEffect, useState } from 'react';

// project import
import MainCard from 'components/MainCard';
import { TextField } from '../../../node_modules/@mui/material/index';

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

const CreateInvoiceDetail = () => {
    const [billMilestone, setBillMilestone] = useState(''); //記帳段號
    const [feeType, setFeeType] = useState(''); //收費種類
    const [feeItem, setFeeItem] = useState('');
    const [feeAmount, setFeeAmount] = useState();
    const [itemArray, setItemArray] = useState([]);

    const itemDetailInitial = () => {
        setBillMilestone('');
        setFeeType('');
        setFeeItem('');
        setFeeAmount(0);
    };

    console.log('b=>>', feeItem, billMilestone, feeAmount, feeType);

    const createData = (feeItem, billMilestone, feeAmount, feeType) => {
        return { feeItem, billMilestone, feeAmount, feeType };
    };

    const itemDetailAdd = () => {
        let tmpArray = itemArray;
        tmpArray.push(createData(feeItem, billMilestone, feeAmount, feeType));
        console.log('tmpArray=>>', tmpArray);
        setItemArray(tmpArray);
        itemDetailInitial();
    };

    // const rows = [
    //     createData('費用項目一', 159, 6.0, 24),
    //     createData('費用項目二', 237, 9.0, 37),
    //     createData('費用項目三', 262, 16.0, 24),
    //     createData('費用項目四', 305, 3.7, 67),
    //     createData('費用項目五', 356, 16.0, 49)
    // ];

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        }
    }));

    useEffect(() => {
        itemDetailInitial();
    }, []);

    useEffect(() => {
        console.log('itemArray111=>>', itemArray);
    }, [itemArray]);

    console.log('itemArray222=>>', itemArray);

    return (
        <MainCard title="發票工作明細檔建立" sx={{ height: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={0.5}>
                {/* row1 */}
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        記帳段號：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <FormControl fullWidth>
                        <InputLabel size="small" id="billMilestone">
                            選擇記帳段號
                        </InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={billMilestone}
                            label="發票供應商"
                            size="small"
                            onChange={(e) => setBillMilestone(e.target.value)}
                        >
                            <MenuItem value={'第1段'}>第1段</MenuItem>
                            <MenuItem value={'第2段'}>第2段</MenuItem>
                            <MenuItem value={'第3段'}>第3段</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        收費種類：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <FormControl fullWidth>
                        <InputLabel size="small" id="feeType">
                            選擇收費種類
                        </InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={feeType}
                            label="收費種類"
                            size="small"
                            onChange={(e) => setFeeType(e.target.value)}
                        >
                            <MenuItem value={'種類1'}>種類1</MenuItem>
                            <MenuItem value={'種類2'}>種類2</MenuItem>
                            <MenuItem value={'種類3'}>種類3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* row2 */}
                <Grid item lg={2}>
                    <Typography variant="h5" size="small" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        費用項目：
                    </Typography>
                </Grid>
                <Grid item lg={10}>
                    <StyledEngineProvider injectFirst>
                        <CssVarsProvider>
                            <Textarea
                                required
                                value={feeItem}
                                placeholder="填寫費用項目"
                                minRows={2}
                                maxRows={2}
                                onChange={(e) => setFeeItem(e.target.value)}
                            />
                        </CssVarsProvider>
                    </StyledEngineProvider>
                </Grid>
                {/* row3 */}
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: '0.88rem', ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        費用金額：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={feeAmount}
                        type="number"
                        size="small"
                        label="填寫費用金額"
                        onChange={(e) => setFeeAmount(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2} xl={3} />
                <Grid item xs={12} sm={6} md={4} lg={2} xl={1.5}>
                    <Button variant="contained" onClick={itemDetailAdd}>
                        新增
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2} xl={1.5}>
                    <Button variant="contained" onClick={itemDetailInitial}>
                        清除
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <TableContainer component={Paper} sx={{ maxHeight: 125 }}>
                        <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>費用項目</StyledTableCell>
                                    <StyledTableCell align="center">記帳段號</StyledTableCell>
                                    <StyledTableCell align="center">費用項目</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {itemArray?.map((row) => (
                                    <TableRow
                                        key={row.feeItem + row.billMilestone}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row">
                                            {row.feeItem}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.billMilestone}</StyledTableCell>
                                        <StyledTableCell align="center">{row.feeAmount}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button color="primary">編輯</Button>
                                            <Button color="error">刪除</Button>
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
