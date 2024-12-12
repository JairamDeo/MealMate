import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Auth.css';

export default function LogIn() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://mealmate-ffyx.onrender.com/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();

    if (!json.success) {
      alert("Enter Valid Credentials");
    }

    if (json.success) {
      setShowSuccessAnimation(true); // Trigger success animation
      setTimeout(() => {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        navigate("/");
      }, 2000); // Redirect after animation
    }
  };

  const handleonChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };


  return (
    <div className='container mt-5 auth-container'>
      {showSuccessAnimation && (
        <div className="success-animation">
          <img src="/login-success.gif" alt="Login Successful" className="success-gif" />
          <h3>Login Successful!</h3>
        </div>
      )}
      <form onSubmit={handleSubmit} className={`p-4 rounded shadow-lg bg-dark text-light ${showSuccessAnimation ? 'fade-out' : ''}`}>
        <h2 className="text-center mb-4">Log In</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" value={credentials.email} onChange={handleonChange} id="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleonChange} id="password" required />
        </div>
        <button type="submit" className="btn btn-primary w-100 btn-animate">Log In</button>
        <Link to="/signup" className="btn btn-secondary w-100 mt-3 btn-animate">I'm a New User</Link>


        {/* <div>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div> */}
      </form>
    </div>
  );
}
