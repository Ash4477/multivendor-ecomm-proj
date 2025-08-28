import express from "express";
import Stripe from "stripe";
import catchAyncErrors from "../middlewares/catchAsyncErrors.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post(
  "/process",
  catchAyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount, //amount must be sent in cents
      currency: "usd",
      metadata: { company: "Ash" },
    });
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  })
);

router.get(
  "/stripe_api_key",
  catchAyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  })
);

export default router;
