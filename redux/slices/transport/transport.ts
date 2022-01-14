import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transport: [],
    commonTransport: [],
};

const transportSlice = createSlice({
    name: "transport",
    initialState,
    reducers: {
        setTransport: (state, { payload }) => {
            state = { ...state, transport: payload };
            //asyncstorage save token
            return state;
        },
        setCommonTransport: (state, { payload }) => {
            state = { ...state, commonTransport: payload };
            return state;
        },
        update: (state, { payload }) => {
            state = { ...state, ...payload };
            return state;
        },
    },
});

export const selectTransport = (store) => store.transport.transport;
export const selectCommonTransport = (store) => store.transport.commonTransport;

export const { setTransport, update, setCommonTransport } =
    transportSlice.actions;
export default transportSlice.reducer;
