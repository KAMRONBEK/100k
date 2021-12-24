import { IRoot } from "./../../configureStore";
import { createSlice } from "@reduxjs/toolkit";
import { Image } from "react-native";

export type ImageSourcePropType = React.ComponentProps<typeof Image>["source"];

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

  name?: string;

  note?: string;

  customerName?: string;

  customerPhone?: number;

  insurance?: number;

  matter?: boolean;

  costType?: boolean;

  transportType?: string;

  weight?: boolean;

  images?: ImageSourcePropType[];
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

  transportType: "",

  weight: false,

  images: [],
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

export const selectOrderState = (state: IRoot) => state && state.order;

export const { setOrderData } = orderSlice.actions;
export default orderSlice.reducer;
