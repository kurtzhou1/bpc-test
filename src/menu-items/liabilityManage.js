// assets
import { BarChartOutlined, TagOutlined } from '@ant-design/icons';

// constant
const icons = {
    BarChartOutlined,
    TagOutlined
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const liabilityManage = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'item3',
            title: 'Liability管理',
            type: 'collapse',
            url: '/InvoiceWorkManage',
            icon: icons.BarChartOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'item31',
                    title: 'Liability管理',
                    type: 'item',
                    url: '/CreateJournal',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                },
                {
                    id: 'item32',
                    title: 'Liability管理',
                    type: 'item',
                    url: '/CreateJournal',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default liabilityManage;
