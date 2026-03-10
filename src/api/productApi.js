import axios from "axios";

// Use absolute URL in dev, relative in production
const API_URL =
  import.meta.env.VITE_API_BASE_URL || "/api/products";

// Fetch all products
export const getAllProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
};

// Fetch single product
export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch product ${id}:`, err);
    return null;
  }
};