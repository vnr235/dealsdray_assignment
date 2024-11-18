const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });


// Get Employees
router.get('/getemployee', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees', error: err.message });
  }
});

//get by id
router.get('/employe/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Employee id:',id);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }

    if (!id) {
      return res.status(400).json({ message: 'Employee ID is required' });
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ employee });
  } catch (err) {
    console.error('Error fetching employee:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Create Employee
router.post('/createemployee', upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;

    // Input validation
    if (!name || !email || !mobile || !designation || !gender || !course) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const mobileRegex = /^[1-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ message: 'Invalid mobile number' });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Save employee data, including the image path
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course: JSON.parse(course), // Parse course if sent as a JSON string
      image: req.file ? req.file.path : null // Save the file path
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (err) {
    console.error('Error creating employee:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});


// Update Employee
router.put('/updateemployee/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Parse `course` back into an array
    if (updateData.course) {
      updateData.course = JSON.parse(updateData.course);
    }

    // Add file path if an image was uploaded
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (err) {
    console.error('Error updating employee:', err.message);
    res.status(400).json({ message: 'Error updating employee', error: err.message });
  }
});

// Delete Employee
router.delete('/deleteemployee/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting employee', error: err.message });
  }
});

module.exports = router;
