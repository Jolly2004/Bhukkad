'use client';

import { useState, useEffect } from "react";
import { FaPlus, FaCheckSquare } from "react-icons/fa";

export default function AdminPanel() {
  const [active, setActive] = useState<"add" | "list" | "orders">("list");
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'Salad',
    price: '',
    image: null as File | null,
  });
  const [products, setProducts] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm(prev => ({ ...prev, image: file }));
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('price', form.price);
    if (form.image) formData.append('image', form.image);

    const res = await fetch('/api/products', { method: 'POST', body: formData });
    const data = await res.json().catch(() => null);

    alert(data?.message || 'Added successfully');
    setForm({ name: '', description: '', category: 'Salad', price: '', image: null });
    setPreview(null);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error(`Server ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid format");
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to load products.");
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  // Fetch products automatically when switching to list
  useEffect(() => {
    if (active === 'list') fetchProducts();
  }, [active]);

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-md p-4">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Bhukkad<span className="text-black">.</span></h1>
        <p className="text-sm text-gray-500 mb-6">Admin Panel</p>

        <div className="space-y-3">
          <button onClick={() => setActive("add")} className={`flex items-center gap-2 w-full px-4 py-2 border rounded ${active === "add" ? "bg-gray-100 border-gray-400" : ""}`}>
            <FaPlus /> Add Items
          </button>
          <button onClick={() => setActive("list")} className={`flex items-center gap-2 w-full px-4 py-2 border rounded ${active === "list" ? "bg-gray-100 border-gray-400" : ""}`}>
            <FaCheckSquare /> List Items
          </button>
          <button onClick={() => setActive("orders")} className={`flex items-center gap-2 w-full px-4 py-2 border rounded ${active === "orders" ? "bg-gray-100 border-gray-400" : ""}`}>
            <FaCheckSquare /> Orders
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-6 overflow-y-auto">
        {active === "add" && (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
            <label className="block text-sm font-medium text-gray-900">Upload Image</label>
            <div className="border border-dashed p-4 text-center">
              <input type="file" accept="image/*" onChange={handleImage} />
              {preview ? (
                <img src={preview} alt="Preview" className="w-32 h-32 object-cover mx-auto mt-2" />
              ) : <p>Upload</p>}
            </div>

            <input type="text" name="name" placeholder="Product name" onChange={handleChange}
              className="w-full border p-2" value={form.name} required />

            <textarea name="description" placeholder="Product description"
              onChange={handleChange} className="w-full border p-2" value={form.description} required />

            <div className="flex gap-4">
              <select name="category" onChange={handleChange} className="border p-2 flex-1" value={form.category}>
                <option>Salad</option>
                <option>Pizza</option>
                <option>Burger</option>
              </select>
              <input type="number" name="price" placeholder="Product Price"
                onChange={handleChange} className="border p-2 flex-1" value={form.price} required />
            </div>

            <button type="submit" className="bg-black text-white px-6 py-2">ADD</button>
          </form>
        )}
{active === "list" && (
  <div>
    <h2 className="text-xl font-semibold mb-4">Products List</h2>
    <div className="space-y-3">
      {products.map(item => (
        <div
          key={item.id}
          className="flex items-center justify-between border p-4 rounded shadow hover:shadow-md transition"
        >
          {/* Image */}
          <div className="w-16 h-16 flex-shrink-0">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover rounded"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 px-4">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>

          {/* Category */}
          <div className="w-24 text-center text-sm text-gray-700">{item.category}</div>

          {/* Price */}
          <div className="w-20 text-center font-semibold text-green-700">₹{item.price}</div>

          {/* Delete Button */}
          <div className="w-20 text-right">
            <button
              onClick={() => deleteProduct(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              x
            </button>
          </div>
        </div>
      ))}

      {products.length === 0 && (
        <p className="text-center text-gray-500 py-4">No products available.</p>
      )}
    </div>
  </div>
)}


        {active === "orders" && (
          <h2 className="text-xl font-semibold">Orders Section (Coming soon...)</h2>
        )}
      </div>
    </div>
  );
}
