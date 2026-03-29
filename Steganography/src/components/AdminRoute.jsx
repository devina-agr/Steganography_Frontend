// src/components/AdminRoute.jsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function AdminRoute() {
  const { user } = useAuth(); 

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // ❌ not admin
  if (!user.role?.includes("ADMIN")) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ admin access
  return <Outlet />;
}