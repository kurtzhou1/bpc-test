import { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    IconButton,
    TextField,
    Checkbox,
    Autocomplete,
    Table
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// day
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// table
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const LiabilityAdd = ({
    handleDialogClose,
    addLiability,
    saveEdit,
    partyName,
    setPartyName,
    isDialogOpen,
    billMilestone,
    setBillMilestone,
    workTitle,
    setWorkTitle,
    submarineCable,
    setSubmarineCable,
    dialogAction,
    lbRatio,
    setLBRatio,
    modifyNote,
    setModifyNote
}) => {
    const [listInfo, setListInfo] = useState([]);
    // const [editItem, setEditItem] = useState(NaN);
    // const [isEdit, setIsEdit] = useState(false);

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const parties = ['Taiwan', 'Vietnam', 'Japan', 'Korean'];

    const itemDetailInitial = () => {
        setPartyName([]);
        setLBRatio('');
        // setIsEdit(false);
    };

    // //編輯
    // const editlistInfoItem = () => {
    //     let tmpArray = listInfo[editItem];

    //     if (tmpArray) {
    //         setPartyName([tmpArray?.PartyName]);
    //         setLBRatio(tmpArray?.LbRatio);
    //     }
    //     setIsEdit(true);
    // };

    //新增
    const addList = () => {
        let tmpArray = listInfo.map((i) => i);
        let partyArray = partyName;
        partyArray.forEach((e) => {
            tmpArray.push({
                BillMilestone: billMilestone,
                PartyName: e,
                LbRatio: lbRatio,
                SubmarineCable: submarineCable,
                WorkTitle: workTitle
            });
        });
        setListInfo([...tmpArray]);
        itemDetailInitial();
    };

    //刪除
    const deletelistInfoItem = (deleteItem) => {
        let tmpArray = listInfo.map((i) => i);
        tmpArray.splice(deleteItem, 1);
        setListInfo([...tmpArray]);
    };

    // useEffect(() => {
    //     if (editItem >= 0) {
    //         editlistInfoItem();
    //         // setIsListEdit(true);
    //     }
    // }, [editItem]);

    const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: theme.palette.common.gary,
            color: theme.palette.common.black,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        }
    }));

    return (
        <Dialog onClose={handleDialogClose} maxWidth="md" fullWidth open={isDialogOpen}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                新增Liability
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                    <Grid item xs={1} sm={1} md={1} lg={1} display="flex">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            記帳段號：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel size="small" id="billMilestone">
                                選擇記帳段號
                            </InputLabel>
                            <Select
                                // labelId="demo-simple-select-label"
                                // id="demo-simple-select"
                                fullWidth
                                value={billMilestone}
                                label="記帳段號"
                                size="small"
                                onChange={(e) => setBillMilestone(e.target.value)}
                            >
                                <MenuItem value={'BM9a'}>BM9a</MenuItem>
                                <MenuItem value={'BM9b'}>BM9b</MenuItem>
                                <MenuItem value={'BM12'}>BM12</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} display="flex">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            海纜名稱：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel size="small" id="billMilestone">
                                選擇海纜名稱
                            </InputLabel>
                            <Select
                                // labelId="demo-simple-select-label"
                                // id="demo-simple-select"
                                size="small"
                                value={submarineCable}
                                label="填寫海纜名稱"
                                onChange={(e) => setSubmarineCable(e.target.value)}
                            >
                                <MenuItem value={'海纜1號'}>海纜1號</MenuItem>
                                <MenuItem value={'海纜2號'}>海纜2號</MenuItem>
                                <MenuItem value={'海纜3號'}>海纜3號</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} display="flex">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            海纜作業：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel size="small" id="billMilestone">
                                選擇海纜作業
                            </InputLabel>
                            <Select
                                // labelId="demo-simple-select-label"
                                // id="demo-simple-select"
                                size="small"
                                value={workTitle}
                                label="填寫海纜作業"
                                onChange={(e) => setWorkTitle(e.target.value)}
                            >
                                <MenuItem value={'Construction'}>Construction</MenuItem>
                                <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                                <MenuItem value={'O&M'}>O&M</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* <Grid item xs={2} sm={2} md={2} lg={1} /> */}
                    <Grid item xs={1} sm={1} md={1} lg={1} display="flex">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            攤分比例：
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={lbRatio}
                            size="small"
                            label="填寫攤分比例"
                            onChange={(e) => setLBRatio(e.target.value)}
                        />
                    </Grid>
                    {/* <Grid item xs={6} sm={6} md={6} lg={6} /> */}
                    <Grid item xs={1} sm={1} md={1} lg={1} display="flex">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            會員名稱：
                        </Typography>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={parties}
                            value={partyName}
                            // disabled={isEdit}
                            disabled={dialogAction === 'Edit'}
                            size="small"
                            disableCloseOnSelect
                            onChange={(event, newValue) => {
                                setPartyName(newValue);
                            }}
                            getOptionLabel={(option) => option}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                                    {option}
                                </li>
                            )}
                            // style={{ width: 500 }}
                            // renderInput={(params) => <TextField {...params} label="選擇會員名稱" placeholder="Favorites" />
                            renderInput={(params) => <TextField {...params} label="選擇會員名稱" />}
                        />
                    </Grid>
                    {/* row3 */}
                    <Grid item xs={1} sm={1} md={1} lg={1} display="flex">
                        {dialogAction === 'Edit' ? (
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                                異動原因：
                            </Typography>
                        ) : (
                            ''
                        )}
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        {dialogAction === 'Edit' ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={modifyNote}
                                size="small"
                                label="填寫異動原因"
                                onChange={(e) => setModifyNote(e.target.value)}
                            />
                        ) : (
                            ''
                        )}
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} display="flex" alignItems="center" justifyContent="end">
                        {dialogAction !== 'Edit' ? (
                            <Button
                                size="small"
                                style={{ maxWidth: '2rem', maxHeight: '2rem', minWidth: '2rem', minHeight: '2rem' }}
                                variant="contained"
                                onClick={addList}
                            >
                                +
                            </Button>
                        ) : (
                            ''
                        )}
                    </Grid>
                    {dialogAction !== 'Edit' ? (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
                                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">記帳段號</StyledTableCell>
                                            <StyledTableCell align="center">會員名稱</StyledTableCell>
                                            <StyledTableCell align="center">攤分比例</StyledTableCell>
                                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                                            <StyledTableCell align="center">海纜作業</StyledTableCell>
                                            <StyledTableCell align="center">Action</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listInfo?.map((row, id) => {
                                            return (
                                                <TableRow
                                                    // key={row.InvoiceWKMaster?.invoiceNo + row.InvoiceWKMaster?.supplierName + id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <StyledTableCell align="center">{row.BillMilestone}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.PartyName}</StyledTableCell>
                                                    <StyledTableCell align="center">{`${row.LbRatio}%`}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.WorkTitle}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.SubmarineCable}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Button
                                                            color="error"
                                                            onClick={() => {
                                                                deletelistInfoItem(id);
                                                            }}
                                                        >
                                                            刪除
                                                        </Button>
                                                    </StyledTableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    ) : (
                        ''
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                {dialogAction === 'Edit' ? (
                    <>
                        <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={saveEdit}>
                            儲存
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            sx={{ mr: '0.05rem' }}
                            variant="contained"
                            onClick={() => {
                                addLiability(listInfo);
                                setListInfo([]);
                            }}
                        >
                            儲存
                        </Button>
                    </>
                )}
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleDialogClose();
                        itemDetailInitial();
                    }}
                >
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LiabilityAdd;
