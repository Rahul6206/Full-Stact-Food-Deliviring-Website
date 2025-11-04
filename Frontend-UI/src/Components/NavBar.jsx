import React, { useEffect, useRef, useState } from "react";
import { MapPin, Search, ShoppingCart, Menu, X ,Gift, HelpCircle, User, LogOut} from "lucide-react";

import { useSelector } from "react-redux";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = 3; // Example item count
 const { Userdata } = useSelector(state => state.user);
 console.log(Userdata)
 const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b shadow-sm bg-white relative">
      {/* Left: Logo */}
      <div className="text-2xl font-bold text-gray-800 cursor-pointer">
        YumWheels
      </div>

      {/* Center: Location + Search (Desktop only) */}
      <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
        <div className="flex items-center gap-2 text-gray-700 cursor-pointer">
          <MapPin className="w-5 h-5 text-red-500" />
          <span className="text-sm font-medium">Deliver to:</span>
          <span className="font-semibold truncate max-w-[150px]">
            123 Main St, Anytown...
          </span>
        </div>

        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for restaurants or dishes..."
            className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
      </div>

      {/* Right: Nav Links + Cart + User */}
      <div className="hidden md:flex items-center gap-6 relative">
        <a href="#" className="text-gray-700 hover:text-red-500">
          Offers
        </a>
        <a href="#" className="text-gray-700 hover:text-red-500">
          Help
        </a>

        {/* Cart */}
        <div className="relative cursor-pointer">
          <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-red-500" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 rounded-full">
            {cartCount}
          </span>
        </div>

        {/* User Button */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition"
          >
            {Userdata?.fullname?.slice(0, 1)?.toUpperCase() || "U"}
          </button>

          {/* Popup Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white border rounded-lg shadow-lg overflow-hidden animate-fadeIn z-50">
              <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                <User className="w-4 h-4 mr-2 text-red-500" />
                Account
              </button>
              <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                <LogOut className="w-4 h-4 mr-2 text-red-500" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Right Section */}
      <div className="flex md:hidden items-center gap-4">
        <div className="relative cursor-pointer">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 rounded-full">
            {cartCount}
          </span>
        </div>

        <button onClick={() => setIsMenuOpen(true)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300">
    <div className="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-xl rounded-l-2xl transform transition-transform duration-300 ease-in-out animate-slideIn flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-red-500" />
          <span className="font-semibold text-gray-800 text-base">
            {Userdata?.fullname?.toUpperCase() || "Guest User"}
          </span>
        </div>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Menu Links */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 text-gray-700">
        <a
          href="#"
          className="flex items-center gap-3 text-lg font-medium hover:text-red-500 transition"
        >
          <Gift className="w-5 h-5 text-red-500" />
          Offers
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-lg font-medium hover:text-red-500 transition"
        >
          <HelpCircle className="w-5 h-5 text-red-500" />
          Help
        </a>

        {/* Deliver To Section */}
        <div className="flex items-center gap-3 mt-6 cursor-pointer p-3 bg-red-50 rounded-lg hover:bg-red-100 transition">
          <MapPin className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-sm text-gray-600">Deliver to</p>
            <p className="font-semibold text-gray-800 truncate">123 Main St...</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-6">
          <Search className="absolute left-4 top-2.5 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search restaurants or dishes..."
            className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t px-6 py-4">
        <button className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold transition">
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default NavBar;
