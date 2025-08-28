import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice.js";
import shopReducer from "./features/shopSlice.js";
import productReducer from "./features/productSlice.js";
import eventReducer from "./features/eventSlice.js";
import cartReducer from "./features/cartSlice.js";
import wishlistReducer from "./features/wishlistSlice.js";
import orderReducer from "./features/orderSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    product: productReducer,
    event: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
});

export default store;
