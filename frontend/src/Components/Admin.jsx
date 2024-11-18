import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  
  const name = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div>
      <header className="header">
        <div><h1 className="logo">Logo</h1></div>
        <div>
          <ul className="lii">
            <li onClick={()=>navigate('/home')}>Home</li>
            <li onClick={()=>navigate('/employeelist')}>Employee List</li>
          </ul>
        </div>
        <div className='twoo'>
          <h3 className='userr'>{name}</h3>
          <h4 className="log" onClick={handleLogout}>Logout</h4>
        </div>

      </header>
      
      <h1>Welcome, {name}</h1>
    </div>
  );
};

export default Dashboard;
