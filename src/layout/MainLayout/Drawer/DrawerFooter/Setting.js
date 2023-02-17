import { Box, IconButton, ListItemText } from '@mui/material';

// assets
import { SettingOutlined } from '@ant-design/icons';

const Setting = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexShrink: 0, ml: -3 }}>
                <IconButton disableRipple color="secondary" sx={{ color: 'text.primary' }} href="/Information">
                    <SettingOutlined />
                    {<ListItemText sx={{ flexShrink: 0, ml: 0.5 }}>Setting</ListItemText>}
                </IconButton>
            </Box>
        </Box>
    );
};

export default Setting;
