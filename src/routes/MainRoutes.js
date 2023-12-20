import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { useSelector } from 'react-redux';
//api
import { ssoUrl, checktokenForLDAP } from 'components/apis.jsx';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

// redux
import { setLoginInInfo, setUserInfo } from 'store/reducers/dropdown';
import jwt_decode from 'jwt-decode';
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
// 發票工作管理
const InvoiceWorkManageCreate = Loadable(
  lazy(() => import('pages/invoiceWorkManage/InvoiceWorkCreate')),
);
const InvoiceWorkManageEdit = Loadable(
  lazy(() => import('pages/invoiceWorkManage/InvoiceWorkEdit')),
);
// 立帳管理
const CreateJournal = Loadable(lazy(() => import('pages/createJournal/CreateJournal')));
const JournalQuery = Loadable(lazy(() => import('pages/createJournal/CreateJournalQuery')));
// Credit Balance
const CreditBalance = Loadable(lazy(() => import('pages/creditBalance/CreditBalance')));
const CreditBalanceRefund = Loadable(lazy(() => import('pages/creditBalance/CreditBalanceRefund')));
// Credit Memo
const CreditMemo = Loadable(lazy(() => import('pages/creditMemo/CreditMemo')));
// 應收帳款管理
const GenerateFeeAmount = Loadable(
  lazy(() => import('pages/accountsReceivable/generateFeeAmount')),
);
const WriteOffInvoice = Loadable(lazy(() => import('pages/accountsReceivable/writeOffInvoice')));
const BillAttachManagement = Loadable(
  lazy(() => import('pages/accountsReceivable/billAttachManagement')),
);
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
// 通知管理

// ==============================|| MAIN ROUTING ||============================== //

const fakeData = {
  UserID: 'cht_frank',
  CB: true,
  Role: true,
  UPerMIDNo: 4,
  CM: true,
  System: true,
  UserCName: '\u8463\u5b87\u54f2',
  GlobalQuery: true,
  SupplierNotify: true,
  InvoiceWK: true,
  Report: true,
  Superior: true,
  Invoice: true,
  Data: true,
  PCode: 'R0',
  Bill: true,
  Liability: true,
  HashedPassword: '$2b$12$vXyuPMAmfL2HkVY8MgAg6.N0j5Mf/v5yK627zSWwjz.orwTgiqUBS',
  Pay: true,
  PartyNotify: true,
  ProfilePhotoURI:
    'http://chtds.cht.com.tw/photo/Lyncphoto/j4NKy4NKyhloyKHrO1S3/n/y6tKy4tez2VUy3Ve.jpg',
  SysNotify: true,
};

const RequireAuth = ({ children }) => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.dropdown); //message狀態
  // haha2
  const getExpireTime = localStorage.getItem('expireTime');
  let tmpTest = 'https://iam-qa.cht.com.tw/auth/realms/B2E/protocol/openid-connect/token';
  console.log('window.location.href.indexOf("code")=>>', window.location.href.indexOf('code'));
  console.log(
    '1=>>',
    window.location.host.includes('localhost'),
    '2=>>',
    dayjs(getExpireTime).diff(new Date(), 'minute') > 0,
  );

  if (
    window.location.host.includes('localhost') ||
    dayjs(getExpireTime).diff(new Date(), 'minute') > 0 ||
    isLogin
  ) {
    return children;
  } else if (window.location.href.indexOf('code') !== -1) {
    const accessCode = window.location.href.split('code=')[1];
    let tmpArray = {
      client_id: 'CBPS.QA.I',
      redirect_uri: 'http://internal-cbpsAlbFrontend-1323185980.ap-northeast-1.elb.amazonaws.com',
      code: accessCode,
      grant_type: 'authorization_code',
    };
    const searchParams = new URLSearchParams(tmpArray);
    console.log('searchParamshaha1=>>', accessCode);
    fetch(tmpTest, {
      method: 'POST',
      body: searchParams,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('datahaha2=>>>>', data.access_token);
        if (data.access_token) {
          dispatch(
            setLoginInInfo({
              loginInInfo: {
                EmployeeNumber: jwt_decode(data.access_token).employeeNumber,
                Email: jwt_decode(data.access_token).email,
                Name: jwt_decode(data.access_token).name,
              },
            }),
          );
          localStorage.setItem('expireTime', dayjs().add(31, 'minute'));
          // 傳送使用者資料取得權限
          fetch(checktokenForLDAP, { method: 'POST', body: JSON.stringify(data.access_token) })
            .then((res) => res.json())
            .then((data) => {
              console.log('使用者權限資料=>>', data);
              dispatch(
                setUserInfo({
                  userInfo: {
                    UserCName: data.UserCName,
                    ProfilePhotoURI: data.ProfilePhotoURI,
                    CB: data.CB,
                    Role: data.Role,
                    CM: data.CM,
                    System: data.System,
                    GlobalQuery: data.GlobalQuery,
                    SupplierNotify: data.SupplierNotify,
                    InvoiceWK: data.InvoiceWK,
                    Report: data.Report,
                    Superior: data.Superior,
                    Invoice: data.Invoice,
                    Data: data.Data,
                    Bill: data.Bill,
                    Liability: data.Liability,
                    Pay: data.Pay,
                    PartyNotify: data.PartyNotify,
                    SysNotify: data.SysNotify,
                  },
                }),
              );
            })
            .catch((e) => console.log('e1=>', e));
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
      ),
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
          ),
        },
        {
          path: 'InvoiceWorkEdit',
          element: (
            <RequireAuth>
              <InvoiceWorkManageEdit />
            </RequireAuth>
          ),
        },
      ],
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
          ),
        },
        {
          path: 'CreditBalanceRefund',
          element: (
            <RequireAuth>
              <CreditBalanceRefund />
            </RequireAuth>
          ),
        },
      ],
    },
    {
      path: 'CreditMemo',
      children: [
        {
          path: 'CreditMemoManage',
          element: (
            <RequireAuth>
              <CreditMemo />
            </RequireAuth>
          ),
        },
      ],
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
          ),
        },
      ],
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
          ),
        },
      ],
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
          ),
        },
        {
          path: 'BillAttachManagement',
          element: (
            <RequireAuth>
              <BillAttachManagement />
            </RequireAuth>
          ),
        },
        {
          path: 'WriteOffInvoice',
          element: (
            <RequireAuth>
              <WriteOffInvoice />
            </RequireAuth>
          ),
        },
      ],
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
          ),
        },
        {
          path: 'Correspondence',
          element: (
            <RequireAuth>
              <Correspondence />
            </RequireAuth>
          ),
        },
        {
          path: 'PaymentRecord',
          element: (
            <RequireAuth>
              <PaymentRecord />
            </RequireAuth>
          ),
        },
      ],
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
          ),
        },
        {
          path: 'ResearchInvoice',
          element: (
            <RequireAuth>
              <ResearchInvoice />
            </RequireAuth>
          ),
        },
        {
          path: 'ResearchJournal',
          element: (
            <RequireAuth>
              <ResearchJournal />
            </RequireAuth>
          ),
        },
      ],
    },
    {
      path: 'Setting',
      element: (
        <RequireAuth>
          <Information />
        </RequireAuth>
      ),
    },
    {
      path: 'Liability',
      element: (
        <RequireAuth>
          <LiabilityManage />
        </RequireAuth>
      ),
    },
    {
      path: 'UploadManage',
      element: (
        <RequireAuth>
          <UploadManage />
        </RequireAuth>
      ),
    },
    {
      path: 'Notification',
      element: (
        <RequireAuth>
          <Notification />
        </RequireAuth>
      ),
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />,
        },
      ],
    },
  ],
};

export default MainRoutes;
