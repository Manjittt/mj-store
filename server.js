import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Import DB and routes
import connectDB from "./config/db.js";
import authRoutes from "./route/authRoutes.js";
import categoryRoutes from "./route/categoryRoutes.js";
import productRoutes from "./route/productRoutes.js";
import paymentRoutes from "./route/paymentRoute.js";
import orderRoutes from "./route/orderRoutes.js";
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/order", orderRoutes);

// Frontend production setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "client/build");

  // Serve static files
  app.use(express.static(buildPath));

  // Serve index.html for any unknown route
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  // For development, simple response
  app.get("/", (req, res) => {
    res.send("API is running... (Development mode)");
  });
}

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
      .bgCyan.white,
  );
});
