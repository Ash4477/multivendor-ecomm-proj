import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name!"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description!"],
    },
    category: {
      type: String,
      required: [true, "Please enter product category!"],
    },
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
      required: [true, "Please enter product stock!"],
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
    reviews: [
      {
        user: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "User",
          required: true,
        },
        comment: { type: String },
        rating: { type: Number, default: 1 },
      },
    ],
    rating: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
