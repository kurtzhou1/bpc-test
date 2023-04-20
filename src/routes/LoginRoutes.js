import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// ==============================|| AUTH ROUTING ||============================== //

const RequireAuth = ({ children }) => {
    const { isLogin } = useSelector((state) => state.dropdown);
    // let auth = localStorage.getItem('name');
    if (isLogin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: (
                <RequireAuth>
                    <AuthLogin />
                </RequireAuth>
            )
        }
    ]
};

export default LoginRoutes;
