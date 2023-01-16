import { useEffect, useState } from 'react';
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, Box, IconButton, TextField, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import JournalQuery from './journalQuery';
import LiabilityDataList from './liabilityDataList';

// day
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useRef } from 'react';

//icon
import Autocomplete from '@mui/material/Autocomplete';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

const CreateJournal = () => {
    const [listInfo, setListInfo] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState('');

    const [billMilestone, setBillMilestone] = useState(''); //記帳段號
    const [partyName, setPartyName] = useState([]); //會員名稱
    const [lbRatio, setLBRatio] = useState(NaN); //攤分比例
    const [editItem, setEditItem] = useState(NaN);
    const [modifyNote, setModifyNote] = useState('');

    // const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    // const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const parties = [{ title: 'Taiwan' }, { title: 'Vietnam' }, { title: 'Japan' }, { title: 'Korean' }];

    const jounaryQuery = () => {
        console.log('liabilityQueryFunction');
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
        setDialogAction('add');
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const itemDetailInitial = () => {
        setBillMilestone('');
        setPartyName('');
        setLBRatio(NaN);
        setModifyNote('');
    };

    //新增
    const addLiability = () => {
        let tmpArray = listInfo;
        tmpArray.push({
            billMilestone: billMilestone,
            partyName: partyName,
            lbRatio: lbRatio,
            createTime: new Date(),
            modifyNote: modifyNote === '' ? '' : modifyNote
        });
        setListInfo([...tmpArray]);
        handleDialogClose();
        itemDetailInitial();
    };

    //刪除
    const deletelistInfoItem = (deleteItem) => {
        let tmpArray = listInfo;
        tmpArray.splice(deleteItem, 1);
        setListInfo([...tmpArray]);
    };

    //編輯
    const editlistInfoItem = () => {
        let tmpArray = listInfo[editItem];
        if (tmpArray) {
            setBillMilestone(tmpArray?.billMilestone);
            setPartyName(tmpArray?.partyName);
            setLBRatio(tmpArray?.lbRatio);
            setModifyNote(tmpArray?.modifyNote);
        }
    };

    //儲存編輯
    const saveEdit = () => {
        setEditItem(NaN);
        deletelistInfoItem(editItem);
        addLiability();
        setIsListEdit(false);
        itemDetailInitial();
    };

    useEffect(() => {
        itemDetailInitial();
        if (editItem >= 0) {
            editlistInfoItem();
            setIsDialogOpen(true);
        }
    }, [editItem]);

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
                <Dialog onClose={handleDialogClose} maxWidth="sm" fullWidth open={isDialogOpen}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                        發票查詢
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    供應商：
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">選擇供應商</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-label"
                                        // id="demo-simple-select"
                                        value={billMilestone}
                                        label="記帳段號"
                                        onChange={(e) => setBillMilestone(e.target.value)}
                                    >
                                        <MenuItem value={'供應商1號'}>供應商1號</MenuItem>
                                        <MenuItem value={'供應商2號'}>供應商2號</MenuItem>
                                        <MenuItem value={'供應商3號'}>供應商3號</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    海纜名稱：
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">選擇海纜</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-label"
                                        // id="demo-simple-select"
                                        value={lbRatio}
                                        label="海纜"
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
                                        value={modifyNote}
                                        size="small"
                                        label="填寫異動原因"
                                        onChange={(e) => setModifyNote(e.target.value)}
                                    />
                                ) : (
                                    ''
                                )}
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} />
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    會員名稱：
                                </Typography>
                            </Grid>
                            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                                <Autocomplete
                                    // multiple
                                    // id="checkboxes-tags-demo"
                                    options={parties}
                                    // disableCloseOnSelect
                                    onChange={(event, newValue) => {
                                        setPartyName(newValue);
                                    }}
                                    getOptionLabel={(option) => option.title}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            {/* <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 10 }}
                                                checked={selected}
                                            /> */}
                                            {option.title}
                                        </li>
                                    )}
                                    // style={{ width: 500 }}
                                    // renderInput={(params) => <TextField {...params} label="選擇會員名稱" placeholder="Favorites" />
                                    renderInput={(params) => <TextField {...params} label="選擇會員名稱" />}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        {dialogAction === 'Edit' ? (
                            <>
                                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={saveEdit}>
                                    儲存
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={addLiability}>
                                    新增
                                </Button>
                            </>
                        )}
                        <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                            取消
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Grid item xs={12}>
                <JournalQuery jounaryQuery={jounaryQuery} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="發票資料建立列表">
                    <LiabilityDataList
                        listInfo={listInfo}
                        setDialogAction={setDialogAction}
                        setIsDialogOpen={setIsDialogOpen}
                        setEditItem={setEditItem}
                        deletelistInfoItem={deletelistInfoItem}
                    />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default CreateJournal;
