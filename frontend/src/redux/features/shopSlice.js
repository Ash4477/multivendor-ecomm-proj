import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  shop: null,
  loading: false,
  error: null,
  successMessage: null,
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
    updateShopInfoRequest: (state) => {
      state.loading = true;
    },
    updateShopInfoSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = "User Info Updated Successfully";
      state.shop = action.payload;
    },
    updateShopInfoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  loadShopRequest,
  loadShopSuccess,
  loadShopFail,
  updateShopInfoRequest,
  updateShopInfoFail,
  updateShopInfoSuccess,
  clearErrors,
  clearSuccessMessage,
} = shopSlice.actions;

export default shopSlice.reducer;
