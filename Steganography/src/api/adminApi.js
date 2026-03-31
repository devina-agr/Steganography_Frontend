import API from "./axios";

/* ================= USERS ================= */

// Get all users
export const getAllUsers = async () => {
  return API.get("/admin/users");
};

// Get user by ID
export const getUserById = async (id) => {
  return API.get(`/admin/users/${id}`);
};

// Search user by email
export const searchUserByEmail = async (email) => {
  return API.get(`/admin/users/search?email=${email}`);
};

// Delete user
export const deleteUser = async (id) => {
  return API.delete(`/admin/users/${id}`);
};

// Ban / Unban user
export const banUser = async (id) => {
  return API.patch(`/admin/users/${id}/ban`);
};

// Get user count
export const getUserCount = async () => {
  return API.get("/admin/users/count");
};

// Get paginated users
export const getUsersPaginated = async (page, size) => {
  return API.get(`/admin/users/paginated?page=${page}&size=${size}`);
};

// System stats
export const getStats = async () => {
  return API.get("/admin/stats");
};

// All stego records
export const getAllStegoRecords = async () => {
  return API.get("/admin/stego-records");
};

// Audit logs
export const getLogs = async () => {
  return API.get("/admin/audit-logs");
};

// alias
export const getUsers = () => API.get("/admin/users");



/* ================= ADMIN AUTH FEATURES ================= */

// 🔐 Change Password (ADMIN)
export const changeAdminPassword = async (data) => {
  return API.put("/admin/password", data);
};


// 👤 Invite Admin
export const inviteAdmin = async (email) => {
  return API.post("/admin/invite", { email });
};

// 📝 Register Admin via invite
export const registerAdmin = async (token, password) => {
  return API.post(`/admin/register?token=${token}`, {
    password,
  });
};