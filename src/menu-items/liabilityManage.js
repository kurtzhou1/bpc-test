// assets
import { PercentageOutlined, TagOutlined } from '@ant-design/icons';

// constant
const icons = {
    PercentageOutlined,
    TagOutlined
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const LiabilityManage = {
    id: 'Liability',
    title: 'liabilityManage',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'item8',
            title: 'Liability',
            type: 'collapse',
            url: '/Liability',
            icon: icons.PercentageOutlined,
            breadcrumbs: true,
        }
    ]
};

export default LiabilityManage;
