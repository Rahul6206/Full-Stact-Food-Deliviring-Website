import React, { useState } from 'react';
import { Star, Clock, MapPin, Leaf, Drumstick, Percent } from 'lucide-react';
import { useSelector } from 'react-redux';

const restaurants = [
  {
    id: 1,
    name: "Krishna Bakery",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 1200,
    deliveryTime: "25-30",
    distance: "2.5",
    priceForTwo: "₹200",
    cuisines: ["Bakery", "Desserts", "Snacks"],
    isVeg: true,
    discount: "50% OFF up to ₹100"
  },
  {
    id: 2,
    name: "Spice Garden Restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    rating: 4.3,
    reviews: 850,
    deliveryTime: "30-35",
    distance: "3.2",
    priceForTwo: "₹400",
    cuisines: ["North Indian", "Chinese", "Biryani"],
    isVeg: false,
    discount: "30% OFF up to ₹75"
  },
  {
    id: 3,
    name: "Pure Vegetarian Delight",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 2100,
    deliveryTime: "20-25",
    distance: "1.8",
    priceForTwo: "₹300",
    cuisines: ["South Indian", "North Indian", "Thali"],
    isVeg: true,
    discount: "60% OFF up to ₹120"
  },
  {
    id: 4,
    name: "The Grill House",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    rating: 4.2,
    reviews: 670,
    deliveryTime: "35-40",
    distance: "4.5",
    priceForTwo: "₹600",
    cuisines: ["BBQ", "Kebabs", "Mughlai"],
    isVeg: false,
    discount: "20% OFF up to ₹50"
  },
  {
    id: 5,
    name: "Cafe Mocha",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 920,
    deliveryTime: "15-20",
    distance: "1.2",
    priceForTwo: "₹350",
    cuisines: ["Cafe", "Beverages", "Continental"],
    isVeg: true,
    discount: "40% OFF up to ₹80"
  },
  {
    id: 6,
    name: "Biryani Paradise",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 1580,
    deliveryTime: "30-35",
    distance: "2.9",
    priceForTwo: "₹450",
    cuisines: ["Biryani", "Mughlai", "Kebabs"],
    isVeg: false,
    discount: "25% OFF up to ₹60"
  },
  {
    id: 7,
    name: "South Indian Express",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 1340,
    deliveryTime: "20-25",
    distance: "2.1",
    priceForTwo: "₹250",
    cuisines: ["South Indian", "Dosa", "Idli"],
    isVeg: true,
    discount: "50% OFF up to ₹100"
  },
  {
    id: 8,
    name: "Pizza Corner",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    rating: 4.1,
    reviews: 540,
    deliveryTime: "25-30",
    distance: "3.7",
    priceForTwo: "₹500",
    cuisines: ["Pizza", "Italian", "Pasta"],
    isVeg: false,
    discount: "35% OFF up to ₹90"
  }
];

export default function RestaurantListing() {
  const [filter, setFilter] = useState('all');
  const {Userlocation}= useSelector(state=>state.user);

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (filter === 'veg') return restaurant.isVeg;
    if (filter === 'nonveg') return !restaurant.isVeg;
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
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'all'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('veg')}
            className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
              filter === 'veg'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
            }`}
          >
            <Leaf className="w-4 h-4" />
            Pure Veg
          </button>
          <button
            onClick={() => setFilter('nonveg')}
            className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
              filter === 'nonveg'
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
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                
                {/* Veg/Non-Veg Indicator */}
                <div className="absolute top-3 left-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${
                    restaurant.isVeg ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    {restaurant.isVeg ? (
                      <Leaf className="w-5 h-5 text-white" />
                    ) : (
                      <Drumstick className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>

                {/* Discount Badge */}
                {restaurant.discount && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-transparent p-3">
                    <div className="flex items-center gap-1 text-white font-bold text-sm">
                      <Percent className="w-4 h-4" />
                      {restaurant.discount}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Restaurant Name */}
                <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
                  {restaurant.name}
                </h3>

                {/* Rating and Delivery Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-1 rounded">
                    <Star className="w-4 h-4 fill-white" />
                    <span className="font-semibold text-sm">{restaurant.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({restaurant.reviews})</span>
                </div>

                {/* Cuisines */}
                <div className="mb-3">
                  <p className="text-gray-600 text-sm truncate">
                    {restaurant.cuisines.join(', ')}
                  </p>
                </div>

                {/* Delivery Details */}
                <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.deliveryTime} mins</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.distance} km</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-3 pt-3 border-t">
                  <p className="text-gray-900 font-semibold text-sm">
                    {restaurant.priceForTwo} for two
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}