"use client";

import { useState, useEffect } from "react";
import ProductsCards from "../../components/cards/page";
import CategoryList from "../../components/menu/page";
import Navbar from "../../components/navbar/navbar/page";
import Hero from "../../components/hero/page";

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
      <Hero/>
      <main>
        <section className="w-[90%] max-w-6xl mx-auto mt-12">
      {/* Explore our menu */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-semibold mb-4">Explore our menu</h2>
        <p className="text-gray-600 max-w-3xl">
          Choose from a diverse menu featuring a delectable array of dishes.
          Our mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
      </div>

      {/* Top dishes near you */}
      <div className="mt-6 p-6">
        <hr className="border-t border-gray-200 mb-3" />
        <h2 className="text-lg font-semibold">Top dishes near you</h2>
      </div>
    </section>
        
        {/* Categories */}
        <CategoryList />

        {/* Product Cards */}
       <div className="w-3/4 mx-auto">
  {active === "cards" && <ProductsCards products={products} />}
</div>

      </main>
    </div>
  );
}
