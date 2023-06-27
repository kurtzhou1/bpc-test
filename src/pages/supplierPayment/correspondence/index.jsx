import { useState, useRef, useEffect } from 'react';

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

import { queryPaydraft } from 'components/apis.jsx';

const fakeData = [
    {
        PayDraftID: 2,
        PayMID: 2,
        Payee: '字串',
        InvoiceNo: '字串',
        SubmarineCable: '字串',
        WorkTitle: '字串',
        CableInfo: '字串',
        TotalFeeAmount: 208494.52,
        Subject: '字串',
        Address: '字串',
        CtactPerson: '字串',
        Tel: '字串',
        email: '字串',
        IssueDate: '字串',
        IssueNo: '字串',
        OriginalTo: '字串',
        CBPBankAcctNo: '字串',
        BankAcctName: '字串',
        BankName: '字串',
        BankAddress: '字串',
        BankAcctNo: '字串',
        IBAN: '字串',
        SWIFTCode: '字串',
        ACHNo: '字串',
        WireRouting: '字串',
        Status: 'TEMPORARY',
        PayeeType: 'SUPPLIER',
        URI: ''
    }
];

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

    const [isDialogOpen, setIsDialogOpen] = useState(false); //檢視

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const initQuery = () => {
        let tmpQuery = '/Status=TEMPORARY&PayeeType=SUPPLIER';
        tmpQuery = queryPaydraft + tmpQuery;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setListInfo(data);
                }
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    };

    useEffect(() => {
        initQuery();
    }, []);

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
                            {/* <ToEditDataList listInfo={fakeData} /> */}
                            <ToEditDataList listInfo={listInfo} />
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
