// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

//test
// import { Routes, Route, useRoutes, Navigate } from 'react-router-dom';
import LoginRoutes from './routes/LoginRoutes';
import MainRoutes from './routes/MainRoutes';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
    // let element = useRoutes([MainRoutes, LoginRoutes]);
    // let login = useRoutes([LoginRoutes]);
    return (
        <ThemeCustomization>
            <ScrollTop>
                {/* {element} */}
                <Routes />
            </ScrollTop>
        </ThemeCustomization>
    );
};

export default App;
