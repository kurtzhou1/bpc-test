// assets
import { BarChartOutlined, TagOutlined } from '@ant-design/icons';

// constant
const icons = {
    BarChartOutlined,
    TagOutlined
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const liabilityManage = {
    id: 'liabilityManage',
    title: 'liabilityManage',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'item3',
            title: 'Liability',
            type: 'collapse',
            url: '/Liability/LiabilityManage',
            icon: icons.BarChartOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'item31',
                    title: 'Liability管理',
                    type: 'item',
                    url: '/Liability/LiabilityManage',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default liabilityManage;
