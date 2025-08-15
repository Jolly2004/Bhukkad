import { Star, Plus } from "lucide-react";

export default function ProductsCards({ products }) {
  const rating = 4; // You can make this dynamic later

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
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
            <button className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
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

            <p className="text-orange-500 font-bold text-lg mt-2">
              ₹{item.price}
            </p>
          </div>
        </div>
      ))}

      {products.length === 0 && (
        <p className="text-center text-gray-500 col-span-full">
          No products available.
        </p>
      )}
    </div>
  );
}
