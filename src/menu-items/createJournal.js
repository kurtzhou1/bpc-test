// assets
import { TagOutlined, AuditOutlined } from '@ant-design/icons';

// constant
const icons = {
    AuditOutlined,
    TagOutlined
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const createJournal = {
    id: 'createJournal',
    title: 'createJournal',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'item2',
            title: '立帳',
            type: 'collapse',
            url: '/CreateJournal/Journal',
            icon: icons.AuditOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'item21',
                    title: '立帳管理',
                    type: 'item',
                    url: '/CreateJournal/CreateJournal',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default createJournal;
