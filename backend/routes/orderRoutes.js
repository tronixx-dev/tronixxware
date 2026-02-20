// routes/orderRoutes.js
import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create order
router.post("/", protect, async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0)
    return res.status(400).json({ message: "No order items" });

  if (!totalPrice || totalPrice <= 0)
    return res.status(400).json({ message: "Invalid total price" });

  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
});

// Get orders for logged-in user
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "orderItems.product",
      "name price image"
    );
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get orders" });
  }
});

export default router;