
import { useState } from "react";
import EncodeForm from "../components/EncodeForum";
import DecodeForm from "../components/DecodeForum";
import RecordsTable from "../components/RecordTable";

export default function UserDashboard() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <EncodeForm onSuccess={() => setRefresh((prev) => !prev)} />
        <DecodeForm />
      </div>

      <RecordsTable refresh={refresh} />
    </div>
  );
}