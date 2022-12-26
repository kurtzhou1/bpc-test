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
            url: '/InvoiceWorkManage',
            icon: icons.DollarCircleOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'item41',
                    title: '產製應該帳款',
                    type: 'item',
                    url: '/CreateJournal',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                },
                {
                    id: 'item42',
                    title: '銷帳、廠商付款處理',
                    type: 'item',
                    url: '/CreateJournal',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default accountsReceivable;
