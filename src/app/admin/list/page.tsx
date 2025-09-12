"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "../components/navbar/page";

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

  // ✅ Fetch all foods
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

  // ✅ Delete a food
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
    <div>
        <AdminNavbar/>
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🍴 All Foods</h2>

      {loading ? (
        <p>Loading...</p>
      ) : foods.length === 0 ? (
        <p>No food items found</p>
      ) : (
        <div className="space-y-4">
          {foods.map((food) => (
            <div
              key={food._id}
              className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              {/* Left: Image */}
              <img
                src={food.photo || "/placeholder-food.jpg"}
                alt={food.name}
                className="w-28 h-20 object-cover rounded-lg"
              />

              {/* Middle: Info */}
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{food.name}</h3>
                <p className="text-gray-600 text-sm truncate w-[400px]">
                  {food.description}
                </p>
                <p className="text-gray-800 font-bold mt-1">₹{food.price}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    food.type === "veg"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {food.type.toUpperCase()}
                </span>
              </div>

              {/* Right: Actions */}
              <button
                onClick={() => deleteFood(food._id)}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
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
