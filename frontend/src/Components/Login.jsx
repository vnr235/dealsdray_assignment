import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router';

const Login = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
  
      if (response.status === 200) {
        alert(response.data.message); 
        localStorage.setItem('name', response.data.name); 
        navigate('/home'); 
      } else {
        alert('Unexpected response from the server'); 
      }
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred');
    }
  };
  

  return (
    <>
    <header className='header'>
        <h1 className='logo'>Logo</h1>
    </header>
    <form onSubmit={handleSubmit}  className='container'>
      <h2 style={{marginBottom:'20px'}}>Login</h2>
      <div className='inn'>
      <label style={{fontSize:'large', marginTop:'7px'}}>UserName:</label>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      </div>
      <div className='inn'>
      <label style={{fontSize:'large', marginTop:'7px'}}>Password:</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      </div>
      <button type="submit" className='but'>Login</button>
    </form>
    </>
    
  );
};

export default Login;
