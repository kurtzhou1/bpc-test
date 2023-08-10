import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { setIsLogin, setMessageStateOpen } from 'store/reducers/dropdown';

//api
import { generatetoken, checktoken } from 'components/apis.jsx';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    const [checked, setChecked] = React.useState(false);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);

    const loginNow = () => {
        dispatch(setIsLogin({ isLogin: true }));
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const localStorageService = ( dataJWT ) => {
        localStorage.setItem('accessToken',dataJWT.accessToken);
    };

    return (
        <>
            <Formik
                initialValues={{
                    account: '',
                    password: '',
                    // submit: null
                }}
                validationSchema={Yup.object().shape({
                    account: Yup.string().max(255).required('Account is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    console.log('values=>>', values);
                    // let tmpObj = {
                    //     "userid": "chang_ty", 
                    //     "password": "chang_ty_admin"
                    // }
                    let tmpObj = {
                        userid: values.account, 
                        password: values.password
                    }
                    fetch(generatetoken,  { method: 'POST', body: JSON.stringify(tmpObj) })
                    .then((res) => res.json())
                    .then((data) => {
                        if(data.cbps_access_token) {
                            console.log('data.cbps_access_token=>>', data.cbps_access_token)
                            localStorageService({accessToken: data.cbps_access_token});
                            fetch(checktoken, {
                                method: 'POST',
                                body: JSON.stringify({
                                    cbps_access_token: data.cbps_access_token
                                })
                            })
                            .then((res) => res.json())
                            .then((data2) => {
                                dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: `登入成功，${data2.UserCName}歡迎` } }));
                                dispatch(setIsLogin({ isLogin: true }));
                            })
                            .catch((e) =>  dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '登入失敗，請重新登入' } })));
                        } else {
                            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '登入錯誤，請檢查帳號密碼' } }));
                        }
                    })
                    .catch((e) => console.log('e1=>', e));
                    // localStorageService({accessToken: testData});
                    // try {
                    //     setStatus({ success: false });
                    //     setSubmitting(false);
                    // } catch (err) {
                    //     setStatus({ success: false });
                    //     setErrors({ submit: err.message });
                    //     setSubmitting(false);
                    // }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="account-login">Account</InputLabel>
                                    <OutlinedInput
                                        id="account-login"
                                        type="account"
                                        value={values.account}
                                        name="account"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter User Account"
                                        fullWidth
                                        error={Boolean(touched.account && errors.account)}
                                    />
                                    {touched.account && errors.account && (
                                        <FormHelperText error id="standard-weight-helper-text-account-login">
                                            {errors.account}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {/* <Grid item xs={12} sx={{ mt: -1 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={(event) => setChecked(event.target.checked)}
                                                name="checked"
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label={<Typography variant="h6">Keep me sign in</Typography>}
                                    />
                                    <Link variant="h6" component={RouterLink} to="" color="text.primary">
                                        Forgot Password?
                                    </Link>
                                </Stack>
                            </Grid> */}
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        // onClick={loginNow}
                                    >
                                        Login
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
