// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const path = require('path');


const authRoutes = require('./routers/auth.js');
const employeeRoutes = require('./routers/employee.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
