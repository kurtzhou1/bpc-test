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
            title: '立帳管理',
            type: 'collapse',
            url: '/CreateJournal',
            icon: icons.AuditOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'item21',
                    title: '有Liability',
                    type: 'item',
                    url: '/CreateJournal',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                },
                {
                    id: 'item22',
                    title: '無Liability',
                    type: 'item',
                    url: '/CreateJournal',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default createJournal;
