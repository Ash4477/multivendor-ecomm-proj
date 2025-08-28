import express from "express";
import upload from "../multer.js";
import Shop from "../models/shop.js";
import Event from "../models/event.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { isShopAuthenticated } from "../middlewares/auth.js";
import fs from "node:fs";

const router = express.Router();

router.post(
  "/",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shop: shopId } = req.body;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop ID is invalid", 400));
      }
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);
      const eventData = req.body;
      eventData.images = imageUrls;
      const event = await Event.create(eventData);
      res.status(201).json({ success: true, event });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id }).populate(
        "shop"
      );

      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      next(new ErrorHandler(error, 500));
    }
  })
);

router.delete(
  "/shop/:id",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return next(new ErrorHandler("Event not found with this id", 400));
      }

      event.images.forEach((imgUrl) => {
        const filePath = `uploads/${imgUrl}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            res.status(500).json({ message: "error deleting file" });
          }
        });
      });

      event = await Event.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Event Deleted Successfully",
      });
    } catch (error) {
      next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/",
  catchAsyncErrors(async (req, res, next) => {
    const events = await Event.find()
      .limit(req.query.limit || 10)
      .populate("shop");
    res.status(200).json({ success: true, events });
  })
);

router.get(
  "/:id",
  catchAsyncErrors(async (req, res, next) => {
    const event = await Event.findById(req.params.id).populate("shop");
    res.status(200).json({ success: true, event });
  })
);

export default router;
