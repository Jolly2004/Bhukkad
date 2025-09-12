"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db, Food } from "../../../db/cartDB";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Food[]>([]);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const TIMEOUT_MS = 300000; // 5 min

  // ✅ Clear cart + redirect
  const handleSessionExpire = async () => {
    await db.cart.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("sessionStart");
    alert("⚠️ Session expired. Please log in again.");
    router.push("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/pages/login");
      return;
    }

    const sessionStart = localStorage.getItem("sessionStart");
    const now = Date.now();

    if (!sessionStart) localStorage.setItem("sessionStart", now.toString());
    else if (now - parseInt(sessionStart, 10) > TIMEOUT_MS) handleSessionExpire();

    const loadCart = async () => {
      const items = await db.cart.toArray();
      setCartItems(items);
      setLoading(false);
    };
    loadCart();

    let timeoutId: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => handleSessionExpire(), TIMEOUT_MS);
    };

    resetTimer();
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [router]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // ✅ Razorpay Checkout + Save Order
  const openRazorpay = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: totalAmount * 100, // in paise
      currency: "INR",
      name: "Food Order",
      description: "Payment for your food order",
      handler: async function (response: any) {
        try {
          // Save order to MongoDB
          const orderData = {
            user: localStorage.getItem("user") || "",
            items: cartItems,
            deliveryAddress: deliveryInstructions,
            paymentType: "Razorpay",
            totalAmount,
            razorpayPaymentId: response.razorpay_payment_id,
          };

          await fetch("/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          });

          alert("✅ Payment successful! Order saved.");
          await db.cart.clear();
          router.push("/"); // redirect after success
        } catch (err: any) {
          console.error(err);
          alert("❌ Payment succeeded but order could not be saved.");
        }
      },
      prefill: { name: localStorage.getItem("user") || "" },
      theme: { color: "#F97316" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ✅ Handle delivery form submission + open Razorpay
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryInstructions.trim()) {
      alert("Please enter a delivery address.");
      return;
    }
    localStorage.setItem("deliveryInstructions", deliveryInstructions);
    openRazorpay();
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl shadow-md p-4 flex flex-col relative">
                <img src={item.photo || "/placeholder-food.jpg"} alt={item.name} className="w-full h-40 object-cover rounded-lg" />
                <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
                <p className="text-gray-800 font-bold mt-2">₹{item.price}</p>
                <span className="text-xs px-2 py-1 rounded-full mt-2 w-fit bg-green-100 text-green-600">{item.type?.toUpperCase()}</span>
                <p>Qty: {item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          {/* Delivery Instructions + Pay */}
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Delivery Address</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                placeholder="Add your address for delivery and any instructions..."
                className="w-full border rounded-lg p-2 mb-4 resize-none h-24"
                required
              />
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Pay Now
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
