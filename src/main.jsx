import React from 'react'; // Add this line
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext.jsx';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider> 
    </Router>
  </StrictMode>,
);
