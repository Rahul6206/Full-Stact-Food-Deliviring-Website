import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../Components/NavBar';
import OwnerDashboard from '../Components/OwnerDashboard';

const Home = () => {
  const { Userdata } = useSelector(state => state.user);
 
  return (
    <div className='w-screen h-screen bg-red-300 '>

      {Userdata?.role === "Owner" && (
        <>
        <NavBar/>
        <OwnerDashboard/>
        </>
      )}
      {Userdata?.role === "user" && (
        <h1 className='text-3xl font-bold text-center pt-40'>Welcome to User Home Page</h1>
      )}
      {Userdata?.role === "Delivery Boy" && (
        <h1 className='text-3xl font-bold text-center pt-40'>Welcome to Delivery Boy Home Page</h1>
      )}





    </div>
  )
}

export default Home