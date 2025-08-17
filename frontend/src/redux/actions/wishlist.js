import {
  addToWishlist as aTw,
  removeFromWishlist as rFw,
  clearWishlist as clrWishlist,
} from "../features/wishlistSlice.js";

const saveWishlist = (wishlist) => {
  try {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
  } catch (err) {
    console.error("Failed to save wishlist:", err);
  }
};

const addToWishlist = (data) => async (dispatch, getState) => {
  dispatch(aTw(data));
  saveWishlist(getState().wishlist.wishlist);
  return data;
};

const removeFromWishlist = (id) => async (dispatch, getState) => {
  dispatch(rFw(id));
  saveWishlist(getState().wishlist.wishlist);
  return id;
};

const clearWishlist = () => async (dispatch) => {
  dispatch(clrWishlist());
  localStorage.removeItem("wishlistItems");
};

export { addToWishlist, removeFromWishlist, clearWishlist };
