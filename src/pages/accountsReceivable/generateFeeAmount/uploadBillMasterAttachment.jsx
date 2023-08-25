import { useEffect, useState } from 'react';
import { Grid, Button, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';

// project
import { BootstrapDialogTitle } from 'components/commonFunction';

// day
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// api
import { uploadBillMasterAttachment } from 'components/apis.jsx';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const UploadBillMasterAttachment = ({ isUploadOpen, handleUploadClose, billMasterID, receivableQuery }) => {
    const dispatch = useDispatch();
    const [uploadFile, setUploadFile] = useState(null);
    const [isUpload, setIsUpload] = useState(false); //是否需攤分
    const [displayName, setDisplayName] = useState([]);
    // const fileTypes = ['PDF', 'PNG'];
    const handleUploadChange = (file) => {
        setUploadFile(file);
        if (file.length > 0) {
            setIsUpload(true);
        }
    };

    const handleUploadFile = () => {
        if (uploadFile.length > 0) {
            let tmpApi = uploadBillMasterAttachment + '/' + billMasterID;
            const pdfData = new FormData();
            pdfData.append('file', uploadFile[0]);
            // data
            fetch(tmpApi, {
                method: 'POST',
                body: pdfData,
                headers: {
                    Accept: 'application/json'
                }
            })
                .then((res) => res.json())
                .then(() => {
                    dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '上傳成功' } }));
                    setUploadFile(null);
                    handleUploadClose();
                    receivableQuery();
                })
                .catch((e) => console.log('e1=>', e));
        } else {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請上傳檔案' } }));
        }
    };

    useEffect(() => {
        if (uploadFile) {
            let tmpArray = [];
            uploadFile.forEach((i) => {
                tmpArray.push(i.name);
            });
            setDisplayName(tmpArray);
        }
    }, [uploadFile]);

    return (
        <Dialog
            // onClose={handleUploadClose}
            maxWidth="xs"
            fullWidth
            open={isUploadOpen}
        >
            <BootstrapDialogTitle
            // onClose={handleUploadClose}
            >
                簽核作業
            </BootstrapDialogTitle>
            <DialogContent dividers>
                {/* 第二階段優化 */}
                {/* <FormControl row> */}
                <RadioGroup
                    row
                    value={isUpload}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={(e) => setIsUpload(e.target.value)}
                >
                    <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center">
                        {/* <Grid item xs={6} sm={6} md={6} lg={6} display="flex">
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
                            </Grid> */}
                        <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
                            <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center', width: '100%' }}>
                                <DropzoneArea onChange={handleUploadChange} acceptedFiles={['.zip']} />
                                <FormControlLabel
                                    value={true}
                                    control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
                            <Box sx={{ fontSize: 0.1, textAlign: 'left' }}>{displayName[0] ? `上傳成功：${displayName[0]}` : ''}</Box>
                        </Grid>
                    </Grid>
                </RadioGroup>
                {/* </FormControl> */}
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
                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleUploadClose}>
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadBillMasterAttachment;
