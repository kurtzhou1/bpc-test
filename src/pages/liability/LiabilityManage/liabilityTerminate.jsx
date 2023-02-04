import { useEffect, useState, useRef } from 'react';
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

const LiabilityTerminate = ({ dialogTerminate, handleDialogClose }) => {
    const [listInfo, setListInfo] = useState([]);

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

    const parties = ['Taiwan', 'Vietnam', 'Japan', 'Korean'];

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

    return (
        <Dialog onClose={handleDialogClose} maxWidth="md" fullWidth open={dialogTerminate}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                確認刪除訊息
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                    {/* row3 */}
                    <Grid item xs={1} sm={1} md={1} lg={1} display="flex">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            異動原因：
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        addLiability(listInfo);
                        setListInfo([]);
                    }}
                >
                    確定
                </Button>

                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleDialogClose();
                        itemDetailInitial();
                    }}
                >
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LiabilityTerminate;
