import React from 'react';
import { Navbar } from '../components/navbar';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome to the Admin Panel
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
