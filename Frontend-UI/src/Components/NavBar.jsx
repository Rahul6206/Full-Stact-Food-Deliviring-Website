import React, { useEffect, useRef, useState } from "react";
import { MapPin, Search, ShoppingCart, Menu, X, Gift, HelpCircle, User, LogOut, BadgePercent, MessageCircleQuestionMark } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BURL } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setUserdata, setUserinfo } from "../Redux/UserSlice";

const NavBar = () => {
  const [ismobile, setIismobile] = useState(false);
  const navigate=useNavigate();


  const cartCount = 3; // Example item count
  const { Userdata, Userlocation } = useSelector(state => state.user);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const dispatch=useDispatch()

  // Close popup when clicking outside
  useEffect(() => {
    // Function to check screen size
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        // Tailwind's `md` breakpoint se chhoti screen
        setIismobile(false);
      } else {
        setIismobile(true);
      }
    };

    // Run on mount
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout= async()=>{
    try {
      await axios.get(`${BURL}/api/auth/signout`,{ withCredentials: true });
      toast.success("Logout Success");
      dispatch(setUserinfo(false));
      dispatch(setUserdata(null));
      navigate('/singin');
      console.log('Logout')
    } catch (error) {
      toast.error(error.response.data.message || "Logout failed" );
    }

  }

  return (
    <>
      {/* Main Navbar */}
      <nav className="flex md:w-[80vw]  mr-auto ml-auto items-center justify-evenly md:justify-between px-6 py-4 border-b shadow-sm bg-white z-50 rounded-b-lg">
        {/* Left: Logo */}
        <div className="hidden md:block text-2xl font-bold text-gray-800 cursor-pointer">
          FoodyZone
        </div>

        {/* Center: Location + Search (Desktop only) */}
        <div className="flex items-center gap-0 md:gap-6  justify-center">
          <div className={`flex items-center gap-2 w-20 sm:w-30 md:w-full text-gray-700 cursor-pointer `}>
            <MapPin className="w-fit h-5 text-red-500" />
            <span className="text-sm font-medium hidden md:block">Deliver to:</span>
            <div className="min-w-0 flex-1">
              <span
                className="font-semibold text-sm block truncate">
                {Userlocation || "Location"}
              </span>
            </div>
          </div>

          <div className="relative w-full ">
            <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for restaurants or dishes..."

              className=" w-full   md:w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        </div>

        {/* Right: Nav Links + Cart + User */}
        <div className="flex items-center gap-6 relative">


          {/* Cart */}
          <div className="relative cursor-pointer">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-red-500" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 rounded-full">
              {cartCount}
            </span>
          </div>
          {ismobile && (<>
            <a href="#" className="text-gray-700  hover:text-red-500">
              Offers
            </a>
            <a href="#" className="text-gray-700 hover:text-red-500">
              Help
            </a>
          </>
          )}


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
                {!ismobile && (<>
                  <div className="flex items-center w-full  px-4 py-2 text-gray-700 hover:bg-gray-100" >
                    <BadgePercent className="w-4 h-4 mr-2 text-red-500" />
                    <a href="#" className="text-gray-700 hover:text-red-500">
                      Offers
                    </a>
                  </div>
                  <div className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <MessageCircleQuestionMark className="w-4 h-4 mr-2 text-red-500" />
                    <a href="#" className="text-gray-700 hover:text-red-500">
                      Help
                    </a>
                  </div>
                </>)}

                <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <LogOut className="w-4 h-4 mr-2 text-red-500" />
                  Logout
                </button>


              </div>
            )}
          </div>
        </div>

        {/* Mobile Right Section */}

      </nav>

      {/* Mobile Menu Overlay */}


    </>
  );
};

export default NavBar;
