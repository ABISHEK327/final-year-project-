import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage]   = useState('');
  const navigate              = useNavigate();

  useEffect(()=>{
   const token = localStorage.getItem("token");
   console.log("os", token)
   if(token){
    navigate("/")
   }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', {  email, password });
      const { message: successMessage, userData, token } = res.data;
      setMessage(successMessage);
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('token', token);
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p style={styles.text}>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    textAlign: 'center'
  },
  form: {
    marginTop: '20px'
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left'
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '10px',
    cursor: 'pointer'
  },
  text: {
    marginTop: '15px'
  },
  message: {
    marginTop: '15px',
    color: 'green'
  }
};

export default Login;
