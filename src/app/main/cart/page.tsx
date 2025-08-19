"use client";
import { useState, useEffect } from "react";
import { useCart } from "../../api/CartContext/CartContext";
import Navbar from "../../components/navbar/navbar/page";
import { useRouter } from "next/navigation";

// ✅ Payment Modal Component
function PaymentModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
    country: "India",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.cardNumber || !form.expiry || !form.cvc || !form.name) {
      setError("⚠️ Please fill all fields");
      return;
    }

    setError("");
    setOrderPlaced(true);

    // Simulate API call (you can POST to /api/payment here)
    setTimeout(() => {
      alert("✅ Payment successful! Order placed.");
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Pay with card</h2>
          <button
            onClick={orderPlaced ? undefined : onClose}
            className={`px-3 py-1 rounded text-sm ${
              orderPlaced ? "bg-green-600 text-white cursor-default" : "bg-gray-200"
            }`}
          >
            {orderPlaced ? "✅ Order Placed" : "✕"}
          </button>
        </div>

        <form onSubmit={handlePay} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="1234 1234 1234 1234"
            value={form.cardNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-2">
            <input
              type="text"
              name="expiry"
              placeholder="MM / YY"
              value={form.expiry}
              onChange={handleChange}
              className="flex-1 border p-2 rounded"
            />
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              value={form.cvc}
              onChange={handleChange}
              className="flex-1 border p-2 rounded"
            />
          </div>
          <input
            type="text"
            name="name"
            placeholder="Cardholder name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
            <option>Canada</option>
          </select>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={orderPlaced}
            className={`w-full py-2 rounded text-white ${
              orderPlaced ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {orderPlaced ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ✅ Delivery Form Component
function DeliveryForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const key in formData) {
      if (formData[key as keyof typeof formData].trim() === "") {
        setError("⚠️ Please fill all the fields before proceeding.");
        return;
      }
    }

    setError("");
    try {
      const res = await fetch("/api/delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Delivery details saved successfully!");
        onSuccess(); // ✅ open payment modal
      } else {
        alert("❌ Failed to save delivery details.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <section className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow mt-6">
      <h1 className="text-2xl font-bold mb-6">Delivery Information</h1>
      {error && <p className="text-red-600 font-medium mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="firstName" placeholder="First name"
            value={formData.firstName} onChange={handleChange}
            className="border p-2 rounded w-full" />
          <input type="text" name="lastName" placeholder="Last name"
            value={formData.lastName} onChange={handleChange}
            className="border p-2 rounded w-full" />
        </div>
        <input type="email" name="email" placeholder="Email"
          value={formData.email} onChange={handleChange}
          className="border p-2 rounded w-full" />
        <input type="text" name="street" placeholder="Street"
          value={formData.street} onChange={handleChange}
          className="border p-2 rounded w-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="city" placeholder="City"
            value={formData.city} onChange={handleChange}
            className="border p-2 rounded w-full" />
          <input type="text" name="state" placeholder="State"
            value={formData.state} onChange={handleChange}
            className="border p-2 rounded w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="zip" placeholder="Zip"
            value={formData.zip} onChange={handleChange}
            className="border p-2 rounded w-full" />
          <input type="text" name="country" placeholder="Country"
            value={formData.country} onChange={handleChange}
            className="border p-2 rounded w-full" />
        </div>

        <input type="tel" name="phone" placeholder="Phone"
          value={formData.phone} onChange={handleChange}
          className="border p-2 rounded w-full" />

        <button type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
          Proceed to Pay
        </button>
      </form>
    </section>
  );
}

// ✅ Cart Page
export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(subtotal * 0.1);
      setError("");
    } else if (coupon === "SAVE100") {
      setDiscount(100);
      setError("");
    } else {
      setDiscount(0);
      setError("Invalid coupon code");
    }
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      router.push("/main/login");
    } else {
      setShowDeliveryForm(true); // ✅ first show delivery form
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
              <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <img src={item.image_url} alt={item.name}
                    className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-orange-500 font-bold">₹{item.price * item.quantity}</p>
                    <p className="text-xs text-gray-500">₹{item.price} each</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => decreaseQty(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 font-bold">✕</button>
              </div>
            ))}

            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <div className="md:w-1/2 w-full p-4 bg-gray-50 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Apply Coupon</h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code" className="flex-1 border p-2 rounded w-full sm:w-auto" />
                  <button onClick={handleApplyCoupon}
                    className="bg-orange-500 text-white px-4 py-2 rounded text-sm">Apply</button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              <div className="md:w-1/2 w-full p-4 bg-gray-100 rounded-lg shadow">
                <h2 className="text-xl font-semibold">Subtotal: ₹{subtotal}</h2>
                {discount > 0 && (
                  <p className="text-green-600 font-medium">Discount Applied: -₹{discount}</p>
                )}
                <h2 className="text-2xl font-bold mt-2">Total: ₹{total}</h2>
                <button onClick={handleCheckout}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                  Checkout
                </button>
              </div>
            </div>

            {/* ✅ Show Delivery Form */}
            {showDeliveryForm && (
              <DeliveryForm onSuccess={() => { 
                setShowDeliveryForm(false);
                setShowPayment(true); // ✅ open payment modal after delivery
              }} />
            )}

            {/* ✅ Show Payment Modal */}
            {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}
          </div>
        )}
      </div>
    </section>
  );
}
