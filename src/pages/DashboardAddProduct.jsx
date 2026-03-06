// src/pages/DashboardAddProduct.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function DashboardAddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tags, setTags] = useState("");
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [status, setStatus] = useState("draft"); // draft or published
  const [loading, setLoading] = useState(false);

  // Fetch categories and brands from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          axios.get("/api/categories"),
          axios.get("/api/brands")
        ]);
        setCategories(catRes.data);
        setBrands(brandRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setGallery(urls);
  };
l
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name,
        description,
        image,
        gallery,
        categories: selectedCategories,
        tags: tags.split(",").map((t) => t.trim()),
        brand: selectedBrand,
        price,
        salePrice,
        status,
      };

      const res = await axios.post("/api/products", payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Product created successfully!");
      // Reset form
      setName("");
      setDescription("");
      setImage("");
      setGallery([]);
      setSelectedCategories([]);
      setTags("");
      setSelectedBrand("");
      setPrice("");
      setSalePrice("");
      setStatus("draft");
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded mt-20">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div>
          <label className="block mb-1 font-semibold">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded text-black"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Product Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded text-black"
            rows={6}
          />
        </div>

        {/* Main Image */}
        <div>
          <label className="block mb-1 font-semibold">Product Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 rounded text-black"
          />
        </div>

        {/* Gallery */}
        <div>
          <label className="block mb-1 font-semibold">Product Gallery</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleGalleryChange}
            className="w-full text-black"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {gallery.map((url, i) => (
              <img key={i} src={url} className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block mb-1 font-semibold">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <label key={cat._id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={cat._id}
                  checked={selectedCategories.includes(cat._id)}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedCategories((prev) =>
                      prev.includes(val)
                        ? prev.filter((c) => c !== val)
                        : [...prev, val]
                    );
                  }}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 font-semibold">Product Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 rounded text-black"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-1 font-semibold">Brand</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full p-2 rounded text-black"
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Prices */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Regular Price (₦)</label>
            <input
              type="number"
              value={price}
              
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 rounded text-black"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Sale Price (₦)</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="w-full p-2 rounded text-black"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 rounded text-black"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold"
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
