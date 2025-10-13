import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import { Toaster } from 'sonner'
import SignUp from './Pages/Singup'
import Login from './Pages/Login'
import SignInPage from './Pages/Singin'
export const BURL = 'http://localhost:5000'
function App() {
  const [count, setCount] = useState(0)


  return (
    <>
    <Toaster richColors position="top-center" />
   <Routes>
    <Route path='/' element={<h1>Home Page</h1>}/>
    <Route path='/singup' element={<SignUp/>}/>
    <Route path='/singin' element={<Login/>}/>
    <Route path='/singinn' element={<SignInPage/>}/>
   </Routes>
    </>
  )
}

export default App
