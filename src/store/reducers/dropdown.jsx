// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    isLogin: false,
    isTimeout: false,
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
        setBillMileStoneList(state, action) {
            state.bmsList = action.payload.bmsList;
        },
        setMessageStateOpen(state, action) {
            state.messageStateOpen = action.payload.messageStateOpen;
        }
    }
});

export default dropdown.reducer;

export const { setBillMileStoneList, setMessageStateOpen, setIsLogin, setUserInfo } =
    dropdown.actions;
