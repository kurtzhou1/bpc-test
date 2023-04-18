import { useState } from 'react';
import {
    Button,
    FormControl,
    Box,
    Checkbox,
    Table,
    FormControlLabel,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    TableBody,
    RadioGroup,
    Radio
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
import { updateLiability } from 'components/apis.jsx';

const GenerateBack = ({ infoBack, handleBackClose }) => {
    const [isDefault, setIsDefault] = useState(1);

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

    const terminalLiability = () => {
        console.log('terminateInfo=>>', terminateInfo);
        let tmpArray = {
            LBRawID: terminateInfo.LBRawID,
            EndDate: terminateInfo.EndDate,
            EndNote: endNote ? endNote : ''
        };
        console.log('', tmpArray);
    };

    return (
        <Dialog
            // onClose={handleBackClose}
            maxWidth="xs"
            fullWidth
            open={infoBack}
        >
            <BootstrapDialogTitle>選擇退回階段</BootstrapDialogTitle>
            <DialogContent dividers>
                <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                    <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell align="center">功能模組</StyledTableCell>
                                <StyledTableCell align="center">階段</StyledTableCell>
                                <StyledTableCell align="center">是否需跳轉</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                // key={row.InvoiceWKMaster?.invoiceNo + row.InvoiceWKMaster?.supplierName + id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">
                                    {/* <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} /> */}
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        value={isDefault}
                                        onChange={(e) => setIsDefault(e.target.value)}
                                    >
                                        <Radio value={1} sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />
                                    </RadioGroup>
                                </TableCell>
                                <StyledTableCell align="center">立帳作業</StyledTableCell>
                                <StyledTableCell align="center">已立帳</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Checkbox
                                    // name={id}
                                    // onChange={handleChange}
                                    // checked={cbToCn.id}
                                    // sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                    />
                                </StyledTableCell>
                            </TableRow>
                            <TableRow
                                // key={row.InvoiceWKMaster?.invoiceNo + row.InvoiceWKMaster?.supplierName + id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">
                                    {/* <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} /> */}
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        value={isDefault}
                                        onChange={(e) => setIsDefault(e.target.value)}
                                    >
                                        <Radio value={2} sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />
                                    </RadioGroup>
                                </TableCell>
                                <StyledTableCell align="center">發票工作管理</StyledTableCell>
                                <StyledTableCell align="center">Validated</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Checkbox
                                    // name={id}
                                    // onChange={handleChange}
                                    // checked={cbToCn.id}
                                    // sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }}
                                    />
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        terminalLiability();
                    }}
                >
                    確定
                </Button>

                <Button sx={{ mr: '0.05rem' }} variant="contained" onClick={handleBackClose}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GenerateBack;
