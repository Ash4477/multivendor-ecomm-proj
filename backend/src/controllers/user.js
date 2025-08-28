import fs from "node:fs";
import path from "node:path";
import express from "express";
import jwt from "jsonwebtoken";
import upload from "../multer.js";
import User from "../models/user.js";
import sendMail from "../utils/sendMail.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { sendUserToken } from "../utils/jwtToken.js";
import { isUserAuthenticated } from "../middlewares/auth.js";

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
      if (err) {
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "error deleting file" });
      }
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

      sendUserToken(user, 201, res);
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

      let user = await User.findOne({ email }).select("+password");
      if (!user) return next(new ErrorHandler("User doesn't exist", 400));

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid)
        return next(new ErrorHandler("Invalid Password", 400));

      sendUserToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/logout",
  isUserAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
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
  isUserAuthenticated,
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

router.put(
  "/",
  isUserAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { email, password, phoneNumber, name } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("No user found", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid Password", 400));
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();

    res.status(201).json({ success: true, user });
  })
);

router.put(
  "/update-avatar",
  isUserAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    const existUser = await User.findById(req.user.id);
    const existAvatarPath = existUser.avatar;
    fs.unlinkSync(existAvatarPath);
    const fileUrl = path.join("uploads", req.file.filename);
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: fileUrl });
    res.status(201).json({ success: true, user });
  })
);

router.put(
  "/update-addresses",
  isUserAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === req.body.addressType
    );

    if (sameTypeAddress) {
      return next(
        new ErrorHandler(
          `${req.body.addressType} type address already exists`,
          400
        )
      );
    }

    const existAddress = user.addresses.find((add) => add._id === req.body._id);
    if (existAddress) {
      Object.assign(existAddress, req.body);
    } else {
      user.addresses.push(req.body);
    }

    await user.save();

    res.status(201).json({ success: true, user });
  })
);

router.put(
  "/delete-address/:id",
  isUserAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const userId = req.body.userId;
    const addressId = req.params.id;

    await User.updateOne(
      { _id: userId },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(201).json({ success: true, user });
  })
);

router.put(
  "/change-password",
  isUserAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");
    const isOldPasswordValid = await user.comparePassword(oldPassword);
    if (!isOldPasswordValid) {
      return next(new ErrorHandler("Incorrect Old Password!", 400));
    }
    user.password = newPassword;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password Updated Successfully" });
  })
);

router.get(
  "/:id",
  catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) next(new ErrorHandler("No user found with this id", 400));

    res.status(200).json({ success: true, user });
  })
);

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET_KEY, { expiresIn: "5m" });
};

export default router;
