"use client";
import React, { useState } from "react";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password, // ⚠️ should hash before saving
        }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: 400,
          padding: 24,
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 4px 24px rgba(0,0,0,.12)",
          fontFamily: "sans-serif",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h2 style={{ fontWeight: "bold" }}>Sign Up</h2>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            style={{
              width: "100%",
              margin: "16px 0 10px 0",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: 6,
            }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            style={{
              width: "100%",
              marginBottom: 10,
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: 6,
            }}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={{
              width: "100%",
              marginBottom: 18,
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: 6,
            }}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#FF5B23",
              color: "#fff",
              border: "none",
              padding: "12px 0",
              borderRadius: 6,
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
              marginBottom: 10,
            }}
          >
            {loading ? "Creating..." : "Create account"}
          </button>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              style={{ marginRight: 8 }}
              required
            />
            <label style={{ fontSize: 14, color: "#555" }}>
              By continuing, I agree to the terms of use &amp; privacy policy.
            </label>
          </div>
          {message && <p style={{ fontSize: 14, color: "#FF5B23" }}>{message}</p>}
          <div style={{ fontSize: 14, color: "#888" }}>
            Already have an account?{" "}
            <a
              href="/main/login"
              style={{
                color: "#FF5B23",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Login here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
