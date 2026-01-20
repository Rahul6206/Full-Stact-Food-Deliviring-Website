import React, { useState } from "react";
import { Leaf, Drumstick, X, Star, Clock, MapPin, Percent, Minus, Plus, ShoppingCart } from "lucide-react";

export default function FoodCard({ item }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);


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
    <>
      <div onClick={() => { setSelectedRestaurant(item); setQuantity(1); setUserRating(0); }} className=" rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">

        {/* Image */}
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transform hover:scale-110 transition duration-300"
          />

          {/* Veg / Non-Veg Badge */}
          <div className="absolute top-3 left-3">
            <div
              className={`w-8 h-8 rounded flex items-center justify-center ${item.FoodType === "Veg" ? "bg-green-600" : "bg-red-600"
                }`}
            >
              {item.FoodType === "Veg" ? (
                <Leaf className="w-5 h-5 text-white" />
              ) : (
                <Drumstick className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-lg text-gray-800 truncate mb-3">
            {item.name}
          </h3>
          {/* Rating and Delivery Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-1 rounded">
              <Star className="w-4 h-4 fill-white" />
              <span className="font-semibold text-sm">Rating </span>
            </div>
            <span className="text-gray-500 text-sm">(Reviews)</span>
          </div>
          {/* Description */}
          <p className="text-gray-500 text-sm mt-1 mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>(Time) mins</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>(Distance) km</span>
            </div>
          </div>

          {/* Price */}
          <div className="border-t mt-3 pt-3">
            <p className="text-gray-900 font-bold text-md">₹{item.price} /-</p>
          </div>
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
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedRestaurant.FoodType ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                  {selectedRestaurant.FoodType ? (
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
                {/* <p className="text-gray-600">{selectedRestaurant.cuisines.join(', ')}</p> */}
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
    </>
  );
}
