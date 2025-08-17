import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  shop: null,
  loading: false,
  error: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    loadShopRequest: (state) => {
      state.loading = true;
    },
    loadShopSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.shop = action.payload;
    },
    loadShopFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const { loadShopRequest, loadShopSuccess, loadShopFail, clearErrors } =
  shopSlice.actions;

export default shopSlice.reducer;
