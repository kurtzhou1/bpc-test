import { useEffect, useState } from 'react';
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// api
import { queryToDecutBill } from 'components/apis';

// redux
import { useSelector } from 'react-redux';

// ==============================|| SAMPLE PAGE ||============================== //

const WriteOffQuery = ({ setListInfo, queryApi, value }) => {
    const { partiesList, subCableList } = useSelector((state) => state.dropdown); //供應商下拉選單 + 海纜名稱下拉選單
    const [workTitle, setWorkTitle] = useState(''); //海纜作業
    const [partyName, setPartyName] = useState(''); //會員代號
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱

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
        // if (tmpQuery.includes('&')) {
        //     tmpQuery = tmpQuery.slice(0, -1);
        // }
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
                        <InputLabel id="demo-simple-select-label">選擇會員</InputLabel>
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
                        <InputLabel id="demo-simple-select-label">選擇海纜名稱</InputLabel>
                        <Select value={submarineCable} label="海纜名稱" size="small" onChange={(e) => setSubmarineCable(e.target.value)}>
                            {subCableList.map((i) => (
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
                        <InputLabel id="demo-simple-select-label">選擇海纜作業</InputLabel>
                        <Select value={workTitle} label="海纜作業" onChange={(e) => setWorkTitle(e.target.value)}>
                            <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                            <MenuItem value={'Construction'}>Construction</MenuItem>
                            <MenuItem value={'O&M'}>O&M</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} />
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
