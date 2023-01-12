import { useEffect, useState } from 'react';
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
    Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import LiabilityQuery from './liabilityQuery';
import LiabilityDataList from './liabilityDataList';

// day
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const LiabilityManage = () => {
    const [listInfo, setListInfo] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState('');

    const [billMilestone, setBillMilestone] = useState(''); //記帳段號
    const [partyName, setPartyName] = useState([]); //會員名稱
    const [lbRatio, setLBRatio] = useState(''); //攤分比例
    const [editItem, setEditItem] = useState(NaN);
    const [modifyNote, setModifyNote] = useState('');

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const parties = [{ partyName: 'Taiwan' }, { partyName: 'Vietnam' }, { partyName: 'Japan' }, { partyName: 'Korean' }];

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

    const itemDetailInitial = () => {
        setBillMilestone('');
        setPartyName('');
        setLBRatio('');
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
                <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={handleDialogOpen}>
                    + 新增Liability
                </Button>
                <Dialog onClose={handleDialogClose} maxWidth="sm" fullWidth open={isDialogOpen}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                        新增Liability
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                            <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="end">
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    記帳段號：
                                </Typography>
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
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
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} display="flex" justifyContent="end">
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
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
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
                            <Grid item xs={2} sm={2} md={2} lg={2} />
                            <Grid item xs={2} sm={2} md={2} lg={2} display="flex" justifyContent="end">
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    攤分比例：
                                </Typography>
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={lbRatio}
                                    size="small"
                                    label="填寫攤分比例"
                                    onChange={(e) => setModifyNote(e.target.value)}
                                />
                            </Grid>
                            {/* <Grid item xs={6} sm={6} md={6} lg={6} xl={6} /> */}
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} display="flex" justifyContent="end">
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    會員名稱：
                                </Typography>
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                <Autocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={parties}
                                    size="small"
                                    disableCloseOnSelect
                                    onChange={(event, newValue) => {
                                        setPartyName(newValue);
                                    }}
                                    getOptionLabel={(option) => option.partyName}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                                            {option.partyName}
                                        </li>
                                    )}
                                    // style={{ width: 500 }}
                                    // renderInput={(params) => <TextField {...params} label="選擇會員名稱" placeholder="Favorites" />
                                    renderInput={(params) => <TextField {...params} label="選擇會員名稱" />}
                                />
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1} />
                            <Grid item xs={1} sm={1} md={1} lg={1} display="flex" justifyContent="end" alignItems="center">
                                <Button size="small" sx={{ ml: '0.05rem' }} variant="contained" onClick={saveEdit}>
                                    +
                                </Button>
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
                                    儲存
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
                <LiabilityQuery liabilityQuery={liabilityQuery} />
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

export default LiabilityManage;
