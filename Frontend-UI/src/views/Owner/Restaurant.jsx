import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setShopRegister } from '../../Redux/OwnerSlice'; 
import { Utensils } from 'lucide-react';
const Restaurant = () => {
  
  const dispatch= useDispatch();
  
  const {Shopdata} = useSelector(state=>state.Owner)
  
  
  return (
    <div className="space-y-6 relative bg-amber-600">
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
        {/* Header */}
        <div className="p-8 pb-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Utensils className="w-10 h-10 text-orange-600" strokeWidth={2.5} />
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
              Welcome to {Shopdata?.name} 
            </h1>
          </div>

          {/* Bakery Image */}
          <div className="rounded-xl overflow-hidden shadow-lg mb-6">
            <img
              src={Shopdata?.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFrZXJ5JTIwc3RvcmV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"}
              alt={`${Shopdata?.name} Restaurant storefront`}
              className="w-full h-80 object-cover"
            />
          </div>

          {/* Bakery Details */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-gray-900">
              {Shopdata?.name} Restaurant
            </h2>
            <p className="text-xl text-gray-500">
              {Shopdata?.city}, {Shopdata?.state}
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
            {Shopdata?.address}
            </p>
          </div>
        </div>
      </div>
    </div>
      
      <div className='absolute bottom--15 bg-green-300 left-1/2 border rounded-2xl'>


        <button onClick={()=>dispatch(setShopRegister(true))} className='p-2 text-orange-700 font-semibold cursor-pointer '>Edit</button>
      </div>
    </div>

  )
}

export default Restaurant


