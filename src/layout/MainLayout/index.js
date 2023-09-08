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
    setSubmarineCableList,
    setPartiesList,
    setBillMileStoneList,
    setMessageStateOpen
} from 'store/reducers/dropdown';

// api
// import { supplierNameDropDownUnique, submarineCableList, billMilestoneLiabilityList, getPartiesInfoList } from 'components/apis.jsx';

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
    const { messageStateOpen, isLogin } = useSelector((state) => state.dropdown); //message狀態
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

    const authorize = () => {
        let tmpTest = 'https://iam-qa.cht.com.tw/auth/realms/B2E/protocol/openid-connect/auth?client_id=CBPS.QA.I&response_type=code&redirect_uri=http://internal-cbpsAlbFrontend-1323185980.ap-northeast-1.elb.amazonaws.com';
        window.location = tmpTest;
    }


    useEffect(() => {
        authorize();
        // let tmpData = {
        //     client_id: 'CBPS.QA.I',
        //     redirect_uri: 'http://internal-cbpsAlbFrontend-1323185980.ap-northeast-1.elb.amazonaws.com',
        //     response_type: 'code',
        //     scope: 'ldap',
        // }
        // let formBody = [];
        // for (let property in tmpData) {
        //     var encodedKey = encodeURIComponent(property);
        //     var encodedValue = encodeURIComponent(tmpData[property]);
        //     formBody.push(encodedKey + "=" + encodedValue);
        // }
        // formBody = formBody.join("&");
        // fetch(tmpTest, { method: 'GET', body: JSON.stringify(tmpData) })
       
    }, []);

    // useEffect(() => {
    //     if (isLogin) {
    //         //下拉選單 Redux
    //         // 計帳段號
    //         fetch(billMilestoneLiabilityList, { method: 'GET' })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 dispatch(setBillMileStoneList({ bmsList: data }));
    //             })
    //             .catch((e) => console.log('e1=>', e));
    //     }
    // }, [isLogin]);

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
                autoHideDuration={10000}
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
