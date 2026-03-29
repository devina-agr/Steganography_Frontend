// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { getStats, getUsers, deleteUser, banUser } from "../api/adminApi";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const statsRes = await getStats();
      const usersRes = await getUsers();

      setStats(statsRes.data);
      setUsers(usersRes.data);

    } catch (err) {
      console.log(err);
      toast.error("Failed to load admin data");
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/*  STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <h2>Total Users</h2>
          <p className="text-2xl font-bold">{stats.totalUsers || 0}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2>Total Records</h2>
          <p className="text-2xl font-bold">{stats.totalStegoRecords || 0}</p>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Users</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="text-center border-t">
                <td>{u.email}</td>
                <td>{[...u.role].join(", ")}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleBan(u.id)}
                    className="bg-yellow-500 text-white px-3 py-1"
                  >
                    Ban
                  </button>

                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-500 text-white px-3 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}