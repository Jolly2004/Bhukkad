"use client";

import { useEffect, useState } from "react";

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

  // ✅ Add to Cart (stores in localStorage)
  const addToCart = (food: Food) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, food];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${food.name} added to cart ✅`);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div>
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">🍴 All Foods</h2>

        {loading ? (
          <p>Loading...</p>
        ) : foods.length === 0 ? (
          <p>No food items found</p>
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
                <h3 className="text-lg font-semibold mt-3">{food.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {food.description}
                </p>
                <p className="text-gray-800 font-bold mt-2">₹{food.price}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full mt-2 w-fit ${
                    food.type === "veg"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {food.type.toUpperCase()}
                </span>

                {/* ✅ Add to Cart Button */}
                <button
                  onClick={() => addToCart(food)}
                  className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
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
