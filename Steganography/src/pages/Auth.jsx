// src/pages/Auth.jsx

import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  //  Save user in localStorage
  const saveUser = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", JSON.stringify(data.role || []));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = isLogin
        ? await loginUser(form)
        : await registerUser(form);

      console.log("API RESPONSE:", res.data);

      // NO CONTEXT
      saveUser(res.data);

      toast.success(isLogin ? "Login successful" : "Registered");

      if (res.data.role?.includes("ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.error("ERROR:", err);
      toast.error(
        err?.response?.data?.message ||
        err.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded mb-4"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded mb-4"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-blue-500 cursor-pointer ml-2"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}