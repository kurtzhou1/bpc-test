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
    Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import LiabilityQuery from './liabilityQuery';
import LiabilityDataList from './liabilityDataList';
import LiabilityAdd from './liabilityAdd';

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
    const partyName = useRef();
    const [lbRatio, setLBRatio] = useState(''); //攤分比例
    const [editItem, setEditItem] = useState(NaN);
    const [modifyNote, setModifyNote] = useState('');

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const parties = [{ name: 'Taiwan' }, { name: 'Vietnam' }, { name: 'Japan' }, { name: 'Korean' }];

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
        // setPartyName([]);
        partyName.current = [];
        setLBRatio('');
        setModifyNote('');
    };

    //新增
    const addLiability = () => {
        let tmpArray = listInfo;
        tmpArray.push({
            billMilestone: billMilestone,
            partyName: partyName.current,
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
            partyName.current = tmpArray?.partyName;
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
                <LiabilityAdd handleDialogClose={handleDialogClose} addLiability={addLiability} saveEdit={saveEdit} partyName={partyName} />
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
