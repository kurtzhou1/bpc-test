import { useEffect, useState, useRef } from 'react';
import { Grid, Button, FormControl, InputLabel, Select, MenuItem, Box, TextField, Checkbox, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import JournalQuery from './journalQuery';
import ToBillDataList from './toBillDataList';
import BilledDataList from './billedDataList';
import InvalidateDataList from './invalidateDataList';
import { TabPanel } from 'components/commonFunction';

// dialog
import Dialog from '@mui/material/Dialog';
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
    const [value, setValue] = useState(0);
    const isFirst = useRef(true);
    const queryApi = useRef(queryJounary + '/all');
    const apiQuery = () => {
        let tmpQuery = '/';

        if (value === '0' || value === 0) {
            tmpQuery = tmpQuery + 'Status=' + 'VALIDATED' + '&';
        } else if (value === '1' || value === 1) {
            tmpQuery = tmpQuery + 'Status=' + 'BILLED' + '&';
        } else {
            tmpQuery = tmpQuery + 'Status=' + 'INVALID' + '&';
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

    const orderDate = (data) => {
        data.sort((a, b) => {
            return dayjs(b.InvoiceWKMaster.CreateDate).diff(dayjs(a.InvoiceWKMaster.CreateDate));
        });
    };

    const firstApiQuery = () => {
        let tmpQuery = '/';
        // if (value === '0' || value === 0) {
        tmpQuery = tmpQuery + 'Status=' + 'VALIDATED' + '&';
        // } else {
        // tmpQuery = tmpQuery + 'Status=' + 'BILLED' + '&';
        // }

        if (tmpQuery.includes('&')) {
            tmpQuery = tmpQuery.slice(0, -1);
        }

        tmpQuery = queryJounary + tmpQuery;
        queryApi.current = tmpQuery;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                orderDate(data);
                data = data.slice(0, 5);
                setListInfo(data);
                isFirst.current = false;
            })
            .catch((e) => console.log('e1=>>', e));
    };

    useEffect(() => {
        if (isFirst.current) {
            firstApiQuery();
        } else {
            apiQuery();
        }
    }, [value]);

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
                <MainCard title={`${value === 0 ? '尚未立帳' : value === 1 ? '已立帳' : '已作廢'}發票資料列表`}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="尚未立帳" {...a11yProps(0)} />
                            <Tab label="已立帳" {...a11yProps(1)} />
                            <Tab label="已作廢" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ToBillDataList listInfo={listInfo} apiQuery={apiQuery} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <BilledDataList listInfo={listInfo} apiQuery={apiQuery} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <InvalidateDataList listInfo={listInfo} apiQuery={apiQuery} />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default CreateJournal;
