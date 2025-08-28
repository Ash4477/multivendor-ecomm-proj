import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/error.js";
import userRouter from "./controllers/user.js";
import shopRouter from "./controllers/shop.js";
import productRouter from "./controllers/product.js";
import couponCodeRouter from "./controllers/couponCode.js";
import eventRouter from "./controllers/event.js";
import paymentsRouter from "./controllers/payment.js";
import ordersRouter from "./controllers/order.js";
import conversationsRouter from "./controllers/conversation.js";
import messagesRouter from "./controllers/message.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config();
}

//routes
app.use("/api/users", userRouter);
app.use("/api/shops", shopRouter);
app.use("/api/products", productRouter);
app.use("/api/events", eventRouter);
app.use("/api/coupons", couponCodeRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/conversations", conversationsRouter);
app.use("/api/messages", messagesRouter);

app.use(errorHandler);

export default app;
