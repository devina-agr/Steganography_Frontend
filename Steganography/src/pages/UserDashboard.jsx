import { useState } from "react";
import EncodeForum from "../components/EncodeForum";
import DecodeForum from "../components/DecodeForum";
import RecordTable from "../components/RecordTable";
import ChangePassword from "../components/ChangePassword";
import ChangeEmail from "../components/ChangeEmail";

export default function UserDashboard() {
  const [active, setActive] = useState("dashboard");
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 relative">

      {/* 🔥 TOP BAR */}
      <div className="flex items-center gap-3 bg-white p-4 shadow">
        <button
          onClick={() => setOpen(true)}
          className="text-2xl font-bold"
        >
          ☰
        </button>

        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* 🔥 SIDEBAR OVERLAY */}
      {open && (
        <>
          {/* Background blur */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-white p-5 space-y-4 z-50">

            <button
              onClick={() => setOpen(false)}
              className="text-right w-full text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Menu</h2>

            <button
              onClick={() => {
                setActive("dashboard");
                setOpen(false);
              }}
              className="block w-full text-left hover:text-blue-400"
            >
              Dashboard
            </button>

            <button
              onClick={() => {
                setActive("password");
                setOpen(false);
              }}
              className="block w-full text-left hover:text-blue-400"
            >
              Change Password
            </button>

            <button
              onClick={() => {
                setActive("email");
                setOpen(false);
              }}
              className="block w-full text-left hover:text-blue-400"
            >
              Change Email
            </button>
          </div>
        </>
      )}

      {/* 🔥 MAIN CONTENT */}
      <div className="p-6">

        {active === "dashboard" && (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <EncodeForum />
              <DecodeForum />
            </div>

            <RecordTable />
          </>
        )}

        {active === "password" && (
          <div className="max-w-md">
            <ChangePassword />
          </div>
        )}

        {active === "email" && (
          <div className="max-w-md">
            <ChangeEmail />
          </div>
        )}
      </div>
    </div>
  );
}