// assets
import { SnippetsOutlined, TagOutlined } from '@ant-design/icons';

// constant
const icons = {
    SnippetsOutlined,
    TagOutlined
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const CreditBalanceManage = {
    id: 'creditBalanceManage',
    title: 'creditBalanceManage',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'item4',
            title: 'CreditBalance',
            type: 'collapse',
            url: '/CreditBalance/CreditBalanceManage',
            icon: icons.SnippetsOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'item41',
                    title: 'CreditBalance管理',
                    type: 'item',
                    url: '/CreditBalance/CreditBalanceManage',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default CreditBalanceManage;
