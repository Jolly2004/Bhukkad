"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding / Logo */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <svg height="30" width="30" viewBox="0 0 24 24" fill="#F25C23">
              <path d="M5.5 11A3.5 3.5 0 0 1 12 7.5A3.5 3.5 0 0 1 18.5 11C18.5 11.38 18.44 11.76 18.33 12.13C18.62 12.32 18.95 12.5 19.29 12.68C20.11 13.12 19.84 14.36 19.18 14.61C19.09 14.64 19 14.66 18.91 14.66H5.09C5 14.66 4.91 14.64 4.82 14.61C4.16 14.36 3.89 13.12 4.71 12.68C5.05 12.5 5.38 12.32 5.67 12.13C5.56 11.76 5.5 11.38 5.5 11M11.5 17V19H5V17H11.5M13 17H19V19H13V17Z" />
            </svg>
            <span className="font-bold text-xl text-orange-600">BiteDash</span>
          </div>
          <p className="text-gray-500 text-sm">
            Delivering happiness to your doorstep.
          </p>
        </div>

        {/* Locations Section */}
        <div>
          <h4 className="text-gray-800 font-semibold mb-2">Our Locations</h4>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>New Delhi</li>
            <li>Mumbai</li>
            <li>Bengaluru</li>
            <li>Chennai</li>
            <li>Kolkata</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h4 className="text-gray-800 font-semibold mb-2">Contact Us</h4>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>Email: support@bitedash.com</li>
            <li>Phone: +91 9876543210</li>
            <li>WhatsApp: +91 9876543210</li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="text-gray-800 font-semibold mb-2">Quick Links</h4>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>
              <Link href="/" className="hover:text-orange-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/pages/cart" className="hover:text-orange-600 transition">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/pages/signup" className="hover:text-orange-600 transition">
                Sign Up
              </Link>
            </li>
            <li>
              <Link href="/pages/login" className="hover:text-orange-600 transition">
                Log In
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Bottom Text */}
      <div className="max-w-6xl mx-auto py-4 px-6 text-gray-400 text-sm text-center">
        &copy; {new Date().getFullYear()} BiteDash. All rights reserved.
      </div>
    </footer>
  );
}
