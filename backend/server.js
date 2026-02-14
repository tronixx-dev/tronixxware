// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js"; // note .js extension required in ES modules

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI) // options removed
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error ❌", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
