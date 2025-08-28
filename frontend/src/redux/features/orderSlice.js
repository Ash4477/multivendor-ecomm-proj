import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userOrders: [],
  shopOrders: [],
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getAllUserOrdersRequest: (state) => {
      state.loading = true;
    },
    getAllUserOrdersSuccess: (state, action) => {
      state.loading = false;
      state.userOrders = action.payload;
    },
    getAllUserOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllShopOrdersRequest: (state) => {
      state.loading = true;
    },
    getAllShopOrdersSuccess: (state, action) => {
      state.loading = false;
      state.shopOrders = action.payload;
    },
    getAllShopOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  getAllUserOrdersRequest,
  getAllUserOrdersSuccess,
  getAllUserOrdersFail,
  getAllShopOrdersRequest,
  getAllShopOrdersSuccess,
  getAllShopOrdersFail,
} = orderSlice.actions;
export default orderSlice.reducer;
