// material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ==============================|| DRAWER HEADER - STYLED ||============================== //

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        ...theme.mixins.toolbar,
        display: 'flex',
        flexFlow: open ? '' : 'column',
        alignItems: 'center',
        justifyContent: open ? 'space-around' : 'center',
        // paddingLeft: theme.spacing(open ? 3 : 0)
    }),
);

export default DrawerHeaderStyled;
