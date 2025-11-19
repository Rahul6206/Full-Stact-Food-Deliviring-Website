import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../Components/NavBar';
import OwnerDashboard from './OwnerDashboard';
import RestaurantListing from './RestaurantListing';

const Home = () => {
  const { Userdata } = useSelector(state => state.user);
 
 
  return (
    <div className='w-screen h-screen '>

      {Userdata?.role === "Owner" && (
        <>
    
        <OwnerDashboard/>
        </>
      )}
      {Userdata?.role === "user" && (
        <>
            <NavBar/>
            <RestaurantListing/>
        </>
       
      )}
      {Userdata?.role === "Delivery Boy" && (
        <h1 className='text-3xl font-bold text-center pt-40'>Welcome to Delivery Boy Home Page</h1>
      )}





    </div>
  )
}

export default Home