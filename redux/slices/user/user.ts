import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import reactotron from "reactotron-react-native";
import { IRoot } from "../../configureStore";

interface IUser {
    profile: {};
    message: string;
    data: string;
}

const initialState = {
    profile: {},
    message: "",
    data: undefined,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            let newState = { ...state, ...payload };
            let jsonUser = JSON.stringify(newState);
            //asyncstorage save token
            AsyncStorage.setItem("@user", jsonUser);
            return newState;
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

export const selectUser = (state: IRoot) => state.user.profile;
export const selectToken = (state: IRoot) => state.user.data;

export const { setUser, logoutUser, update } = userSlice.actions;
export default userSlice.reducer;
