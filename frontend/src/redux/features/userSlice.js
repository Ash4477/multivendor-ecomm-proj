import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  addressLoading: false,
  successMessage: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    updateUserInfoRequest: (state) => {
      state.loading = true;
    },
    updateUserInfoSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = "User Info Updated Successfully";
      state.user = action.payload;
    },
    updateUserInfoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserAddressRequest: (state, action) => {
      state.addressLoading = true;
    },
    updateUserAddressSuccess: (state, action) => {
      state.addressLoading = false;
      state.successMessage = "User Address Updated Successfully";
      state.user = action.payload;
    },
    updateUserAddressFail: (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    },
    deleteUserAddressRequest: (state, action) => {
      state.addressLoading = true;
    },
    deleteUserAddressSuccess: (state, action) => {
      state.addressLoading = false;
      state.successMessage = "Selected Address Deleted Successfully";
      state.user = action.payload;
    },
    deleteUserAddressFail: (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
});

export const {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFail,
  updateUserAddressRequest,
  updateUserAddressSuccess,
  updateUserAddressFail,
  deleteUserAddressRequest,
  deleteUserAddressSuccess,
  deleteUserAddressFail,
  clearErrors,
  clearSuccessMessage,
} = userSlice.actions;

export default userSlice.reducer;
