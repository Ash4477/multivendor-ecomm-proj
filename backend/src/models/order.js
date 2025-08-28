import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    cart: { type: Array, required: true },
    shippingAddress: { type: Object, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    totalPrice: { type: Number, required: [true, "Total Price required"] },
    status: { type: String, default: "Processing" },
    deliveredAt: { type: Date },
    paymentInfo: {
      id: { type: String },
      status: { type: String },
      type: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
