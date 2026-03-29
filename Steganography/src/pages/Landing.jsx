
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
          Hide Messages Inside Images 🔐
        </h1>

        <p className="text-lg mb-8 text-gray-300">
          Secure steganography platform with encryption, decoding, and admin control.
        </p>

        <Link
          to="/auth"
          className="bg-blue-500 px-6 py-3 rounded text-lg hover:bg-blue-600"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}