import { useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

const getError = (err) =>
  err?.response?.data?.message ||
  err?.response?.data ||
  "Something went wrong";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required");
    }

    try {
      // ✅ NO ROLE LOGIC
      await axios.post("/users/forgot-password", { email });

      toast.success("Reset link sent!");
      setEmail("");

    } catch (err) {
      console.log(err);
      toast.error(getError(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        Forgot Password
      </h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full rounded mb-3"
        required
      />

      <button className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600">
        Send Reset Link
      </button>
    </form>
  );
}