import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";

export default function LogIn() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backendUrl}/api/loginuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();

    if (!json.success) {
      alert("Enter Valid Credentials");
    }

    if (json.success) {
      setShowSuccessAnimation(true);
      setTimeout(() => {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        navigate("/");
      }, 2000);
    }
  };

  const handleonChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-food-auth p-4">
      {showSuccessAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="text-center">
            <img src="/login-success.gif" alt="Success" className="w-36 md:w-40 mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold">Login Successful!</h3>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={`w-full max-w-md bg-black bg-opacity-70 backdrop-blur-md rounded-lg p-6 text-white shadow-lg transition-opacity duration-1000 ${showSuccessAnimation ? 'opacity-0' : 'opacity-100'}`}>
        <h2 className="text-center text-2xl font-bold mb-6">Log In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email address</label>
          <input type="email" name="email" value={credentials.email} onChange={handleonChange} required className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={credentials.password}
            onChange={handleonChange}
            required
            className="w-full px-4 py-2 pr-10 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <span
            className="absolute right-3 top-9 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </span>
        </div>
        <button type="submit" className="w-full py-2 bg-orange-500 hover:bg-orange-600 rounded text-white font-semibold transition">Log In</button>
        <Link to="/signup" className="block w-full text-center mt-3 py-2 bg-gray-700 hover:bg-gray-800 rounded text-white transition">I'm a New User</Link>
        <div className="mt-4 text-center">
          <button className="w-full flex items-center justify-center gap-3 py-2 bg-white text-gray-800 font-medium rounded hover:bg-gray-100 transition">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </form>
    </div>
  );
}
