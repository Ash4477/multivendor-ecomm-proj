import express from "express";
import Conversation from "../models/conversation.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {
  isShopAuthenticated,
  isUserAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/",
  catchAsyncErrors(async (req, res, next) => {
    const { groupId, userId, shopId } = req.body;

    let conversation = await Conversation.findOne({ groupId });

    if (conversation) {
      return res.status(200).json({ success: true, conversation });
    }

    conversation = await Conversation.create({
      members: {
        user: userId,
        shop: shopId,
      },
      groupId,
    });

    res.status(201).json({ success: true, conversation });
  })
);

router.get(
  "/shop",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const conversations = await Conversation.find({
      "members.shop": req.shop._id,
    })
      .populate("members.user", "name email avatar")
      .sort({ updatedAt: -1, createdAt: -1 });
    res.status(200).json({ success: true, conversations });
  })
);

router.get(
  "/user",
  isUserAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const conversations = await Conversation.find({
      "members.user": req.user._id,
    })
      .populate("members.shop", "name email avatar")
      .sort({ updatedAt: -1, createdAt: -1 });
    res.status(200).json({ success: true, conversations });
  })
);

router.get(
  "/:id/user",
  catchAsyncErrors(async (req, res, next) => {
    const conversation = await Conversation.findById(req.params.id)
      .populate("members.shop", "name email avatar")
      .sort({ updatedAt: -1, createdAt: -1 });
    if (!conversation) return next(new ErrorHandler("wrong id", 400));
    res.status(200).json({ success: true, conversation });
  })
);

router.put(
  "/:id/last-message",
  catchAsyncErrors(async (req, res, next) => {
    const { lastMessage, lastMessageId } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage,
      lastMessageId,
    });

    res.status(201).json({ success: true, conversation });
  })
);

export default router;
