import { Link, NavLink } from 'react-router-dom'
import AuthContext from '../contexts/authContext'
import React, { useContext } from 'react'

export const Navbar = () => {

  const {user,logout} = useContext(AuthContext)
  return (
    <nav className="bg-gray-800 text-white p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
           <NavLink to="/">Home</NavLink>
          <NavLink to="/employee-list">Employee List</NavLink>
          <NavLink to="/create-employee">Create Employee</NavLink>
        </div>
        <div className="flex space-x-4 items-center">
          <span className="text-sm font-medium">{user?.username}</span>
          <button onClick={()=>logout()} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
