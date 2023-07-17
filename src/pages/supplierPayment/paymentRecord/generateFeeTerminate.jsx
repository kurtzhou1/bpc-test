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
    TextField,
    Checkbox,
    Autocomplete,
    Table,
    FormControlLabel,
    RadioGroup,
    Radio
} from '@mui/material';

// project
import { BootstrapDialogTitle } from 'components/commonFunction';

// day
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// api
import { updateLiability } from 'components/apis.jsx';

const GenerateFeeTerminate = ({ infoTerminal, handleTerminalClose }) => {
    const [endNote, setEndNote] = useState([]);

    const terminalLiability = () => {
        console.log('terminateInfo=>>');
        // let tmpArray = {
        //     LBRawID: terminateInfo.LBRawID,
        //     EndDate: terminateInfo.EndDate,
        //     EndNote: endNote ? endNote : ''
        // };
        // console.log('', tmpArray);
        // fetch(updateLiability, { method: 'POST', body: JSON.stringify(tmpArray) })
        //     .then((res) => res.json())
        //     .then(() => {
        //         apiQuery();
        //         handleTerminalClose();
        //     })
        //     .catch((e) => console.log('e1=>', e));
    };

    return (
        <Dialog
            // onClose={handleTerminalClose}
            maxWidth="xs"
            fullWidth
            open={infoTerminal}
        >
            <BootstrapDialogTitle
            // onClose={handleTerminalClose}
            >
                確認終止訊息
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                    {/* row3 */}
                    <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            {/* {`是否確定刪除${terminateInfo.BillMilestone}、${terminateInfo.PartyName}的Credit Balance資料`} */}
                            {`是否確定終止此Credit Balance資料`}
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

                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleTerminalClose}>
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GenerateFeeTerminate;
