import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NavBar from './NavBar';
import OwnerDashboard from './OwnerDashboard';
import RestaurantListing from '../views/User/RestaurantListing';
import Cart from '../views/User/Cart';
import { Routes, Route } from 'react-router-dom';


const Home = () => {
  const { Userdata } = useSelector(state => state.user);

  return (
    <div className='w-screen h-screen '>

      {Userdata?.role === "Owner" && (
        <>

          <OwnerDashboard />
        </>
      )}
      {Userdata?.role === "user" && (
        <>

          <NavBar />

          <Routes>
            <Route index element={<RestaurantListing />} />
            <Route path="cart" element={<Cart />} />
          </Routes>


        </>
      )}
      {Userdata?.role === "Delivery Boy" && (
        <h1 className='text-3xl font-bold text-center pt-40'>Welcome to Delivery Boy Home Page</h1>
      )}
    </div>
  )
}

export default Home