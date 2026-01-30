import { useState } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import { Toaster } from 'sonner'
import SignUp from './views/Auth/Singin'
import ForgotPassword from './views/Auth/Reset'
import SignInPage from './views/Auth/Singin'
import useCurrentuser from './hooks/useCurrentuser'
import { useSelector } from 'react-redux'
import Home from './RootComponent/Home'
import GetCurrentLocation from './hooks/useGetCurrentLocation'
import useGetOwnerShop from './hooks/useGetOwnerShop'


export const BURL = 'http://localhost:5000'
function App() {
 
  
  GetCurrentLocation();
  useCurrentuser();

 
 const {Userinfo}=useSelector(state=>state.user)

 
 
 return (
   <>
    <Toaster richColors position="top-center" />
   <Routes>
    <Route path='/*' element={ !Userinfo ? <SignInPage /> : <Home /> }/>
    <Route path='/singup' element={!Userinfo? <SignUp /> : <Navigate to="/" />} />
    <Route path='/reset' element={!Userinfo ? <ForgotPassword /> : <Navigate to="/" />} />

    <Route path='/singin' element={!Userinfo ? <SignInPage /> : <Navigate to="/" />} />


   </Routes>
    </>
  )
}

export default App
