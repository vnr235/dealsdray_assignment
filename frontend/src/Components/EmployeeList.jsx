import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeList.css';
import { useNavigate } from 'react-router';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const navigate = useNavigate();
  const name= localStorage.getItem('name');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees/getemployee');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/deleteemployee/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
      alert('Employee deleted successfully');
    } catch (err) {
      alert('Error deleting employee');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/login');
    }
  };

  const handleEdit = (id) => {
    if (!id) {
      console.error('Employee ID is undefined');
      return;
    }
    navigate(`/edit/${id}`);
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction });

    setEmployees((prev) =>
      [...prev].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      })
    );
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <header className="header">
        <div>
          <h1 className="logo">Logo</h1>
        </div>
        <div>
          <ul className="lii">
            <li onClick={()=>navigate('/home')}>Home</li>
            <li onClick={()=>navigate('/create')}>Create Employee</li>
          </ul>
        </div>
        <div className="twoo">
          <h3 className="userr">{name}</h3>
          <h4 className="log" onClick={handleLogout}>Logout</h4>
        </div>
      </header>

      <div>
        <h1 style={{ justifySelf: 'center', marginTop: '10px' }}>Employee List</h1>

        <div className="ddd">
          <p style={{ fontWeight: 'bold', marginRight: '20px' }}>Total Count: {filteredEmployees.length}</p>
          <button onClick={() => navigate('/create')}>Create Employee</button>
          <label style={{ fontSize: 'larger', fontWeight: 'normal' }}>Search</label>
          <input
            className="inp"
            type="text"
            placeholder="Enter Search Keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Image</th>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('email')}>Email</th>
              <th>Mobile</th>
              <th onClick={() => handleSort('designation')}>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th onClick={() => handleSort('createDate')}>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>
                  <img
                    src={`http://localhost:5000/${employee.image}`}
                    alt="profile"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course.join(', ')}</td>
                <td>{new Date(employee.createDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(employee._id)}>Edit</button>
                  <button style={{ background: 'red' }} onClick={() => handleDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
