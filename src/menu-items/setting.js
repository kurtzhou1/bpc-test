// assets
import { SettingOutlined, TagOutlined } from '@ant-design/icons';

// constant
const icons = {
    SettingOutlined,
    TagOutlined
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const Setting = {
    id: 'Data',
    title: 'setting',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'item11',
            title: '基本資料設定',
            type: 'item',
            url: '/Setting',
            icon: icons.SettingOutlined,
            breadcrumbs: true,
        }
    ]
};

export default Setting;
