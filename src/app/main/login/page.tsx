"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ Check for admin credentials first
    if (form.email === "admin@123" && form.password === "123") {
      localStorage.setItem("user", JSON.stringify({ role: "admin" }));
      router.push("/admin");
      setLoading(false);
      return;
    }

    // ✅ Normal user login flow
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/main/cart");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
        {/* Cross Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-orange-500 text-white py-2 rounded-lg shadow-md transition font-medium ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Checkbox */}
        <div className="flex items-center space-x-2 text-sm mt-3">
          <input type="checkbox" className="h-4 w-4" />
          <label>
            By continuing, I agree to the{" "}
            <span className="text-orange-500 cursor-pointer">
              terms of use & privacy policy
            </span>.
          </label>
        </div>

        {/* Register Link */}
        <p className="text-sm text-gray-600 mt-4">
          Create a new account?{" "}
          <a
            href="/main/signup"
            className="text-orange-500 cursor-pointer font-medium"
          >
            Click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
