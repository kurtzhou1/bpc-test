// project import
import SimpleBar from 'components/third-party/SimpleBar';
import Notification from './Notification';
import Setting from './Setting';
import Profile from './Profile';
import DrawerFooterStyled from './DrawerFooterStyled';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
    <DrawerFooterStyled
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
    >
        <Notification />
        <Setting />
        <Profile />
        {/* <NavCard /> */}
    </DrawerFooterStyled>
);

export default DrawerContent;
