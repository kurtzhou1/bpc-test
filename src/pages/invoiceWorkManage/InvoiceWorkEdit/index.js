import { useEffect, useState } from 'react';
// import dayjs, { Dayjs } from 'dayjs';

// material-ui
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';
// material-ui
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
// project import
import MainCard from 'components/MainCard';
import InvoiceQuery from './invoiceQuery';
import CreateInvoiceDetail from './createInvoiceDetail';
import InvoiceDataList from './invoiceDataList';
import { TextField } from '@mui/material/index';

// ==============================|| SAMPLE PAGE ||============================== //

const InvoiceWorkManage = () => {
    const [invoiceDetailInfo, setInvoiceDetailInfo] = useState([]);
    const [supplyID, setSupplyID] = useState(); //供應商
    const [invoiceNo, setInvoiceNo] = useState(); //發票號碼
    const [submarineCable, setSubmarineCable] = useState(); //海纜名稱
    const [workTitle, setWorTitle] = useState(); //海纜作業
    const [contractType, setContractType] = useState(); //合約種類
    const [issueDate, setIssueDate] = useState(); //發票日期
    const [invoiceDueDate, setInvoiceDueDate] = useState(); //發票到期日
    const [totalAmount, setTotalAmount] = useState(0); //總金額
    const [isPro, setIsPro] = useState(); //是否為Pro-forma
    const [isLiability, setIsLiability] = useState(); //是否需攤分
    const [isRecharge, setIsRecharge] = useState(); //是否為短腳補收
    const [partyID, setPartyID] = useState(); //會員代號

    const [listInfo, setListInfo] = useState([]);
    const [action, setAction] = useState('');
    const [modifyItem, setModifyItem] = useState('');

    const fakeData = [
        {
            InvoiceWKMaster: {
                invoiceNo: 'M88989',
                supplyID: '供應商1號',
                submarineCable: '海纜海纜',
                contractType: '合約種類2號',
                issueDate: '2022/12/28',
                totalAmount: 98989898898,
                Status: 'TEMP'
            },
            InvoiceWKDetail: [
                { billMilestone: '第一段', feeType: '收費種類1', feeItem: '收費項目2', feeAmount: 123123123 },
                { billMilestone: '第二段', feeType: '收費種類2', feeItem: '收費項目3', feeAmount: 123123123 }
            ]
        },
        {
            InvoiceWKMaster: {
                invoiceNo: '9M88',
                supplyID: '供應商2號',
                submarineCable: '海纜二號',
                contractType: '合約種類3號',
                issueDate: '2022/12/30',
                totalAmount: 8888,
                Status: 'TEMP'
            },
            InvoiceWKDetail: [
                { billMilestone: '第一段', feeType: '收費種類1', feeItem: '收費項目2', feeAmount: 12313123 },
                { billMilestone: '第二段', feeType: '收費種類2', feeItem: '收費項目3', feeAmount: 1231223 },
                { billMilestone: '第三段', feeType: '收費種類3', feeItem: '收費項目3', feeAmount: 12312 }
            ]
        }
    ];

    const createData = (
        supplyID,
        invoiceNo,
        submarineCable,
        workTitle,
        contractType,
        issueDate,
        invoiceDueDate,
        totalAmount,
        isPro,
        isLiability,
        isRecharge,
        partyID
    ) => {
        return {
            supplyID,
            invoiceNo,
            submarineCable,
            workTitle,
            contractType,
            issueDate,
            invoiceDueDate,
            totalAmount,
            isPro,
            isLiability,
            isRecharge,
            partyID
        };
    };

    useEffect(() => {
        if (action === 'Edit' || action === 'View') {
            console.log('=>>', modifyItem);
            // setSupplyID(fakeData[modifyItem]);
        }
    }, [action]);

    const fakeUrl = 'http://localhost:8000/api/v1/generateInvoiceWKMaster&InvoiceWKDetail&InvoiceMaster&InvoiceDetail';

    const addInvoiceInfo = () => {
        let tmpList = listInfo;
        let tmpArray = createData(
            supplyID,
            invoiceNo,
            submarineCable,
            workTitle,
            contractType,
            dayjs(issueDate).format('YYYY/MM/DD'),
            dayjs(invoiceDueDate).format('YYYY/MM/DD'),
            totalAmount,
            isPro,
            isLiability,
            isRecharge,
            partyID
        );
        let combineArray = {
            InvoiceWKMaster: tmpArray,
            InvoiceWKDetail: invoiceDetailInfo
        };
        tmpList.push(combineArray);
        setListInfo([...tmpList]);
        // fetch(fakeUrl, { method: 'POST', body: JSON.stringify(combineArray) })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log('data=>>', data);
        //     })
        //     .catch((e) => console.log('e=>>', e));
    };

    const invoiceQuery = () => {
        console.log('invoiceQuery');
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <MainCard sx={{ width: '100%' }}>
                    <Grid container display="flex" spacing={2}>
                        <Grid item xs={12}>
                            <InvoiceQuery invoiceQuery={invoiceQuery} setAction={setAction} />
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={12}>
                <MainCard title="發票資料列表" sx={{ width: '100%' }}>
                    <Grid container display="flex" spacing={2}>
                        <Grid item xs={12}>
                            <MainCard>
                                <InvoiceDataList listInfo={fakeData} setAction={setAction} setModifyItem={setModifyItem} />
                            </MainCard>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            {action === 'Edit' || action === 'View' ? (
                <Grid item xs={12}>
                    <MainCard sx={{ width: '100%' }}>
                        <Grid container display="flex" spacing={2}>
                            {/* 左 */}
                            <Grid item xs={6}>
                                <MainCard title={`${action === 'Edit' ? '編輯' : ''}發票主檔案`} sx={{ height: '100%' }}>
                                    <Grid container display="flex" justifyContent="center" alignItems="center" spacing={1}>
                                        {/* row1 */}
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                            >
                                                供應商：
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel id="demo-simple-select-label" disabled={action === 'View'}>
                                                    選擇供應商
                                                </InputLabel>
                                                <Select
                                                    // labelId="demo-simple-select-label"
                                                    // id="demo-simple-select"
                                                    // value={supplyID}
                                                    disabled={action === 'View'}
                                                    label="發票供應商"
                                                    onChange={(e) => setSupplyID(e.target.value)}
                                                >
                                                    <MenuItem value={'供應商1號'}>供應商1號</MenuItem>
                                                    <MenuItem value={'供應商2號'}>供應商2號</MenuItem>
                                                    <MenuItem value={'供應商3號'}>供應商3號</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                            >
                                                發票號碼：
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                value={invoiceNo}
                                                disabled={action === 'View'}
                                                size="small"
                                                label="發票號碼"
                                                onChange={(e) => setInvoiceNo(e.target.value)}
                                            />
                                        </Grid>
                                        {/* row2 */}
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                            >
                                                海纜名稱：
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel id="demo-simple-select-label" disabled={action === 'View'}>
                                                    選擇海纜
                                                </InputLabel>
                                                <Select
                                                    // labelId="demo-simple-select-label"
                                                    // id="demo-simple-select"
                                                    // value={submarineCable}
                                                    label="發票供應商"
                                                    disabled={action === 'View'}
                                                    onChange={(e) => setSubmarineCable(e.target.value)}
                                                >
                                                    <MenuItem value={'海纜1號'}>海纜1號</MenuItem>
                                                    <MenuItem value={'海纜2號'}>海纜2號</MenuItem>
                                                    <MenuItem value={'海纜3號'}>海纜3號</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                            >
                                                海纜作業：
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4}>
                                            <TextField
                                                value={workTitle}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                label="填寫海纜作業"
                                                disabled={action === 'View'}
                                                onChange={(e) => setWorTitle(e.target.value)}
                                            />
                                        </Grid>
                                        {/* row3 */}
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                            >
                                                合約種類：
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel id="demo-simple-select-label" disabled={action === 'View'}>
                                                    選擇合約種類
                                                </InputLabel>
                                                <Select
                                                    // labelId="demo-simple-select-label"
                                                    // id="demo-simple-select"
                                                    // value={contractType}
                                                    label="發票供應商"
                                                    disabled={action === 'View'}
                                                    onChange={(e) => setContractType(e.target.value)}
                                                >
                                                    <MenuItem value={'合約種類1'}>合約種類1</MenuItem>
                                                    <MenuItem value={'合約種類2'}>合約種類2</MenuItem>
                                                    <MenuItem value={'合約種類3'}>合約種類3</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                            >
                                                發票日期：
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4}>
                                            <FormControl>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DesktopDatePicker
                                                        inputFormat="YYYY/MM/DD"
                                                        value={issueDate}
                                                        disabled={action === 'View'}
                                                        onChange={(e) => {
                                                            setIssueDate(e);
                                                        }}
                                                        // onChange={(e) => setIssueDate(e.target.value)}
                                                        renderInput={(params) => <TextField size="small" {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </FormControl>
                                        </Grid>
                                        {/* row4 */}
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                            >
                                                總金額：
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4}>
                                            <TextField
                                                value={totalAmount}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                type="number"
                                                label="填寫發票總金額"
                                                disabled={action === 'View'}
                                                onChange={(e) => {
                                                    setTotalAmount(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                            >
                                                發票到期日：
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4}>
                                            <FormControl fullWidth>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DesktopDatePicker
                                                        inputFormat="YYYY/MM/DD"
                                                        disabled={action === 'View'}
                                                        value={invoiceDueDate}
                                                        onChange={(e) => setInvoiceDueDate(e)}
                                                        renderInput={(params) => <TextField size="small" {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </FormControl>
                                        </Grid>
                                        {/* row5 */}
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                            >
                                                是否為Pro-Forma：
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    // value={isPro}
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    // defaultValue="female"
                                                    name="radio-buttons-group"
                                                    onChange={(e) => setIsPro(e.target.value)}
                                                >
                                                    <FormControlLabel
                                                        value={true}
                                                        disabled={action === 'View'}
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    '& .MuiSvgIcon-root': {
                                                                        fontSize: { lg: 14, xl: 20 }
                                                                    }
                                                                }}
                                                            />
                                                        }
                                                        label="Y"
                                                    />
                                                    <FormControlLabel
                                                        value={false}
                                                        disabled={action === 'View'}
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    '& .MuiSvgIcon-root': {
                                                                        fontSize: { lg: 14, xl: 20 }
                                                                    }
                                                                }}
                                                            />
                                                        }
                                                        label="N"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                            >
                                                是否需攤分：
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    // value={isLiability}
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    // defaultValue="female"
                                                    name="radio-buttons-group"
                                                    onChange={(e) => setIsLiability(e.target.value)}
                                                >
                                                    <FormControlLabel
                                                        value={true}
                                                        disabled={action === 'View'}
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    '& .MuiSvgIcon-root': {
                                                                        fontSize: { lg: 14, xl: 20 }
                                                                    }
                                                                }}
                                                            />
                                                        }
                                                        label="Y"
                                                    />
                                                    <FormControlLabel
                                                        value={false}
                                                        disabled={action === 'View'}
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    '& .MuiSvgIcon-root': {
                                                                        fontSize: { lg: 14, xl: 20 }
                                                                    }
                                                                }}
                                                            />
                                                        }
                                                        label="N"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        {/* row6 */}
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                            >
                                                是否為短繳補收：
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    // value={isRecharge}
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                    onChange={(e) => setIsRecharge(e.target.value)}
                                                >
                                                    <FormControlLabel
                                                        value={true}
                                                        disabled={action === 'View'}
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    '& .MuiSvgIcon-root': {
                                                                        fontSize: { lg: 14, xl: 20 }
                                                                    }
                                                                }}
                                                            />
                                                        }
                                                        label="Y"
                                                    />
                                                    <FormControlLabel
                                                        value={false}
                                                        disabled={action === 'View'}
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    '& .MuiSvgIcon-root': {
                                                                        fontSize: { lg: 14, xl: 20 }
                                                                    }
                                                                }}
                                                            />
                                                        }
                                                        label="N"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                            >
                                                {isLiability === 'true' ? '會員代號：' : ''}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4}>
                                            {isLiability === 'true' ? (
                                                <TextField
                                                    value={partyID}
                                                    variant="outlined"
                                                    size="small"
                                                    label="不須攤分請填寫代號"
                                                    onChange={(e) => setPartyID(e.target.value)}
                                                />
                                            ) : (
                                                ''
                                            )}
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>
                            {/* 右 */}
                            <Grid item xs={6}>
                                <CreateInvoiceDetail setInvoiceDetailInfo={setInvoiceDetailInfo} action={action} />
                            </Grid>
                            {action === 'Edit' ? (
                                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                                    <Button variant="contained" sx={{ ml: '0.25rem', mr: '0.25rem' }} onClick={addInvoiceInfo}>
                                        儲存編輯
                                    </Button>
                                    <Button variant="contained" sx={{ ml: '0.25rem', mr: '0.25rem' }}>
                                        取消編輯
                                    </Button>
                                </Grid>
                            ) : (
                                ''
                            )}
                        </Grid>
                    </MainCard>
                </Grid>
            ) : (
                ''
            )}
        </Grid>
    );
};

export default InvoiceWorkManage;
