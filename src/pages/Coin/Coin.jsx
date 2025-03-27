import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import {  useNavigate, useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';
import axios from 'axios';


const Coin = () => {

  const { coinId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  const validcoinId = coinId && typeof coinId === "string" ? coinId : "bitcoin";
  console.log("useParams output:", validcoinId);


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
  
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const {currency} = useContext(CoinContext);
  const [error, setError] = useState("");

  const fetchCoinData = async ()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
        'x-cg-pro-api-key': 'CG-91Na3gF37jLkMimFB9B4FtwP'},
    };
    // const coinId = "bitcoin";
const url = `https://api.coingecko.com/api/v3/coins/${validcoinId}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setCoinData(data))
      .catch((err) => {
        console.error("Error fetching data:");
        setError("Data unavailable. Try again later.")
      });
  
  }

  const fetchHistoricalData = async ()=>{
    const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(`https://api.coingecko.com/api/v3/coins/${validcoinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(data => setHistoricalData(data))
      .catch(err => {
        console.error("Error fetching historical data:",err );
        setError("Data unavailable. Try again later.")
      });
  };

  useEffect(()=>{
    if (validcoinId) {  
      fetchCoinData();
      fetchHistoricalData();
    }
  },[currency, validcoinId])
  if (isLoading){
    return (<div>Loading....</div>)
  }
  if(coinData && historicalData){
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData.image?.large} alt={coinData.name} />
          <p><b>{coinData.name} ({coinData.symbol?.toUpperCase()})</b></p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData}/>
        </div>

        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
  <li>Currency Price</li>
  {coinData?.market_data?.current_price?.[currency.name] !== undefined ? (
    <li>
      {currency.symbol}{" "}
      {coinData.market_data.current_price[currency.name].toLocaleString()}
    </li>
  ) : (
    <li>Loading...</li>
  )}
</ul>
<ul>
  <li>Market Cap</li>
  {coinData?.market_data?.market_cap?.[currency.name] !== undefined ? (
    <li>
      {currency.symbol}{" "}
      {coinData.market_data.market_cap[currency.name].toLocaleString()}
    </li>
  ) : (
    <li>Loading...</li>
  )}
</ul>
          <ul>
            <li>24 Hour high</li>
            <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    )
  }
  else if(error){
    return (<div style={{textAlign: "center", height:"50%", fontSize:"50px", margin:"30px"}}> {error}</div>)
  }
  else{
    return (
      <div className='Spinner'>
        <div className="spin"></div>
        <h2>Coin : {validcoinId}</h2>
      </div>
    );
  }
 
};

export default  Coin;