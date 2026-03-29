// src/components/EncodeForm.jsx
import { useState } from "react";
import { encodeImage } from "../api/stegoApi";
import toast from "react-hot-toast";

export default function EncodeForm({ onSuccess }) {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    console.log("HANDLE SUBMIT CALLED");

    if (!image || !text) {
      return toast.error("All fields required");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("secretText", text);

    try {
      const res = await encodeImage(formData);

      console.log("API RESPONSE:", res);
      console.log("DATA:", res.data);

      setResult(res.data);

      toast.success("Encoded successfully");

      if (onSuccess) onSuccess();

    } catch (err) {
      console.log("ERROR:", err);
      toast.error("Encoding failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Encode Message</h2>

      {/* File Upload */}
      <input
        type="file"
        className="mb-3"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {/* Secret Text */}
      <textarea
        placeholder="Secret text"
        className="w-full border p-2 mb-3"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Encode
      </button>

      {/* RESULT */}
      {result && (
        <div className="mt-4">
          <p><b>Secret Key:</b> {result.secretKey}</p>

          <img
            src={result.encodedImageUrl}
            alt="encoded"
            className="mt-2 w-75 h-64 object-cover border rounded"
            onError={(e) => {
              console.log("IMAGE ERROR:", result.encodedImgUrl);
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        </div>
      )}
    </div>
  );
}