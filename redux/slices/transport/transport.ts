import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //mail
};

const transportSlice = createSlice({
  name: "transport",
  initialState,
  reducers: {
    setTransport: (state, { payload }) => {
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

export const selectTransport = (state) => state.transport;

export const { setTransport, update } = transportSlice.actions;
export default transportSlice.reducer;
