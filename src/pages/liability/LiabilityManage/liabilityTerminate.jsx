import { useState } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    IconButton,
    TextField,
    Checkbox,
    Autocomplete,
    Table
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// day
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// api
import { updateLiability } from 'components/apis.jsx';

const LiabilityTerminate = ({ dialogTerminate, handleDialogClose, terminateInfo, apiQuery }) => {
    const [endNote, setEndNote] = useState([]);

    const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };

    const terminalLiability = () => {
        console.log('terminateInfo=>>', terminateInfo);
        let tmpArray = {
            LBRawID: terminateInfo.LBRawID,
            EndDate: terminateInfo.EndDate,
            EndNote: endNote ? endNote : ''
        };
        console.log('tmpArray=>>', tmpArray);
        fetch(updateLiability, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then(() => {
                alert('終止成功');
                apiQuery();
                handleDialogClose();
            })
            .catch((e) => console.log('e1=>>', e));
    };

    return (
        <Dialog onClose={handleDialogClose} maxWidth="xs" fullWidth open={dialogTerminate}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                確認刪除訊息
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                    {/* row3 */}
                    <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            {`是否確定刪除${terminateInfo.BillMilestone}、${terminateInfo.PartyName}的Liability資料`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={endNote}
                            size="small"
                            label="填寫終止原因"
                            onChange={(e) => setEndNote(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        terminalLiability();
                    }}
                >
                    確定
                </Button>

                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LiabilityTerminate;
