"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "../components/navbar/page";
import Image from "next/image";

interface Food {
  _id: string;
  name: string;
  description: string;
  price: number;
  type: "veg" | "nonveg";
  photo: string;
}

export default function FoodsPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all foods
  const fetchFoods = async () => {
    try {
      const res = await fetch("/api/food/add", { method: "GET" });
      const data = await res.json();
      setFoods(data.foods || []);
    } catch (err) {
      console.error("❌ Fetch Foods Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a food
  const deleteFood = async (id: string) => {
    try {
      const res = await fetch("/api/food/add", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setFoods((prev) => prev.filter((f) => f._id !== id));
      }
    } catch (err) {
      console.error("❌ Delete Food Error:", err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">🍴 All Foods</h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : foods.length === 0 ? (
          <p className="text-gray-600">No food items found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {foods.map((food) => (
              <div
                key={food._id}
                className="flex flex-col md:flex-row items-start md:items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                {/* Image */}
                <Image
                  src={food.photo || "/placeholder-food.jpg"}
                  alt={food.name}
                  width={120}
                  height={80}
                  className="object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1 md:ml-4 mt-3 md:mt-0">
                  <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
                  <p className="text-gray-600 text-sm truncate md:w-[350px]">{food.description}</p>
                  <p className="text-gray-800 font-bold mt-1">₹{food.price}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${food.type === "veg"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                    }`}
                  >
                    {food.type.toUpperCase()}
                  </span>
                </div>

                {/* Actions */}
                <button
                  onClick={() => deleteFood(food._id)}
                  className="mt-3 md:mt-0 md:ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
