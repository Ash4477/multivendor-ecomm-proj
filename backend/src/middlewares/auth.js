import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Shop from "../models/shop.js";

const isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Please login to continue.", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const isShopAuthenticated = catchAsyncErrors(async (req, res, next) => {
  try {
    const { shop_token } = req.cookies;
    if (!shop_token) {
      return next(new ErrorHandler("Please login to continue.", 401));
    }
    const decoded = jwt.verify(shop_token, process.env.JWT_SECRET_KEY);
    req.shop = await Shop.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export { isUserAuthenticated, isShopAuthenticated };
