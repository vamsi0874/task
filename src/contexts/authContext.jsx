import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const login = async (values) => {
    try {
      const {email, password} = values
      const response = await authService.login(email, password);
      if (response) {
       
         setUser(response.user);
        console.log('user',user)
        localStorage.setItem('user', JSON.stringify(response));
        return response
      }
    } catch (error) {
      console.log('message',error)
      console.error('Login failed', error);
     
    }
  };

  const signup = async (values) => {
    try {
      const {name, email, password} = values
      const response = await authService.signup(name, email, password);
      if (response) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response));
        console.log('response',response)
         return response
      }
    } catch (error) {
      console.error('Signup failed', error);
      throw new Error('Signup failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  
  useEffect(() => {
   
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser.user);
    }
    console.log('user',user)
    setLoading(false); 
  }, []);



  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;