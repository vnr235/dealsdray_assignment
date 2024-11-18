import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Createemp.css'
const CreateEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: null
    });
    const name= localStorage.getItem('name');

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setEmployee((prev) => ({
                ...prev,
                course: checked
                    ? [...prev.course, value]
                    : prev.course.filter((course) => course !== value)
            }));
        } else if (type === 'file') {
            setEmployee((prev) => ({ ...prev, image: e.target.files[0] }));
        } else {
            setEmployee((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/login');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        Object.keys(employee).forEach((key) => {
          if (key === 'course') {
            // Convert course array to JSON string
            formData.append(key, JSON.stringify(employee[key]));
          } else {
            formData.append(key, employee[key]);
          }
        });
      
        try {
          const response = await axios.post('http://localhost:5000/api/employees/createemployee', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          alert('Employee created successfully');
          navigate('/employeelist')
          console.log(response.data);
        } catch (error) {
          console.error('Error creating employee:', error.response || error.message);
          alert(error.response?.data?.message || 'An error occurred');
        }
      };
      

    return (
        <>
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
            <form onSubmit={handleSubmit} className="contain">
                <div style={{marginBottom:'20px', borderBottom:'2px solid black'}}><h1>Create Employee</h1></div>
                <div className='inn'>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter name"
                        value={employee.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='inn'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email"
                        value={employee.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='inn'>
                    <label htmlFor="mobile">Mobile No:</label>
                    <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        placeholder="Enter mobile number"
                        value={employee.mobile}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='inn'>
                    <label htmlFor="designation">Designation:</label>
                    <select
                        name="designation"
                        id="designation"
                        value={employee.designation}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div className='inn'>
                    <label htmlFor='gender'>Gender:</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={employee.gender === 'Male'}
                            onChange={handleInputChange}
                        /> Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={employee.gender === 'Female'}
                            onChange={handleInputChange}
                        /> Female
                    </label>
                </div>

                <div className='inn'>
                    <label htmlFor='course'>Course:</label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="MCA"
                            onChange={handleInputChange}
                        /> MCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="BCA"
                            onChange={handleInputChange}
                        /> BCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="BSC"
                            onChange={handleInputChange}
                        /> BSC
                    </label>
                </div>
                <div className='inn'>
                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleInputChange}
                        accept=".jpg,.png"
                        required
                    />
                </div>
                <div><button type="submit" className="but">Submit</button></div>
            </form>
        </>

    );
};

export default CreateEmployee;
