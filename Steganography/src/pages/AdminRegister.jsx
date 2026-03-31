import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";

// ✅ error handler
const getError = (err) => {
  return (
    err?.response?.data?.message ||
    err?.response?.data ||
    err?.message ||
    "Something went wrong"
  );
};

export default function AdminRegister() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const t = params.get("token");

    if (!t) {
      toast.error("Invalid invite link");
      navigate("/auth");
    } else {
      setToken(t);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 validations
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await axios.post(`/admin/register?token=${token}`, {
        password,
      });

      toast.success("Admin account created successfully!");

      setTimeout(() => {
        navigate("/auth");
      }, 1500);

    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Admin Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
            Register as Admin
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          You are registering via invite link
        </p>

      </div>
    </div>
  );
}