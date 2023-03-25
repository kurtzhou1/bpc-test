import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography, Box } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';

import Logo from 'assets/images/logo.png';

// ================================|| LOGIN ||================================ //
const styles = {
    paperContainer: {
        // backgroundImage: `url(${'https://itbrief.com.au/uploads/story/2021/08/19/GettyImages-1219077605.webp'})`,
        backgroundImage: `url(${Logo})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '15rem',
        height: '5rem'
    }
};

const Login = () => (
    <AuthWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Login</Typography>
                    <Box
                        component="img"
                        sx={{
                            width: '10rem',
                            height: 'auto'
                        }}
                        src={Logo}
                    />
                    {/* <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                        Don&apos;t have an account?
                    </Typography> */}
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <AuthLogin />
            </Grid>
        </Grid>
    </AuthWrapper>
);

export default Login;
