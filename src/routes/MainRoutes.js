import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

//api
import { ssoUrl, checktoken } from 'components/apis.jsx';
import { ConstructionOutlined } from '../../node_modules/@mui/icons-material/index';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'store/reducers/dropdown';
import dayjs from 'dayjs';

// redux
import { setLoginInInfo, setIsLogin } from 'store/reducers/dropdown';
import jwt_decode from 'jwt-decode';
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
// 發票工作管理
const InvoiceWorkManageCreate = Loadable(lazy(() => import('pages/invoiceWorkManage/InvoiceWorkCreate')));
const InvoiceWorkManageEdit = Loadable(lazy(() => import('pages/invoiceWorkManage/InvoiceWorkEdit')));
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
// Liability
const LiabilityManage = Loadable(lazy(() => import('pages/liability/LiabilityManage')));
// 上傳資料管理
const UploadManage = Loadable(lazy(() => import('pages/uploadManage/UploadManage')));
// 通知管理
const Notification = Loadable(lazy(() => import('pages/notification/Notification')));

// ==============================|| MAIN ROUTING ||============================== //

const RequireAuth = ({ children }) => {
        const dispatch = useDispatch();
        const { isLogin } = useSelector((state) => state.dropdown); //message狀態
        // if ( !getExpireTime ) {
        //     return <Navigate to="/login" replace />;
        // } else {
        //     fetch(checktoken, {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             cbps_access_token: getExpireTime
        //         })
        //     })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log('data=>>', data);
        //         if ( data.UserCName ) {
        //             return children;
        //         } else {
        //             dispatch(setIsLogin({ isLogin: false }));
        //             localStorage.removeItem('accessToken');
        //             return <Navigate to="/login" replace />;
        //         }
        //     })
        //     return children;
        // }
        // haha2
        const getExpireTime = localStorage.getItem('expireTime');
        let tmpTest = 'https://iam-qa.cht.com.tw/auth/realms/B2E/protocol/openid-connect/token';
        console.log('window.location.href.indexOf("code")=>>', window.location.href.indexOf('code'));
        // if (window.location.href.indexOf('code') !== -1) {
        //     const accessCode = window.location.href.split('code=')[1];
        //     let tmpArray = {
        //         client_id: 'CBPS.QA.I',
        //         redirect_uri: 'http://internal-cbpsAlbFrontend-1323185980.ap-northeast-1.elb.amazonaws.com',
        //         code: accessCode,
        //         grant_type: 'authorization_code'
        //     }
        //     const searchParams = new URLSearchParams(tmpArray);
        //     console.log('searchParams2=>>', accessCode);
        //     fetch(tmpTest, {
        //         method: 'POST',
        //         body: searchParams,
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //         }
        //     })
        //         .then((res) => res.json())
        //         .then((data) => {
        //             console.log('data=>>>>', data.access_token);
        //             if(data.access_token) {
        //                 dispatch(setLoginInInfo({
        //                     loginInInfo: { EmployeeNumber: jwt_decode(data.access_token).employeeNumber,
        //                     Email: jwt_decode(data.access_token).email,
        //                     Name: jwt_decode(data.access_token).name
        //                 }}));
        //                 localStorage.setItem('expireTime',dayjs().add(31, 'minute'));
        //             }
        //         })
        //         .catch((e) => console.log('e1=>', e));
        // }
        console.log('1=>>', window.location.host.includes('localhost'), '2=>>', dayjs(getExpireTime).diff(new Date(), 'minute') > 0);

        if (window.location.host.includes('localhost') || dayjs(getExpireTime).diff(new Date(), 'minute') > 0 || isLogin) {
                // if (isLogin || dayjs(getExpireTime).diff(new Date(), 'minute') > 0) {
                return children;
        } else if (window.location.href.indexOf('code') !== -1 && !getExpireTime) {
                // if (!getExpireTime) {
                const accessCode = window.location.href.split('code=')[1];
                let tmpArray = {
                        client_id: 'CBPS.QA.I',
                        redirect_uri: 'http://internal-cbpsAlbFrontend-1323185980.ap-northeast-1.elb.amazonaws.com',
                        code: accessCode,
                        grant_type: 'authorization_code'
                };
                const searchParams = new URLSearchParams(tmpArray);
                console.log('searchParams2=>>', accessCode);
                fetch(tmpTest, {
                        method: 'POST',
                        body: searchParams,
                        headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                        }
                })
                        .then((res) => res.json())
                        .then((data) => {
                                console.log('data=>>>>', data.access_token);
                                if (data.access_token) {
                                        dispatch(
                                                setLoginInInfo({
                                                        loginInInfo: {
                                                                EmployeeNumber: jwt_decode(data.access_token).employeeNumber,
                                                                Email: jwt_decode(data.access_token).email,
                                                                Name: jwt_decode(data.access_token).name
                                                        }
                                                })
                                        );
                                        localStorage.setItem('expireTime', dayjs().add(31, 'minute'));
                                        return children;
                                } else {
                                        return window.location.replace(ssoUrl);
                                }
                        })
                        .catch((e) => console.log('e1=>', e));
                // }
        } else {
                return window.location.replace(ssoUrl);
        }
        // return children;
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
                        path: 'UploadManage',
                        element: (
                                <RequireAuth>
                                        <UploadManage />
                                </RequireAuth>
                        )
                },
                {
                        path: 'Notification',
                        element: (
                                <RequireAuth>
                                        <Notification />
                                </RequireAuth>
                        )
                },
                {
                        path: 'dashboard',
                        children: [
                                {
                                        path: 'default',
                                        element: <DashboardDefault />
                                }
                        ]
                }
                // {
                //     path: 'shadow',
                //     element: <Shadow />
                // },
                // {
                //     path: 'typography',
                //     element: <Typography />
                // },
                // {
                //     path: 'icons/ant',
                //     element: <AntIcons />
                // }
        ]
};

export default MainRoutes;
