import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../Components/NavBar';
import OwnerDashboard from '../Components/OwnerDashboard';

const Home = () => {
  const { Userdata } = useSelector(state => state.user);
  console.log(Userdata.role)
 
  return (
    <div className='w-screen h-screen bg-red-300 '>

      {Userdata?.role === "Owner" && (
        <>
    
        <OwnerDashboard/>
        </>
      )}
      {Userdata?.role === "user" && (
        <>
            <NavBar/>
        </>
       
      )}
      {Userdata?.role === "Delivery Boy" && (
        <h1 className='text-3xl font-bold text-center pt-40'>Welcome to Delivery Boy Home Page</h1>
      )}





    </div>
  )
}

export default Home