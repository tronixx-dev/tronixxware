import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/api/orders/myorders",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="p-8">
        <p>You are not logged in.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <p className="mb-6">
        Welcome, <span className="font-semibold">{user.name}</span>!
      </p>

      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded shadow border-l-4 border-blue-600"
            >
              <div className="flex justify-between mb-2">
                <span className="font-bold">Order ID:</span>
                <span>{order._id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Total:</span>
                <span>₦{order.totalPrice.toLocaleString()}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold">Items:</span>
                <ul className="ml-4 list-disc">
                  {order.orderItems.map((item) => (
                    <li key={item.product._id || item.product}>
                      {item.name} x {item.qty} (₦{item.price.toLocaleString()})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-sm text-gray-500">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;