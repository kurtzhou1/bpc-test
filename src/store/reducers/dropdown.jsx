// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    supNmList: [],
    subCableList: [],
    partiesList: [],
    bmsList: []
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
        },
        setPartiesList(state, action) {
            state.partiesList = action.payload.partiesList;
        },
        setBillMileStoneList(state, action) {
            state.bmsList = action.payload.bmsList;
        }
    }
});

export default dropdown.reducer;

export const { setSupplierNameList, setSubmarineCableList, setPartiesList, setBillMileStoneList } = dropdown.actions;
