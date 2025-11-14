import { useState } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import { Toaster } from 'sonner'
import SignUp from './Pages/Singup'
import ForgotPassword from './Pages/Reset'
import SignInPage from './Pages/Singin'
import useCurrentuser from './hooks/useCurrentuser'
import { useSelector } from 'react-redux'
import Home from './Pages/Home'
import GetCurrentLocation from './hooks/useGetCurrentLocation'
import useGetOwnerShop from './hooks/useGetOwnerShop'
import GetShopItems from './hooks/useGetShopItems'

export const BURL = 'http://localhost:5000'
function App() {
  useCurrentuser();

 GetCurrentLocation();
 useGetOwnerShop();
 GetShopItems();
 
 const {Userinfo}=useSelector(state=>state.user)
 const {Userlocation}=useSelector(state=>state.user)
 const {Shopdata,ShopItems} = useSelector(state=>state.Owner)
 console.log(Shopdata)
 console.log("All Items:",ShopItems)
 console.log(Userinfo)
 console.log(Userlocation)
 
 
 return (
   <>
    <Toaster richColors position="top-center" />
   <Routes>
    <Route path='/' element={ !Userinfo ? <SignInPage /> : <Home /> }/>
    <Route path='/singup' element={!Userinfo? <SignUp /> : <Navigate to="/" />} />
    <Route path='/reset' element={!Userinfo ? <ForgotPassword /> : <Navigate to="/" />} />

    <Route path='/singin' element={!Userinfo ? <SignInPage /> : <Navigate to="/" />} />
   </Routes>
    </>
  )
}

export default App
