import React, { useState } from 'react'

const Menu = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Classic Burger', category: 'Main Course', price: 12.99, stock: 'Available', image: '🍔' },
    { id: 2, name: 'Margherita Pizza', category: 'Main Course', price: 15.99, stock: 'Available', image: '🍕' },
    { id: 3, name: 'Caesar Salad', category: 'Appetizers', price: 8.99, stock: 'Available', image: '🥗' },
    { id: 4, name: 'Chocolate Cake', category: 'Desserts', price: 6.99, stock: 'Out of Stock', image: '🍰' },
  ]);
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Menu Management</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
           
           <span className='flex items-center justify-between gap-2'><p>  + </p> <p className='hidden md:block'>Add New Item</p></span>
          
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="text-6xl text-center mb-3">{item.image}</div>
              <h4 className="font-semibold text-lg mb-2">{item.name}</h4>
              <p className="text-sm text-gray-600 mb-2">Category: {item.category}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold text-green-600">${item.price}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${item.stock === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                  {item.stock}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm hover:bg-blue-200">
                  Edit
                </button>
                <button className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Menu