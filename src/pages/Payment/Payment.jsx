import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import qrPayment from "../../assets/qrPayment.png";
const Payment = () => {
  const navigate = useNavigate();

  useEffect(()=>{
   const token = localStorage.getItem("token");
   if(!token){
    navigate("/login")
   }
  },[])

  return (
    <div style={{textAlign:"center", margin:"20px"}}>
      <h2>Payment</h2>
      <h3>Scan QR to pay</h3>
      <img src={qrPayment}></img>
    </div>
  );
};


export default Payment;
