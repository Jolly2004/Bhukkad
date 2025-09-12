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

  if (loading) return <p className="p-6">Loading orders...</p>;

  if (orders.length === 0) return <p className="p-6">No orders found.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📦 All Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="font-semibold text-lg mb-2">User: {order.user}</h2>
          <p className="text-sm mb-2">Payment Type: {order.paymentType}</p>
          {order.razorpayPaymentId && (
            <p className="text-sm mb-2">Payment ID: {order.razorpayPaymentId}</p>
          )}
          <p className="text-sm mb-2">Delivery Address: {order.deliveryAddress}</p>
          <p className="font-bold mb-2">Total: ₹{order.totalAmount}</p>
          <div>
            <h3 className="font-semibold mb-1">Items:</h3>
            <ul className="list-disc pl-5">
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.name} ({item.type}) x {item.quantity} = ₹{item.price * item.quantity}
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
