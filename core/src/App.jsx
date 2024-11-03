import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DriverDashboard from './components/DriverDashboard'; 
import AdminDashboard from './components/AdminDashboard';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard/>} />
        <Route path="/driver" element={<DriverDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
