"use client"
import { useState } from "react";
import { Search } from "lucide-react";

export default function HeroSection() {
  const [search, setSearch] = useState("");

  const categories = [
    "Pizza",
    "Burgers",
    "Indian",
    "Chinese",
    "Desserts",
    "Drinks",
  ];

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 py-12 px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between">
      {/* Left Content */}
      <div className="max-w-xl">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Crave. Click. Enjoy.
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Discover top restaurants near you and get your favorite meals delivered hot and fast.
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex items-center bg-white rounded-lg shadow-md overflow-hidden w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search restaurants or dishes"
            className="flex-1 px-4 py-3 outline-none text-gray-700"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold">
            Search
          </button>
        </div>

        {/* Categories */}
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((cat, idx) => (
            <span
              key={idx}
              className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm cursor-pointer hover:bg-orange-600 transition"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Right Image */}
      <div className="mt-10 lg:mt-0 lg:ml-12 relative">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Food"
          className="rounded-2xl shadow-lg w-[500px] object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-white shadow-md px-4 py-2 rounded-lg text-sm font-medium text-black max-w-xs">
  30min avg delivery
  <br />
  <span className="text-gray-500 text-xs">Across 2k+ restaurants</span>
</div>


      </div>
    </div>
  );
}
