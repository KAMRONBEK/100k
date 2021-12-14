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

    seatCount?: number;

    info?: string;

    frontSeat?: boolean;

    otherPerson?: boolean;

    otherNumber?: string;

    otherName?: string;
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

    cost: 0,

    seatCount: 0,

    info: "",

    frontSeat: false,

    otherPerson: false,

    otherNumber: "",

    otherName: "",
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
