import express from "express";
import mongoose from "mongoose";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { isShopAuthenticated } from "../middlewares/auth.js";
import CouponCode from "../models/couponCode.js";

const router = express.Router();

router.post(
  "/",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let couponCode = await CouponCode.find({ name: req.body.name });

      if (couponCode.length !== 0) {
        return next(new ErrorHandler("Coupon code already exists", 400));
      }

      couponCode = await CouponCode.create(req.body);

      res.status(201).json({ success: true, couponCode });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/shop/:shopId",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find({ shop: req.params.shopId });
      res.status(200).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.delete(
  "/shop/:id",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let couponCode = await CouponCode.findById(req.params.id);
      if (!couponCode) {
        return next(
          new ErrorHandler("Coupon Code not found with this id", 400)
        );
      }

      couponCode = await CouponCode.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Coupon Code Deleted Successfully",
      });
    } catch (error) {
      next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/:code",
  catchAsyncErrors(async (req, res, next) => {
    const couponCode = await CouponCode.findOne({ name: req.params.code });

    if (!couponCode) return next(new ErrorHandler("Invalid code", 400));

    res.status(200).json({ success: true, couponCode });
  })
);

export default router;
