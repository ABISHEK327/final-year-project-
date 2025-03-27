import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar.jsx"
import Home from './pages/Home/Home'
import Coin from "./pages/coin/coin"
import Footer from './components/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from "./pages/Signup/Signup.jsx"
import Login from "./pages/Login/Login.jsx"
import Payment from "./pages/Payment/Payment.jsx"



const App = () => {
  return(
    <BrowserRouter>
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Coin/:coinId'element={<Coin />} />
        <Route path='/payment'element={<Payment />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      <Footer/>
      </div>
     </BrowserRouter>
  )
}

export default App
