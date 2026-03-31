import { useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useSearchParams, useNavigate } from "react-router-dom";

const getError = (err) =>
  err?.response?.data?.message ||
  err?.response?.data ||
  "Something went wrong";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("Invalid or missing token");
    }

    if (!password || password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await axios.post("/auth/reset-password", {
        token,
        newPassword: password,
      });

      toast.success("Password reset successful!");

      setTimeout(() => {
        navigate("/auth");
      }, 1500);

    } catch (err) {
      console.log(err);
      toast.error(getError(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 w-full rounded mb-4"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-3 w-full rounded mb-4"
          required
        />

        <button className="bg-green-500 text-white px-4 py-3 w-full rounded hover:bg-green-600">
          Reset Password
        </button>
      </form>
    </div>
  );
}