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
            id: 'item4',
            title: '應收帳款管理',
            type: 'collapse',
            url: '/AccountsReceivable/GenerateFeeAmount',
            icon: icons.DollarCircleOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'item41',
                    title: '產製應收帳款',
                    type: 'item',
                    url: '/AccountsReceivable/GenerateFeeAmount',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                },
                {
                    id: 'item42',
                    title: '銷帳',
                    type: 'item',
                    url: '/AccountsReceivable/WriteOffInvoice',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                },
                {
                    id: 'item43',
                    title: '廠商付款處理',
                    type: 'item',
                    url: '/AccountsReceivable/SupplierPayment',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                },
                {
                    id: 'item44',
                    title: '函稿製作',
                    type: 'item',
                    url: '/AccountsReceivable/Correspondence',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default accountsReceivable;
