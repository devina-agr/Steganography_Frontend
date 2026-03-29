
import API from "./axios";

// Get all users
export const getAllUsers = async () => {
  const res = await API.get("/admin/users");
  return res;
};

// Get user by ID
export const getUserById = async (id) => {
  const res = await API.get(`/admin/users/${id}`);
  return res;
};

// Search user by email
export const searchUserByEmail = async (email) => {
  const res = await API.get(`/admin/users/search?email=${email}`);
  return res;
};

// Delete user
export const deleteUser = async (id) => {
  const res = await API.delete(`/admin/users/${id}`);
  return res;
};

// Ban / Unban user
export const banUser = async (id) => {
  const res = await API.patch(`/admin/users/${id}/ban`);
  return res;
};

// Get user count
export const getUserCount = async () => {
  const res = await API.get("/admin/users/count");
  return res;
};

// Get paginated users
export const getUsersPaginated = async (page, size) => {
  const res = await API.get(
    `/admin/users/paginated?page=${page}&size=${size}`
  );
  return res;
};

// System stats
export const getStats = async () => {
  const res = await API.get("/admin/stats");
  return res;
};

// All stego records
export const getAllStegoRecords = async () => {
  const res = await API.get("/admin/stego-records");
  return res;
};

// Audit logs
export const getLogs = async () => {
  const res = await API.get("/admin/audit-logs");
  return res;
};

//stats
export const getUsers = () => API.get("/admin/users");