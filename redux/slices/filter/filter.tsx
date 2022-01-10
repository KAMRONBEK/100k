import { IRoot } from "./../../configureStore";
import { createSlice } from "@reduxjs/toolkit";
import { Image } from "react-native";

export type ImageSourcePropType = React.ComponentProps<typeof Image>["source"];

export interface ICreateFilter {
    filterFromRegionId?: number;
    filterFromRegionName?: string;

    filterFromDistrictId?: number;
    filterFromDistrictName?: string;

    filterFromAddress?: string;
    filterFromNumber?: string;

    filterToRegionId?: number;
    filterToRegionName?: string;

    filterToDistrictId?: number;
    filterToDistrictName?: string;

    filterToAddress?: string;
    filterToNumber?: string;
}

const initialState: ICreateFilter = {
    filterFromRegionId: 1,
    filterFromRegionName: "",

    filterFromDistrictId: 0,
    filterFromDistrictName: "",

    filterFromAddress: "",
    filterFromNumber: "",

    filterToRegionId: 0,
    filterToRegionName: "",

    filterToDistrictId: 0,
    filterToDistrictName: "",

    filterToAddress: "",
    filterToNumber: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilterData: (state, { payload }) => {
            state = { ...state, ...payload };
            return state;
        },
    },
});

export const selectFilterState = (state: IRoot) => state && state.filter;

export const { setFilterData } = filterSlice.actions;
export default filterSlice.reducer;
