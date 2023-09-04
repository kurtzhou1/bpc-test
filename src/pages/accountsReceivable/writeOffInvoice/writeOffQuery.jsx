import { useEffect, useState } from 'react';
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// api
import { queryToDecutBill, getPartiesInfoList, submarineCableInfoList } from 'components/apis';

// ==============================|| SAMPLE PAGE ||============================== //

const WriteOffQuery = ({ setListInfo, queryApi, value }) => {
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [partyName, setPartyName] = useState(''); //會員代號
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [submarineCableList, setSubmarineCableList] = useState([]); //海纜名稱下拉選單
    const [partiesList, setPartiesList] = useState([]); //會員下拉選單
    const [billingNo, setBillingNo] = useState(''); //帳單號碼

    const initQuery = () => {
        setWorkTitle('');
        setPartyName('');
        setSubmarineCable('');
    };

    const writeOffQuery = () => {
        let tmpQuery = value === 0 ? '/Status=TO_WRITEOFF' : '/Status=COMPLETE';
        if (workTitle && workTitle !== '') {
            tmpQuery = tmpQuery + '&WorkTitle=' + workTitle;
        }
        if (partyName && partyName !== '') {
            tmpQuery = tmpQuery + '&PartyName=' + partyName;
        }
        if (submarineCable && submarineCable !== '') {
            tmpQuery = tmpQuery + '&SubmarineCable=' + submarineCable;
        }
        if (billingNo && billingNo !== '') {
            tmpQuery = tmpQuery + '&BillingNo=' + billingNo;
        }
        tmpQuery = queryToDecutBill + tmpQuery;
        queryApi.current = tmpQuery;
        console.log('tmpQuery=>>', tmpQuery);
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setListInfo(data);
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    };

    useEffect(() => {
        writeOffQuery();
    }, [value]);

    useEffect(() => {
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
    }, []);

    return (
        <MainCard title="帳單查詢" sx={{ width: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={2}>
                {/* row1 */}
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        會員：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇會員</InputLabel>
                        <Select value={partyName} label="會員" onChange={(e) => setPartyName(e.target.value)}>
                            {partiesList.map((i) => (
                                <MenuItem value={i}>{i}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
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
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        海纜作業：
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇海纜作業</InputLabel>
                        <Select value={workTitle} label="海纜作業" onChange={(e) => setWorkTitle(e.target.value)}>
                            <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                            <MenuItem value={'Construction'}>Construction</MenuItem>
                            <MenuItem value={'OM'}>OM</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                                帳單號碼：
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <FormControl fullWidth size="small">
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={billingNo}
                                    size="small"
                                    label="填寫帳單號碼"
                                    onChange={(e) => setBillingNo(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="end" alignItems="center">
                    <Button sx={{ mr: '0.5rem' }} variant="contained" onClick={writeOffQuery}>
                        查詢
                    </Button>
                    <Button variant="contained" onClick={initQuery}>
                        清除
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default WriteOffQuery;
