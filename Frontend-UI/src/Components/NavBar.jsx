import { useEffect, useState } from "react";
import { MapPin, Search, ShoppingCart } from "lucide-react";

import { useSelector } from "react-redux"; 

import UserButton from "./UserButton";

const NavBar = () => {
  const [ismobile, setIismobile] = useState(false);
 


  const cartCount = 3; // Example item count
  const { Userlocation } = useSelector(state => state.user);


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




  return (
    <>
      {/* Main Navbar */}
      <nav className="flex md:w-[80vw]  mr-auto ml-auto items-center justify-evenly md:justify-between px-6 py-4 border-b shadow-sm bg-white z-50 rounded-b-lg sticky top-0 z-10">
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
          <div>
            <UserButton ismobile={ismobile}  />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
