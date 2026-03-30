import { useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");

  const token = new URLSearchParams(window.location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/users/reset-password", {
        token,
        newPassword: password,
      });

      toast.success("Password reset successful!");
      window.location.href = "/auth";

    } catch {
      toast.error("Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2>Reset Password</h2>

      <input type="password" placeholder="New Password"
        onChange={(e)=>setPassword(e.target.value)}
        className="border p-2" />

      <button className="bg-green-500 text-white px-4 py-2">
        Reset Password
      </button>
    </form>
  );
}