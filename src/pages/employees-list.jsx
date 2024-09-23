import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { EmployeeData } from '@/components/employee-data';
import { Navbar } from '../components/navbar';
import {ok} from '../images/assests'
const EmployeeList = () => {
  console.log('ok',ok)
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [image , setImage] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get('/employees');
        setEmployees(response.data);
      } catch (error) {
        navigate('/login');
        console.error('Error fetching employees:', error.response.data.error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDelete = async (id) => {
   
    try {
      await api.delete(`/employees/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortConfig.key === 'createDate') {
      const dateA = new Date(a.createDate);
      const dateB = new Date(b.createDate);
      return sortConfig.direction === 'ascending' ? -1 : 1;
    } else {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    }
  });

  const filteredEmployees = sortedEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.course.some(courseItem => courseItem.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalEmployees = filteredEmployees.length;

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(totalEmployees / employeesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <Navbar />
   
    <div className="p-8">
       
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
      
      <div className="flex mb-4 justify-between">
        <input
          type="text"
          placeholder="Search by name, email, ID, or course"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded"
        />
        <span>Total Employees: {totalEmployees}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 cursor-pointer" onClick={() => handleSort('_id')}>Unique Id</th>
              <th className="border p-2 cursor-pointer" >Image</th>
              <th className="border p-2 cursor-pointer" onClick={() => handleSort('name')}>Name</th>
              <th className="border p-2 cursor-pointer" onClick={() => handleSort('email')}>Email</th>
              <th className="border p-2">Mobile No</th>
              <th className="border p-2">Designation</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2 cursor-pointer" onClick={() => handleSort('course')}>Course</th>
              <th className="border p-2 cursor-pointer" onClick={() => handleSort('createDate')}>Create Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <tr key={employee._id} className="text-center">
                  <EmployeeData employee={employee} image={image} />
                  <td className="border p-2">
                    <button onClick={() => handleEdit(employee._id)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(employee._id)} className="bg-red-500 text-white p-1 ml-2 rounded">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="border p-2 text-center">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 text-black p-2 rounded"
        >
          Previous
        </button>

        <div className="flex">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-black p-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default EmployeeList;
