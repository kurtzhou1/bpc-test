import { Box, IconButton, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';

// assets
import { SettingOutlined } from '@ant-design/icons';

const Setting = () => {
    const menu = useSelector((state) => state.menu);
    const { drawerOpen } = menu;
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexShrink: 0, ml: drawerOpen ? -3.5 : 0 }}>
                <IconButton disableRipple color="secondary" sx={{ color: 'text.primary' }} href="/Information">
                    <SettingOutlined />
                    {drawerOpen ? <ListItemText sx={{ flexShrink: 0, ml: 0.5 }}>Setting</ListItemText> : ''}
                </IconButton>
            </Box>
        </Box>
    );
};

export default Setting;
