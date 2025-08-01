import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/error.js";
import userRouter from "./controllers/user.js";
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

app.use(errorHandler);

export default app;
