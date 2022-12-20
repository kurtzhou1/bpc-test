// assets
import { HomeOutlined, FolderOpenOutlined, BarChartOutlined, DollarCircleOutlined, AuditOutlined } from '@ant-design/icons';

// icons
const icons = {
    HomeOutlined,
    BarChartOutlined,
    FolderOpenOutlined,
    DollarCircleOutlined,
    AuditOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'Home',
            title: 'Home',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.HomeOutlined,
            breadcrumbs: false
        }
        // {
        //     id: 'invoice1',
        //     title: '發票工作管理',
        //     type: 'collapse',
        //     url: '/InvoiceWorkManage',
        //     icon: icons.FolderOpenOutlined,
        //     breadcrumbs: true,
        //     children: [
        //         {
        //             id: 'invoice2',
        //             title: '立帳管理',
        //             type: 'item',
        //             url: '/CreateJournal',
        //             icon: icons.AuditOutlined,
        //             breadcrumbs: true
        //         }
        //     ]
        // },
        // {
        //     id: 'invoice2',
        //     title: '立帳管理',
        //     type: 'item',
        //     url: '/CreateJournal',
        //     icon: icons.AuditOutlined,
        //     breadcrumbs: true
        // },
        // {
        //     id: 'invoice3',
        //     title: 'Liability管理',
        //     type: 'item',
        //     url: '/LiabilityManage',
        //     icon: icons.BarChartOutlined,
        //     breadcrumbs: true
        // },
        // {
        //     id: 'invoice4',
        //     title: '應收帳款管理',
        //     type: 'item',
        //     url: '/AccountsReceivable',
        //     icon: icons.DollarCircleOutlined,
        //     breadcrumbs: true
        // }
    ]
};

export default dashboard;
