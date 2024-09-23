
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    enum: ['HR', 'Manager', 'Sales'],
    default: 'HR',
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  course: {
    type: [String],
    enum: ['MCA', 'BCA', 'BSC'],
    required: true,
  },
  image: {
    type: String, 
  },
}, { timestamps: true });


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
