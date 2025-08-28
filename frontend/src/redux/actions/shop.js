import axios from "axios";
import { SERVER_URL } from "../../server";
import {
  loadShopRequest,
  loadShopSuccess,
  loadShopFail,
  updateShopInfoRequest,
  updateShopInfoSuccess,
  updateShopInfoFail,
  clearErrors as clrErrs,
  clearSuccessMessage as clrMsgs,
} from "../features/shopSlice";

const loadShop = () => async (dispatch) => {
  try {
    dispatch(loadShopRequest());

    const { data } = await axios.get(`${SERVER_URL}/shops`, {
      withCredentials: true,
    });

    dispatch(loadShopSuccess(data.shop));
  } catch (error) {
    dispatch(
      loadShopFail(error.response?.data?.message || "Something went wrong")
    );
  }
};

const updateShopInfo = (data) => async (dispatch) => {
  try {
    dispatch(updateShopInfoRequest());
    const { data: res } = await axios.put(`${SERVER_URL}/shops`, data, {
      withCredentials: true,
    });
    dispatch(updateShopInfoSuccess(res.user));
  } catch (error) {
    const errMsg = error.response?.data?.message || "Something went wrong";
    dispatch(updateShopInfoFail(errMsg));
  }
};

const clearErrors = () => async (dispatch) => {
  dispatch(clrErrs());
};

const clearSuccessMessage = () => async (dispatch) => {
  dispatch(clrMsgs());
};

export { loadShop, updateShopInfo, clearSuccessMessage, clearErrors };
