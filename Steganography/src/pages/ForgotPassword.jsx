import { useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/users/forgot-password", { email });
      toast.success("Reset link sent!");

    } catch {
      toast.error("Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2>Forgot Password</h2>

      <input placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        className="border p-2" />

      <button className="bg-blue-500 text-white px-4 py-2">
        Send Link
      </button>
    </form>
  );
}