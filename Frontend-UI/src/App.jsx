import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import { Toaster } from 'sonner'
import SignUp from './Pages/Singup'
import ForgotPassword from './Pages/Reset'

import SignInPage from './Pages/Singin'
import useCurrentuser from './hooks/useCurrentuser'
export const BURL = 'http://localhost:5000'
function App() {
  const [count, setCount] = useState(0)

useCurrentuser();
  return (
    <>
    <Toaster richColors position="top-center" />
   <Routes>
    <Route path='/' element={<h1>Home Page</h1>}/>
    <Route path='/singup' element={<SignUp/>}/>
    <Route path='/reset' element={<ForgotPassword/>}/>
   
    <Route path='/singin' element={<SignInPage/>}/>
   </Routes>
    </>
  )
}

export default App
