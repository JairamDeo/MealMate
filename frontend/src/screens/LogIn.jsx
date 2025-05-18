import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";

export default function LogIn() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Load Google API script
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      
      script.onload = () => {
        initializeGoogleButton();
      };
    };
    
    loadGoogleScript();
  }, []);

  const initializeGoogleButton = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        context: 'signin',
        ux_mode: 'popup',
        auto_select: false, // Prevents auto-selection of an account
      });
      
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInDiv'),
        { 
          theme: 'filled_black',
          size: 'large', 
          width: 320, // Fixed pixel width instead of percentage
          text: 'continue_with', // "Continue with Google" instead of "Sign in with Google"
          shape: 'rectangular',
          logo_alignment: 'center'
        }
      );
    }
  };

  const handleGoogleResponse = async (response) => {
    try {
      setError(""); // Clear any previous errors
      
      const googleResponse = await fetch(`${backendUrl}/api/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tokenId: response.credential })
      });
      
      const data = await googleResponse.json();
      
      if (data.success) {
        setShowSuccessAnimation(true);
        setTimeout(() => {
          // Extract email from Google response
          const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
          localStorage.setItem("userEmail", decodedToken.email);
          localStorage.setItem("authToken", data.authToken);
          navigate("/");
        }, 2000);
      } else {
        setError(data.error || "Google login failed. Please try again.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      setError("An error occurred during Google login");
    }
  };

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    
    try {
      const response = await fetch(`${backendUrl}/api/loginuser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });

      const json = await response.json();

      if (!json.success) {
        setError("Invalid email or password. Please try again.");
        return;
      }

      if (json.success) {
        setShowSuccessAnimation(true);
        setTimeout(() => {
          localStorage.setItem("userEmail", credentials.email);
          localStorage.setItem("authToken", json.authToken);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
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
        
        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-70 rounded text-white text-sm">
            {error}
          </div>
        )}
        
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
          <div className="flex justify-center">
            <div id="googleSignInDiv"></div>
          </div>
        </div>
      </form>
    </div>
  );
}