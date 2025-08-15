"use client";

import { useState, useEffect } from "react";
import ProductsCards from "./components/cards/page";
import CategoryList from "./components/menu/page";
import Navbar from "./components/navbar/navbar/page";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]); // Stores fetched products
  const [active, setActive] = useState("cards"); // Controls which section is active

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      if (!Array.isArray(data)) throw new Error("Invalid product format");
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Fetch products when page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main>
        {/* Section header */}
        <div className="mt-6 p-6">
          <hr className="border-t border-gray-200 mb-3" />
          <h2 className="text-lg font-semibold">Top dishes near you</h2>
        </div>

        {/* Categories */}
        <CategoryList />

        {/* Product Cards */}
        {active === "cards" && <ProductsCards products={products} />}
      </main>
    </div>
  );
}
