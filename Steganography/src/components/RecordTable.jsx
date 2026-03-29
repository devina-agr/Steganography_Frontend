// src/components/RecordsTable.jsx
import { useEffect, useState } from "react";
import { getRecords, deleteRecord } from "../api/stegoApi";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function RecordsTable({ refresh }) {
  const [records, setRecords] = useState([]);
  const [imageMap, setImageMap] = useState({});

  const fetchRecords = async () => {
    try {
      const res = await getRecords(0, 10);
      const data = res.data.content;

      setRecords(data);

      // fetch image URL for each record
      data.forEach(async (rec) => {
        try {
          const imgRes = await API.get(`/stego/view/${rec.id}`);
          setImageMap((prev) => ({
            ...prev,
            [rec.id]: imgRes.data,
          }));
        } catch (err) {
          console.log("IMAGE FETCH ERROR:", err);
        }
      });

    } catch (err) {
      console.log(err);
      toast.error("Failed to load records");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecord(id);
      toast.success("Deleted");
      fetchRecords();
    } catch {
      toast.error("Delete failed");
    }
  };

  // DOWNLOAD FUNCTION
  const handleDownload = async (url, id) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `encoded-${id}.png`;

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log("DOWNLOAD ERROR:", err);
      toast.error("Download failed");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [refresh]);

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Your Records</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map((rec) => {
            const imgUrl = imageMap[rec.id];

            return (
              <tr key={rec.id} className="text-center">
                <td>{rec.id}</td>

                <td>
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt="record"
                      className="w-20 h-20 object-cover mx-auto"
                    />
                  ) : (
                    <p>Loading...</p>
                  )}
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleDelete(rec.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleDownload(imgUrl, rec.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Download
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}