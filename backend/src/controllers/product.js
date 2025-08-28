import express from "express";
import upload from "../multer.js";
import Shop from "../models/shop.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {
  isShopAuthenticated,
  isUserAuthenticated,
} from "../middlewares/auth.js";

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
      const productData = req.body;
      productData.images = imageUrls;
      const product = await Product.create(productData);

      shop.totalProducts += 1;
      await shop.save();

      res.status(201).json({ success: true, product });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id })
        .populate("shop")
        .populate("reviews.user", "name avatar");
      res.status(200).json({
        success: true,
        products,
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
      const product = await Product.findById(req.params.id);
      if (!product) {
        return next(new ErrorHandler("Product not found with this id", 400));
      }

      product.images.forEach((imgUrl) => {
        const filePath = `uploads/${imgUrl}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            res.status(500).json({ message: "error deleting file" });
          }
        });
      });

      const shop = await Shop.findById(product.shop);

      product = await Product.findByIdAndDelete(req.params.id);

      shop.totalProducts -= 1;
      await shop.save();

      res.status(201).json({
        success: true,
        message: "Product Deleted Successfully",
      });
    } catch (error) {
      next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/",
  catchAsyncErrors(async (req, res, next) => {
    const query = {};

    if (req.query.category) query.category = req.query.category;

    const products = await Product.find(query).populate("shop");
    if (!products.length) {
      return next(new ErrorHandler("No products found", 404));
    }

    res.status(200).json({ success: true, products });
  })
);

router.get(
  "/:id",
  catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
      .populate("shop")
      .populate({
        path: "reviews.user",
        select: "name avatar",
      });
    if (!product) {
      return next(new ErrorHandler("No product found with this name", 400));
    }

    res.status(200).json({ success: true, product });
  })
);

router.put(
  "/:id/review",
  isUserAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    const reviewedProduct = product.reviews.find(
      (item) => String(item.user) === String(req.user._id)
    );

    const { comment, rating, orderId } = req.body;

    if (reviewedProduct) {
      reviewedProduct.rating = rating;
      if (comment) reviewedProduct.comment = comment;
    } else {
      product.reviews.push({
        user: req.user._id,
        rating: rating,
        comment: comment,
      });
    }

    let avg = 0;
    product.reviews.forEach((item) => {
      avg += item.rating;
    });
    avg /= product.reviews.length;

    product.rating = avg;

    await product.save();

    const order = await Order.findById(orderId);
    order.cart.forEach((item) => {
      if (String(item._id) === String(product._id)) {
        item.isReviewed = true;
      }
    });
    order.markModified("cart");

    await order.save();

    res.status(201).json({ success: true, product });
  })
);

export default router;
