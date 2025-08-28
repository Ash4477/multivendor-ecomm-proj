import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const shopSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter your name!"] },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
      minLength: [4, "Password should be greater than 4 characters"],
      select: false,
    },
    description: { type: String },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    zipCode: { type: String, required: true },
    role: { type: String, default: "seller" },
    avatar: {
      type: String,
      required: [true, "Upload File"],
      // public_id: {
      //   type: String,
      //   required: true,
      // },
      // url: {
      //   type: String,
      //   required: true,
      // },
    },
    totalProducts: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { timestamps: true }
);

shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

shopSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Shop", shopSchema);
