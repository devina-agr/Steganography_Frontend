// src/components/DecodeForm.jsx
import { useState } from "react";
import { decodeImage } from "../api/stegoApi";
import toast from "react-hot-toast";

export default function DecodeForm() {
  const [image, setImage] = useState(null);
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const handleDecode = async () => {
    if (!image || !key) {
      return toast.error("All fields required");
    }

    const formData = new FormData();
    formData.append("encodedImage", image);
    formData.append("secretKey", key);

    try {
      const res = await decodeImage(formData);
      setResult(res.data);
      toast.success("Decoded successfully");
    } catch (err) {
      console.log(err);
      toast.error("Decode failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Decode Message</h2>

      {/* Upload Image */}
      <input
        type="file"
        className="mb-3"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {/* Secret Key */}
      <input
        type="text"
        placeholder="Secret Key"
        className="w-full border p-2 mb-3"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={handleDecode}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Decode
      </button>

      {/* Result */}
      {result && (
        <div className="mt-4 p-3 bg-gray-100 border rounded">
          <b>Decoded Message:</b>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}