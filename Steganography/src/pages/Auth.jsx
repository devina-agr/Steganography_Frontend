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

    // 🔥 clear old auth completely
    localStorage.clear();

    // save new auth
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("role", JSON.stringify(res.data.role || []));

    toast.success(isLogin ? "Login successful" : "Registered");

    // 🔥 force reload
    const rolesRaw = res.data.role;

const roles = Array.isArray(rolesRaw)
  ? rolesRaw
  : typeof rolesRaw === "string"
  ? [rolesRaw]
  : [];

console.log("ROLES:", roles); // 🔥 DEBUG

localStorage.setItem("token", res.data.token);
localStorage.setItem("email", res.data.email);
localStorage.setItem("role", JSON.stringify(roles));

if (roles.some(r => r.toUpperCase() === "ADMIN")) {
  window.location.href = "/admin";
} else {
  window.location.href = "/dashboard";
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
              value={form.email} 
            className="w-full p-3 border rounded mb-4"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}  
            className="w-full p-3 border rounded mb-4"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <p
  className="text-blue-500 text-sm cursor-pointer mt-2"
  onClick={() => window.location.href = "/forgot-password"}
>
  Forgot Password?
</p><br/>
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