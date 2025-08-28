import express from "express";
import Order from "../models/order.js";
import Product from "../models/product.js";
import Shop from "../models/shop.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {
  isShopAuthenticated,
  isUserAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/",
  isUserAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { cart, shippingAddress, discount, paymentInfo } = req.body;

    const shopItemsMap = new Map();

    for (const item of cart) {
      const shopId = item.shop._id;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    const orders = [];
    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        totalPrice:
          items.reduce((acc, item) => (acc += item.discountPrice), 0) -
          discount,
        paymentInfo,
        user: req.user._id,
      });
      const shop = await Shop.findById(shopId);
      shop.totalOrders += 1;
      await shop.save();
      orders.push(order);
    }

    return res.status(201).json({ success: true, orders });
  })
);

router.get(
  "/user/:id",
  isUserAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  })
);

router.get(
  "/shop/:id",
  isUserAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ "cart.shop._id": req.params.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  })
);

router.put(
  "/:id",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order)
      return next(new ErrorHandler("No order with this id found", 400));

    if (req.body.status === "Transferred to Delivery Partner") {
      order.cart.forEach(async (item) => {
        const product = await Product.findById(item._id);
        product.stock -= item.quantity;
        product.sold_out += item.quantity;
        await product.save();
      });
    } else if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "succeeded";
    }

    order.status = req.body.status;

    await order.save();

    res.status(201).json({ success: true, order });
  })
);

router.put(
  "/:id/refund",
  isUserAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order)
      return next(new ErrorHandler("No order found with this id", 400));

    order.status = req.body.status;

    await order.save({ validateBeforeSave: false });

    res.status(201).json({ success: true, order });

    if (order.status === "Refund Successful") {
      order.cart.forEach(async (o) => {
        const product = await Product.findById(o._id);
        product.stock += o.quantity;
        product.sold_out -= o.quantity;
        await product.save();
      });
    }
  })
);

export default router;
