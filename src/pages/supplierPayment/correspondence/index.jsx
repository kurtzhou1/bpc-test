import { useState, useRef } from 'react';

// project import
import { handleNumber, BootstrapDialogTitle } from 'components/commonFunction';
import CorrespondenceQuery from './correspondenceQuery';
import MainCard from 'components/MainCard';
import CorrespondenceMake from './correspondenceMake';
import ToEditDataList from './toEditDataList';
import { TabPanel } from 'components/commonFunction';
// material-ui
import {
    Typography,
    Button,
    Table,
    Dialog,
    DialogContent,
    DialogContentText,
    Grid,
    FormControl,
    InputLabel,
    Select,
    DialogActions,
    TextField,
    Box,
    Tabs,
    Tab
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';

import dayjs from 'dayjs';

import { toBillDataapi, sendJounary } from 'components/apis.jsx';

const Correspondence = () => {
    const [value, setValue] = useState(0);
    const [listInfo, setListInfo] = useState([]);
    const queryApi = useRef('/Status=PAYING');

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    //以下都無用
    const deductInfo = useRef({});
    const actionName = useRef('');
    const [isDialogOpen, setIsDialogOpen] = useState(false); //檢視
    const [infoTerminal, setInfoTerminal] = useState(false); //作廢
    const [uploadOpen, setUploadOpen] = useState(false); //上傳
    const [currentAmount, setCurrentAmount] = useState(''); //目前金額
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: theme.palette.common.gary,
            color: theme.palette.common.black,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        }
    }));

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleDialogOpen = (action, info) => {
        deductInfo.current = info;
        actionName.current = action;
        setIsDialogOpen(true);
    };

    const handleTerminalClose = () => {
        setInfoTerminal(false);
    };

    const handUploadClose = () => {
        setUploadOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <CorrespondenceQuery setListInfo={setListInfo} queryApi={queryApi} value={value} />
                </Grid>
                <Grid item xs={12}>
                    <MainCard title={`${value == 0 ? '未編輯' : '已編輯'}資料列表`}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                            <Tabs value={value} onChange={handleChange}>
                                <Tab label="未編輯" {...a11yProps(0)} />
                                <Tab label="已編輯" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <ToEditDataList />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <ToEditDataList />
                        </TabPanel>
                    </MainCard>
                </Grid>
            </Grid>
            <CorrespondenceMake isDialogOpen={isDialogOpen} handleDialogClose={handleDialogClose} listInfo={listInfo} />
        </>
    );
};

export default Correspondence;
