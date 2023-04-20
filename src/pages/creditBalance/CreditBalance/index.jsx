import { useEffect, useState, useRef } from 'react';
import { Grid, Button, IconButton } from '@mui/material';
// import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import CreditBalanceQuery from './creditBalanceQuery';
import CreditBalanceDataList from './creditBalanceDataList';
import CreditBalanceAdd from './creditBalanceAdd';

// redux
import { useSelector } from 'react-redux';

const CreditBalance = () => {
    const { partiesList, subCableList } = useSelector((state) => state.dropdown); //供應商下拉選單 + 海纜名稱下拉選單
    const queryApi = useRef('');
    const [listInfo2, setListInfo] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [billMilestone, setBillMilestone] = useState(''); //記帳段號
    const [partyName, setPartyName] = useState([]); //會員名稱
    const [editItem, setEditItem] = useState(NaN);

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const itemDetailInitial = () => {
        setBillMilestone('');
        setPartyName([]);
    };

    //編輯
    const editlistInfoItem = () => {
        let tmpArray = listInfo[editItem];
        if (tmpArray) {
            setBillMilestone(tmpArray?.billMilestone);
            partyName.current = tmpArray?.partyName;
            setModifyNote(tmpArray?.modifyNote);
        }
    };

    useEffect(() => {
        itemDetailInitial();
        if (editItem >= 0) {
            editlistInfoItem();
            setIsDialogOpen(true);
        }
    }, [editItem]);

    const listInfo = [
        {
            BillingNo: null,
            BLDetailID: null,
            CBType: 'PREPAID',
            WorkTitle: 'Upgrade',
            CurrAmount: 53810.85,
            CNNo: null,
            LastUpdDate: '2023-03-30T09:35:48',
            CBID: 1,
            InvoiceNo: null,
            SubmarineCable: 'TPE',
            BillMilestone: 'BM1-3',
            PartyName: 'KT',
            CreateDate: '2023-03-30T14:00:00',
            Note: 'test'
        },
        {
            BillingNo: null,
            BLDetailID: null,
            CBType: 'MWG',
            WorkTitle: 'Construction',
            CurrAmount: null,
            CNNo: 'CN03CO-CU2304141743',
            LastUpdDate: null,
            CBID: 2,
            InvoiceNo: null,
            SubmarineCable: 'TPE',
            BillMilestone: null,
            PartyName: 'CU',
            CreateDate: '2023-04-14T17:43:45',
            Note: null
        },
        {
            BillingNo: null,
            BLDetailID: null,
            CBType: 'MWG',
            WorkTitle: 'Construction',
            CurrAmount: null,
            CNNo: 'CN03CO-CU2304141743',
            LastUpdDate: null,
            CBID: 3,
            InvoiceNo: null,
            SubmarineCable: 'TPE',
            BillMilestone: null,
            PartyName: 'CU',
            CreateDate: '2023-04-14T17:43:48',
            Note: null
        },
        {
            BillingNo: null,
            BLDetailID: null,
            CBType: 'MWG',
            WorkTitle: 'Construction',
            CurrAmount: null,
            CNNo: 'CN03CO-CU2304141743',
            LastUpdDate: null,
            CBID: 4,
            InvoiceNo: null,
            SubmarineCable: 'TPE',
            BillMilestone: null,
            PartyName: 'CU',
            CreateDate: '2023-04-14T17:43:49',
            Note: null
        }
    ];

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} display="flex" justifyContent="right">
                <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={handleDialogOpen}>
                    + 新增Credit Balance
                </Button>
                <CreditBalanceAdd
                    handleDialogClose={handleDialogClose}
                    isDialogOpen={isDialogOpen}
                    billMilestone={billMilestone}
                    partiesList={partiesList}
                    subCableList={subCableList}
                    queryApi={queryApi.current}
                    setListInfo={setListInfo}
                />
            </Grid>
            <Grid item xs={12}>
                <CreditBalanceQuery setListInfo={setListInfo} partiesList={partiesList} subCableList={subCableList} queryApi={queryApi} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="Credit Balance資料列表">
                    <CreditBalanceDataList listInfo={listInfo} setIsDialogOpen={setIsDialogOpen} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default CreditBalance;
