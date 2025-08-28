import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter event product name!"],
    },
    description: {
      type: String,
      required: [true, "Please enter event product description!"],
    },
    category: {
      type: String,
      required: [true, "Please enter event product category!"],
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, default: "Running" },
    tags: {
      type: String,
      required: [true, "Please enter product tags!"],
    },
    originalPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
      required: [true, "Please enter product discounted price!"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter total product stock"],
    },
    images: [{ type: String }],
    shop: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Shop",
      required: true,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
