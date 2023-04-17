import { useEffect, useState, forwardRef, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery, Snackbar, CircularProgress } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from 'menu-items';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

// types
import { openDrawer } from 'store/reducers/menu';
import {
    setSupplierNameList,
    setSubmarineCableList,
    setPartiesList,
    setBillMileStoneList,
    setMessageStateOpen
} from 'store/reducers/dropdown';

// api
import {
    supplierNameList,
    submarineCableList,
    billMilestoneList,
    billMilestoneLiabilityList,
    getPartiesInfoList
} from 'components/apis.jsx';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
    const dispatch = useDispatch();

    const { drawerOpen } = useSelector((state) => state.menu);
    // drawer toggler
    const [open, setOpen] = useState(drawerOpen);
    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer({ drawerOpen: !open }));
    };

    //messageInfo
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenNow, setIsOpenNow] = useState(false);
    const timer = useRef();
    const { messageStateOpen } = useSelector((state) => state.dropdown); //message狀態
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} {...props} sx={{ fontSize: 16 }} />;
    });
    const handleLoading = () => {
        if (!isLoading) {
            setIsOpenNow(false);
            setIsLoading(true);
            timer.current = window.setTimeout(() => {
                setIsOpenNow(true);
                setIsLoading(false);
            }, 500);
        }
    };
    const handleClose = (event, reason) => {
        console.log('handleClose=>', reason);
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: false, severity: '', message: '' } }));
        setIsOpenNow(false);
    };

    // set media wise responsive drawer
    useEffect(() => {
        setOpen(!matchDownLG);
        dispatch(openDrawer({ drawerOpen: !matchDownLG }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownLG]);

    useEffect(() => {
        if (open !== drawerOpen) setOpen(drawerOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerOpen]);

    useEffect(() => {
        //下拉選單 Redux
        //供應商
        fetch(supplierNameList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                dispatch(setSupplierNameList({ supNmList: data }));
            })
            .catch((e) => console.log('e1=>', e));
        //海纜名稱
        fetch(submarineCableList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                dispatch(setSubmarineCableList({ subCableList: data }));
            })
            .catch((e) => console.log('e1=>', e));
        //會員名稱
        fetch(getPartiesInfoList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                dispatch(setPartiesList({ partiesList: data }));
            })
            .catch((e) => console.log('e1=>', e));
        // 記帳段號
        fetch(billMilestoneLiabilityList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                dispatch(setBillMileStoneList({ bmsList: data }));
            })
            .catch((e) => console.log('e1=>', e));
    }, []);

    useEffect(() => {
        if (messageStateOpen.isOpen) {
            handleLoading();
        }
    }, [messageStateOpen.isOpen]);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            {/* <Header open={open} handleDrawerToggle={handleDrawerToggle} /> */}
            {/* Side Bar */}
            <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
            {/* Content */}
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                {/* <Toolbar /> */}
                {/* <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} /> */}
                <Breadcrumbs navigation={navigation} title divider={false} />
                <Outlet sx={{ width: '100%' }} />
            </Box>
            {/* 警示按鈕 */}
            {isLoading && (
                <Box
                    sx={{
                        position: 'absolute',
                        width: '95vw',
                        height: '100%',
                        zIndex: 10000
                    }}
                >
                    <CircularProgress
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%'
                        }}
                        size={68}
                    />
                </Box>
            )}
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                // open={messageStateOpen.isOpen}
                open={isOpenNow}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={messageStateOpen.severity} sx={{ width: '100%' }}>
                    {messageStateOpen.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default MainLayout;
