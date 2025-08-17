import axios from "axios";
import { SERVER_URL } from "../../server";
import {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  getAllShopProductsRequest,
  getAllShopProductsSuccess,
  getAllShopProductsFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
} from "../features/productSlice";

const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch(productCreateRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${SERVER_URL}/products`,
      newForm,
      config
    );

    dispatch(productCreateSuccess(data.product));
  } catch (error) {
    dispatch(
      productCreateFail(error.response?.data?.message || "Something went wrong")
    );
  }
};

const getAllShopProducts = (id) => async (dispatch) => {
  try {
    dispatch(getAllShopProductsRequest());
    const { data } = await axios.get(`${SERVER_URL}/products/shop/${id}`);
    dispatch(getAllShopProductsSuccess(data.products));
  } catch (error) {
    dispatch(
      getAllShopProductsFail(
        error.response?.data?.message || "Something went wrong"
      )
    );
  }
};

const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    const { data } = await axios.delete(`${SERVER_URL}/products/shop/${id}`, {
      withCredentials: true,
    });
    dispatch(deleteProductSuccess(data.message));
  } catch (error) {
    dispatch(
      deleteProductFail(error.response?.data?.message || "Something went wrong")
    );
  }
};

export { createProduct, getAllShopProducts, deleteProduct };
