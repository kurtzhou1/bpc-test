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
    Tabs,
    Tab
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import JournalQuery from './journalQuery';
import ToBillDataList from './toBillDataList';
import BilledDataList from './billedDataList';

// day
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

//icon
import Autocomplete from '@mui/material/Autocomplete';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

// api
import { queryJounary } from 'components/apis.jsx';

const CreateJournal = () => {
    // const fakeData = [
    //     {
    //         InvoiceWKMaster: {
    //             WKMasterID: 1,
    //             InvoiceNo: 'DT0170168-1',
    //             Description: 'COMMERCIAL …',
    //             SupplierName: 'NEC',
    //             SubmarineCable: 'SJC2',
    //             WorkTitle: 'Construction',
    //             ContractType: 'SC',
    //             IssueDate: '2022-09-09',
    //             DueDate: '2022-11-08',
    //             PartyName: '',
    //             Status: 'TEMPORARY',
    //             IsPro: false,
    //             IsRecharge: false,
    //             IsLiability: true,
    //             TotalAmount: 5582012.72,
    //             CreateDate: '2023-01-13'
    //         },
    //         InvoiceWKDetail: [
    //             {
    //                 WKMasterID: 1,
    //                 InvoiceNo: 'DT0170168-1',
    //                 SupplierName: 'NEC',
    //                 SubmarineCable: 'SJC2',
    //                 WorkTitle: 'Construction',
    //                 BillMilestone: 'BM9a',
    //                 FeeItem: 'BM9a…',
    //                 FeeAmount: 1288822.32
    //             }
    //         ]
    //     },
    //     {
    //         InvoiceWKMaster: {
    //             WKMasterID: 2,
    //             InvoiceNo: 'DT0170168-2',
    //             Description: 'COMMERCIAL',
    //             SupplierName: 'NEC',
    //             SubmarineCable: 'SJC2',
    //             WorkTitle: 'Construction',
    //             ContractType: 'SC',
    //             IssueDate: '2022-09-09',
    //             DueDate: '2022-11-08',
    //             PartyName: '',
    //             Status: 'TEMPORARY',
    //             IsPro: false,
    //             IsRecharge: false,
    //             IsLiability: true,
    //             TotalAmount: 5582012.72,
    //             CreateDate: '2023-01-13'
    //         },
    //         InvoiceWKDetail: [
    //             {
    //                 WKMasterID: 2,
    //                 InvoiceNo: 'DT0170168-1',
    //                 SupplierName: 'NEC',
    //                 SubmarineCable: 'SJC2',
    //                 WorkTitle: 'Construction',
    //                 BillMilestone: 'BM9a',
    //                 FeeItem: 'BM9a…',
    //                 FeeAmount: 1288822.32
    //             }
    //         ]
    //     }
    // ];
    const [listInfo, setListInfo] = useState([]);
    // const [billMilestone, setBillMilestone] = useState(''); //記帳段號
    // const [partyName, setPartyName] = useState([]); //會員名稱
    // const [lBRatio, setLBRatio] = useState(NaN); //攤分比例
    // const [editItem, setEditItem] = useState(NaN);
    // const [modifyNote, setModifyNote] = useState('');

    const [value, setValue] = useState(0);
    const queryApi = useRef(queryJounary + '/all');

    // const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    // const checkedIcon = <CheckBoxIcon fontSize="small" />;

    // const handleDialogClose = () => {
    //     setIsDialogOpen(false);
    // };

    // const itemDetailInitial = () => {
    //     setBillMilestone('');
    //     setPartyName('');
    //     setLBRatio(NaN);
    //     setModifyNote('');
    // };

    //刪除
    // const deletelistInfoItem = (deleteItem) => {
    //     let tmpArray = listInfo.map((i) => i);
    //     tmpArray.splice(deleteItem, 1);
    //     setListInfo([...tmpArray]);
    // };

    //編輯
    // const editlistInfoItem = () => {
    //     let tmpArray = listInfo[editItem];
    //     if (tmpArray) {
    //         setBillMilestone(tmpArray?.billMilestone);
    //         setPartyName(tmpArray?.partyName);
    //         setLBRatio(tmpArray?.lBRatio);
    //         setModifyNote(tmpArray?.modifyNote);
    //     }
    // };
    const apiQuery = () => {
        let tmpQuery = '/';

        if (value === '0' || value === 0) {
            tmpQuery = tmpQuery + 'Status=' + 'VALIDATED' + '&';
        } else {
            tmpQuery = tmpQuery + 'Status=' + 'BILLED' + '&';
        }

        if (tmpQuery.includes('&')) {
            tmpQuery = tmpQuery.slice(0, -1);
        }

        tmpQuery = queryJounary + tmpQuery;
        queryApi.current = tmpQuery;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('查詢成功=>>', data);
                setListInfo(data);
            })
            .catch((e) => console.log('e1=>>', e));
    };

    useEffect(() => {
        apiQuery();
    }, [value]);

    // useEffect(() => {
    //     itemDetailInitial();
    //     if (editItem >= 0) {
    //         editlistInfoItem();
    //     }
    // }, [editItem]);

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

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <JournalQuery setListInfo={setListInfo} queryApi={queryApi} invoiceStatus={value} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="發票資料列表">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="尚未立帳" {...a11yProps(0)} />
                            <Tab label="已立帳" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ToBillDataList listInfo={listInfo} BootstrapDialogTitle={BootstrapDialogTitle} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <BilledDataList listInfo={listInfo} BootstrapDialogTitle={BootstrapDialogTitle} apiQuery={apiQuery} />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default CreateJournal;
