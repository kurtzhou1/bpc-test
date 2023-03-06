import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from 'menu-items';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

// types
import { openDrawer } from 'store/reducers/menu';
import { setSupplierNameList, setSubmarineCableList, setPartiesList } from 'store/reducers/dropdown';

// api
import {
    queryInvoice,
    generateInvoice,
    updateInvoice,
    deleteInvoiceWKMaster,
    deleteInvoiceWKDetail,
    supplierNameList,
    submarineCableList,
    billMilestoneList,
    queryBillMilestoneList,
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
            .catch((e) => console.log('e1=>>', e));
        //海纜名稱
        fetch(submarineCableList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                dispatch(setSubmarineCableList({ subCableList: data }));
            })
            .catch((e) => console.log('e1=>>', e));
        //會員名稱
        fetch(getPartiesInfoList, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                dispatch(setPartiesList({ partiesList: data }));
            })
            .catch((e) => console.log('e1=>>', e));
    }, []);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            {/* <Header open={open} handleDrawerToggle={handleDrawerToggle} /> */}
            <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                {/* <Toolbar /> */}
                {/* <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} /> */}
                <Breadcrumbs navigation={navigation} title divider={false} />
                <Outlet sx={{ width: '100%' }} />
            </Box>
        </Box>
    );
};

export default MainLayout;
