import { useEffect, useState } from 'react';
import { Grid, Button, IconButton, Box, Tabs, Tab, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import UploadFile from './uploadFile';
import UploadDataList from './uploadDataList';
// import { TabPanel } from 'components/commonFunction';
// import MainCard from 'components/MainCard';
// import SupplierDataList from './supplierDataList';
// import PartyDataList from './partyDataList';
// import CorporatesDataList from './corporatesDataList';
// import ContractDataList from './contractDataList';
// import SubmarineCableDataList from './submarineCableDataList';

// import CableWorkDataList from './cableWorkDataList';
// import ContractTypeDataList from './contractTypeDataList';
// import PartiesByContractDataList from './partiesByContractDataList';
// import SuppliersByContractDataList from './SuppliersByContractDataList';
// import CBPBankAccount from './cBPBankAccount';

const Information = () => {
    const [value, setValue] = useState(2);
    const tableH = document.getElementById('tableContainer')?.offsetTop;
    const [isUploadOpen, setIsUploadOpen] = useState(false); //簽核
    const maxHei = window.screen.height - tableH - 270;
    console.log('window.screen.height=>>', window.screen.height);

    const handleUploadOpen = () => {
        setIsUploadOpen(true);
    };

    const handleUploadClose = () => {
        setIsUploadOpen(false);
    };

    return (
        <Grid container spacing={1}>
        <Grid item xs={12} display="flex" justifyContent="right">
            <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={handleUploadOpen}>
                + 上傳檔案
            </Button>
            <UploadFile
                isUploadOpen={isUploadOpen}
                handleUploadClose={handleUploadClose}
                // receivableQuery={receivableQuery}
            />
        </Grid>
        <Grid item xs={12}>
                {/* <LiabilityQuery
                    setListInfo={setListInfo}
                    // bmStoneList={bmStoneList}
                    partyList={partyList}
                    submarineCableList={submarineCableList}
                    workTitleList={workTitleList}
                    queryApi={queryApi}
                /> */}
            </Grid>
            <Grid item xs={12}>
                {/* <MainCard title="Liability資料列表" search searchFunction={searchFunction} searchTitle={'會員搜尋'}> */}
                <MainCard title="上傳紀錄">
                    <UploadDataList />
                </MainCard>
            </Grid>
    </Grid>
    );
};

export default Information;
