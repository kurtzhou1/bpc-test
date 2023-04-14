// assets
import { PercentageOutlined } from '@ant-design/icons';

import { Box, IconButton, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';

// assets
// import { SettingOutlined } from '@ant-design/icons';

// constant
// const icons = {
//     PercentageOutlined,
//     TagOutlined
// };

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

// const liabilityManage = {
//     id: 'liabilityManage',
//     title: 'liabilityManage',
//     caption: 'Pages Caption',
//     type: 'group',
//     children: [
//         {
//             id: 'item3',
//             title: 'Liability',
//             type: 'collapse',
//             url: '/Liability/LiabilityManage',
//             icon: icons.PercentageOutlined,
//             breadcrumbs: true,
//             children: [
//                 {
//                     id: 'item31',
//                     title: 'Liability管理',
//                     type: 'item',
//                     url: '/Liability/LiabilityManage',
//                     icon: icons.TagOutlined,
//                     breadcrumbs: true
//                 }
//             ]
//         }
//     ]
// };

// export default liabilityManage;

const LiabilityManage = () => {
    const menu = useSelector((state) => state.menu);
    const { drawerOpen } = menu;
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexShrink: 0, ml: drawerOpen ? 0 : 0 }}>
                <IconButton disableRipple color="secondary" sx={{ color: 'text.primary' }} href="/Liability">
                    <PercentageOutlined />
                    {drawerOpen ? <ListItemText sx={{ flexShrink: 0, ml: 0.5 }}>Liability</ListItemText> : ''}
                </IconButton>
            </Box>
        </Box>
    );
};

export default LiabilityManage;
