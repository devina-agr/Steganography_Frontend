// src/api/stegoApi.js
import API from "./axios";

// Encode message
export const encodeImage = async (formData) => {
  return await API.post("/stego/encode", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// Decode message
export const decodeImage = async (formData) => {
  return await API.post("/stego/decode", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Get records (paginated)
export const getRecords = async (page = 0, size = 10) => {
  const res = await API.get(`/stego/records?page=${page}&size=${size}`);
  return res;
};

// View image URL
export const getImageUrl = async (recordId) => {
  const res = await API.get(`/stego/view/${recordId}`);
  return res;
};

// Delete record
export const deleteRecord = async (recordId) => {
  const res = await API.delete(`/stego/${recordId}`);
  return res;
};