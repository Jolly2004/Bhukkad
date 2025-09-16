"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // 👁️ icons

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    // ✅ Admin check
    if (email === "admin" && password === "admin") {
      localStorage.setItem("user", JSON.stringify({ username: "admin" }));
      router.push("/admin/add");
      return;
    }

    // Normal user login
    try {
      const response = await axios.post("/api/login", { email, password });

      if (response.data.success) {
        setSuccess("Login successful!");
        setEmail("");
        setPassword("");

        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/");
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f8f8] px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        {/* Branding */}
        <h2 className="text-3xl font-extrabold text-center text-red-600 mb-2">
          Bhukkad
        </h2>
        <p className="text-center text-gray-500 mb-6">Welcome back! Log in</p>

        {/* Alerts */}
        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded-md text-center mb-4">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 bg-green-100 p-2 rounded-md text-center mb-4">
            {success}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Email Address"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
          >
            Log In
          </button>

          <button
            type="button"
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            onClick={() => router.push("/")}
          >
            Back to Homepage
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <a
            href="/pages/signup"
            className="text-red-600 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
