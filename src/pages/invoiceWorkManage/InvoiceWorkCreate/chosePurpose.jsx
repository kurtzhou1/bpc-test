import { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    TextField,
    Select,
    Table,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    TableCell,
} from '@mui/material';

// day
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// project import
import MainCard from 'components/MainCard';
import { handleNumber, BootstrapDialogTitle, TabPanel } from 'components/commonFunction';

// table
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// api
import { getPayDraftStreamCBRefund } from 'components/apis.jsx';

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

const CorrespondenceMake = ({ handleDialogOpen, isPurposeDialogOpen, handleDialogClose }) => {
    const dispatch = useDispatch();
    const [issueDate, setIssueDate] = useState(null); //出帳年月
    const [code, setCode] = useState(''); //兌換幣別代碼
    const [selectPurpose, setSelectPurpose] = useState();

    return (
        <Dialog maxWidth="md" fullWidth open={isPurposeDialogOpen}>
            <BootstrapDialogTitle className="no-print">選擇用途/主旨</BootstrapDialogTitle>
            <DialogContent dividers className="no-print">
                <Grid
                    container
                    spacing={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item lg={2} display="flex" justifyContent="center" alignItems="center">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.7rem', xl: '0.88rem' } }}>
                            帳單到期日：
                        </Typography>
                    </Grid>
                    <Grid item lg={2}>
                        <FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    inputFormat="YYYY/MM/DD"
                                    value={issueDate}
                                    onChange={(e) => {
                                        setIssueDate(e);
                                    }}
                                    renderInput={(params) => <TextField size="small" {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item lg={2} display="flex" justifyContent="center" alignItems="center">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.7rem', xl: '0.88rem' } }}>
                            兌換幣別代碼：
                        </Typography>
                    </Grid>
                    <Grid item lg={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>選擇幣別</InputLabel>
                            <Select
                                value={code}
                                label="幣別"
                                onChange={(e) => setCode(e.target.value)}
                            >
                                <MenuItem value={'USD'}>USD</MenuItem>
                                <MenuItem value={'TWD'}>TWD</MenuItem>
                                <MenuItem value={'JPY'}>JPY</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} />
                    <Grid item lg={12}>
                        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                            <Table sx={{ minWidth: 300 }} stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center"></StyledTableCell>
                                        <StyledTableCell align="center">會員</StyledTableCell>
                                        <StyledTableCell align="center">發票號碼</StyledTableCell>
                                        <StyledTableCell align="center">供應商</StyledTableCell>
                                        <StyledTableCell align="center">海纜名稱</StyledTableCell>
                                        <StyledTableCell align="center">發票日期</StyledTableCell>
                                        <StyledTableCell align="center">總金額</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[].map((row, id) => {
                                        return (
                                            <TableRow
                                                key={row.PartyName + id}
                                                sx={{
                                                    '&:last-child td, &:last-child th': {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                <TableCell>
                                                    <FormControl>
                                                        <RadioGroup
                                                            row
                                                            value={selectPurpose}
                                                            onChange={(e) =>
                                                                setSelectPurpose(e.target.value)
                                                            }
                                                        >
                                                            <FormControlLabel
                                                                value={true}
                                                                control={
                                                                    <Radio
                                                                        sx={{
                                                                            '& .MuiSvgIcon-root': {
                                                                                fontSize: {
                                                                                    lg: 14,
                                                                                    xl: 20,
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                }
                                                            />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.PartyName}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.InvoiceNo}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.SupplierName}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.SubmarineCable}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {dayjs(row.IssueDate).format('YYYY/MM/DD')}
                                                </TableCell>
                                                <TableCell align="center">{`$${handleNumber(
                                                    row.FeeAmount?.toFixed(2),
                                                )}`}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className="no-print">
                <Button sx={{ mr: '0.05rem' }} variant="contained">
                    儲存
                </Button>
                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CorrespondenceMake;
