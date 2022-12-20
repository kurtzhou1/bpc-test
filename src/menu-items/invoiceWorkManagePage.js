// assets
import { HomeOutlined, FolderOpenOutlined, BarChartOutlined, DollarCircleOutlined, AuditOutlined } from '@ant-design/icons';

// constant
const icons = {
    FolderOpenOutlined,
    AuditOutlined
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const invoiceWorkManagePage = {
    id: 'pages',
    title: 'Pages123',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'invoice1',
            title: '發票工作管理',
            type: 'collapse',
            url: '/InvoiceWorkManage',
            icon: icons.FolderOpenOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'invoice11',
                    title: '立帳管理',
                    type: 'item',
                    url: '/CreateJournal',
                    // icon: icons.AuditOutlined,
                    breadcrumbs: true
                },
                {
                    id: 'invoice12',
                    title: '立帳管理',
                    type: 'item',
                    url: '/CreateJournal',
                    // icon: icons.AuditOutlined,
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default invoiceWorkManagePage;
