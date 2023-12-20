import { useEffect, useState } from 'react';
import { Grid, Button, IconButton, Box, Tabs, Tab, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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

//api
import { submarineCableInfoList, supplierNameDropDownUnique, submarineCables, suppliers, getPartiesInfoList, parties, corporates } from 'components/apis.jsx';

const Information = () => {
    const [value, setValue] = useState(0);
    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
    const [supNmList, setSupNmList] = useState([]); //供應商下拉選單
    const tableH = document.getElementById('tableContainer')?.offsetTop;
    const maxHei = window.screen.height - tableH - 270;
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [supplierName, setSupplierName] = useState(''); //供應商
    const [partyName, setPartyName] = useState(''); //會員
    const [partiesList, setPartiesList] = useState([]); //會員下拉選單
    const [infoList, setInfoList] = useState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    const handleQuery = () => {
        let tmpQuery = '/view';
        let tmpObject = {}
        if (submarineCable && submarineCable !== '' && value === 0) {
            tmpObject.CableName = submarineCable;
        }
        if (submarineCable && submarineCable !== '' && value !== 0) {
            tmpObject.SubmarineCable = submarineCable;
        }
        if (workTitle && workTitle !== '' && value !== 0) {
            tmpObject.WorkTitle = workTitle;
        }
        if (supplierName && supplierName !== '' && value === 1) {
            tmpObject.SupplierName = supplierName;
        }
        if (partyName && partyName !== '' && value === 2) {
            tmpObject.PartyName = partyName;
        }
        if (value === 0) {
            tmpQuery = submarineCables + tmpQuery;
            console.log('tmpQuery=>>', tmpQuery);
            console.log('tmpObject=>>', tmpObject);
            fetch(tmpQuery, {
                method: 'POST',
                body: JSON.stringify(tmpObject)
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data=>>', data);
                    if(Array.isArray(data)){
                        setInfoList(data);
                    } else {
                        setInfoList([]);
                    }
                })
                .catch((e) => console.log('e1=>', e));
        } else if ( value === 1){
            tmpQuery = suppliers + tmpQuery;
            console.log('tmpQuery=>>', tmpQuery);
            console.log('tmpObject=>>', tmpObject);
            fetch(tmpQuery, {
                method: 'POST',
                body: JSON.stringify(tmpObject)
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data=>>', data);
                    if(Array.isArray(data)){
                        setInfoList(data);
                    } else {
                        setInfoList([]);
                    }
                })
                .catch((e) => console.log('e1=>', e));
        } else if (value === 2){
            tmpQuery = parties + tmpQuery;
            console.log('tmpQuery=>>', tmpQuery);
            console.log('tmpObject=>>', tmpObject);
            fetch(tmpQuery, {
                method: 'POST',
                body: JSON.stringify(tmpObject)
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data=>>', data);
                    if(Array.isArray(data)){
                        setInfoList(data);
                    } else {
                        setInfoList([]);
                    }
                })
                .catch((e) => console.log('e1=>', e));
        } else {
            tmpQuery = corporates + tmpQuery;
            console.log('tmpQuery=>>', tmpQuery);
            console.log('tmpObject=>>', tmpObject);
            fetch(tmpQuery, {
                method: 'POST',
                body: JSON.stringify(tmpObject)
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data=>>', data);
                    if(Array.isArray(data)){
                        setInfoList(data);
                    } else {
                        setInfoList([]);
                    }
                })
                .catch((e) => console.log('e1=>', e));
        }
    }

    const initQuery = () => {
        setSubmarineCable('');
        setWorkTitle('');
        setSupplierName('');
        setPartyName('');
    }

    useEffect(() => {
        fetch(supplierNameDropDownUnique, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log('data=>>', data);
                if(Array.isArray(data)) {
                    setSupNmList(data);
                }
            })
        .catch((e) => console.log('e1=>', e));
        //海纜名稱
        fetch(submarineCableInfoList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setSubmarineCableList(data);
            })
            .catch((e) => console.log('e1=>', e));
        //會員名稱
        fetch(getPartiesInfoList, { method: 'GET' })
           .then((res) => res.json())
           .then((data) => {
               setPartiesList(data);
           })
           .catch((e) => console.log('e1=>', e));
    }, [])

    useEffect(() => {
        initQuery();
    }, [value])

    return (
        <Grid container spacing={1} id="tableContainer">
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item sm={1} md={1} lg={1}>
                    <Typography sx={{ fontWeight: 'bold' ,fontSize: { lg: '0.7rem' ,xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        海纜名稱：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇海纜名稱</InputLabel>
                        <Select value={submarineCable} label="海纜名稱" size="small" onChange={(e) => setSubmarineCable(e.target.value)}>
                            {submarineCableList.map((i) => (
                                <MenuItem key={i.CableName} value={i.CableName}>
                                    {i.CableName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {value === 1 || value === 2 || value === 3 ? (
                    <>
                        <Grid item sm={1} md={1} lg={1}>
                            <Typography sx={{ fontWeight: 'bold' ,fontSize: { lg: '0.7rem' ,xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                                海纜作業：
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>選擇海纜作業</InputLabel>
                                <Select value={workTitle} label="海纜作業" onChange={(e) => setWorkTitle(e.target.value)}>
                                    <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                                    <MenuItem value={'Construction'}>Construction</MenuItem>
                                    <MenuItem value={'O&M'}>O&M</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </>
                ) : (
                    <Grid item xs={3} sm={3} md={3} lg={3} />
                )}
                {value === 1 ? (
                    <>
                        <Grid item sm={1} md={1} lg={1}>
                            <Typography sx={{ fontWeight: 'bold' ,fontSize: { lg: '0.7rem' ,xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                                供應商：
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>選擇供應商</InputLabel>
                                <Select value={supplierName} label="供應商" onChange={(e) => setSupplierName(e.target.value)}>
                                    {supNmList.map((i) => (
                                        <MenuItem key={i} value={i}>
                                            {i}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </>
                ) : value === 2 ? (
                    <>
                    <Grid item sm={1} md={1} lg={1}>
                        <Typography sx={{ fontWeight: 'bold' ,fontSize: { lg: '0.7rem' ,xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            會員名稱：
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>選擇會員名稱</InputLabel>
                            <Select value={partyName} label="會員" onChange={(e) => setPartyName(e.target.value)}>
                                {partiesList.map((i) => (
                                    <MenuItem key={i} value={i}>
                                        {i}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </>
                ) : (
                    <Grid item xs={3} sm={3} md={3} lg={3} />
                )
                }
                <Grid item xs={3} sm={3} md={3} lg={3} />
                <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="end" alignItems="center">
                    <Button sx={{ mr: '0.5rem' }} variant="contained" onClick={handleQuery}>
                        查詢
                    </Button>
                    <Button variant="contained" onClick={initQuery}>
                        清除
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                    <Box sx={{ p: 0, borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab sx={{ p: 0 }} label="海纜代號" {...a11yProps(0)} />
                            <Tab sx={{ p: 0 }} label="供應商" {...a11yProps(1)} />
                            <Tab sx={{ p: 0 }} label="會員" {...a11yProps(2)} />
                            <Tab sx={{ p: 0 }} label="聯盟金融帳戶" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <SubmarineCableDataList maxHei={maxHei} infoList={infoList} setInfoList={setInfoList} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SupplierDataList maxHei={maxHei} infoList={infoList} setInfoList={setInfoList}  />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <PartyDataList maxHei={maxHei} infoList={infoList} setInfoList={setInfoList}  />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <CBPBankAccount maxHei={maxHei} infoList={infoList} setInfoList={setInfoList}  />
                    </TabPanel>
            </Grid>
        </Grid>
    );
};

export default Information;
