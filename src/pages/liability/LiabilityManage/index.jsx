import { useEffect, useState } from 'react';
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, Box, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// project import
import MainCard from 'components/MainCard';
import LiabilityQuery from './liabilityQuery';
import LiabilityDataList from './liabilityDataList';

// day
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// ==============================|| SAMPLE PAGE ||============================== //

const LiabilityManage = () => {
    const [listInfo, setListInfo] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState('');

    const [billMilestone, setBillMilestone] = useState(''); //記帳段號
    const [partyName, setPartyName] = useState(''); //會員名稱
    const [lbRatio, setLBRatio] = useState(NaN); //攤分比例
    const [modifyNote, setModifyNote] = useState('');

    const liabilityQuery = () => {
        console.log('liabilityQueryFunction');
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
        setDialogAction('add');
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const addLiability = () => {
        let tmpArray = listInfo;
        tmpArray.push({
            billMilestone: billMilestone,
            partyName: partyName,
            lbRatio: lbRatio,
            createTime: new Date(),
            modifyNote: ''
        });
        setListInfo([...tmpArray]);
        handleDialogClose();
    };

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
        <Grid container spacing={1}>
            <Grid item xs={12} display="flex" justifyContent="right">
                <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={handleDialogOpen}>
                    + 新增Liability
                </Button>
                <Dialog onClose={handleDialogClose} maxWidth="sm" fullWidth open={isDialogOpen}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                        新增Liability
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    記帳段號：
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">選擇記帳段號</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-label"
                                        // id="demo-simple-select"
                                        value={billMilestone}
                                        label="記帳段號"
                                        onChange={(e) => setBillMilestone(e.target.value)}
                                    >
                                        <MenuItem value={'記帳段號1號'}>記帳段號1號</MenuItem>
                                        <MenuItem value={'記帳段號2號'}>記帳段號2號</MenuItem>
                                        <MenuItem value={'記帳段號3號'}>記帳段號3號</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    會員名稱：
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">選擇會員</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-label"
                                        // id="demo-simple-select"
                                        value={partyName}
                                        label="發票供應商"
                                        onChange={(e) => setPartyName(e.target.value)}
                                    >
                                        <MenuItem value={'Taiwan'}>Taiwan</MenuItem>
                                        <MenuItem value={'Vietnam'}>Vietnam</MenuItem>
                                        <MenuItem value={'Korean'}>Korean</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    攤分比例：
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">選擇攤分比例</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-label"
                                        // id="demo-simple-select"
                                        value={lbRatio}
                                        label="發票供應商"
                                        onChange={(e) => setLBRatio(e.target.value)}
                                    >
                                        <MenuItem value={5}>5%</MenuItem>
                                        <MenuItem value={10}>10%</MenuItem>
                                        <MenuItem value={15}>15%</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                {dialogAction === 'Edit' ? (
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                    >
                                        異動原因：
                                    </Typography>
                                ) : (
                                    ''
                                )}
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                {dialogAction === 'Edit' ? (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // value={}
                                        size="small"
                                        label="填寫異動原因"
                                        onChange={(e) => setInvoiceNo(e.target.value)}
                                    />
                                ) : (
                                    ''
                                )}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={addLiability}>
                            新增
                        </Button>
                        <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                            取消
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Grid item xs={12}>
                <LiabilityQuery liabilityQuery={liabilityQuery} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="發票資料建立列表">
                    <LiabilityDataList listInfo={listInfo} setDialogAction={setDialogAction} setIsDialogOpen={setIsDialogOpen} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default LiabilityManage;
