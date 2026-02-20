// pages/AdminProducts.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AdminProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("/api/admin/products", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setProducts(res.data);
  };

  const handleFileChange = (e) => {
    setForm({ ...form, images: e.target.files });
  };

  const handleAddProduct = async () => {
    if (!form.name || !form.price) return alert("Name & Price required");

    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("category", form.category);
    data.append("description", form.description);

    for (let i = 0; i < form.images.length; i++) {
      data.append("images", form.images[i]);
    }

    setLoading(true);
    try {
      await axios.post("/api/admin/products", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setForm({ name: "", price: "", category: "", description: "", images: [] });
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchProducts();
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      images: [], // new uploads
    });
  };

  const handleUpdateProduct = async () => {
    if (!editProduct) return;

    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("category", form.category);
    data.append("description", form.description);

    for (let i = 0; i < form.images.length; i++) {
      data.append("images", form.images[i]);
    }

    setLoading(true);
    try {
      await axios.put(`/api/admin/products/${editProduct._id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setEditProduct(null);
      setForm({ name: "", price: "", category: "", description: "", images: [] });
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
    setLoading(false);
  };

  const closeModal = () => {
    setEditProduct(null);
    setForm({ name: "", price: "", category: "", description: "", images: [] });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Products</h1>

      {/* Add Product Form */}
      {!editProduct && (
        <div className="mb-6 p-4 border rounded space-y-2">
          <h2 className="font-semibold">Add Product</h2>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 w-full"
          />
          <input type="file" multiple onChange={handleFileChange} className="border p-2 w-full" />
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      )}

      {/* Product Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Images</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">₦{p.price}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2 flex gap-1">
                {p.images?.map((img, idx) => (
                  <img key={idx} src={img} alt="" className="w-12 h-12 object-cover" />
                ))}
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => openEditModal(p)}
                  className="bg-yellow-500 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-600 px-2 py-1 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96 space-y-2 relative">
            <h2 className="font-semibold text-lg">Edit Product</h2>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-red-600 font-bold"
            >
              ✕
            </button>

            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 w-full"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border p-2 w-full"
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border p-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="border p-2 w-full"
            />
            <input type="file" multiple onChange={handleFileChange} className="border p-2 w-full" />
            <button
              onClick={handleUpdateProduct}
              className="bg-green-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}