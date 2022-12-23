import { useState } from 'react';
// import dayjs, { Dayjs } from 'dayjs';

// material-ui
import { Typography, Grid, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import CreateInvoiceMain from './createInvoiceMain';
import CreateInvoiceDetail from './createInvoiceDetail';

// ==============================|| SAMPLE PAGE ||============================== //

const InvoiceWorkManage = () => {
    const fakeData = {
        text: 'text'
    };

    const fakeUrl = 'http://localhost:8000/api/v1/generateInvoiceWKMaster&InvoiceWKDetail&InvoiceMaster&InvoiceDetail';

    const sendFake = () => {
        fetch(fakeUrl, { method: 'POST', body: JSON.stringify(fakeData) })
            .then((res) => res.json())
            .then((data) => {
                console.log('data=>>', data);
            })
            .catch((e) => console.log('e=>>', e));
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <MainCard sx={{ width: '100%' }}>
                    <Grid container display="flex" spacing={2}>
                        {/* 左 */}
                        <Grid item xs={6}>
                            <CreateInvoiceMain />
                        </Grid>
                        {/* 右 */}
                        <Grid item xs={6}>
                            <CreateInvoiceDetail />
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" spacing={1}>
                            <Button variant="contained" sx={{ m: '0.25rem' }}>
                                新增發票
                            </Button>
                            <Button variant="contained" sx={{ m: '0.25rem' }}>
                                全部清除
                            </Button>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={12}>
                <MainCard sx={{ width: '100%' }}>
                    <Grid container display="flex" spacing={2}>
                        <Grid item xs={12}>
                            <MainCard title="發票資料建立列表">
                                <Typography variant="body2">123</Typography>
                            </MainCard>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default InvoiceWorkManage;
