"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

function HeaderBar() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "12px 16px",
        background: "#fff",
        borderBottom: "1px solid #eee",
        position: "relative",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <svg height="30" width="30" viewBox="0 0 24 24">
          <path
            fill="#F25C23"
            d="M5.5 11A3.5 3.5 0 0 1 12 7.5A3.5 3.5 0 0 1 18.5 11C18.5 11.38 18.44 11.76 18.33 12.13C18.62 12.32 18.95 12.5 19.29 12.68C20.11 13.12 19.84 14.36 19.18 14.61C19.09 14.64 19 14.66 18.91 14.66H5.09C5 14.66 4.91 14.64 4.82 14.61C4.16 14.36 3.89 13.12 4.71 12.68C5.05 12.5 5.38 12.32 5.67 12.13C5.56 11.76 5.5 11.38 5.5 11M11.5 17V19H5V17H11.5M13 17H19V19H13V17Z"
          />
        </svg>
        <Link href="/">
  <span
    style={{
      fontWeight: 700,
      fontSize: "1.5rem",
      color: "#000000ff", // explicitly set the color
    }}
  >
    BiteDash
  </span>
</Link>

      </div>

      {/* Hamburger menu for mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        className="mobile-menu-button"
      >
        <svg width="24" height="24" fill="#F25C23" viewBox="0 0 24 24">
          <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Navigation */}
      <nav
        style={{
          display: menuOpen ? "flex" : "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
          marginTop: "8px",
        }}
        className="nav-links"
      >
        <Link href="/pages/cart" style={{ color: "#F25C23", fontWeight: 600, textDecoration: "none" }}>
          Cart
        </Link>

        {user ? (
          <>
            <span style={{ fontWeight: 600, color: "#333" }}>Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "#F25C23",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/pages/signup" style={{ color: "#333", textDecoration: "none" }}>
              Sign Up
            </Link>
            <Link href="/pages/login" style={{ color: "#333", textDecoration: "none" }}>
              Log In
            </Link>
          </>
        )}
      </nav>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .nav-links {
            width: 100%;
            flex-direction: column;
            display: ${menuOpen ? "flex" : "none"};
          }

          .mobile-menu-button {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}

export default HeaderBar;
