// assets
import { DollarCircleOutlined, TagOutlined } from '@ant-design/icons';

// constant
const icons = {
    DollarCircleOutlined,
    TagOutlined
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const accountsReceivable = {
    id: 'accountsReceivable',
    title: 'accountsReceivable',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'item6',
            title: '應收帳款管理',
            type: 'collapse',
            url: '/AccountsReceivable/GenerateFeeAmount',
            icon: icons.DollarCircleOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'item61',
                    title: '產製應收帳款',
                    type: 'item',
                    url: '/AccountsReceivable/GenerateFeeAmount',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                },
                {
                    id: 'item62',
                    title: '銷帳',
                    type: 'item',
                    url: '/AccountsReceivable/WriteOffInvoice',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default accountsReceivable;
