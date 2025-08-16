"use client";
import { Star, Plus } from "lucide-react";
import { useCart } from "../../api/CartContext/CartContext";
import toast from "react-hot-toast";

export default function ProductsCards({ products }) {
  const { addToCart } = useCart();
  const rating = 4;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
  {products.map((item) => (
    <div
      key={item.id}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => {
            addToCart({
              id: item.id,
              name: item.name,
              price: item.price,
              image_url: item.image_url,
            });
            toast.success(`${item.name} added to cart! 🛒`);
          }}
          className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        >
          <Plus className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-orange-500 fill-orange-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-1">{item.description}</p>
        <p className="text-orange-500 font-bold text-lg mt-2">₹{item.price}</p>
      </div>
    </div>
  ))}
</div>

  );
}
