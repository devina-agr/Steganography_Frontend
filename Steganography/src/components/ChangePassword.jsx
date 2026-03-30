import { useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ No ID needed now
      await axios.put("/users/password", data);

      toast.success("Password updated. Please login again.");

      // ✅ logout after password change
      localStorage.clear();
window.location.href = "/auth";

    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data || "Error updating password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
      <h2 className="font-bold text-xl">Change Password</h2>

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

      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Update Password
      </button>
      <p
  className="text-sm text-blue-500 cursor-pointer mt-2 text-right"
  onClick={() => window.location.href = "/forgot-password"}
>
  Forgot Password?
</p>
    </form>
  );
}