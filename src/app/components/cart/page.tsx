"use client";

import { useEffect, useState } from "react";
import { db, Food } from "../../../db/cartDB"; // adjust path

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Food[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [total, setTotal] = useState(0);

  // fetch cart items from IndexedDB
  const fetchCart = async () => {
    const items = await db.cart.toArray();
    setCartItems(items);
    calcTotal(items);
  };

  const calcTotal = (items: Food[]) => {
    const sum = items.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );
    setTotal(sum);
  };

  // increment item
  const increment = async (id: string) => {
    const item = await db.cart.get(id);
    if (item) {
      await db.cart.update(id, { quantity: (item.quantity || 1) + 1 });
      fetchCart();
    }
  };

  // decrement item
  const decrement = async (id: string) => {
    const item = await db.cart.get(id);
    if (item && item.quantity && item.quantity > 1) {
      await db.cart.update(id, { quantity: item.quantity - 1 });
    } else {
      await db.cart.delete(id);
    }
    fetchCart();
  };

  // remove item
  const removeFromCart = async (id: string) => {
    await db.cart.delete(id);
    fetchCart();
  };

  // Razorpay payment handler
  const handlePayment = () => {
    const options: any = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Razorpay Key
      amount: (total + 30) * 100, // total + delivery fee in paise
      currency: "INR",
      name: "Your App Name",
      description: "Order Payment",
      image: "/logo.png", // optional
      handler: function (response: any) {
        alert(`Payment successful. Razorpay Payment ID: ${response.razorpay_payment_id}`);
        // Optionally clear cart after payment
        db.cart.clear();
        fetchCart();
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: deliveryAddress,
      },
      theme: {
        color: "#F25C23",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    fetchCart();
    // load address from localStorage (set at signup/login)
    const savedAddress = localStorage.getItem("deliveryAddress");
    if (savedAddress) setDeliveryAddress(savedAddress);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans text-black">
      <div className="p-4 max-w-3xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row sm:items-center bg-white rounded-lg shadow-md p-4"
            >
              <img
                src={item.photo || "/placeholder-food.jpg"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md mx-auto sm:mx-0"
              />

              <div className="mt-3 sm:mt-0 sm:ml-4 flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                    item.type === "veg"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.type?.toUpperCase()}
                </span>

                {/* Quantity Controls */}
                <div className="flex justify-center sm:justify-start items-center mt-2 space-x-3">
                  <button
                    onClick={() => decrement(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded-md text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() => increment(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded-md text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Right side: Price + Remove */}
              <div className="flex justify-between sm:flex-col items-center sm:items-end mt-3 sm:mt-0 sm:ml-4 w-full sm:w-auto">
                <p className="font-bold">₹{(item.price || 0) * (item.quantity || 1)}</p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 text-xl ml-4 sm:ml-0"
                >
                  ❌
                </button>
              </div>
            </div>
          ))
        )}

        {/* Delivery Address */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <label className="block font-semibold mb-2">
            Delivery Address (update if needed)
          </label>
          <textarea
            value={deliveryAddress}
            onChange={(e) => {
              setDeliveryAddress(e.target.value);
              localStorage.setItem("deliveryAddress", e.target.value);
            }}
            className="w-full p-3 rounded-lg border border-gray-300 text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            rows={2}
          />
        </div>

        {/* Bill Details */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-lg mb-2">Bill Details</h3>
          <div className="flex justify-between text-sm">
            <span>Item Total</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery Fee</span>
            <span>₹30</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>To Pay</span>
            <span>₹{total + 30}</span>
          </div>
        </div>

        {/* Pay Now */}
        <button
          onClick={handlePayment}
          className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
