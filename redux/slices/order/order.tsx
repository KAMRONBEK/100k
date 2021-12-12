import { IRoot } from "./../../configureStore";
import { createSlice } from "@reduxjs/toolkit";

export interface ICreateOrder {
    fromRegionId?: number;
    fromRegionName?: string;

    fromDistrictId?: number;
    fromDistrictName?: string;

    fromAddress?: string;
    fromNumber?: string;

    toRegionId?: number;
    toRegionName?: string;

    toDistrictId?: number;
    toDistrictName?: string;

    toAddress?: string;
    toNumber?: string;

    cost?: number;
}

const initialState: ICreateOrder = {
    fromRegionId: 1,
    fromRegionName: "",

    fromDistrictId: 0,
    fromDistrictName: "",

    fromAddress: "",
    fromNumber: "",

    toRegionId: 0,
    toRegionName: "",

    toDistrictId: 0,
    toDistrictName: "",

    toAddress: "",
    toNumber: "",

    cost: undefined,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderData: (state, { payload }) => {
            state = { ...state, ...payload };
            return state;
        },
    },
});

export const selectOrderState = (state: IRoot) => state.order;

export const { setOrderData } = orderSlice.actions;
export default orderSlice.reducer;
