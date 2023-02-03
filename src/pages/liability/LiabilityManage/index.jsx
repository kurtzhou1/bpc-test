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
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const LiabilityManage = () => {
    const [listInfo, setListInfo] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState('');

    const [billMilestone, setBillMilestone] = useState(''); //記帳段號
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [partyName, setPartyName] = useState([]); //會員名稱
    const [lbRatio, setLBRatio] = useState(''); //攤分比例
    const [editItem, setEditItem] = useState(NaN);
    const [modifyNote, setModifyNote] = useState('');

    const [filterList, setFilterList] = useState(listInfo);
    const test = useRef();
    const searchWord = useRef();

    // const [searched, setSearched] = useState('');

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
        setPartyName([]);
        setLBRatio('');
        setModifyNote('');
    };

    //新增
    const addLiability = (list) => {
        if (list.length > 0) {
            let tmpArray = listInfo.map((i) => i);
            list.forEach((i) => {
                tmpArray.push({
                    BillMilestone: i.BillMilestone,
                    PartyName: i.PartyName,
                    LbRatio: i.LbRatio,
                    CreateTime: '',
                    ModifyNote: modifyNote.trim() === '' ? '' : modifyNote
                });
            });
            setListInfo([...tmpArray]);
            handleDialogClose();
            itemDetailInitial();
        }
    };

    //終止
    const updatelistInfoItem = (updateItem) => {
        let tmpArray = listInfo.map((i) => i);
        tmpArray[updateItem].CreateTime = dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss');
        setListInfo([...tmpArray]);
    };

    //編輯
    const editlistInfoItem = () => {
        let tmpArray = listInfo[editItem];
        if (tmpArray) {
            setBillMilestone(tmpArray?.BillMilestone);
            setPartyName([tmpArray?.PartyName]);
            setLBRatio(tmpArray?.LbRatio);
            setModifyNote(tmpArray?.ModifyNote);
        }
    };

    //儲存編輯
    const saveEdit = () => {
        let tmpArray = listInfo.map((i) => i);
        // console.log('lbRatio=>>', lbRatio);
        tmpArray[editItem].LbRatio = lbRatio;
        tmpArray[editItem].ModifyNote = modifyNote;
        console.log('tmpArray=>>>>', tmpArray);
        setListInfo([...tmpArray]);
        setEditItem(NaN);
        // addLiability();
        // setIsListEdit(false);
        // itemDetailInitial();
    };

    // const cancelSearch = () => {
    //     setSearched('');
    //     requestSearch(searched);
    // };

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

    const searchFunction = (searchedVal) => {
        console.log('requestSearch=>>', searchedVal);
        const filteredRows = listInfo.filter((row) => {
            return row.PartyName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        console.log('filteredRows=>>', filteredRows);
        setFilterList(filteredRows);
        // test.current = filteredRows;
        // searchWord.current = searchedVal;
        // filterList.current = filteredRows;
    };

    useEffect(() => {
        itemDetailInitial();
        if (editItem >= 0) {
            editlistInfoItem();
            setIsDialogOpen(true);
        }
    }, [editItem]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} display="flex" justifyContent="right">
                <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={handleDialogOpen}>
                    + 新增Liability
                </Button>
                <LiabilityAdd
                    handleDialogClose={handleDialogClose}
                    addLiability={addLiability}
                    saveEdit={saveEdit}
                    partyName={partyName}
                    setPartyName={setPartyName}
                    isDialogOpen={isDialogOpen}
                    billMilestone={billMilestone}
                    setBillMilestone={setBillMilestone}
                    workTitle={workTitle}
                    setWorkTitle={setWorkTitle}
                    submarineCable={submarineCable}
                    setSubmarineCable={setSubmarineCable}
                    dialogAction={dialogAction}
                    lbRatio={lbRatio}
                    setLBRatio={setLBRatio}
                    modifyNote={modifyNote}
                    setModifyNote={setModifyNote}
                />
            </Grid>
            <Grid item xs={12}>
                <LiabilityQuery liabilityQuery={liabilityQuery} />
            </Grid>
            <Grid item xs={12}>
                <MainCard
                    title="Liability資料列表"
                    search
                    searchFunction={searchFunction}
                    searchWord={searchWord.current}
                    searchTitle={'會員搜尋'}
                >
                    <LiabilityDataList
                        listInfo={filterList.length > 0 ? filterList : listInfo}
                        setDialogAction={setDialogAction}
                        setIsDialogOpen={setIsDialogOpen}
                        setEditItem={setEditItem}
                        updatelistInfoItem={updatelistInfoItem}
                    />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default LiabilityManage;
