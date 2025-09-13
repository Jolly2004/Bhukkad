"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  type: string;
  photo: string;
}

interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  deliveryAddress: string;
  paymentType: string;
  totalAmount: number;
  razorpayPaymentId?: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Authentication Guard
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("⚠️ You must be logged in to access this page");
      router.push("/pages/login");
    } else {
      const parsedUser = JSON.parse(user);
      if (parsedUser.username !== "admin") {
        alert("⚠️ You do not have permission to access this page");
        router.push("/"); // redirect non-admin users
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/order");
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-6 text-gray-700">Loading orders...</p>;

  if (orders.length === 0)
    return <p className="p-6 text-gray-700">No orders found.</p>;

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        📦 All Orders
      </h1>
      {orders.map((order) => (
        <div
          key={order._id}
          className="mb-6 p-4 sm:p-6 bg-white rounded-2xl shadow-md w-full"
        >
          <h2 className="font-semibold text-lg text-gray-800 mb-2">
            User: {order.user}
          </h2>
          <p className="text-sm text-gray-700 mb-1">
            Payment Type: {order.paymentType}
          </p>
          {order.razorpayPaymentId && (
            <p className="text-sm text-gray-700 mb-1">
              Payment ID: {order.razorpayPaymentId}
            </p>
          )}
          <p className="text-sm text-gray-700 mb-1">
            Delivery Address: {order.deliveryAddress}
          </p>
          <p className="font-bold text-gray-800 mb-2">
            Total: ₹{order.totalAmount}
          </p>
          <div>
            <h3 className="font-semibold mb-1 text-gray-800">Items:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.name} ({item.type}) x {item.quantity} = ₹
                  {item.price * item.quantity}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Ordered at: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
