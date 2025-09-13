"use client";

import { useEffect, useState } from "react";
import { db, Food } from "../../../db/cartDB"; // adjust path

export default function FoodsPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

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

  const addToCart = async (food: Food) => {
    const existing = await db.cart.get(food._id);

    if (existing) {
      await db.cart.update(food._id, {
        quantity: (existing.quantity || 1) + 1,
      });
    } else {
      await db.cart.add({ ...food, quantity: 1 });
    }

    alert(`${food.name} added to cart ✅`);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans text-black"> {/* ✅ Force black text & font */}
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 font-serif">🍴 All Foods</h2> {/* ✅ New font for heading */}

        {loading ? (
          <p className="text-black">Loading...</p>
        ) : foods.length === 0 ? (
          <p className="text-black">No food items found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-lg transition"
              >
                <img
                  src={food.photo || "/placeholder-food.jpg"}
                  alt={food.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-3 font-mono text-black">
                  {food.name}
                </h3>
                <p className="text-gray-700 text-sm line-clamp-2 font-sans">
                  {food.description}
                </p>
                <p className="text-gray-900 font-bold mt-2 font-sans">₹{food.price}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full mt-2 w-fit font-sans ${
                    food.type === "veg"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {food.type.toUpperCase()}
                </span>
                <button
                  onClick={() => addToCart(food)}
                  className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition font-sans"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
