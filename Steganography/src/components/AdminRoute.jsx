import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("role") || "[]");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (!roles.includes("ADMIN")) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}