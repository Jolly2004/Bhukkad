import React from "react";

function HeaderBar() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 32px",
        background: "#fff",
        borderBottom: "1px solid #eee",
        position: "relative",
      }}
    >
      {/* Left spacer to center logo */}
      <div style={{ flex: 1 }}></div>

      {/* Logo centered */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#F25C23",
            fontSize: "30px",
            marginRight: "6px",
          }}
        >
          {/* Chef hat SVG */}
          <svg height="30" width="30" viewBox="0 0 24 24">
            <path
              fill="#F25C23"
              d="M5.5 11A3.5 3.5 0 0 1 12 7.5A3.5 3.5 0 0 1 18.5 11C18.5 11.38 18.44 11.76 18.33 12.13C18.62 12.32 18.95 12.5 19.29 12.68C20.11 13.12 19.84 14.36 19.18 14.61C19.09 14.64 19 14.66 18.91 14.66H5.09C5 14.66 4.91 14.64 4.82 14.61C4.16 14.36 3.89 13.12 4.71 12.68C5.05 12.5 5.38 12.32 5.67 12.13C5.56 11.76 5.5 11.38 5.5 11M11.5 17V19H5V17H11.5M13 17H19V19H13V17Z"
            />
          </svg>
        </span>
        <a href="/"> <span style={{  marginRight: "550px",fontWeight: 700, fontSize: "1.5rem" }}>BiteDash</span></a>
      </div>

      {/* Right links */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          fontSize: "1rem",
          marginLeft: "auto",
        }}
      >
        <a
          href="/cart"
          style={{
            color: "#F25C23",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Cart
        </a>
        <a
          href="/signup"
          style={{
            color: "#333",
            textDecoration: "none",
          }}
        >
          Sign In
        </a>
        <a
          href="/login"
          style={{
            color: "#333",
            textDecoration: "none",
          }}
        >
          Log In
        </a>
      </nav>
    </header>
  );
}

export default HeaderBar;
