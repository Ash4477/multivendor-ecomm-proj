import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  error: null,
  loading: false,
  event: null,
  events: [],
  message: "",
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    eventCreateRequest: (state) => {
      state.loading = true;
    },
    eventCreateSuccess: (state, action) => {
      state.loading = false;
      state.event = action.payload;
      state.success = true;
    },
    eventCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    getAllShopEventsRequest: (state, action) => {
      state.loading = true;
    },
    getAllShopEventsSuccess: (state, action) => {
      state.loading = false;
      state.events = action.payload;
    },
    getAllShopEventsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteEventRequest: (state, action) => {
      state.loading = true;
    },
    deleteEventSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteEventFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  eventCreateRequest,
  eventCreateSuccess,
  eventCreateFail,
  getAllShopEventsRequest,
  getAllShopEventsSuccess,
  getAllShopEventsFail,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFail,
  clearErrors,
} = eventSlice.actions;
export default eventSlice.reducer;
