import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DriverDashboard from './components/DriverDashboard'; 
import AdminDashboard from './components/AdminDashboard';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/driver" element={<AdminDashboard/>} />
        <Route path="/" element={<DriverDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
