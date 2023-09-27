// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    isLogin: false,
    isTimeout: false,
    bmsList: [], //計帳段號下拉選單
    loginInInfo: { EmployeeNumber: '', Email: '', Name: ''},
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
        setLoginInInfo(state, action) {
            state.loginInInfo = action.payload.loginInInfo;
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload.userInfo;
        },
        setMessageStateOpen(state, action) {
            state.messageStateOpen = action.payload.messageStateOpen;
        }
    }
});

export default dropdown.reducer;

export const { setMessageStateOpen, setIsLogin, setUserInfo, setLoginInInfo } =
    dropdown.actions;
