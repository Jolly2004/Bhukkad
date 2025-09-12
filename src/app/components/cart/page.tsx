"use client";

import { useEffect, useState } from "react";

interface Food {
  _id: string;
  name: string;
  description: string;
  price: number;
  type: "veg" | "nonveg";
  photo: string;
  quantity?: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Food[]>([]);
  const [showModal, setShowModal] = useState(false); // ✅ Modal state
  const [deliveryInstructions, setDeliveryInstructions] = useState(""); // ✅ Form state

  // Load cart from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const normalized = cart.map((item: Food) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(normalized);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Increment quantity
  const incrementQty = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  // Decrement quantity
  const decrementQty = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
            : item
        )
        .filter((item) => item.quantity! > 0)
    );
  };

  // Remove item
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
  };

  // Calculate total price
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Delivery Instructions Submitted:\n${deliveryInstructions}`);
    setShowModal(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col relative"
              >
                <button
                  onClick={() => removeItem(item._id)}
                  className="absolute top-2 right-2 text-red-500 font-bold text-xl hover:text-red-700"
                >
                  &times;
                </button>

                <img
                  src={item.photo || "/placeholder-food.jpg"}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.description}
                </p>
                <p className="text-gray-800 font-bold mt-2">₹{item.price}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full mt-2 w-fit ${
                    item.type === "veg"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.type.toUpperCase()}
                </span>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => decrementQty(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => incrementQty(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Amount Table */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Item</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">₹{item.price}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">₹{item.price * (item.quantity || 1)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t font-bold">
                  <td className="p-2" colSpan={3}>
                    Total
                  </td>
                  <td className="p-2">₹{totalAmount}</td>
                </tr>
              </tfoot>
            </table>

            <button
              onClick={() => setShowModal(true)}
              className="mt-4 w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {/* ✅ Delivery Instructions Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4">Delivery Instructions</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                placeholder="Add any instructions for delivery..."
                className="w-full border rounded-lg p-2 mb-4 resize-none h-24"
                required
              />
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Submit & Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
