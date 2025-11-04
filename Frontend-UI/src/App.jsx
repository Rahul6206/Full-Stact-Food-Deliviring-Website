import { useState } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import { Toaster } from 'sonner'
import SignUp from './Pages/Singup'
import ForgotPassword from './Pages/Reset'
import SignInPage from './Pages/Singin'
import useCurrentuser from './hooks/useCurrentuser'
import { useSelector } from 'react-redux'
import Home from './Pages/Home'
export const BURL = 'http://localhost:5000'
function App() {
  useCurrentuser();
 const {Userdata}=useSelector(state=>state.user);


  return (
    <>
    <Toaster richColors position="top-center" />
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/singup' element={!Userdata ? <SignUp /> : <Navigate to="/" />} />
    <Route path='/reset' element={!Userdata ? <ForgotPassword /> : <Navigate to="/" />} />

    <Route path='/singin' element={!Userdata ? <SignInPage /> : <Navigate to="/" />} />
   </Routes>
    </>
  )
}

export default App
