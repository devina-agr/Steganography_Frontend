
import API from "./axios";

// Register
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res;
};

// Login
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res;
};