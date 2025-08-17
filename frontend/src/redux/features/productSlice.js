import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  error: null,
  loading: false,
  product: null,
  products: [],
  message: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productCreateRequest: (state) => {
      state.loading = true;
    },
    productCreateSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.success = true;
    },
    productCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    getAllShopProductsRequest: (state, action) => {
      state.loading = true;
    },
    getAllShopProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    getAllShopProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductRequest: (state, action) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  getAllShopProductsRequest,
  getAllShopProductsSuccess,
  getAllShopProductsFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  clearErrors,
} = productSlice.actions;

export default productSlice.reducer;
