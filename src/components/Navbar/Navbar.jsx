import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import Home from '../../pages/Home/Home'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const {setcurrency} = useContext(CoinContext)
  const [name, setName] = useState("");
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login")
  }

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
    const userData = localStorage.getItem("userData");
    console.log("use", userData)
     if(userData){
      const parsedData = JSON.parse(userData)
      const name = parsedData.name;
      const updatedName = name.toUpperCase();
      setName(updatedName)
     }
    }
   },[])

  const currencyHandler = (event)=>{
    switch (event.target.value){
      case "usd": {
        setcurrency({name: "usd" , symbol: "$"})
        break;
      }
      case "eur": {
        setcurrency({name: "eur" , symbol: "€"})
        break;
      }
      case "inr": {
        setcurrency({name: "inr" , symbol: "₹"})
        break;
      }
      default : {
        setcurrency({name: "usd" , symbol: "$"})
        break;
      }
    }
  }  

  return (
    <div className='navbar'>
      <Link to={'/'}>
      <img src={logo} alt="" className='logo' />
      </Link>
      <ul>
      <Link to={'/'}> <li>Home</li>
      </Link>
      <Link to={'/payment'}><li>Payment</li></Link>
      </ul>
      {pathname === "/login" || pathname === "/signup" ? <div></div> : 
      <div className="nav-rigth">
        <div className='user-name'>{name}</div>
        <select onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
        </select>
        <button onClick={()=>{logout()}}> Logout </button>
      </div>
}
    </div>
  )
  }
  export default Navbar
