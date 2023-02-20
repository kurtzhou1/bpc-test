import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// 發票工作管理
const InvoiceWorkManageCreate = Loadable(lazy(() => import('pages/invoiceWorkManage/InvoiceWorkCreate')));
const InvoiceWorkManageEdit = Loadable(lazy(() => import('pages/invoiceWorkManage/InvoiceWorkEdit')));
// const CreateJournal = Loadable(lazy(() => import('pages/createJournal')));

// Liability
const LiabilityManage = Loadable(lazy(() => import('pages/liability/LiabilityManage')));

// 立帳管理
const CreateJournal = Loadable(lazy(() => import('pages/createJournal/CreateJournal')));

// Credit Balance
const CreditBalance = Loadable(lazy(() => import('pages/creditBalance/CreditBalance')));

// 應收帳款管理
const GenerateFeeAmount = Loadable(lazy(() => import('pages/accountsReceivable/generateFeeAmount')));
const WriteOffInvoice = Loadable(lazy(() => import('pages/accountsReceivable/writeOffInvoice')));
const SupplierPayment = Loadable(lazy(() => import('pages/accountsReceivable/supplierPayment')));
const Correspondence = Loadable(lazy(() => import('pages/accountsReceivable/correspondence')));

// 基本資料設定
const Information = Loadable(lazy(() => import('pages/information/Information')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        },
        {
            path: 'InvoiceWorkManage',
            children: [
                {
                    path: 'InvoiceWorkCreate',
                    element: <InvoiceWorkManageCreate />
                },
                {
                    path: 'InvoiceWorkEdit',
                    element: <InvoiceWorkManageEdit />
                }
            ]
        },
        {
            path: 'Liability',
            children: [
                {
                    path: 'LiabilityManage',
                    element: <LiabilityManage />
                }
            ]
        },
        {
            path: 'CreditBalance',
            children: [
                {
                    path: 'CreditBalanceManage',
                    element: <CreditBalance />
                }
            ]
        },
        {
            path: 'CreateJournal',
            children: [
                {
                    path: 'CreateJournal',
                    element: <CreateJournal />
                }
            ]
        },
        {
            path: 'AccountsReceivable',
            children: [
                {
                    path: 'GenerateFeeAmount',
                    element: <GenerateFeeAmount />
                },
                {
                    path: 'WriteOffInvoice',
                    element: <WriteOffInvoice />
                },
                {
                    path: 'SupplierPayment',
                    element: <SupplierPayment />
                },
                {
                    path: 'Correspondence',
                    element: <Correspondence />
                }
            ]
        },
        {
            path: 'Information',
            element: <Information />
        }
        // {
        //     path: 'CreateJournal',
        //     element: <CreateJournal />
        // }
    ]
};

export default MainRoutes;
