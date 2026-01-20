import { useState } from 'react';
import { Leaf, Drumstick } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useFetch } from '../hooks/useItems';
import { BURL } from '../App';
import FoodCard from '../views/User/FoodCard';
import { useRef } from 'react';
import { useCallback } from 'react';

// const restaurants = [
//   {
//     id: 1,
//     name: "Krishna Bakery",
//     image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
//     rating: 4.5,
//     reviews: 1200,
//     deliveryTime: "25-30",
//     distance: "2.5",
//     priceForTwo: "₹200",
//     cuisines: ["Bakery", "Desserts", "Snacks"],
//     isVeg: true,
//     discount: "50% OFF up to ₹100"
//   },

// ];




export default function RestaurantListing() {
  const { loading, error, refetch } = useFetch(
    `${BURL}/owner/item/getAllItem`,
  );

  const observer = useRef();
  useCallback(node => {
    if (loading || error) return;
    if (observer.current) observer.current.disconnect(); // Stop observing the previous element

    observer.current = new IntersectionObserver(entries => {
      // If the element is intersecting (visible) and there is more data to load
      if (entries[0].isIntersecting) {
        refetch(); // Trigger fetching the next page
      }
    });


    if (node) observer.current.observe(node); // Start observing the current element

  }, [loading]);



  const [filter, setFilter] = useState('all');
  const { Userlocation } = useSelector(state => state.user);
  const { ShopItems } = useSelector(state => state.Owner);
  console.log(ShopItems)
  const filteredRestaurants = ShopItems.filter(item => {
    if (filter === 'veg') return item.FoodType === "Veg";
    if (filter === 'nonveg') return item.FoodType !== "Veg";
    return true;
  });



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Restaurants Near You</h1>
          <p className="text-gray-600 mt-1">{Userlocation}</p>
        </div>
      </header>

      {/* Filter Buttons */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${filter === 'all'
              ? 'bg-orange-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-600'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('veg')}
            className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${filter === 'veg'
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
              }`}
          >
            <Leaf className="w-4 h-4" />
            Pure Veg
          </button>
          <button
            onClick={() => setFilter('nonveg')}
            className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${filter === 'nonveg'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-red-600'
              }`}
          >
            <Drumstick className="w-4 h-4" />
            Non-Veg
          </button>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div ref={observer} className="max-w-7xl mx-auto px-4 pb-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map(item => (
            <FoodCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}