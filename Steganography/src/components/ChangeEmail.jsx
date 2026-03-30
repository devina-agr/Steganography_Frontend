import { useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

export default function ChangeEmail() {
  const [data, setData] = useState({
    newEmail: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/users/email/request", data);
      toast.success("Verification mail sent!");

    } catch (err) {
      toast.error(err.response?.data || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="font-bold">Change Email</h2>

      <input placeholder="New Email"
        onChange={(e)=>setData({...data, newEmail:e.target.value})}
        className="border p-2 w-full" />

      <input type="password" placeholder="Password"
        onChange={(e)=>setData({...data, password:e.target.value})}
        className="border p-2 w-full" />

      <button className="bg-green-500 text-white px-4 py-2">
        Request Change
      </button>
    </form>
  );
}