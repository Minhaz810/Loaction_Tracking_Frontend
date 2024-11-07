import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./auth/Login";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <AdminDashboard />
      </PrivateRoute>
    )
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);

export default router;
