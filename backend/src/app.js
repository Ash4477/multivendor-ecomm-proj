import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/error.js";
import userRouter from "./controllers/user.js";

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
app.use("/", express.static("/uploads"));

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config();
}

//routes
app.use("/api/users", userRouter);

app.use(errorHandler);

export default app;
