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
    TextField,
    Checkbox,
    Autocomplete,
    Table,
    Tabs,
    Tab
} from '@mui/material';

// day
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// autocomplete
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// project import
import MainCard from 'components/MainCard';
import { BootstrapDialogTitle, TabPanel } from 'components/commonFunction';

// table
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// api
import { generateReport } from 'components/apis.jsx';

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

const CreditBalanceView = ({ cbView, handleViewClose, viewId }) => {
    const [listInfo, setListInfo] = useState([]);
    const [value, setValue] = useState(0);

    const itemDetailInitial = () => {
        setListInfo([]);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDownload = () => {
        let tmpData = {
            CBID: viewId,
            Download: true
        };
        fetch(generateReport, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: JSON.stringify(tmpData)
        })
            .then((res) => {
                return res.blob();
            })
            .then((blob) => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `CB報表.xlsx`;
                link.click();
            })
            .catch((e) => console.log('e1=>', e));
    };

    const getData = () => {
        let tmpData = {
            CBID: viewId,
            Download: false
        };
        fetch(generateReport, {
            method: 'POST',
            body: JSON.stringify(tmpData)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setListInfo(data);
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    useEffect(() => {
        if (cbView) {
            getData();
        }
    }, [cbView]);

    return (
        <Dialog maxWidth="xl" fullWidth open={cbView}>
            <BootstrapDialogTitle>檢視Credit Balance明細</BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="CB抵扣紀錄" {...a11yProps(0)} />
                                {/* <Tab label="退費紀錄" {...a11yProps(1)} /> */}
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <CreditBalanceDeduct cblistInfo={listInfo} />
                        </TabPanel>
                        {/* <TabPanel value={value} index={1}>
                            <CreditBalanceRefund cblistInfo={cblistInfo} />
                        </TabPanel> */}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleDownload();
                    }}
                >
                    產生CB報表
                </Button>
                <Button
                    sx={{ mr: '0.05rem' }}
                    variant="contained"
                    onClick={() => {
                        handleViewClose();
                        itemDetailInitial();
                    }}
                >
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreditBalanceView;
