// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Product form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products", // backend endpoint
        {
          name,
          category,
          price: Number(price),
          image,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // auth token from login
          },
        }
      );

      if (res.status === 201) {
        setMessage("Product added successfully!");
        // Clear form
        setName("");
        setCategory("Electronics");
        setPrice("");
        setImage("");
        setDescription("");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="mb-6 flex justify-between items-center">
        <span className="font-semibold">{user.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.includes("success") ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleAddProduct}>
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Toys</option>
            <option>Home</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Price (₦)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Dashboard;