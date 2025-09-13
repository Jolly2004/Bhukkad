"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "../components/navbar/page";
import Image from "next/image";

interface FoodData {
  name: string;
  description: string;
  price: string;
  type: "veg" | "nonveg";
  photo: string | null;
}

export default function AddFoodPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FoodData>({
    name: "",
    description: "",
    price: "",
    type: "veg",
    photo: null,
  });

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Authentication Guard
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("⚠️ You must be logged in to access this page");
      router.push("/pages/login");
    } else {
      const parsedUser = JSON.parse(user);
      if (parsedUser.username !== "admin") {
        alert("⚠️ You do not have permission to access this page");
        router.push("/");
      }
    }
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle image upload + resize + compress
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img: HTMLImageElement = new window.Image();
        img.src = reader.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 800;
          const maxHeight = 600;
          let width = img.width;
          let height = img.height;

          // Maintain aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);

          setFilePreview(compressedDataUrl);
          setFormData((prev: FoodData) => ({ ...prev, photo: compressedDataUrl }));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Saving...");

    try {
      const res = await fetch("/api/food/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: Number(formData.price) }),
      });

      const data = await res.json();
      setMessage(data.message || "✅ Food added successfully");

      // Reset form
      setFormData({ name: "", description: "", price: "", type: "veg", photo: null });
      setFilePreview(null);
    } catch {
      setMessage("❌ Error adding food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminNavbar />

      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#F25C23] mb-6">➕ Add New Food Item</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Item Name */}
          <div>
            <label className="font-semibold mb-1 block">Item Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Margherita Pizza"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F25C23] outline-none"
              required
            />
          </div>

          {/* Food Image */}
          <div>
            <label className="font-semibold mb-1 block">Food Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600"
            />
            {filePreview && (
              <div className="mt-3">
                <Image
                  src={filePreview as string}
                  alt="Preview"
                  width={320}
                  height={240}
                  className="object-cover rounded-lg shadow-md"
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold mb-1 block">Description</label>
            <textarea
              name="description"
              placeholder="Short description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F25C23] outline-none"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="font-semibold mb-1 block">Price (₹)</label>
            <input
              type="number"
              name="price"
              placeholder="100"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F25C23] outline-none"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="font-semibold mb-1 block">Type</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="veg"
                  checked={formData.type === "veg"}
                  onChange={handleChange}
                />
                Veg
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="nonveg"
                  checked={formData.type === "nonveg"}
                  onChange={handleChange}
                />
                Non-Veg
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F25C23] text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition"
          >
            {loading ? "Adding..." : "Add Food Item"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}
