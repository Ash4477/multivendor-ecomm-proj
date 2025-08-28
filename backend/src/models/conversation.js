import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    groupId: { type: String, required: true },
    members: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
      },
    },
    lastMessage: { type: String },
    lastMessageId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
