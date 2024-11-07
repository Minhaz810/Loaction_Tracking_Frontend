import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout = () =>{
    navigate("/login")
    localStorage.clear()
  }
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
            <div className="hover:text-gray-300"
            onClick={handleLogout}
            >Logout</div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
