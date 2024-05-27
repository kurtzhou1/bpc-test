import { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    Box,
    TextField,
    Checkbox,
    Table,
    Tab,
    RadioGroup,
    FormControlLabel,
    Radio,
    TableCell,
} from '@mui/material';

// day
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

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
    const [correspondenceInfo, setCorrespondenceInfo] = useState({});
    const [subject1, setSubject1] = useState(''); //主旨1
    const [cableInfo, setCableInfo] = useState(''); //海纜資訊

    return (
        <Dialog maxWidth="lg" fullWidth open={isPurposeDialogOpen}>
            <BootstrapDialogTitle className="no-print">製作函稿</BootstrapDialogTitle>
            <DialogContent dividers className="no-print"></DialogContent>
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
