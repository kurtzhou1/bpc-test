import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Paper } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import Logo from 'components/Logo';
import AuthFooter from 'components/cards/AuthFooter';
import test from './test.jpg';

const styles = {
    paperContainer: {
        // backgroundImage: `url(${'https://itbrief.com.au/uploads/story/2021/08/19/GettyImages-1219077605.webp'})`,
        backgroundImage: `url('./test.jpg')`,
        backgroundSize: 'cover',
        // color: 'white',
        color: '#000079',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem'
    }
};

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
    <Box sx={{ minHeight: '100vh' }}>
        <Paper style={styles.paperContainer}>
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                // sx={{
                //     minHeight: '100vh'
                // }}
            >
                {/* <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
                    <Logo />
                </Grid> */}
                <Grid item xs={12}>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
                    >
                        <Grid item>
                            <AuthCard>{children}</AuthCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </Box>
);

AuthWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthWrapper;
