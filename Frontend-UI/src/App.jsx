import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import { Toaster } from 'sonner'
import SignUp from './Pages/Singup'
import Login from './Pages/Login'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
    <Toaster richColors position="top-center" />
   <Routes>
    <Route path='/' element={<h1>Home Page</h1>}/>
    <Route path='/singup' element={<SignUp/>}/>
    <Route path='/singin' element={<Login/>}/>
   </Routes>
    </>
  )
}

export default App
