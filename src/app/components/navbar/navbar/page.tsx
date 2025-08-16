import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-red-500">
        Tomato<span className="text-orange-500">.</span>
      </div>

      {/* Nav Links */}
      <div className="space-x-6 hidden md:flex text-gray-700 font-medium">
  <a href="#" className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
    home
  </a>
  <a href="#" className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
    menu
  </a>
  <a href="#" className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"  >
    mobile app
  </a>
  <a href="#" className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
  >
    contact us
  </a>
</div>

      {/* Icons */}
      <div className="flex items-center space-x-4 text-gray-700">
        {/* Search Icon */}
        <FaSearch className="text-xl cursor-pointer" />

        {/* Cart Icon with red dot */}
        <div className="relative">
          <Link href="/main/cart">
          <FaShoppingCart className="text-xl cursor-pointer" /></Link>
          <span className="text-xl cursor-pointer" />
        </div>

        {/* User Icon */}
        <FaUser className="text-xl cursor-pointer" />
      </div>
    </nav>
  );
}    