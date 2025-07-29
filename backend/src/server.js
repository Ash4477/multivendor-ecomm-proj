import app from "./app.js";
import connectDB from "./db/database.js";
import dotenv from "dotenv";

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  console.error("Shutting down the server...");
  process.exit(1);
});

// Load environment variables
if (process.env.NODE_ENV != "PRODUCTION") {
  dotenv.config();
}

// connect DB
connectDB();

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err.message);
  console.error("Shutting down the server...");

  server.close(() => {
    process.exit(1);
  });
});
