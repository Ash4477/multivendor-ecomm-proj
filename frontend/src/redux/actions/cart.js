import {
  addToCart as aTc,
  removeFromCart as rFc,
  clearCart as clrCart,
} from "../features/cartSlice";

const saveCart = (cart) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  } catch (err) {
    console.error("Failed to save cart:", err);
  }
};

const addToCart = (data) => async (dispatch, getState) => {
  dispatch(aTc(data));
  saveCart(getState().cart.cart);
  return data;
};

const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch(rFc(id));
  saveCart(getState().cart.cart);
  return id;
};

const clearCart = () => async (dispatch) => {
  dispatch(clrCart());
  localStorage.removeItem("cartItems");
};

export { addToCart, removeFromCart, clearCart };
