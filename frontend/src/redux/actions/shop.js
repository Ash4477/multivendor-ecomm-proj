import axios from "axios";
import { SERVER_URL } from "../../server";
import {
  loadShopRequest,
  loadShopSuccess,
  loadShopFail,
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

export { loadShop };
