import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //taxi
};

const loadSlice = createSlice({
    name: "load",
    initialState,
    reducers: {
        setLoad: (state, { payload }) => {
            state = { ...state, ...payload };
            //asyncstorage save token
            return state;
        },
        update: (state, { payload }) => {
            state = { ...state, ...payload };
            return state;
        },
    },
});

export const selectLoad = (state) => state.load;

export const { setLoad, update } = loadSlice.actions;
export default loadSlice.reducer;
