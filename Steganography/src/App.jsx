import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Landing from "./pages/Landing";
import AuthPage from "./pages/Auth";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ConfirmEmailChanges from "./pages/ConfirmEmailChanges";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ConfirmEmail from "./components/ConfirmEmail";

function App() {
  return (
    <BrowserRouter>
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* User Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Fallback Route */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen text-2xl">
              404 - Page Not Found
            </div>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/confirm-email-change" element={<ConfirmEmailChanges />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;