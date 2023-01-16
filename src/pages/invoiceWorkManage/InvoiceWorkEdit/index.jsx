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
    const [modifyItem, setModifyItem] = useState(-1);
    const [isValidated, setIsValidated] = useState(false);

    const fakeData = [
        {
            InvoiceWKMaster: {
                InvoiceNo: 'No Number',
                SupplierName: 'NEC',
                SubmarineCable: 'SJC2',
                WorkTitle: 'Construction',
                ContractType: 'SC',
                IssueDate: '2022/9/9',
                TotalAmount: 15466.92,
                Status: 'TEMPPORARY',
                IsPro: true,
                IsLiability: false,
                IsRecharge: false
            },
            InvoiceWKDetail: [
                {
                    BillMilestone: 'BM9b',
                    FeeType: '收費種類1',
                    FeeItem: 'BM9b Sea cable manufactured (8.5km spare cable)- Equipment (Off-Shore Korea)',
                    FeeAmount: 6849.91
                },
                {
                    BillMilestone: 'BM9b',
                    FeeType: '收費種類2',
                    FeeItem: 'BM9b Sea cable manufactured (8.5km spare cable)- Equipment (On-Shore Korea)',
                    FeeAmount: 1210.06
                },
                {
                    BillMilestone: 'BM9b',
                    FeeType: '收費種類2',
                    FeeItem: 'BM9b Sea cable manufactured (8.5km spare cable)- Service (Off-Shore Korea)',
                    FeeAmount: 7406.95
                }
            ]
        },
        {
            InvoiceWKMaster: {
                InvoiceNo: 'DT0170168-1',
                SupplierName: 'NEC',
                SubmarineCable: 'SJC2',
                WorkTitle: 'Construction',
                ContractType: 'SC',
                IssueDate: '2022/9/9',
                TotalAmount: 5582012.72,
                Status: 'TEMPPORARY',
                IsPro: true,
                IsLiability: false,
                IsRecharge: false
            },
            InvoiceWKDetail: [
                {
                    BillMilestone: 'BM9a',
                    FeeType: '收費種類1',
                    FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
                    FeeAmount: 1288822.32
                },
                {
                    BillMilestone: 'BM9a',
                    FeeType: '收費種類2',
                    FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
                    FeeAmount: 1178227.94
                },
                { BillMilestone: 'BM12', FeeType: '收費種類3', FeeItem: 'BM12 Branching Units (100%)-Equipment', FeeAmount: 1627300.92 }
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
        if ((modifyItem >= 0 && action === 'Edit') || (modifyItem >= 0 && action === '') || (modifyItem >= 0 && action === 'View')) {
            console.log('listInfo=>>', listInfo[modifyItem], listInfo[modifyItem], listInfo[modifyItem].InvoiceWKMaster);
            setSupplierName(listInfo[modifyItem].InvoiceWKMaster.SupplierName);
            setInvoiceNo(listInfo[modifyItem].InvoiceWKMaster.InvoiceNo);
            setSubmarineCable(listInfo[modifyItem].InvoiceWKMaster.SubmarineCable);
            setWorTitle(listInfo[modifyItem].InvoiceWKMaster.WorkTitle);
            setContractType(listInfo[modifyItem].InvoiceWKMaster.ContractType);
            setIssueDate(listInfo[modifyItem].InvoiceWKMaster.IssueDate);
            setDueDate(listInfo[modifyItem].InvoiceWKMaster.DueDate);
            setTotalAmount(listInfo[modifyItem].InvoiceWKMaster.TotalAmount);
            setIsPro(listInfo[modifyItem].InvoiceWKMaster.IsPro);
            setIsLiability(listInfo[modifyItem].InvoiceWKMaster.IsLiability);
            setIsRecharge(listInfo[modifyItem].InvoiceWKMaster.IsRecharge);
            setPartyName(listInfo[modifyItem].InvoiceWKMaster.PartyName);
            setInvoiceDetailInfo(listInfo[modifyItem].InvoiceWKDetail);
            setAction('');
        }
    }, [modifyItem]);

    useEffect(() => {
        if (action === 'Validated') {
            setIsValidated(true);
            setAction('');
        }
        if (action === '作廢') {
            console.log('作廢');
            setAction('');
        }
        if (action === 'Delete') {
            deletelistInfoItem(modifyItem);
            setAction('');
        }
    }, [action]);

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
            Number(totalAmount),
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
