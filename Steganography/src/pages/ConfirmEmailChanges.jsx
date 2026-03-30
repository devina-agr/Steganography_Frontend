import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";

export default function ConfirmEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const token = params.get("token");

    console.log("TOKEN:", token);

    if (!token) {
      setStatus("error");
      toast.error("Invalid link");
      return;
    }

    axios
      .get(`/users/email/confirm?token=${token}`)
      .then((res) => {
        console.log("SUCCESS:", res.data);

        setStatus("success");
        toast.success("Email updated!");

        setTimeout(() => {
          localStorage.clear();
          window.location.href = "/auth";   // 🔥 force redirect
        }, 2000);
      })
      .catch((err) => {
        console.log("ERROR:", err.response);

        setStatus("error");
        toast.error(
          err?.response?.data || "Invalid or expired link"
        );
      });
  }, [params]);

  return (
    <div className="flex items-center justify-center h-screen text-xl">
      {status === "loading" && <p>⏳ Confirming email...</p>}
      {status === "success" && <p>✅ Email updated! Redirecting...</p>}
      {status === "error" && <p>❌ Failed to confirm email</p>}
    </div>
  );
}