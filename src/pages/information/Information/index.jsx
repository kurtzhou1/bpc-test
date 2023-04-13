import { useEffect, useState } from 'react';
import { Grid, Button, IconButton, Box, Tabs, Tab, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';

// project import
import { TabPanel } from 'components/commonFunction';
import MainCard from 'components/MainCard';
import SupplierDataList from './supplierDataList';
import PartyDataList from './partyDataList';
import CorporatesDataList from './corporatesDataList';
import ContractDataList from './contractDataList';
import SubmarineCableDataList from './submarineCableDataList';

import CableWorkDataList from './cableWorkDataList';
import ContractTypeDataList from './contractTypeDataList';
import PartiesByContractDataList from './partiesByContractDataList';
import SuppliersByContractDataList from './SuppliersByContractDataList';
import CBPBankAccount from './cBPBankAccount';

const Information = () => {
    const [value, setValue] = useState(2);
    const tableH = document.getElementById('tableContainer')?.offsetTop;
    const maxHei = screen.height - tableH - 400;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    return (
        <Grid container spacing={1} id="tableContainer">
            <h2>基本資料管理</h2>
            <Grid item xs={12}>
                <MainCard
                    contentSX={{ py: 1, px: 0 }}
                    // title={`${
                    //     value == 0
                    //         ? '海纜代號'
                    //         : value == 1
                    //         ? '供應商'
                    //         : value == 2
                    //         ? '會員'
                    //         : value == 3
                    //         ? '合約'
                    //         : value == 4
                    //         ? '海纜作業'
                    //         : value == 5
                    //         ? '合約種類'
                    //         : value == 6
                    //         ? '合約會員'
                    //         : value == 7
                    //         ? '合約廠商'
                    //         : '聯盟金融帳戶'
                    // }資料列表`}
                    title={`${value == 0 ? '海纜代號' : value == 1 ? '供應商' : value == 2 ? '會員' : '聯盟金融帳戶'}資料列表`}
                >
                    <Box sx={{ p: 0, borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab sx={{ p: 0 }} label="海纜代號" {...a11yProps(0)} />
                            <Tab sx={{ p: 0 }} label="供應商" {...a11yProps(1)} />
                            <Tab sx={{ p: 0 }} label="會員" {...a11yProps(2)} />
                            <Tab sx={{ p: 0 }} label="聯盟金融帳戶" {...a11yProps(3)} />
                            {/* <Tab label="聯盟" {...a11yProps(3)} /> */}
                            {/* <Tab label="合約" {...a11yProps(3)} /> */}
                            {/* <Tab label="海纜作業" {...a11yProps(3)} /> */}
                            {/* <Tab label="合約種類" {...a11yProps(5)} /> */}
                            {/* <Tab label="合約會員" {...a11yProps(6)} /> */}
                            {/* <Tab label="合約廠商" {...a11yProps(7)} /> */}
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <SubmarineCableDataList maxHei={maxHei} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SupplierDataList maxHei={maxHei} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <PartyDataList maxHei={maxHei} />
                    </TabPanel>
                    {/* <TabPanel value={value} index={3}>
                        <CorporatesDataList />
                    </TabPanel> */}
                    {/* <TabPanel value={value} index={3}>
                        <ContractDataList />
                    </TabPanel> */}
                    {/* <TabPanel value={value} index={3}>
                        <CableWorkDataList maxHei={maxHei} />
                    </TabPanel> */}
                    {/* <TabPanel value={value} index={5}>
                        <ContractTypeDataList />
                    </TabPanel> */}
                    {/* <TabPanel value={value} index={6}>
                        <PartiesByContractDataList />
                    </TabPanel> */}
                    {/* <TabPanel value={value} index={7}>
                        <SuppliersByContractDataList />
                    </TabPanel> */}
                    <TabPanel value={value} index={3}>
                        <CBPBankAccount maxHei={maxHei} />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Information;
