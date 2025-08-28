import mongoose from "mongoose";

const couponCodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter coupon code name!"],
      unique: true,
    },
    value: {
      type: Number,
      required: true,
    },
    minAmount: {
      type: Number,
    },
    maxAmount: {
      type: Number,
    },
    selectedProductId: {
      type: String,
    },
    shop: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Shop",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CouponCode", couponCodeSchema);
