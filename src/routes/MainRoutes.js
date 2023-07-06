import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

import { Navigate } from 'react-router-dom';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// 發票工作管理
const InvoiceWorkManageCreate = Loadable(lazy(() => import('pages/invoiceWorkManage/InvoiceWorkCreate')));
const InvoiceWorkManageEdit = Loadable(lazy(() => import('pages/invoiceWorkManage/InvoiceWorkEdit')));
// const CreateJournal = Loadable(lazy(() => import('pages/createJournal')));

// Liability
const LiabilityManage = Loadable(lazy(() => import('pages/liability/LiabilityManage')));

// 立帳管理
const CreateJournal = Loadable(lazy(() => import('pages/createJournal/CreateJournal')));
const JournalQuery = Loadable(lazy(() => import('pages/createJournal/CreateJournalQuery')));

// Credit Balance
const CreditBalance = Loadable(lazy(() => import('pages/creditBalance/CreditBalance')));

// Credit Note
const CreditNote = Loadable(lazy(() => import('pages/creditNote/CreditNote')));

// 應收帳款管理
const GenerateFeeAmount = Loadable(lazy(() => import('pages/accountsReceivable/generateFeeAmount')));
const WriteOffInvoice = Loadable(lazy(() => import('pages/accountsReceivable/writeOffInvoice')));
const SupplierPayment = Loadable(lazy(() => import('pages/supplierPayment/supplierPayment')));
const Correspondence = Loadable(lazy(() => import('pages/supplierPayment/correspondence')));
const PaymentRecord = Loadable(lazy(() => import('pages/supplierPayment/paymentRecord')));

// 全域查詢
const ResearchBill = Loadable(lazy(() => import('pages/allResearch/researchBill')));
const ResearchInvoice = Loadable(lazy(() => import('pages/allResearch/researchInvoice')));
const ResearchJournal = Loadable(lazy(() => import('pages/allResearch/researchJournal')));

// 基本資料設定
const Information = Loadable(lazy(() => import('pages/information/Information')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

import { useSelector } from 'react-redux';

// ==============================|| MAIN ROUTING ||============================== //
const RequireAuth = ({ children }) => {
    const { isLogin } = useSelector((state) => state.dropdown);
    // let auth = localStorage.getItem('name');
    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: (
                <RequireAuth>
                    <DashboardDefault />
                </RequireAuth>
            )
        },
        {
            path: 'InvoiceWorkManage',
            children: [
                {
                    path: 'InvoiceWorkCreate',
                    element: (
                        <RequireAuth>
                            <InvoiceWorkManageCreate />
                        </RequireAuth>
                    )
                },
                {
                    path: 'InvoiceWorkEdit',
                    element: (
                        <RequireAuth>
                            <InvoiceWorkManageEdit />
                        </RequireAuth>
                    )
                }
            ]
        },
        {
            path: 'CreditBalance',
            children: [
                {
                    path: 'CreditBalanceManage',
                    element: (
                        <RequireAuth>
                            <CreditBalance />
                        </RequireAuth>
                    )
                }
            ]
        },
        {
            path: 'CreditNote',
            children: [
                {
                    path: 'CreditNoteManage',
                    element: (
                        <RequireAuth>
                            <CreditNote />
                        </RequireAuth>
                    )
                }
            ]
        },
        {
            path: 'CreateJournal',
            children: [
                {
                    path: 'CreateJournal',
                    element: (
                        <RequireAuth>
                            <CreateJournal />
                        </RequireAuth>
                    )
                }
            ]
        },
        {
            path: 'CreateJournal',
            children: [
                {
                    path: 'JournalQuery',
                    element: (
                        <RequireAuth>
                            <JournalQuery />
                        </RequireAuth>
                    )
                }
            ]
        },
        {
            path: 'AccountsReceivable',
            children: [
                {
                    path: 'GenerateFeeAmount',
                    element: (
                        <RequireAuth>
                            <GenerateFeeAmount />
                        </RequireAuth>
                    )
                },
                {
                    path: 'WriteOffInvoice',
                    element: (
                        <RequireAuth>
                            <WriteOffInvoice />
                        </RequireAuth>
                    )
                }
            ]
        },
        {
            path: 'SupplierPayment',
            children: [
                {
                    path: 'SupplierPayment',
                    element: (
                        <RequireAuth>
                            <SupplierPayment />
                        </RequireAuth>
                    )
                },
                {
                    path: 'Correspondence',
                    element: (
                        <RequireAuth>
                            <Correspondence />
                        </RequireAuth>
                    )
                },
                {
                    path: 'PaymentRecord',
                    element: (
                        <RequireAuth>
                            <PaymentRecord />
                        </RequireAuth>
                    )
                }
            ]
        },
        {
            path: 'AllResearch',
            children: [
                {
                    path: 'ResearchBill',
                    element: (
                        <RequireAuth>
                            <ResearchBill />
                        </RequireAuth>
                    )
                },
                {
                    path: 'ResearchInvoice',
                    element: (
                        <RequireAuth>
                            <ResearchInvoice />
                        </RequireAuth>
                    )
                },
                {
                    path: 'ResearchJournal',
                    element: (
                        <RequireAuth>
                            <ResearchJournal />
                        </RequireAuth>
                    )
                }
            ]
        },
        {
            path: 'Information',
            element: (
                <RequireAuth>
                    <Information />
                </RequireAuth>
            )
        },
        {
            path: 'Liability',
            element: (
                <RequireAuth>
                    <LiabilityManage />
                </RequireAuth>
            )
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
        }

        // {
        //     path: 'CreateJournal',
        //     element: <CreateJournal />
        // }
    ]
};

export default MainRoutes;
