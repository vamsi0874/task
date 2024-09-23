import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { EditSchema } from '../schemas'; 
import { Navbar } from '../components/navbar';

const EditEmployee = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(EditSchema),
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/employees/${id}`); 
        const employeeData = response.data;

        // Reset form with fetched employee data
        reset({
          name: employeeData.name,
          email: employeeData.email,
          mobile: employeeData.mobile,
          designation: employeeData.designation,
          gender: employeeData.gender,
          course: employeeData.course,
      
        });
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      console.log('data', data);
      await api.post(`/employees/${id}`, data,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      ); 
      navigate('/employee-list'); 
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && ['image/png', 'image/jpeg'].includes(file.type)) {
      setValue('image', file, { shouldValidate: true });
      console.log('file', file);
    } else {
      setValue('image', null, { shouldValidate: true });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Edit Employee</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name field */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              {...register('name')}
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email field */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              {...register('email')}
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Mobile field */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Mobile No</label>
            <input
              type="text"
              {...register('mobile')}
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
          </div>

          {/* Designation field */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Designation</label>
            <select
              {...register('designation')}
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.designation && (
              <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>
            )}
          </div>

          {/* Gender field */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input type="radio" value="Male" {...register('gender')} className="mr-2" /> Male
              </label>
              <label className="flex items-center">
                <input type="radio" value="Female" {...register('gender')} className="mr-2" /> Female
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>

          {/* Course field */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Course</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input type="checkbox" value="MCA" {...register('course')} className="mr-2" /> MCA
              </label>
              <label className="flex items-center">
                <input type="checkbox" value="BCA" {...register('course')} className="mr-2" /> BCA
              </label>
              <label className="flex items-center">
                <input type="checkbox" value="BSC" {...register('course')} className="mr-2" /> BSC
              </label>
            </div>
            {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course.message}</p>}
          </div>

          {/* Image field */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Image Upload (PNG/JPEG)</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            {errors.image && <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition-all"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditEmployee;
