
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">StegoApp</h1>

      <div className="flex gap-4 items-center">
        
        {user && (
          <>
            <Link to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>

            {user.role?.includes("ADMIN") && (
              <Link to="/admin" className="hover:text-yellow-400">
                Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}