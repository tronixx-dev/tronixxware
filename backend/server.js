// backend/server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; 
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // if you have auth

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://tronixx-dev-tronixxware.vercel.app"
  ],
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes); // optional

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});