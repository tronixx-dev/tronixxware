// src/api/productApi.js
import axios from "axios";

const API_URL = "/api/products"; // Vite proxy will forward to backend

// Get all products
export const getAllProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    throw err;
  }
};

// Get single product by ID
export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch product ${id}:`, err);
    throw err;
  }
};
