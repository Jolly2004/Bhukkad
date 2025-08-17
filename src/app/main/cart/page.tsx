"use client";
import { useState, useEffect } from "react";
import { useCart } from "../../api/CartContext/CartContext";
import Navbar from "../../components/navbar/navbar/page";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Detect user login status
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Total without discount
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal - discount;

  // Apply coupon logic
  const handleApplyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(subtotal * 0.1); // 10% off
      setError("");
    } else if (coupon === "SAVE100") {
      setDiscount(100); // flat ₹100 off
      setError("");
    } else {
      setDiscount(0);
      setError("Invalid coupon code");
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!isLoggedIn) {
      router.push("/main/login"); // Redirect if not logged in
    } else {
      router.push("/main/checkout"); // Proceed if logged in
    }
  };

  return (
    <section>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                {/* Product Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-orange-500 font-bold">
                      ₹{item.price * item.quantity}
                    </p>
                    <p className="text-xs text-gray-500">₹{item.price} each</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Remove item */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Coupon + Total Section */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              {/* Coupon Code Section */}
              <div className="md:w-1/2 w-full p-4 bg-gray-50 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Apply Coupon</h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 border p-2 rounded w-full sm:w-auto"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-orange-500 text-white px-4 py-2 rounded text-sm"
                  >
                    Apply
                  </button>
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>

              {/* Cart total */}
              <div className="md:w-1/2 w-full p-4 bg-gray-100 rounded-lg shadow">
                <h2 className="text-xl font-semibold">Subtotal: ₹{subtotal}</h2>
                {discount > 0 && (
                  <p className="text-green-600 font-medium">
                    Discount Applied: -₹{discount}
                  </p>
                )}
                <h2 className="text-2xl font-bold mt-2">Total: ₹{total}</h2>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
