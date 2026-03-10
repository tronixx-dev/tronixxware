import axios from "axios";

const API_URL = "/api/products"; // relative path works locally and on Vercel

export const getAllProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch product ${id}:`, err);
    return null;
  }
};