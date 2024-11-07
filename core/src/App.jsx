import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import router from './routes';


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
