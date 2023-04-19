import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    // const { user } = useAuth();
    if (123) {
        console.log('children=>>', children);
        // user is not authenticated
        return <Navigate to="/Login" />;
    }
    return children;
};

export default ProtectedRoute;
