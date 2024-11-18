import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Components/Login';
import reportWebVitals from './reportWebVitals';
import EmployeeList from './Components/EmployeeList';
import Dashboard from './Components/Admin';
import EmployeeEdit from './Components/Edit';
import CreateEmployee from './Components/Createemp';
import Register from './Components/Register';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App /> 
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/employeelist',
    element: <EmployeeList/>
  },
  {
    path:'/home',
    element:<Dashboard/>
  },
  {
    path:'/register',
    element: <Register/>
  },
  {
    path: '/edit/:id',
    element: <EmployeeEdit/>
  },
  {
    path: '/create',
    element:<CreateEmployee/>
  }
]);

// Render application
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
