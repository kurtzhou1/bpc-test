// import { useState } from 'react';

// project import

// material-ui
import { Typography, Button, Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';

const BilledDataList = ({ listInfo, setEditItem, deletelistInfoItem, BootstrapDialogTitle }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    console.log('isDialogOpen=>>', isDialogOpen);

    return (
        <>
            <Dialog onClose={handleDialogClose} maxWidth="sm" fullWidth open={isDialogOpen}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                    發票查詢
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                                供應商：
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">選擇供應商</InputLabel>
                                <Select
                                    // labelId="demo-simple-select-label"
                                    // id="demo-simple-select"
                                    value={billMilestone}
                                    label="記帳段號"
                                    onChange={(e) => setBillMilestone(e.target.value)}
                                >
                                    <MenuItem value={'供應商1號'}>供應商1號</MenuItem>
                                    <MenuItem value={'供應商2號'}>供應商2號</MenuItem>
                                    <MenuItem value={'供應商3號'}>供應商3號</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                                海纜名稱：
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">選擇海纜</InputLabel>
                                <Select
                                    // labelId="demo-simple-select-label"
                                    // id="demo-simple-select"
                                    value={lbRatio}
                                    label="海纜"
                                    onChange={(e) => setLBRatio(e.target.value)}
                                >
                                    <MenuItem value={5}>5%</MenuItem>
                                    <MenuItem value={10}>10%</MenuItem>
                                    <MenuItem value={15}>15%</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                            {dialogAction === 'Edit' ? (
                                <Typography
                                    variant="h5"
                                    sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                                >
                                    異動原因：
                                </Typography>
                            ) : (
                                ''
                            )}
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
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
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} />
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                            <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                                會員名稱：
                            </Typography>
                        </Grid>
                        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                            <Autocomplete
                                // multiple
                                // id="checkboxes-tags-demo"
                                options={parties}
                                // disableCloseOnSelect
                                onChange={(event, newValue) => {
                                    setPartyName(newValue);
                                }}
                                getOptionLabel={(option) => option.title}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        {/* <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 10 }}
                                        checked={selected}
                                    /> */}
                                        {option.title}
                                    </li>
                                )}
                                // style={{ width: 500 }}
                                // renderInput={(params) => <TextField {...params} label="選擇會員名稱" placeholder="Favorites" />
                                renderInput={(params) => <TextField {...params} label="選擇會員名稱" />}
                            />
                        </Grid>
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
                            <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={addLiability}>
                                新增
                            </Button>
                        </>
                    )}
                    <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleDialogClose}>
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
                <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">NO</StyledTableCell>
                            <StyledTableCell align="center">工作主檔ID</StyledTableCell>
                            <StyledTableCell align="center">發票代碼</StyledTableCell>
                            <StyledTableCell align="center">供應商</StyledTableCell>
                            <StyledTableCell align="center">海纜名稱</StyledTableCell>
                            <StyledTableCell align="center">合約種類</StyledTableCell>
                            <StyledTableCell align="center">發票日期</StyledTableCell>
                            <StyledTableCell align="center">明細數量</StyledTableCell>
                            <StyledTableCell align="center">總價</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listInfo?.map((row, id) => {
                            return (
                                <TableRow
                                    key={row.InvoiceWKMaster?.WKMasterID + row.InvoiceWKMaster?.InvoiceNo}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{id + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.WKMasterID}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.InvoiceNo}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.SupplierName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.SubmarineCable}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.WorkTitle}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {dayjs(row.InvoiceWKMaster.IssueDate).format('YYYY/MM/DD')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKDetail.length}</StyledTableCell>
                                    <StyledTableCell align="center">{row.InvoiceWKMaster.TotalAmount}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button
                                            color="primary"
                                            onClick={() => {
                                                setIsDialogOpen(true);
                                            }}
                                        >
                                            立帳作業
                                        </Button>
                                    </StyledTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default BilledDataList;
