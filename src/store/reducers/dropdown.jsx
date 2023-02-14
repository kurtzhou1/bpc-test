// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    supNmList: [],
    subCableList: []
};

// ==============================|| SLICE - MENU ||============================== //

const dropdown = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        setSupplierNameList(state, action) {
            state.supNmList = action.payload.supNmList;
        },
        setSubmarineCableList(state, action) {
            state.subCableList = action.payload.subCableList;
        }
    }
});

export default dropdown.reducer;

export const { setSupplierNameList, setSubmarineCableList } = dropdown.actions;
