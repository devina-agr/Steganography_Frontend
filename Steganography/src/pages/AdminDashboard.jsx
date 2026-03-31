// src/pages/AdminDashboard.jsx

import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  getStats,
  getUsers,
  deleteUser,
  banUser,
} from "../api/adminApi";
import toast from "react-hot-toast";
import ChangePassword from "../components/ChangePassword";

// ICONS
import {
  LayoutDashboard,
  FileText,
  UserPlus,
  Mail,
  KeyRound,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [inviteEmail, setInviteEmail] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        getStats(),
        getUsers(),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch {
      toast.error("Failed to load data");
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await axios.get("/admin/audit-logs");
      setLogs(res.data);
    } catch {
      toast.error("Failed to load logs");
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    toast.success("User deleted");
    fetchData();
  };

  const handleBan = async (id) => {
    await banUser(id);
    toast.success("User updated");
    fetchData();
  };

  const handleInvite = async () => {
    try {
      await axios.post("/admin/invite", { email: inviteEmail });
      toast.success("Invite sent!");
      setInviteEmail("");
    } catch {
      toast.error("Invite failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab === "logs") fetchLogs();
  }, [activeTab]);

  // MENU WITH ICONS
  const menu = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "logs", label: "Audit Logs", icon: FileText },
  { key: "invite", label: "Invite Admin", icon: UserPlus },
  { key: "password", label: "Change Password", icon: KeyRound },
];

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside
  className={`${
    sidebarOpen ? "w-64" : "w-20"
  } bg-white shadow-lg p-4 transition-all duration-300`}
>
  {/* HEADER */}
  <div
    className={`flex items-center ${
      sidebarOpen ? "justify-between" : "justify-center"
    } mb-6`}
  >
    {sidebarOpen && (
      <h2 className="text-xl font-bold">Admin Panel</h2>
    )}

    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="p-2 hover:bg-gray-100 rounded"
    >
      <span className="text-2xl">☰</span>
    </button>
  </div>

  {/* MENU */}
  <div className="space-y-3">
    {menu.map((item) => {
      const Icon = item.icon; // 🔥 important

      return (
        <button
          key={item.key}
          onClick={() => setActiveTab(item.key)}
          title={!sidebarOpen ? item.label : ""}
          className={`flex items-center ${
            sidebarOpen ? "justify-start" : "justify-center"
          } gap-3 w-full px-3 py-2 rounded-lg transition
          ${
            activeTab === item.key
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {/* 🔥 Dynamic icon size */}
          <Icon size={sidebarOpen ? 18 : 21} />

          {/* 🔥 Show label only when open */}
          {sidebarOpen && item.label}
        </button>
      );
    })}
  </div>
</aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-semibold mb-6">
          {activeTab === "dashboard"
            ? "Dashboard Overview"
            : menu.find((m) => m.key === activeTab)?.label}
        </h1>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            {/* STATS */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-gray-500">Total Users</p>
                <h2 className="text-3xl font-bold">
                  {stats.totalUsers || 0}
                </h2>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-gray-500">Total Records</p>
                <h2 className="text-3xl font-bold">
                  {stats.totalStegoRecords || 0}
                </h2>
              </div>
            </div>

            {/* USERS */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="p-4 font-semibold border-b">
                Recent Users
              </div>

              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.slice(0, 5).map((u) => (
                    <tr key={u.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">
                        {Array.isArray(u.role)
                          ? u.role.join(", ")
                          : u.role}
                      </td>

                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => handleBan(u.id)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Ban
                        </button>

                        <button
                          onClick={() => handleDelete(u.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* AUDIT LOGS */}
        {activeTab === "logs" && (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Time</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-t text-center">
                    <td className="p-3">{log.userEmail}</td>
                    <td className="p-3">{log.action}</td>
                    <td className="p-3">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* INVITE ADMIN */}
        {activeTab === "invite" && (
          <div className="max-w-md bg-white p-6 rounded-xl shadow">
            <input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full border p-3 rounded mb-4"
            />

            <button
              onClick={handleInvite}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
            >
              Send Invite
            </button>
          </div>
        )}

        {/* CHANGE PASSWORD */}
        {activeTab === "password" && <ChangePassword />}
      </main>
    </div>
  );
}