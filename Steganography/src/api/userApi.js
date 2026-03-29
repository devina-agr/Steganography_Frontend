// src/api/userApi.js
import API from "./axios";

// Current user
export const getCurrentUser = async () => {
  const res = await API.get("/users/me");
  return res;
};

// Change password
export const changePassword = async (id, data) => {
  const res = await API.put(`/users/${id}/password`, data);
  return res;
};

// Forgot password
export const forgotPassword = async (data) => {
  const res = await API.post("/users/forgot-password", data);
  return res;
};

// Reset password
export const resetPassword = async (data) => {
  const res = await API.post("/users/reset-password", data);
  return res;
};

// Request email change
export const requestEmailChange = async (data) => {
  const res = await API.post("/users/email/request", data);
  return res;
};

// Confirm email change
export const confirmEmailChange = async (token) => {
  const res = await API.get(`/users/email/confirm?token=${token}`);
  return res;
};