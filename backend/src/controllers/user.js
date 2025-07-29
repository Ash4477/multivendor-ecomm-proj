import fs from "node:fs";
import path from "node:path";
import express from "express";
import jwt from "jsonwebtoken";
import upload from "../multer.js";
import User from "../models/user.js";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/jwtToken.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

router.post("/", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  let userEmail;
  try {
    userEmail = await User.findOne({ email });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

  if (userEmail) {
    const filename = req.file.filename;
    const filePath = path.join("uploads", filename);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    return next(new ErrorHandler("user already exists", 400));
  }

  const filename = req.file.filename;
  const fileUrl = path.join("uploads", filename);

  const user = {
    name,
    email,
    password,
    avatar: fileUrl,
  };

  const activationToken = createActivationToken(user);

  const activationUrl = `http://localhost:5173/activation/${activationToken}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Activate your account",
      text: `Hello ${user.name}, please click on the link below to activate your account.\n${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `please check your email:- ${user.email} to activate account.`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activationToken } = req.body;
      const newUser = jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET_KEY
      );

      if (!newUser) return next(new ErrorHandler("Invalid token", 400));

      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return next(new ErrorHandler("Please provide all fields", 400));

      let user = await User.findOne({ email }).select("+password");
      if (!user) return next(new ErrorHandler("User doesn't exist", 400));

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid)
        return next(new ErrorHandler("Invalid Password", 400));

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return next(new ErrorHandler("User doesn't exist", 400));

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET_KEY, { expiresIn: "5m" });
};

export default router;
