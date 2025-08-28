import express from "express";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import upload from "../multer.js";

const router = express.Router();

router.post(
  "/",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    const messageData = req.body;

    if (req.files) {
      const imageUrls = req.files.map((file) => file.fileName);
      messageData.images = imageUrls;
    }

    const message = await Message.create(messageData);

    res.status(201).json({ success: true, message });
  })
);

router.get(
  "/conversation/:id",
  catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find({ conversation: req.params.id });
    res.status(200).json({ success: true, messages });
  })
);

export default router;
