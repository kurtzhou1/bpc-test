// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    isOL: true,
    isLoading: false,
    isLogin: window.location.host.includes('localhost') ? true : false,
    isTimeout: window.location.host.includes('localhost') ? true : false,
    bmsList: [], //計帳段號下拉選單
    loginInInfo: { EmployeeNumber: '', Email: '', Name: '' },
    // 主選功能
    userInfo: {
        UserID: '',
        InvoiceWK: window.location.host.includes('localhost') ? true : false, //發票工作管理
        Invoice: window.location.host.includes('localhost') ? true : false, // 立帳管理
        Bill: window.location.host.includes('localhost') ? true : false, //應收帳款管理
        Pay: window.location.host.includes('localhost') ? true : false, //廠商付款處理
        CB: window.location.host.includes('localhost') ? true : false, //CB
        CM: window.location.host.includes('localhost') ? true : false, //CN
        GlobalQuery: window.location.host.includes('localhost') ? true : false, //發票帳單全域管理
        Report: window.location.host.includes('localhost') ? true : false, //報表產製與管理
        //設定
        Data: window.location.host.includes('localhost') ? true : false, //基本資料設定
        Liability: window.location.host.includes('localhost') ? true : false,
        PartyNotify: window.location.host.includes('localhost') ? true : false, //會員提醒通知管理
        SysNotify: window.location.host.includes('localhost') ? true : false, //內部提醒通知管理
        Role: window.location.host.includes('localhost') ? true : false, //使用者權限管理
        System: window.location.host.includes('localhost') ? true : false, //系統開發測試文件
        SupplierNotify: window.location.host.includes('localhost') ? true : false, //供應商提醒通知管理
        Superior: window.location.host.includes('localhost') ? true : false, //主管功能管理
        UPerMIDNo: -1,
        UserCName: '',
        PCode: '',
        HashedPassword: '',
        ProfilePhotoURI: '',
    },
    // userInfo: {   UserID: 'cht_frank',
    // InvoiceWK: false, //發票工作管理
    // Invoice: false, // 立帳管理
    // Bill: false, //應收帳款管理`
    // Pay: false, //廠商付款處理
    // CB: false, //CB
    // CM: false, //CN
    // GlobalQuery: true, //發票帳單全域管理
    // Report: true, //報表產製與管理
    // //設定
    // Data: true, //基本資料設定
    // Liability: true,
    // PartyNotify: true, //會員提醒通知管理
    // SysNotify: true, //內部提醒通知管理
    // Role: true, //使用者權限管理
    // System: true, //系統開發測試文件
    // SupplierNotify: true, //供應商提醒通知管理
    // Superior: true, //主管功能管理
    // UPerMIDNo: 4,
    // UserCName: 'Frank',
    // PCode: 'R0',
    // HashedPassword: '$2b$12$vXyuPMAmfL2HkVY8MgAg6.N0j5Mf/v5yK627zSWwjz.orwTgiqUBS',
    // ProfilePhotoURI:
    //   'http://chtds.cht.com.tw/photo/Lyncphoto/j4NKy4NKyhloyKHrO1S3/n/y6tKy4tez2VUy3Ve.jpg',
    //  },
    messageStateOpen: { isOpen: false, severity: '', message: '' },
};

// ==============================|| SLICE - MENU ||============================== //

const dropdown = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload.isLoading;
        },
        setIsLogin(state, action) {
            state.isLogin = action.payload.isLogin;
        },
        setLoginInInfo(state, action) {
            state.loginInInfo = action.payload.loginInInfo;
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload.userInfo;
        },
        setMessageStateOpen(state, action) {
            state.messageStateOpen = action.payload.messageStateOpen;
        },
    },
});

export default dropdown.reducer;

export const { setMessageStateOpen, setIsLogin, setUserInfo, setLoginInInfo, setIsLoading } =
    dropdown.actions;
