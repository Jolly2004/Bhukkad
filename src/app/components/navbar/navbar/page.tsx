import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-red-500">
        Tomato<span className="text-orange-500">.</span>
      </div>

      {/* Nav Links */}
      <div className="space-x-6 hidden md:flex text-gray-700 font-medium">
        <a href="#" className="border-b-2 border-gray-800">home</a>
        <a href="#">menu</a>
        <a href="#">mobile app</a>
        <a href="#">contact us</a>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4 text-gray-700">
        {/* Search Icon */}
        <FaSearch className="text-xl cursor-pointer" />

        {/* Cart Icon with red dot */}
        <div className="relative">
          <FaShoppingCart className="text-xl cursor-pointer" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
        </div>

        {/* User Icon */}
        <FaUser className="text-xl cursor-pointer" />
      </div>
    </nav>
  );
}    