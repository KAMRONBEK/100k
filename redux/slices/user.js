import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
};

const userSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            let newState = { ...state, ...payload };
            let jsonUser = JSON.stringify(newState);
            //asyncstorage save token
            AsyncStorage.setItem("@user", jsonUser);
            return state;
        },
        logoutUser: (state) => {
            state = initialState;
            //clean storage
            AsyncStorage.removeItem("@user");
            return state;
        },
        update: (state, { payload }) => {
            let newState = { ...state, ...payload };
            return newState;
        },
    },
});

export const selectUser = (state) => state.user;

export const { setUser, logoutUser, update } = userSlice.actions;
export default userSlice.reducer;
