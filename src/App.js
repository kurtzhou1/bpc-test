// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
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
