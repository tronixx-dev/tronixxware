import axios from "axios";

// Point to your backend server
const API_URL = "http://localhost:5000/api/products";

export const getAllProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    throw err;
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch product ${id}:`, err);
    throw err;
  }
};