import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    load: [],
    commonLoad: [],
};

const loadSlice = createSlice({
    name: "load",
    initialState,
    reducers: {
        setLoad: (state, { payload }) => {
            state = { ...state, load: payload };
            //asyncstorage save token
            return state;
        },
        setCommonLoad: (state, { payload }) => {
            state = { ...state, commonLoad: payload };
            return state;
        },
        update: (state, { payload }) => {
            state = { ...state, ...payload };
            return state;
        },
    },
});

export const selectLoad = (store) => store.load.load;
export const selectCommonLoad = (store) => store.load.commonLoad;

export const { setLoad, update, setCommonLoad } = loadSlice.actions;
export default loadSlice.reducer;
