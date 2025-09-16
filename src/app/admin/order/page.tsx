"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "../components/navbar/page";
import { Package, MapPin, CreditCard, IndianRupee } from "lucide-react";

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

  // ✅ Fetch orders
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar Always Visible */}
      <AdminNavbar />

      <main className="p-4 sm:p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left flex items-center gap-2">
          <Package className="w-7 h-7 text-orange-600" /> All Orders
        </h1>

        {/* ✅ Loading State */}
        {loading && (
          <div className="text-center py-10 text-gray-600">
            <p className="animate-pulse">Fetching orders...</p>
          </div>
        )}

        {/* ✅ No Orders State */}
        {!loading && orders.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <Package className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <h2 className="text-lg font-semibold text-gray-700">
              No orders yet
            </h2>
            <p className="text-sm text-gray-500">
              Orders placed by customers will appear here.
            </p>
          </div>
        )}

        {/* ✅ Orders List */}
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="font-semibold text-lg text-gray-800">
                  👤 User: {order.user}
                </h2>
                <p className="text-xs text-gray-500">
                  Ordered at: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <p className="flex items-center gap-2 text-sm text-gray-700">
                  <CreditCard className="w-4 h-4 text-gray-600" /> Payment Type:{" "}
                  <span className="font-medium">{order.paymentType}</span>
                </p>
                {order.razorpayPaymentId && (
                  <p className="flex items-center gap-2 text-sm text-gray-700">
                    <CreditCard className="w-4 h-4 text-gray-600" /> Payment ID:{" "}
                    <span className="font-mono text-gray-600">
                      {order.razorpayPaymentId}
                    </span>
                  </p>
                )}
                <p className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="w-4 h-4 text-red-500" /> Address:{" "}
                  <span className="font-medium">{order.deliveryAddress}</span>
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-gray-800">🛍 Items:</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
                    >
                      <img
                        src={item.photo || "/placeholder-food.jpg"}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.type.toUpperCase()} | ₹{item.price} ×{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-800">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <p className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <IndianRupee className="w-5 h-5 text-green-600" />
                  {order.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
