import React, { useState } from 'react'

const Restaurant = () => {
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-6">Restaurant Settings</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-semibold">Restaurant Status</p>
              <p className="text-sm text-gray-600">Control order acceptance</p>
            </div>
            <button
              onClick={() => setIsRestaurantOpen(!isRestaurantOpen)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${isRestaurantOpen ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}
            >
              {isRestaurantOpen ? 'Open' : 'Closed'}
            </button>
          </div>
          <div className="py-3 border-b">
            <p className="font-semibold mb-2">Operating Hours</p>
            <p className="text-gray-700">Monday - Friday: 10:00 AM - 10:00 PM</p>
            <p className="text-gray-700">Saturday - Sunday: 9:00 AM - 11:00 PM</p>
          </div>
          <div className="py-3 border-b">
            <p className="font-semibold mb-2">Delivery Radius</p>
            <p className="text-gray-700">5 km from restaurant location</p>
          </div>
          <div className="py-3">
            <p className="font-semibold mb-2">Contact Information</p>
            <p className="text-gray-700">Phone: (555) 123-4567</p>
            <p className="text-gray-700">Email: contact@restaurant.com</p>
            <p className="text-gray-700">Address: 123 Food Street, City, State 12345</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Restaurant