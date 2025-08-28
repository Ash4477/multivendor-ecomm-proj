import fs from "node:fs";
import path from "node:path";
import express from "express";
import jwt from "jsonwebtoken";
import upload from "../multer.js";
import Shop from "../models/shop.js";
import sendMail from "../utils/sendMail.js";
import { sendShopToken } from "../utils/jwtToken.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { isShopAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;

    let shopEmail = await Shop.findOne({ email });
    if (shopEmail) {
      const filename = req.file.filename;
      const filePath = path.join("uploads", filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          res.status(500).json({ message: "error deleting file" });
        }
      });
      return next(new ErrorHandler("shop already exists", 400));
    }

    const { name, password, address, phoneNumber, zipCode } = req.body;

    const filename = req.file.filename;
    const fileUrl = path.join("uploads", filename);

    const shop = {
      name,
      email,
      password,
      address,
      phoneNumber,
      zipCode,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(shop);

    const activationUrl = `http://localhost:5173/shops/activation/${activationToken}`;

    try {
      await sendMail({
        email: shop.email,
        subject: "Activate your Shop",
        text: `Hello ${shop.name}, please click on the link below to activate your seller account.\n${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `please check your email:- ${shop.email} to activate account.`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activationToken } = req.body;
      const newShop = jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET_KEY
      );

      if (!newShop) return next(new ErrorHandler("Invalid token", 400));

      const { name, email, password, address, phoneNumber, zipCode, avatar } =
        newShop;

      let shop = await Shop.findOne({ email });
      if (shop) {
        return next(new ErrorHandler("Shop already exists", 400));
      }

      shop = await Shop.create({
        name,
        email,
        password,
        address,
        phoneNumber,
        zipCode,
        avatar,
      });

      sendShopToken(shop, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return next(new ErrorHandler("Please provide all fields", 400));

      let shop = await Shop.findOne({ email }).select("+password");
      if (!shop) return next(new ErrorHandler("Shop doesn't exist", 400));

      const isPasswordValid = await shop.comparePassword(password);
      if (!isPasswordValid)
        return next(new ErrorHandler("Invalid Password", 400));

      sendShopToken(shop, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/logout",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("shop_token", null, {
        expiresIn: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({ success: true, message: "Log out successfull!" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.shop.id);
      if (!shop) return next(new ErrorHandler("Shop doesn't exist", 400));

      res.status(200).json({ success: true, shop });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.shopId);
      if (!shop) {
        return next(new ErrorHandler("No shop with this id found!", 400));
      }
      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler("Internal Server Error", 500));
    }
  })
);

router.put(
  "/",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const {
      email,
      password,
      phoneNumber,
      name,
      description,
      zipCode,
      address,
    } = req.body;

    const shop = await Shop.findOne({ email }).select("+password");

    if (!shop) {
      return next(new ErrorHandler("No shop found", 400));
    }

    const isPasswordValid = await shop.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid Password", 400));
    }

    if (name) shop.name = name;
    if (email) shop.email = email;
    if (phoneNumber) shop.phoneNumber = phoneNumber;
    if (description) shop.description = description;
    if (zipCode) shop.zipCode = zipCode;
    if (address) shop.address = address;

    await shop.save();

    res.status(201).json({ success: true, shop });
  })
);

router.put(
  "/update-avatar",
  isShopAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    const existAvatarPath = req.shop.avatar;
    fs.unlinkSync(existAvatarPath);
    const fileUrl = path.join("uploads", req.file.filename);
    req.shop.avatar = fileUrl;
    await req.shop.save();
    res.status(201).json({ success: true, shop: req.shop });
  })
);

const createActivationToken = (shop) => {
  return jwt.sign(shop, process.env.ACTIVATION_SECRET_KEY, { expiresIn: "5m" });
};

export default router;
