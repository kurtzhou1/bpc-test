import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// 數字格式化
export const handleNumber = (value) => {
    // if ((Number(value) === value && value % 1 === 0) || (Number(value) === value && value % 1 !== 0)) {
    if (value) {
        const tmpValue = value?.toString().replaceAll(',', '');
        const parts = tmpValue.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const partJoin = parts.join('.');
        return partJoin;
    } else {
        return '0';
    }

    // }
};

export const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 1 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};
