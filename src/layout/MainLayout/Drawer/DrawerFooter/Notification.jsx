import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Badge,
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    Popper,
    Typography,
    useMediaQuery
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import { BellOutlined, CloseOutlined, GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';

// sx styles
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',

    transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const menu = useSelector((state) => state.menu);
    const { drawerOpen } = menu;

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const iconBackColorOpen = 'grey.300';
    const iconBackColor = 'grey.100';

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexShrink: 0, ml: 0 }}>
                <IconButton
                    disableRipple
                    color="secondary"
                    sx={{ color: 'text.primary' }}
                    aria-label="open profile"
                    ref={anchorRef}
                    aria-controls={open ? 'profile-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Badge badgeContent={4} color="primary">
                        <BellOutlined />
                    </Badge>
                    {drawerOpen ? <ListItemText sx={{ flexShrink: 0, ml: 0.5 }}>Notification</ListItemText> : ''}
                </IconButton>
                <Popper
                    // placement={matchesXs ? 'bottom' : 'bottom-end'}
                    placement={matchesXs ? 'right' : 'right-end'}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal={false}
                    popperOptions={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [matchesXs ? -5 : 0, 9]
                                }
                            }
                        ]
                    }}
                    sx={{
                        zIndex: 1800
                    }}
                >
                    {({ TransitionProps }) => (
                        <Transitions type="fade" in={open} {...TransitionProps}>
                            <Paper
                                sx={{
                                    boxShadow: theme.customShadows.z1,
                                    width: '100%',
                                    minWidth: 285,
                                    maxWidth: 420,
                                    [theme.breakpoints.down('md')]: {
                                        maxWidth: 285
                                    }
                                }}
                            >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MainCard
                                        title="Notification"
                                        elevation={0}
                                        border={false}
                                        content={false}
                                        secondary={
                                            <IconButton size="small" onClick={handleToggle}>
                                                <CloseOutlined />
                                            </IconButton>
                                        }
                                    >
                                        <List
                                            component="nav"
                                            sx={{
                                                p: 0,
                                                '& .MuiListItemButton-root': {
                                                    py: 0.5,
                                                    '& .MuiAvatar-root': avatarSX,
                                                    '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                                                }
                                            }}
                                        >
                                            <ListItemButton>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        sx={{
                                                            color: 'error.main',
                                                            bgcolor: 'error.lighter'
                                                        }}
                                                    >
                                                        {/* <GiftOutlined /> */}
                                                        <SettingOutlined />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        // <Typography variant="h6">
                                                        //     It&apos;s
                                                        //     <Typography component="span" variant="subtitle1">
                                                        //         Cristina danny&apos;s
                                                        //     </Typography>
                                                        //     birthday today.
                                                        // </Typography>
                                                        <Typography variant="h6">發票工作管理有一筆資料即將到期</Typography>
                                                    }
                                                    secondary="2 min ago"
                                                />
                                                <ListItemSecondaryAction>
                                                    <Typography variant="caption" noWrap>
                                                        3:00 AM
                                                    </Typography>
                                                </ListItemSecondaryAction>
                                            </ListItemButton>
                                            <Divider />
                                            <ListItemButton>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        sx={{
                                                            color: 'primary.main',
                                                            bgcolor: 'primary.lighter'
                                                        }}
                                                    >
                                                        <MessageOutlined />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        // <Typography variant="h6">
                                                        //     <Typography component="span" variant="subtitle1">
                                                        //         Aida Burg
                                                        //     </Typography>
                                                        //     commented your post.
                                                        // </Typography>
                                                        <Typography variant="h6">立帳管理有一筆資料即將到期</Typography>
                                                    }
                                                    secondary="5 August"
                                                />
                                                <ListItemSecondaryAction>
                                                    <Typography variant="caption" noWrap>
                                                        6:00 PM
                                                    </Typography>
                                                </ListItemSecondaryAction>
                                            </ListItemButton>
                                            <Divider />
                                            {/* <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="h6" color="primary">
                                                            View All
                                                        </Typography>
                                                    }
                                                />
                                            </ListItemButton> */}
                                        </List>
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        </Transitions>
                    )}
                </Popper>
            </Box>
        </Box>
    );
};

export default Notification;
