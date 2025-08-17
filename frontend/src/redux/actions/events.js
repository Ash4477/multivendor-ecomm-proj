import axios from "axios";
import { SERVER_URL } from "../../server";
import {
  eventCreateRequest,
  eventCreateSuccess,
  eventCreateFail,
  getAllShopEventsRequest,
  getAllShopEventsSuccess,
  getAllShopEventsFail,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFail,
} from "../features/eventSlice";

const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch(eventCreateRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`${SERVER_URL}/events`, newForm, config);

    dispatch(eventCreateSuccess(data.event));
  } catch (error) {
    dispatch(
      eventCreateFail(error.response?.data?.message || "Something went wrong")
    );
  }
};

const getAllShopEvents = (id) => async (dispatch) => {
  try {
    dispatch(getAllShopEventsRequest());
    const { data } = await axios.get(`${SERVER_URL}/events/shop/${id}`);
    dispatch(getAllShopEventsSuccess(data.events));
  } catch (error) {
    dispatch(
      getAllShopEventsFail(
        error.response?.data?.message || "Something went wrong"
      )
    );
  }
};

const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch(deleteEventRequest());
    const { data } = await axios.delete(`${SERVER_URL}/events/shop/${id}`, {
      withCredentials: true,
    });
    dispatch(deleteEventSuccess(data.message));
  } catch (error) {
    dispatch(
      deleteEventFail(error.response?.data?.message || "Something went wrong")
    );
  }
};

export { createEvent, getAllShopEvents, deleteEvent };
