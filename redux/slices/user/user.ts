import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
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
    updateUser: (state, { payload }) => {
      let newState = { ...state, ...payload };
      return newState;
    },
    updateProfile: (state, { payload }) => {
      let newState = { ...state, profile: { ...state.profile, ...payload } };
      return newState;
    },
  },
});

export const selectUser = (state: IRoot) => state.user.profile;
export const selectToken = (state: IRoot) => state.user.data;

export const { setUser, logoutUser, updateUser, updateProfile } =
  userSlice.actions;
export default userSlice.reducer;
