// assets
import { SearchOutlined, TagOutlined } from '@ant-design/icons';

// constant
const icons = {
    SearchOutlined,
    TagOutlined
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const AllResearch = {
    id: 'allResearch',
    title: 'allResearch',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'item6',
            title: '發票帳單全域查詢',
            type: 'collapse',
            url: '/AllResearch/ResearchBill',
            icon: icons.SearchOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'item61',
                    title: '發票查帳單',
                    type: 'item',
                    url: '/AllResearch/ResearchBill',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                },
                {
                    id: 'item62',
                    title: '帳單查發票',
                    type: 'item',
                    url: '/AllResearch/ResearchInvoice',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                },
                {
                    id: 'item63',
                    title: '發票查立帳資訊',
                    type: 'item',
                    url: '/AllResearch/ResearchJournal',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default AllResearch;
