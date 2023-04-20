import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    // const { user } = useAuth();
    const { isLogin } = useSelector((state) => state.dropdown); //供應商下拉選單 + 海纜名稱下拉選單
    console.log('isLogin=>>', isLogin);
    if (undefined) {
        // user is not authenticated
        return <Navigate to="/Login" />;
    }
    return children;
};

export default ProtectedRoute;
