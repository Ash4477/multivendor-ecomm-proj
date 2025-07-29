import axios from "axios";
import { SERVER_URL } from "../../server";
import {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
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

export { loadUser };
