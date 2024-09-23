// controllers/employeeController.js
const User = require('../models/User');
const Employee = require('../models/Employee');

// Create Employee Controller Function
const createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    const user = await User.findOne({ email });
   console.log('user',user)
    const image = req.file.filename
    if (user) {
       console.log('mjocndicndcnid')
        return res.json({ error: 'User with the mail Exists' });
    }
    
    const employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image,
    });

    // Save employee to the database
    await employee.save();

    res.status(201).json({
      success: 'Employee created successfully!',
      data: employee,
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({
      error: 'Error creating employee',
      message : error,
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employees from MongoDB
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};
const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id); // Fetch all employees from MongoDB
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.deleteOne({_id:id}); // Fetch all employees from MongoDB
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};

const editEmployee = async (req, res) => {

  const { id } = req.params;
  console.log('id',id)
  const { name, email, mobile, designation, gender, course } = req.body;

  const image = req.file?.filename
  console.log('course-',course)
  try {

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Update employee fields
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobile = mobile || employee.mobile;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.course = course || employee.course;
    employee.image = image || employee.image;

  

    await employee.save();
    
    return res.json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating employee', error });
  }
};

module.exports = { createEmployee , getEmployees,editEmployee, getEmployee,deleteEmployee};
