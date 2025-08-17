"use client";
import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/"); // redirect to home after logout
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-red-500">
        BHUKKAD<span className="text-orange-500">.</span>
      </div>

      {/* Nav Links */}
      <div className="space-x-6 hidden md:flex text-gray-700 font-medium">
        <a href="#" className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
          home
        </a>
        <a href="#" className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
          menu
        </a>
        <a href="#" className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
          mobile app
        </a>
        <a href="#" className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
          contact us
        </a>
      </div>

      {/* Icons / User Info */}
      <div className="flex items-center space-x-4 text-gray-700">
        {/* Search */}
        <FaSearch className="text-xl cursor-pointer" />

        {/* Cart */}
        <div className="relative">
          <Link href="/main/cart">
            <FaShoppingCart className="text-xl cursor-pointer" />
          </Link>
        </div>

        {/* If user is logged in, show name + logout */}
        {user ? (
          <div className="flex items-center space-x-3">
            <span className="font-medium text-gray-700">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          // If no user, show login icon
          <div className="relative">
            <Link href="/main/login">
              <FaUser className="text-xl cursor-pointer" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
