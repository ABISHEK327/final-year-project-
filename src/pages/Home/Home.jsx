import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

const {allCoin, currency} = useContext(CoinContext);
const [displayCoin, setDisplayCoin] = useState([]);
const [input,setInput] = useState('');
const [isLoading, setIsLoading] = useState(true)
const navigate = useNavigate();

const inputHandler = (event)=>{
  setInput(event.target.value);
  if(event.target.value === ""){
    setDisplayCoin(allCoin);
  }
}

const searchHandler = async (event)=>{
  event.preventDefault();
  const coins = await allCoin.filter((item)=>{
    return item.name.toLowerCase().includes(input.toLowerCase())
  })
  setDisplayCoin(coins);
}

useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.get("http://localhost:4000/api/auth/validate", {
        headers: { Authorization: token },
      });
      setIsLoading(false);
    } catch (err) {
      console.log("error", err);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      navigate("/login");
    }
  };

  checkAuth();

}, []); 

useEffect(()=>{
  setDisplayCoin(allCoin);
},[allCoin])

if (isLoading){
  return (<div>Loading....</div>)
}
  return (
    <div className='Home'>
      <div className="hero">
        <h1>Largest <br/> Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
        <form onSubmit={searchHandler}>

          <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search crypto..'  required/>

          <datalist id='coinlist'>
            {allCoin.map((item, index)=>(<option key={index} value={item.name}/>))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24H Change</p>
          <p className='market-cap'>Marker cap</p>
        </div>
        {
          displayCoin.slice(0,10).map((item, index)=>(
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
             <p>{item.market_cap_rank}</p>
             <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
             </div>
             <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
             <p className={item.price_change_percentage_24h>0?"green":"red"}>
              {Math.floor(item.price_change_percentage_24h*100)/100}
             </p>
             <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home
