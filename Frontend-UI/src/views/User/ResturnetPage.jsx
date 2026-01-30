import React, { useState } from 'react';
import { Star, Clock, MapPin, Leaf, Drumstick, Percent, X, Plus, Minus, ShoppingCart } from 'lucide-react';
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
        discount: "50% OFF up to ₹100",
        description: "Famous for fresh baked goods, pastries, and traditional Indian sweets. A local favorite for over 20 years with a wide variety of breakfast items and evening snacks.",
        price: "₹150"
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
        discount: "30% OFF up to ₹75",
        description: "A delightful blend of North Indian and Chinese cuisines with signature biryanis. Known for generous portions and authentic flavors.",
        price: "₹350"
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
        discount: "60% OFF up to ₹120",
        description: "100% pure vegetarian restaurant serving authentic South and North Indian thalis. Fresh ingredients and home-style cooking make this a top-rated choice.",
        price: "₹280"
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
        discount: "20% OFF up to ₹50",
        description: "Premium grilled meats and kebabs with rich Mughlai gravies. Perfect for meat lovers seeking authentic charcoal-grilled flavors.",
        price: "₹550"
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
        discount: "40% OFF up to ₹80",
        description: "Cozy cafe atmosphere with premium coffee, smoothies, and continental dishes. Great for casual meetings and quick bites.",
        price: "₹320"
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
        discount: "25% OFF up to ₹60",
        description: "Authentic Hyderabadi and Lucknowi biryanis made with premium basmati rice and aromatic spices. Each biryani is a culinary masterpiece.",
        price: "₹400"
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
        discount: "50% OFF up to ₹100",
        description: "Quick service restaurant specializing in crispy dosas, soft idlis, and flavorful sambhar. Made with fermented batter daily.",
        price: "₹180"
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
        discount: "35% OFF up to ₹90",
        description: "Wood-fired pizzas with fresh toppings and hand-tossed dough. Also serves creamy pasta and Italian appetizers.",
        price: "₹450"
    }
];

export default function RestaurantListingx() {
    const [filter, setFilter] = useState('all');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [userRating, setUserRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);


    const filteredRestaurants = restaurants.filter(restaurant => {
        if (filter === 'veg') return restaurant.isVeg;
        if (filter === 'nonveg') return !restaurant.isVeg;
        return true;
    });

    const handleAddToCart = () => {


        // Actual Logic I Write here 
        alert(`Added ${quantity}  ${selectedRestaurant.name} to cart!\nYour Rating: ${userRating} stars`);
        setSelectedRestaurant(null);
        setQuantity(1);
        setUserRating(0);
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-3xl font-bold text-gray-900">Restaurants Near You</h1>
                    <p className="text-gray-600 mt-1">Patna, Bihar, IN</p>
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
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredRestaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            onClick={() => {
                                setSelectedRestaurant(restaurant);
                                setQuantity(1);
                                setUserRating(0);
                            }}
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
                                    <div className={`w-8 h-8 rounded flex items-center justify-center ${restaurant.isVeg ? 'bg-green-600' : 'bg-red-600'
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
                                        <span className="font-semibold text-sm">{restaurant.rating} </span>
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

            {/* Modal */}
            {selectedRestaurant && (
                <div className="fixed inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center p-4 z-50"
                    style={{
                        backgroundImage: `url(${selectedRestaurant.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",

                    }}>
                    {/* <img src={selectedRestaurant.image} alt="background image" className=' -z-10 w-screen h-screen' /> */}
                    <div className="bg-white opacity-100 rounded-2xl max-w-2xl w-full max-h-[90vh] backdrop-blur-3xl overflow-y-auto">
                        {/* Close Button */}
                        <div className="sticky top-0 bg-white border-b flex justify-between items-center p-4">
                            <h2 className="text-2xl font-bold text-gray-900">{selectedRestaurant.name}</h2>
                            <button
                                onClick={() => setSelectedRestaurant(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Large Image */}
                        <div className="relative h-72">
                            <img
                                src={selectedRestaurant.image}
                                alt={selectedRestaurant.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedRestaurant.isVeg ? 'bg-green-600' : 'bg-red-600'
                                    }`}>
                                    {selectedRestaurant.isVeg ? (
                                        <Leaf className="w-6 h-6 text-white" />
                                    ) : (
                                        <Drumstick className="w-6 h-6 text-white" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* Rating and Reviews */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1 bg-green-700 text-white px-3 py-1.5 rounded-lg">
                                    <Star className="w-5 h-5 fill-white" />
                                    <span className="font-bold">{selectedRestaurant.rating}</span>
                                </div>
                                <span className="text-gray-600">({selectedRestaurant.reviews} reviews)</span>
                            </div>

                            {/* Cuisines */}
                            <div className="mb-4">
                                <p className="text-gray-700 font-medium mb-1">Cuisines</p>
                                <p className="text-gray-600">{selectedRestaurant.cuisines.join(', ')}</p>
                            </div>

                            {/* Delivery Info */}
                            <div className="flex items-center gap-6 mb-4 text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <span>{selectedRestaurant.deliveryTime} mins</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <span>{selectedRestaurant.distance} km away</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">About</h3>
                                <p className="text-gray-600 leading-relaxed">{selectedRestaurant.description}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <p className="text-3xl font-bold text-orange-600">{selectedRestaurant.price}</p>
                                <p className="text-sm text-gray-500">{selectedRestaurant.priceForTwo} for two</p>
                            </div>

                            {/* Discount */}
                            {selectedRestaurant.discount && (
                                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <div className="flex items-center gap-2 text-blue-700 font-semibold">
                                        <Percent className="w-5 h-5" />
                                        {selectedRestaurant.discount}
                                    </div>
                                </div>
                            )}

                            {/* Star Rating Input */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Rate this restaurant</h3>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setUserRating(star)}
                                            onMouseEnter={() => setHoveredStar(star)}
                                            onMouseLeave={() => setHoveredStar(0)}
                                            className="transition-transform hover:scale-110"
                                        >
                                            <Star
                                                className={`w-8 h-8 ${star <= (hoveredStar || userRating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value) || 1;
                                            if (val >= 1 && val <= 10) setQuantity(val);
                                        }}
                                        className="w-20 text-center text-xl font-bold border-2 border-gray-300 rounded-lg py-2"
                                        min="1"
                                        max="10"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart - {selectedRestaurant.price} * {quantity}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}