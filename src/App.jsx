import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import CreateEmployee from './pages/create-employee';
import EmployeeList from './pages/employees-list';
import AuthContext from './contexts/authContext.jsx';
import HomePage from './pages/home-page';
import EditEmployee from './pages/edit-employee';

function App() {
  const { user, loading } = useContext(AuthContext); // Get the user and loading from AuthContext

  
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
        <div>
          <Routes>
            <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/login"  element={!user ? <LoginPage /> : <Navigate to="/" />}  />
            <Route path="/signup"  element={!user ? <SignupPage /> : <Navigate to="/" />}  />
            <Route path="/create-employee" element={user ? <CreateEmployee /> : <Navigate to="/login" />} />
            <Route path="/employee-list" element={user ? <EmployeeList /> : <Navigate to="/login" />} />
            <Route path="/edit-employee/:id" element={user ? <EditEmployee /> : <Navigate to="/login" />} />
          </Routes>
        </div>
   
  );
}

export default App;
