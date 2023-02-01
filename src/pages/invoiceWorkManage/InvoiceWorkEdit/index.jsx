import { useEffect, useState, useRef } from 'react';
// import dayjs from 'dayjs';

// material-ui
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';
// material-ui
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
// project import
import MainCard from 'components/MainCard';
import InvoiceQuery from './invoiceQuery';
import CreateInvoiceMain from './createInvoiceMain';
import CreateInvoiceDetail from './createInvoiceDetail';
import InvoiceDataList from './invoiceDataList';
import { TextField } from '@mui/material/index';

// api
import { queryInvoice, generateInvoice, updateInvoice, deleteInvoiceWKMaster, deleteInvoiceWKDetail } from 'components/apis';

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
    const wKMasterID = useRef(); //工作檔ID

    const [action, setAction] = useState('');
    const [modifyItem, setModifyItem] = useState(-1);

    const queryApi = useRef(queryInvoice + '/all');

    const fakeData = [
        {
            InvoiceWKMaster: {
                WKMasterID: 123,
                InvoiceNo: 'No Number',
                SupplierName: 'NEC',
                SubmarineCable: 'SJC2',
                WorkTitle: 'Construction',
                ContractType: 'SC',
                IssueDate: '2022/9/9',
                TotalAmount: 15466.92,
                Status: 'TEMPORARY',
                IsPro: 1,
                IsLiability: 0,
                IsRecharge: 0
            },
            InvoiceWKDetail: [
                {
                    BillMilestone: 'BM9b',
                    FeeItem: 'BM9b Sea cable manufactured (8.5km spare cable)- Equipment (Off-Shore Korea)',
                    FeeAmount: 6849.91
                },
                {
                    BillMilestone: 'BM9b',
                    FeeItem: 'BM9b Sea cable manufactured (8.5km spare cable)- Equipment (On-Shore Korea)',
                    FeeAmount: 1210.06
                },
                {
                    BillMilestone: 'BM9b',
                    FeeItem: 'BM9b Sea cable manufactured (8.5km spare cable)- Service (Off-Shore Korea)',
                    FeeAmount: 7406.95
                }
            ]
        },
        {
            InvoiceWKMaster: {
                WKMasterID: 456,
                InvoiceNo: 'DT0170168-1',
                SupplierName: 'NEC',
                SubmarineCable: 'SJC2',
                WorkTitle: 'Construction',
                ContractType: 'SC',
                IssueDate: '2022/9/9',
                TotalAmount: 5582012.72,
                Status: 'TEMPORARY',
                IsPro: 1,
                IsLiability: 1,
                IsRecharge: 1
            },
            InvoiceWKDetail: [
                {
                    BillMilestone: 'BM9a',
                    FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
                    FeeAmount: 1288822.32
                },
                {
                    BillMilestone: 'BM9a',
                    FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
                    FeeAmount: 1178227.94
                },
                { BillMilestone: 'BM12', FeeItem: 'BM12 Branching Units (100%)-Equipment', FeeAmount: 1627300.92 },
                {
                    BillMilestone: 'BM12',
                    FeeAmount: 1487661.54,
                    FeeItem: 'BM12 Branching Units (100%)-Service'
                }
            ]
        }
    ];

    const [listInfo, setListInfo] = useState(fakeData);

    const itemDetailInitial = () => {
        wKMasterID.current = 0;
        setSupplierName('');
        setInvoiceNo('');
        setSubmarineCable('');
        setWorTitle('');
        setContractType('');
        setIssueDate(new Date());
        setDueDate(new Date());
        setTotalAmount(0);
        setIsPro();
        setIsLiability();
        setIsRecharge();
        setPartyName('');
        setInvoiceDetailInfo([]);
    };

    const createData = (
        WKMasterID,
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
        TotalAmount
        // CreateDate
    ) => {
        return {
            WKMasterID,
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
            TotalAmount
            // CreateDate
        };
    };

    useEffect(() => {
        if ((modifyItem >= 0 && action === 'Edit') || (modifyItem >= 0 && action === '') || (modifyItem >= 0 && action === 'View')) {
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
            wKMasterID.current = listInfo[modifyItem].InvoiceWKMaster.WKMasterID;
            setAction('');
            setModifyItem(-1);
        }
    }, [modifyItem]);

    useEffect(() => {
        console.log('action=>>', action);
        if (action === 'Validated') {
            console.log('modifyItem=>>', listInfo[modifyItem].InvoiceWKMaster.WKMasterID);
            console.log('action=>>', action);
            let tmpArray = {
                WKMasterID: listInfo[modifyItem].InvoiceWKMaster.WKMasterID,
                Status: 'VALIDATED'
            };
            fetch(updateInvoice, { method: 'POST', body: JSON.stringify(tmpArray) })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data1=>>', data);
                })
                .catch((e) => console.log('e1=>>', e));
            fetch(queryApi.current, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data1=>>', data);
                    setListInfo(data);
                })
                .catch((e) => console.log('e1=>>', e));
            setAction('');
        }
        if (action === '作廢') {
            console.log('作廢大成功!!!!');
            let tmpArray = {
                WKMasterID: listInfo[modifyItem].InvoiceWKMaster.WKMasterID,
                Status: 'INVALID'
            };
            fetch(updateInvoice, { method: 'POST', body: JSON.stringify(tmpArray) })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data1=>>', data);
                })
                .catch((e) => console.log('e1=>>', e));
            fetch(queryApi.current, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data1=>>', data);
                    setListInfo(data);
                })
                .catch((e) => console.log('e1=>>', e));
            setAction('');
        }
        if (action === 'Delete' && listInfo[modifyItem].Status === 'TEMPORARY') {
            console.log('listInfo[modifyItem].InvoiceWKMaster=>>', listInfo[modifyItem].InvoiceWKMaster);
            let tmpArray = {
                WKMasterID: listInfo[modifyItem].InvoiceWKMaster.WKMasterID
            };
            fetch(deleteInvoiceWKMaster, { method: 'POST', body: JSON.stringify(tmpArray) })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data1=>>', data);
                })
                .catch((e) => console.log('e1=>>', e));
            fetch(deleteInvoiceWKDetail, { method: 'POST', body: JSON.stringify(tmpArray) })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data1=>>', data);
                })
                .catch((e) => console.log('e1=>>', e));
            // deletelistInfoItem(modifyItem);
            fetch(queryApi.current, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data1=>>', data);
                    setListInfo(data);
                })
                .catch((e) => console.log('e1=>>', e));
            setAction('');
        }
    }, [action]);

    const infoCheck = () => {
        // 金額確認
        let detailAmount = 0;
        invoiceDetailInfo.forEach((i) => {
            detailAmount = detailAmount + i.FeeAmount;
        });
        console.log('detailAmount=>>', detailAmount);
        console.log('totalAmount=>>', totalAmount);
        if (Number(totalAmount).toFixed(2) !== Number(detailAmount).toFixed(2)) {
            alert('總金額不等於費用項目金額加總');
            return false;
        }
        return true;
    };

    const addInvoiceInfo = () => {
        //防呆
        if (infoCheck()) {
            let tmpArray = createData(
                wKMasterID.current,
                invoiceNo.trim() === '' ? 'No.' + dayjs(new Date()).format('YYYYMMDDHHmmss') : invoiceNo,
                supplierName,
                submarineCable,
                workTitle,
                contractType,
                dayjs(issueDate).format('YYYY-MM-DD hh:mm:ss'),
                dayjs(dueDate).format('YYYY-MM-DD hh:mm:ss'),
                partyName,
                'TEMPORARY',
                isPro === '1' || isPro === 1 ? 1 : 0,
                isRecharge === '1' || isRecharge === 1 ? 1 : 0,
                isLiability === '1' || isLiability === 1 ? 1 : 0,
                Number(totalAmount)
            );
            let combineArray = {
                InvoiceWKMaster: tmpArray,
                InvoiceWKDetail: invoiceDetailInfo
            };
            fetch(deleteInvoiceWKMaster, { method: 'POST', body: JSON.stringify(wKMasterID.current) })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data1=>>', data);
                })
                .catch((e) => console.log('e1=>>', e));
            fetch(deleteInvoiceWKDetail, { method: 'POST', body: JSON.stringify(wKMasterID.current) })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data2=>>', data);
                })
                .catch((e) => console.log('e2=>>', e));
            fetch(generateInvoice, { method: 'POST', body: JSON.stringify(combineArray) })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data3=>>', data);
                })
                .catch((e) => console.log('e3=>>', e));
            // 重新query
            console.log('queryApi.current=>>', queryApi.current);
            fetch(queryApi.current, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data1=>>', data);
                    setListInfo(data);
                })
                .catch((e) => console.log('e1=>>', e));
            itemDetailInitial();
            setAction('');
        }
    };

    // const deletelistInfoItem = (deleteItem) => {
    //     console.log('deleteItem=>>', deleteItem);
    //     let tmpArray = listInfo;
    //     tmpArray.splice(deleteItem, 1);
    //     setListInfo([...tmpArray]);
    // };

    const cancelAdd = () => {
        itemDetailInitial();
        setAction('');
        setModifyItem(-1);
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <MainCard sx={{ width: '100%' }}>
                    <Grid container display="flex" spacing={2}>
                        <Grid item xs={12}>
                            <InvoiceQuery setListInfo={setListInfo} queryApi={queryApi} />
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={12}>
                <MainCard title="發票資料列表" sx={{ width: '100%' }}>
                    <Grid container display="flex" spacing={2}>
                        <Grid item xs={12}>
                            <MainCard>
                                <InvoiceDataList listInfo={listInfo} setAction={setAction} setModifyItem={setModifyItem} />
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
                                                        value={'1'}
                                                        disabled={action === 'View'}
                                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                                        label="Y"
                                                    />
                                                    <FormControlLabel
                                                        value={'0'}
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
                                                        value={'1'}
                                                        disabled={action === 'View'}
                                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                                        label="Y"
                                                    />
                                                    <FormControlLabel
                                                        value={'0'}
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
                                                        value={'1'}
                                                        disabled={action === 'View'}
                                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                                        label="Y"
                                                    />
                                                    <FormControlLabel
                                                        value={'0'}
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
                                                {isLiability === '1' || isLiability === 1 ? '會員代號：' : ''}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4}>
                                            {isLiability === '1' || isLiability === 1 ? (
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
                                    <Button variant="contained" sx={{ ml: '0.25rem', mr: '0.25rem' }} onClick={cancelAdd}>
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
