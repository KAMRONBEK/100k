import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    taxi: [],
};

const taxiSlice = createSlice({
    name: "taxi",
    initialState,
    reducers: {
        setTaxi: (state, { payload }) => {
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

export const selectTaxi = (state) => state.taxi;

export const { setTaxi, update } = taxiSlice.actions;
export default taxiSlice.reducer;
