// assets
import { CreditCardOutlined, TagOutlined } from '@ant-design/icons';

// constant
const icons = {
    CreditCardOutlined,
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
            id: 'item5',
            title: 'CreditBalance',
            type: 'collapse',
            url: '/CreditBalance/CreditBalanceManage',
            icon: icons.CreditCardOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'item51',
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
