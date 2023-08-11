import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

//api
import { checktoken } from 'components/apis.jsx';
import { ConstructionOutlined } from '../../node_modules/@mui/icons-material/index';
import { useDispatch } from 'react-redux';
import { setIsLogin } from 'store/reducers/dropdown';

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

// ==============================|| MAIN ROUTING ||============================== //
// const RequireAuth = ({ children }) => {
//     const { isLogin } = useSelector((state) => state.dropdown);
//     const dispatch = useDispatch();
//     const getAccessToken = localStorage.getItem('accessToken');
//     console.log('isLogin=>>', isLogin)
   
//     if ( !isLogin ) {
//     // 若沒帳號登入，從別的頁面強制登入
//         if ( getAccessToken ) {
//             console.log('2=>>', getAccessToken)
//             fetch(checktoken, {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     cbps_access_token: getAccessToken
//                 })
//             })
//             .then((res) => res.json())
//             .then((data) => {
//                 if ( data.UserCName ) {
//                     console.log('4=>>', isLogin);
//                     dispatch(setIsLogin({ isLogin: true }));
//                     return children;
//                 } else {
//                     console.log('5=>>');
//                     return <Navigate to="/login" replace />;
//                 }
//             })
//             .catch((e) => {
//                 return <Navigate to="/login" replace />;
//             });
//         } else {
//             return <Navigate to="/login" replace />;
//         }
//         return <Navigate to="/login" replace />;
//     } else {
//     // 若有帳號登入，檢查Token是否到期
//         if ( getAccessToken ) {
//             fetch(checktoken, {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     cbps_access_token: getAccessToken
//                 })
//             })
//             .then((res) => res.json())
//             .then((data) => {
//                 if ( data.UserCName ) {
//                     return children;
//                 } else {
//                     console.log('5=>>');
//                     dispatch(setIsLogin({ isLogin: false }));
//                     return <Navigate to="/login" replace />;
//                 }
//             })
//         } else {
//             dispatch(setIsLogin({ isLogin: false }));
//             return <Navigate to="/login" replace />;
//         }
//     }
// };

const RequireAuth = ({ children }) => {
    const { isLogin } = useSelector((state) => state.dropdown);
    // let auth = localStorage.getItem('name');
    const dispatch = useDispatch();
    const getAccessToken = localStorage.getItem('accessToken');
    console.log('isLogin=>>', isLogin)
    if ( !getAccessToken ) {
        return <Navigate to="/login" replace />;
    } else {
        fetch(checktoken, {
            method: 'POST',
            body: JSON.stringify({
                cbps_access_token: getAccessToken
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if ( data.UserCName ) {
                return children;
            } else {
                dispatch(setIsLogin({ isLogin: false }));
                localStorage.removeItem('accessToken');
                return <Navigate to="/login" replace />;
            }
        })
        return children;
    }
    return children;
};

// const RequireAuth = ({ children }) => {
//     const { isLogin } = useSelector((state) => state.dropdown);
//     // let auth = localStorage.getItem('name');
//     console.log('isLogin=>>', isLogin)
//     if ( !isLogin ) {
//         const getAccessToken = localStorage.getItem('accessToken');
//         if ( getAccessToken ) {
//             console.log('2=>>', getAccessToken)
//             fetch(checktoken, {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     cbps_access_token: getAccessToken
//                 })
//             })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log('3=>>', data, data.UserName);
//                 if ( data.UserName ) {
//                     console.log('4=>>');
//                     return children;
//                 } else {
//                     console.log('5=>>');
//                     return <Navigate to="/login" replace />;
//                 }
//             })
//         } else {
//             return <Navigate to="/login" replace />;
//         }
//         return <Navigate to="/login" replace />;
//     }
//     return children;
// };

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
