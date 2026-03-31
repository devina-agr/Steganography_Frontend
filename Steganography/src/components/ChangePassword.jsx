import { useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

// ✅ error handler
const getError = (err) =>
  err?.response?.data?.message ||
  err?.response?.data ||
  "Error updating password";

export default function ChangePassword() {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const role = localStorage.getItem("role") || "";
const isAdmin = role.includes("ADMIN");

    const url = isAdmin
      ? "/admin/password"
      : "/users/password";

    await axios.put(url, data);

    toast.success("Password updated. Please login again.");

    localStorage.clear();
    window.location.href = "/auth";

  } catch (err) {
    console.log(err);
    toast.error(getError(err));
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-sm mx-auto">
      <h2 className="font-bold text-xl text-center">Change Password</h2>

      <input
        type="password"
        placeholder="Old Password"
        value={data.oldPassword}
        onChange={(e) =>
          setData({ ...data, oldPassword: e.target.value })
        }
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="password"
        placeholder="New Password"
        value={data.newPassword}
        onChange={(e) =>
          setData({ ...data, newPassword: e.target.value })
        }
        className="border p-2 w-full rounded"
        required
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
        Update Password
      </button>

      {/* Forgot password */}
      <p
        className="text-sm text-blue-500 cursor-pointer mt-2 text-right hover:underline"
        onClick={() => (window.location.href = "/forgot-password")}
      >
        Forgot Password?
      </p>
    </form>
  );
}