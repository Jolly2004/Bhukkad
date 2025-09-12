"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      router.push("/admin/add"); // redirect to admin page
      return;
    }

    // Normal user login
    try {
      const response = await axios.post("/api/login", { email, password });

      if (response.data.success) {
        setSuccess("Login successful!");
        setEmail("");
        setPassword("");

        // Save user info to localStorage to show in HeaderBar
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to homepage
        router.push("/");
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Log In</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Log In
          </button>

          <button
            type="button"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition mt-2"
            onClick={() => router.push("/")}
          >
            Back to Homepage
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account? <a href="/pages/signup" className="text-red-600">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
