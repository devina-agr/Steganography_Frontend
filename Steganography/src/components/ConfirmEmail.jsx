import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../api/axios";

export default function ConfirmEmail() {
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    axios.get(`/users/email/confirm?token=${token}`)
      .then(() => alert("Email updated successfully"))
      .catch(() => alert("Invalid or expired link"));
  }, []);

  return <h2>Confirming email...</h2>;
}