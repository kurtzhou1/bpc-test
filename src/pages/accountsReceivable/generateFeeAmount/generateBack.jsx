import { useState } from 'react';
import {
    Button,
    Box,
    Checkbox,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    TableBody,
    RadioGroup,
    Radio,
    Grid,
    Typography
} from '@mui/material';

// project
import { BootstrapDialogTitle } from 'components/commonFunction';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

// day
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// api
import { beforeDuction, afterDeduction } from 'components/apis.jsx';

// redux
// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const GenerateBack = ({ action, infoBack, handleBackClose, receivableQuery, editBillingNo, editBillMasterID }) => {
    const [isDefault, setIsDefault] = useState(1);
    const dispatch = useDispatch();

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

    const backBill = () => {
        const queryApi = action === 'toDeduct' ? beforeDuction : afterDeduction;
        let tmpArray = {
            BillMasterID: editBillMasterID
        };
        fetch(queryApi, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then(() => {
                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '退回成功' } }));
                receivableQuery();
                handleBackClose();
            })
            .catch((e) => console.log('e1=>', e));
    };

    return (
        <Dialog maxWidth="xs" fullWidth open={infoBack}>
            <BootstrapDialogTitle>確認退回訊息</BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                    {/* row3 */}
                    <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
                        <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                            {/* {`是否確定刪除${terminateInfo.BillMilestone}、${terminateInfo.PartyName}的Credit Balance資料`} */}
                            {`是否確定退回此${editBillingNo}帳單`}
                        </Typography>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={endNote}
                            size="small"
                            label="填寫終止原因"
                            onChange={(e) => setEndNote(e.target.value)}
                        />
                    </Grid> */}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        backBill();
                    }}
                >
                    確定
                </Button>

                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleBackClose}>
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
        // <Dialog
        //     // onClose={handleBackClose}
        //     maxWidth="xs"
        //     fullWidth
        //     open={infoBack}
        // >
        //     <BootstrapDialogTitle>選擇退回階段</BootstrapDialogTitle>
        //     <DialogContent dividers>
        //         <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
        //             <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
        //                 <TableHead>
        //                     <TableRow>
        //                         <StyledTableCell align="center"></StyledTableCell>
        //                         <StyledTableCell align="center">功能模組</StyledTableCell>
        //                         <StyledTableCell align="center">階段</StyledTableCell>
        //                         <StyledTableCell align="center">是否需跳轉</StyledTableCell>
        //                     </TableRow>
        //                 </TableHead>
        //                 <TableBody>
        //                     <TableRow
        //                         // key={row.InvoiceWKMaster?.invoiceNo + row.InvoiceWKMaster?.supplierName + id}
        //                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //                     >
        //                         <TableCell align="center">
        //                             {/* <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} /> */}
        //                             <RadioGroup
        //                                 row
        //                                 aria-labelledby="demo-radio-buttons-group-label"
        //                                 name="radio-buttons-group"
        //                                 value={isDefault}
        //                                 onChange={(e) => setIsDefault(e.target.value)}
        //                             >
        //                                 <Radio value={1} sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />
        //                             </RadioGroup>
        //                         </TableCell>
        //                         <StyledTableCell align="center">立帳作業</StyledTableCell>
        //                         <StyledTableCell align="center">已立帳</StyledTableCell>
        //                         <StyledTableCell align="center">
        //                             <Checkbox
        //                             // name={id}
        //                             // onChange={handleChange}
        //                             // checked={cbToCn.id}
        //                             // sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
        //                             />
        //                         </StyledTableCell>
        //                     </TableRow>
        //                     <TableRow
        //                         // key={row.InvoiceWKMaster?.invoiceNo + row.InvoiceWKMaster?.supplierName + id}
        //                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //                     >
        //                         <TableCell align="center">
        //                             {/* <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} /> */}
        //                             <RadioGroup
        //                                 row
        //                                 aria-labelledby="demo-radio-buttons-group-label"
        //                                 name="radio-buttons-group"
        //                                 value={isDefault}
        //                                 onChange={(e) => setIsDefault(e.target.value)}
        //                             >
        //                                 <Radio value={2} sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />
        //                             </RadioGroup>
        //                         </TableCell>
        //                         <StyledTableCell align="center">發票工作管理</StyledTableCell>
        //                         <StyledTableCell align="center">Validated</StyledTableCell>
        //                         <StyledTableCell align="center">
        //                             <Checkbox
        //                             // name={id}
        //                             // onChange={handleChange}
        //                             // checked={cbToCn.id}
        //                             // sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
        //                             />
        //                         </StyledTableCell>
        //                     </TableRow>
        //                 </TableBody>
        //             </Table>
        //         </TableContainer>
        //     </DialogContent>
        //     <DialogActions>
        //         <Button
        //             sx={{ mr: '0.05rem' }}
        //             variant="contained"
        //             onClick={() => {
        //                 terminalLiability();
        //             }}
        //         >
        //             確定
        //         </Button>

        //         <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleBackClose}>
        //             關閉
        //         </Button>
        //     </DialogActions>
        // </Dialog>
    );
};

export default GenerateBack;
