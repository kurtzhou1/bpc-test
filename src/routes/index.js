import { useRoutes } from 'react-router-dom';
// import routes from './routes';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    // return useRoutes([LoginRoutes, MainRoutes]);
    return useRoutes([MainRoutes, LoginRoutes]);
    // const isLoggedIn = false;
    // const routing = useRoutes(routes(isLoggedIn));
    // return { routing };
}
