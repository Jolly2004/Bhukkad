"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#F25C23] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-lg tracking-wide">
            🍴 Bhukkad Admin
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/admin/add"
              className="hover:bg-orange-600 px-3 py-2 rounded-lg font-semibold"
            >
              Add Items
            </Link>
            <Link
              href="/admin/list"
              className="hover:bg-orange-600 px-3 py-2 rounded-lg font-semibold"
            >
              List of Items
            </Link>
            <Link
              href="/admin/orders"
              className="hover:bg-orange-600 px-3 py-2 rounded-lg font-semibold"
            >
              Orders
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)}>
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link
            href="/admin/add"
            className="block bg-orange-500 px-3 py-2 rounded-lg font-semibold"
            onClick={() => setOpen(false)}
          >
            Add Items
          </Link>
          <Link
            href="/admin/list"
            className="block bg-orange-500 px-3 py-2 rounded-lg font-semibold"
            onClick={() => setOpen(false)}
          >
            List of Items
          </Link>
          <Link
            href="/admin/orders"
            className="block bg-orange-500 px-3 py-2 rounded-lg font-semibold"
            onClick={() => setOpen(false)}
          >
            Orders
          </Link>
        </div>
      )}
    </nav>
  );
}
