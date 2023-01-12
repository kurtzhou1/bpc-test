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
import CreateInvoiceMain from './createInvoiceMain';
import CreateInvoiceDetail from './createInvoiceDetail';
import InvoiceDataList from './invoiceDataList';
import { TextField } from '@mui/material/index';

// ==============================|| SAMPLE PAGE ||============================== //

const InvoiceWorkManage = () => {
    const [invoiceDetailInfo, setInvoiceDetailInfo] = useState([]);
    const [supplierName, setSupplierName] = useState(''); //供應商
    const [invoiceNo, setInvoiceNo] = useState(''); //發票號碼
    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [workTitle, setWorTitle] = useState(''); //海纜作業
    const [contractType, setContractType] = useState(''); //合約種類
    const [issueDate, setIssueDate] = useState(new Date()); //發票日期
    const [dueDate, setDueDate] = useState(new Date()); //發票到期日
    const [totalAmount, setTotalAmount] = useState(0); //總金額
    const [isPro, setIsPro] = useState(false); //是否為Pro-forma
    const [isLiability, setIsLiability] = useState(false); //是否需攤分
    const [isRecharge, setIsRecharge] = useState(false); //是否為短腳補收
    const [partyName, setPartyName] = useState(''); //會員代號

    const [action, setAction] = useState('');
    const [modifyItem, setModifyItem] = useState('');
    const [isValidated, setIsValidated] = useState(false);

    const fakeData = [
        {
            InvoiceWKMaster: {
                invoiceNo: 'No Number',
                supplierName: 'NEC',
                submarineCable: 'SJC2',
                workTitle: 'Construction',
                contractType: 'SC',
                issueDate: '2022/9/9',
                totalAmount: 15466.92,
                Status: 'TEMPPORARY',
                isPro: true,
                isLiability: false,
                isRecharge: false
            },
            InvoiceWKDetail: [
                {
                    billMilestone: 'BM9b',
                    feeType: '收費種類1',
                    feeItem: 'BM9b Sea cable manufactured (8.5km spare cable)- Equipment (Off-Shore Korea)',
                    feeAmount: 6849.91
                },
                {
                    billMilestone: 'BM9b',
                    feeType: '收費種類2',
                    feeItem: 'BM9b Sea cable manufactured (8.5km spare cable)- Equipment (On-Shore Korea)',
                    feeAmount: 1210.06
                },
                {
                    billMilestone: 'BM9b',
                    feeType: '收費種類2',
                    feeItem: 'BM9b Sea cable manufactured (8.5km spare cable)- Service (Off-Shore Korea)',
                    feeAmount: 7406.95
                }
            ]
        },
        {
            InvoiceWKMaster: {
                invoiceNo: 'DT0170168-1',
                supplierName: 'NEC',
                submarineCable: 'SJC2',
                workTitle: 'Construction',
                contractType: 'SC',
                issueDate: '2022/9/9',
                totalAmount: 5582012.72,
                Status: 'TEMPPORARY',
                isPro: true,
                isLiability: false,
                isRecharge: false
            },
            InvoiceWKDetail: [
                {
                    billMilestone: 'BM9a',
                    feeType: '收費種類1',
                    feeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
                    feeAmount: 1288822.32
                },
                {
                    billMilestone: 'BM9a',
                    feeType: '收費種類2',
                    feeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
                    feeAmount: 1178227.94
                },
                { billMilestone: 'BM12', feeType: '收費種類3', feeItem: 'BM12 Branching Units (100%)-Equipment', feeAmount: 1627300.92 }
            ]
        }
    ];

    const [listInfo, setListInfo] = useState(fakeData);

    const createData = (
        InvoiceNo,
        SupplierName,
        SubmarineCable,
        WorkTitle,
        ContractType,
        IssueDate,
        DueDate,
        PartyName,
        Status,
        IsPro,
        IsRecharge,
        IsLiability,
        TotalAmount,
        CreateDate
    ) => {
        return {
            InvoiceNo,
            SupplierName,
            SubmarineCable,
            WorkTitle,
            ContractType,
            IssueDate,
            DueDate,
            PartyName,
            Status,
            IsPro,
            IsRecharge,
            IsLiability,
            TotalAmount,
            CreateDate
        };
    };

    useEffect(() => {
        console.log('modifyItem=>>', modifyItem);
        console.log('action=>>', action);
        if (action === 'Edit' || action === 'View') {
            listInfo.forEach((i) => {
                console.log('i=>>', i);
                if (i.InvoiceWKMaster.InvoiceNo === modifyItem) {
                    setSupplierName(i.InvoiceWKMaster.SupplierName);
                    setInvoiceNo(i.InvoiceWKMaster.InvoiceNo);
                    setSubmarineCable(i.InvoiceWKMaster.SubmarineCable);
                    setWorTitle(i.InvoiceWKMaster.WorkTitle);
                    setContractType(i.InvoiceWKMaster.ContractType);
                    setIssueDate(i.InvoiceWKMaster.IssueDate);
                    setDueDate(i.InvoiceWKMaster.DueDate);
                    setTotalAmount(i.InvoiceWKMaster.TotalAmount);
                    setIsPro(i.InvoiceWKMaster.IsPro);
                    setIsLiability(i.InvoiceWKMaster.IsLiability);
                    setIsRecharge(i.InvoiceWKMaster.IsRecharge);
                    setPartyName(i.InvoiceWKMaster.PartyName);
                    setInvoiceDetailInfo(i.InvoiceWKDetail);
                }
            });

            // setEditItem(editItem);
        }
        if (action === 'Validated') {
            setIsValidated(true);
        }
        if (action === '作廢') {
            console.log('作廢');
        }
        if (action === 'Delete') {
            deletelistInfoItem(modifyItem);
        }
        // setAction('');
    }, [action, modifyItem]);

    const fakeUrl = 'http://localhost:8000/api/v1/generateInvoiceWKMaster&InvoiceWKDetail&InvoiceMaster&InvoiceDetail';

    const addInvoiceInfo = () => {
        let tmpList = listInfo;
        let tmpArray = createData(
            invoiceNo.trim() === '' ? 'No.' + dayjs(new Date()).format('YYYYMMDDHHmmss') : invoiceNo,
            supplierName,
            submarineCable,
            workTitle,
            contractType,
            dayjs(issueDate).format('YYYY-MM-DD hh:mm:ss'),
            // issueDate,
            dayjs(dueDate).format('YYYY-MM-DD hh:mm:ss'),
            // dueDate,
            partyName,
            'TEMPPORARY',
            isPro === 'true' ? true : false,
            isRecharge === 'true' ? true : false,
            isLiability === 'true' ? true : false,
            totalAmount,
            dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss')
        );
        let combineArray = {
            InvoiceWKMaster: tmpArray,
            InvoiceWKDetail: invoiceDetailInfo
        };
        tmpList.push(combineArray);
        setListInfo([...tmpList]);
        itemDetailInitial();
        setInvoiceDetailInfo([]);
    };

    const deletelistInfoItem = (deleteItem) => {
        console.log('deleteItem=>>', deleteItem);
        let tmpArray = listInfo;
        tmpArray.splice(deleteItem, 1);
        setListInfo([...tmpArray]);
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
                                <InvoiceDataList
                                    listInfo={listInfo}
                                    setAction={setAction}
                                    setModifyItem={setModifyItem}
                                    isValidated={isValidated}
                                />
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
                                                    value={supplierName}
                                                    disabled={action === 'View'}
                                                    label="發票供應商"
                                                    onChange={(e) => setSupplierName(e.target.value)}
                                                >
                                                    <MenuItem value={'NEC'}>NEC</MenuItem>
                                                    <MenuItem value={'CIENA'}>CIENA</MenuItem>
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
                                                海纜代號：
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
                                                    value={submarineCable}
                                                    label="發票供應商"
                                                    disabled={action === 'View'}
                                                    onChange={(e) => setSubmarineCable(e.target.value)}
                                                >
                                                    <MenuItem value={'SJC2'}>SJC2</MenuItem>
                                                    <MenuItem value={'NCP'}>NCP</MenuItem>
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
                                                    value={contractType}
                                                    label="發票供應商"
                                                    disabled={action === 'View'}
                                                    onChange={(e) => setContractType(e.target.value)}
                                                >
                                                    <MenuItem value={'SC'}>SC</MenuItem>
                                                    <MenuItem value={'NSC'}>NSC</MenuItem>
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
                                                        value={dueDate}
                                                        onChange={(e) => setDueDate(e)}
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
                                                    value={isPro}
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    // defaultValue="female"
                                                    name="radio-buttons-group"
                                                    onChange={(e) => setIsPro(e.target.value)}
                                                >
                                                    <FormControlLabel
                                                        value={true}
                                                        disabled={action === 'View'}
                                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                                        label="Y"
                                                    />
                                                    <FormControlLabel
                                                        value={false}
                                                        disabled={action === 'View'}
                                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
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
                                                    value={isLiability}
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    // defaultValue="female"
                                                    name="radio-buttons-group"
                                                    onChange={(e) => setIsLiability(e.target.value)}
                                                >
                                                    <FormControlLabel
                                                        value={true}
                                                        disabled={action === 'View'}
                                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                                        label="Y"
                                                    />
                                                    <FormControlLabel
                                                        value={false}
                                                        disabled={action === 'View'}
                                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
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
                                                    value={isRecharge}
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                    onChange={(e) => setIsRecharge(e.target.value)}
                                                >
                                                    <FormControlLabel
                                                        value={true}
                                                        disabled={action === 'View'}
                                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                                        label="Y"
                                                    />
                                                    <FormControlLabel
                                                        value={false}
                                                        disabled={action === 'View'}
                                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
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
                                                    value={partyName}
                                                    variant="outlined"
                                                    size="small"
                                                    label="不須攤分請填寫代號"
                                                    onChange={(e) => setPartyName(e.target.value)}
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
                                <CreateInvoiceDetail
                                    setInvoiceDetailInfo={setInvoiceDetailInfo}
                                    invoiceDetailInfo={invoiceDetailInfo}
                                    action={action}
                                />
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
