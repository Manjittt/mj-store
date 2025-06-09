import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./route/authRoutes.js";
import categoryRoutes from "./route/categoryRoutes.js";
import productRoutes from "./route/productRoutes.js";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

// dotenv configure
dotenv.config();

// Connect to database
connectDB();

// express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Serve frontend static files for production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server running on ${
      process.env.DEV_MODE || "production"
    } mode on port ${PORT}`.bgCyan.white
  );
});
