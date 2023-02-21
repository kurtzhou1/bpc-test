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
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
// import { FileUploader } from 'react-drag-drop-files';

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
import { uploadFileApi } from 'components/apis.jsx';
import MainCard from 'components/MainCard';

const SignAndUpload = ({ uploadOpen, handUploadClose }) => {
    const [uploadFile, setUploadFile] = useState(null);
    const [isUpload, setIsUpload] = useState(false); //是否需攤分
    const fileTypes = ['PDF', 'WORD', 'PNG'];
    const handleUploadChange = (file) => {
        setUploadFile(file);
        if (file.length > 0) {
            setIsUpload(true);
        }
    };

    const handleUploadFile = () => {
        fetch(uploadFileApi, { method: 'POST', body: uploadFile, headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => res.json())
            .then((data) => {
                console.log('上傳成功=>>', data);
            })
            .catch((e) => console.log('e1=>>', e));
    };

    return (
        <Dialog onClose={handUploadClose} maxWidth="sm" fullWidth open={uploadOpen}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handUploadClose}>
                簽核作業
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <FormControl row>
                    <RadioGroup
                        row
                        value={isUpload}
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={(e) => setIsUpload(e.target.value)}
                    >
                        <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center">
                            <Grid item xs={6} sm={6} md={6} lg={6} display="flex">
                                <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center', width: '100%' }}>
                                    <MainCard title="主管確認簽核" sx={{ minHeight: '250px' }}>
                                        <Typography
                                            variant="h5"
                                            onClick={() => {
                                                setIsUpload(false);
                                            }}
                                            sx={{
                                                fontSize: { lg: '0.5rem', xl: '0.88rem' },
                                                ml: { lg: '0.5rem', xl: '1.5rem' }
                                            }}
                                        >
                                            確認帳單主檔與帳單明細檔資料後進行簽核處理，完成簽核即可檢視完成CBP Director簽名圖樣的帳單檔
                                        </Typography>
                                    </MainCard>
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} display="flex">
                                <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center', width: '100%' }}>
                                    <DropzoneArea onChange={handleUploadChange} acceptedFiles={['.pdf']} />
                                    <FormControlLabel
                                        value={true}
                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleUploadFile();
                    }}
                >
                    確定
                </Button>
                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handUploadClose}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SignAndUpload;
