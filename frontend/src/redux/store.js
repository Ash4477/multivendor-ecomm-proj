import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice.js";
import shopReducer from "./features/shopSlice.js";
import productReducer from "./features/productSlice.js";
import eventReducer from "./features/eventSlice.js";
import cartReducer from "./features/cartSlice.js";
import wishlistReducer from "./features/wishlistSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    product: productReducer,
    event: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
