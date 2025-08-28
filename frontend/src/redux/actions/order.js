import axios from "axios";
import {
  getAllUserOrdersRequest,
  getAllUserOrdersSuccess,
  getAllUserOrdersFail,
  getAllShopOrdersRequest,
  getAllShopOrdersSuccess,
  getAllShopOrdersFail,
} from "../features/orderSlice";
import { SERVER_URL } from "../../server";

const getUserOrders = (id) => async (dispatch) => {
  try {
    dispatch(getAllUserOrdersRequest());
    const { data } = await axios.get(`${SERVER_URL}/orders/user/${id}`, {
      withCredentials: true,
    });
    dispatch(getAllUserOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(getAllUserOrdersFail(error));
  }
};

const getShopOrders = (id) => async (dispatch) => {
  try {
    dispatch(getAllShopOrdersRequest());
    const { data } = await axios.get(`${SERVER_URL}/orders/shop/${id}`, {
      withCredentials: true,
    });
    dispatch(getAllShopOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(getAllShopOrdersFail(error));
  }
};

export { getUserOrders, getShopOrders };
