import { createSlice } from "@reduxjs/toolkit";

export interface IMail {
  cash_amount: number;
  created_at: string;
  created_at_label: string;
  creator_avatar: string;
  creator_id: number;
  creator_name: string;
  creator_phone: string;
  delivery_fee_amount: number;
  driver_avatar?: any;
  driver_id?: any;
  driver_name?: any;
  driver_phone?: any;
  expired_at?: any;
  fail_reason?: any;
  from_address: string;
  from_district_id: number;
  from_full_address: string;
  from_latitude?: any;
  from_longitude?: any;
  from_region_id: number;
  id: number;
  in_storage: number;
  insurance_amount: number;
  is_paid: number;
  matter: string;
  note: string;
  recipient_avatar: string;
  recipient_id: number;
  recipient_name?: any;
  recipient_phone: string;
  request_id?: any;
  status: string;
  status_label: string;
  storage_id: number;
  store_package_list_id?: any;
  to_address: string;
  to_district_id: number;
  to_full_address: string;
  to_region_id: number;
  vehicle_type: string;
  yuzka_request_id?: any;
}

const initialState = {
  mail: <IMail[]>[],
  commonMail: [],
  receiveMail: [],
  packageListMail: [],
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setMail: (state, { payload }) => {
      state = { ...state, mail: payload };
      //asyncstorage save token
      return state;
    },

    setCommonMail: (state, { payload }) => {
      state = { ...state, commonMail: payload };
      return state;
    },

    setReceiveMail: (state, { payload }) => {
      state = { ...state, receiveMail: payload };
      return state;
    },

    setPackageListMail: (state, { payload }) => {
      state = { ...state, packageListMail: payload };
      return state;
    },

    update: (state, { payload }) => {
      state = { ...state, ...payload };
      return state;
    },
  },
});

export const selectCommonMail = (store) => store.mail.commonMail;
export const selectMail = (store) => store.mail.mail;
export const selectReceiveMail = (store) => store.mail.receiveMail;
export const selectPackageListMail = (store) => store.mail.packageListMail;

export const {
  setMail,
  setCommonMail,
  update,
  setReceiveMail,
  setPackageListMail,
} = mailSlice.actions;
export default mailSlice.reducer;
