import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Edit.css'

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const name= localStorage.getItem('name');

  useEffect(() => {
    if (!id) {
      console.error('Employee ID is missing. Redirecting to employee list...');
      navigate('/employeelist', { replace: true });
      return;
    }

    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/employe/${id}`);
        setEmployee(response.data.employee);
      } catch (error) {
        console.error('Error fetching employee:', error);
        alert('Failed to fetch employee. Redirecting...');
        navigate('/employeelist', { replace: true });
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
  
      // Append fields to FormData
      Object.keys(employee).forEach((key) => {
        if (key === 'course') {
          formData.append(key, JSON.stringify(employee[key])); // Convert array to string
        } else if (key === 'image') {
          if (employee.image) {
            formData.append(key, employee.image); // Append file if it exists
          }
        } else {
          formData.append(key, employee[key]);
        }
      });
  
      // Debug FormData content
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
  
      const response = await axios.put(
        `http://localhost:5000/api/employees/updateemployee/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      alert('Employee updated successfully');
      navigate('/employeelist', { replace: true });
    } catch (error) {
      console.error('Error updating employee:', error.response?.data || error.message);
      alert('Failed to update employee');
    }
  };
    

  return (
    <div>
        <header className="header">
        <div><h1 className="logo">Logo</h1></div>
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

      <div className='containers'>
      <h1 style={{marginBottom:'20px' }}>Edit Employee</h1>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <div className='inn'>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          />
        </div>
        <div className='inn'>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          />
        </div>
        <div className='inn'>
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={employee.mobile}
            onChange={(e) => setEmployee({ ...employee, mobile: e.target.value })}
          />
        </div>
        <div className='inn'>
          <label>Designation:</label>
          <select
            name="designation"
            value={employee.designation}
            onChange={(e) => setEmployee({ ...employee, designation: e.target.value })}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className='inn'>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={employee.gender === 'Male'}
              onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={employee.gender === 'Female'}
              onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
            /> Female
          </label>
        </div>
        <div className='inn'>
          <label>Courses:</label>
          {['MCA', 'BCA', 'BSC'].map((course) => (
            <label key={course}>
              <input
                type="checkbox"
                name="course"
                value={course}
                checked={employee.course.includes(course)}
                onChange={(e) => {
                  const updatedCourses = e.target.checked
                    ? [...employee.course, course]
                    : employee.course.filter((c) => c !== course);
                  setEmployee({ ...employee, course: updatedCourses });
                }}
              />
              {course}
            </label>
          ))}
        </div>
        <div className='inn'>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
          />
        </div>
        <button type="submit">Update Employee</button>
      </form>

      </div>
    </div>
  );
};

export default EmployeeEdit;
