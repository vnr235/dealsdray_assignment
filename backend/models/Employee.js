const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`
        }
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        validate: {
            validator: function (v) {
                return /^[1-9]\d{9}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid mobile number!`
        }
    },
    designation: {
        type: String,
        required: [true, 'Designation is required'],
        enum: ['HR', 'Manager', 'Sales'],
        message: '{VALUE} is not a valid designation'
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female'],
        message: '{VALUE} is not a valid gender'
    },
    course: {
        type: [String],
        required: [true, 'At least one course is required'],
        enum: ['MCA', 'BCA', 'BSC'],
        message: '{VALUE} is not a valid course'
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: {
            validator: function (v) {
                return /\.(jpg|jpeg|png)$/i.test(v);
            },
            message: (props) => `${props.value} is not a valid image format! Only .jpg, .jpeg, or .png are allowed.`
        }
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
