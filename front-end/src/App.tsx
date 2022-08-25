import { useState } from 'react'
import {BrowserRouter, Routes, Route,Navigate} from "react-router-dom"
import {useAuthContext} from "./hooks/useAuthContext"
import Home from "./Pages/Home"
import Navbar from './components/Navbar'
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar/>
     <div className="app">
      <Routes>
        <Route path='/' element={user? <Home/> : <Navigate to="/login"/>}></Route>
        <Route path='/signup' element={!user? <Signup/> : <Navigate to="/"/>}></Route>
        <Route path='/login' element={!user ? <Login/>: <Navigate to="/"/>}></Route>
      </Routes>
     </div>
     </BrowserRouter>
    </div>
  )
}

export default App
