import { useEffect, useState } from 'react';
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import LiabilityQuery from './liabilityQuery';
import LiabilityDataList from './liabilityDataList';

// day
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField } from '@mui/material/index';

// ==============================|| SAMPLE PAGE ||============================== //

const LiabilityManage = () => {
    const [listInfo, setListInfo] = useState([]);

    const liabilityQuery = () => {
        console.log('liabilityQueryFunction');
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <LiabilityQuery liabilityQuery={liabilityQuery} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="發票資料建立列表">
                    <LiabilityDataList listInfo={listInfo} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default LiabilityManage;
