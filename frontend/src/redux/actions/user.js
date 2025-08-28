import axios from "axios";
import { SERVER_URL } from "../../server";
import {
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
  clearErrors as clrErrs,
  clearSuccessMessage as clrMsgs,
} from "../features/userSlice";

const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${SERVER_URL}/users`, {
      withCredentials: true,
    });

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(
      loadUserFail(error.response?.data?.message || "Something went wrong")
    );
  }
};

const updateUserInfo = (data) => async (dispatch) => {
  try {
    dispatch(updateUserInfoRequest());
    const { data: res } = await axios.put(`${SERVER_URL}/users`, data, {
      withCredentials: true,
    });
    dispatch(updateUserInfoSuccess(res.user));
  } catch (error) {
    const errMsg = error.response?.data?.message || "Something went wrong";
    dispatch(updateUserInfoFail(errMsg));
  }
};

const updateUserAddresses = (data) => async (dispatch) => {
  try {
    dispatch(updateUserAddressRequest());
    const { data: res } = await axios.put(
      `${SERVER_URL}/users/update-addresses`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch(updateUserAddressSuccess(res.user));
  } catch (error) {
    const errMsg = error.response?.data?.message || "Something went wrong";
    dispatch(updateUserAddressFail(errMsg));
  }
};

const deleteUserAddress = (addressId, userId) => async (dispatch) => {
  try {
    dispatch(deleteUserAddressRequest(addressId));
    const { data } = await axios.put(
      `${SERVER_URL}/users/delete-address/${addressId}`,
      { userId },
      {
        withCredentials: true,
      }
    );
    dispatch(deleteUserAddressSuccess(data.user));
  } catch (error) {
    const errMsg = error.response?.data?.message || "Something went wrong";
    dispatch(deleteUserAddressFail(errMsg));
  }
};

const clearErrors = () => async (dispatch) => {
  dispatch(clrErrs());
};

const clearSuccessMessage = () => async (dispatch) => {
  dispatch(clrMsgs());
};

export {
  loadUser,
  updateUserInfo,
  updateUserAddresses,
  deleteUserAddress,
  clearErrors,
  clearSuccessMessage,
};
