import React from "react";
import { Leaf, Drumstick } from "lucide-react";

export default function FoodCard({ item }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
      
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
            className={`w-8 h-8 rounded flex items-center justify-center ${
              item.FoodType === "Veg" ? "bg-green-600" : "bg-red-600"
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
        <h3 className="font-semibold text-lg text-gray-800 truncate">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {item.description}
        </p>

        {/* Price */}
        <div className="border-t mt-3 pt-3">
          <p className="text-gray-900 font-bold text-md">₹{item.price}</p>
        </div>
      </div>
    </div>
  );
}
