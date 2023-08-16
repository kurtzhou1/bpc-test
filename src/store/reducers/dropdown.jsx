// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    isLogin: false,
    isTimeout: false,
    supNmList: [], //供應商下拉選單
    subCableList: [], //海纜名稱下拉選單
    partiesList: [], //會員下拉選單
    bmsList: [], //計帳段號下拉選單
    userInfo: { ProfilePhotoURI: '', UserCName: '' },
    messageStateOpen: { isOpen: false, severity: '', message: '' }
};

// ==============================|| SLICE - MENU ||============================== //

const dropdown = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        setIsLogin(state, action) {
            state.isLogin = action.payload.isLogin;
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload.userInfo;
        },
        setSupplierNameList(state, action) {
            state.supNmList = action.payload.supNmList;
        },
        setSubmarineCableList(state, action) {
            state.subCableList = action.payload.subCableList;
        },
        setPartiesList(state, action) {
            state.partiesList = action.payload.partiesList;
        },
        setBillMileStoneList(state, action) {
            state.bmsList = action.payload.bmsList;
        },
        setMessageStateOpen(state, action) {
            state.messageStateOpen = action.payload.messageStateOpen;
        }
    }
});

export default dropdown.reducer;

export const { setSupplierNameList, setSubmarineCableList, setPartiesList, setBillMileStoneList, setMessageStateOpen, setIsLogin, setUserInfo } =
    dropdown.actions;
