import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-blue-600 text-white shadow-md p-4 fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <ul className="flex space-x-6">
          <li>
            <a href="#home" className="hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="#reports" className="hover:text-gray-300">Reports</a>
          </li>
          <li>
            <a href="#settings" className="hover:text-gray-300">Settings</a>
          </li>
          <li>
            <a href="#logout" className="hover:text-gray-300">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
