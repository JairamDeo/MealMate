import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Signup() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://mealmate-ffyx.onrender.com/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });
    const json = await response.json();

    if (json.success) {
      setShowSuccessAnimation(true); // Trigger success animation
      setTimeout(() => {
        setcredentials({ name: "", email: "", password: "", geolocation: "" });
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        navigate("/");
      }, 2000); // Redirect after animation
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const handleonChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className='container mt-5 auth-container'>
      {showSuccessAnimation && (
        <div className="success-animation">
          <img src="/signup-success.gif" alt="Signup Successful" className="success-gif" />
          <h3>Signup Successful!</h3>
        </div>
      )}
      <form onSubmit={handleSubmit} className={`p-4 rounded shadow-lg bg-dark text-light ${showSuccessAnimation ? 'fade-out' : ''}`}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={credentials.name} onChange={handleonChange} id="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" value={credentials.email} onChange={handleonChange} id="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleonChange} id="password" required />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={handleonChange} id="address" required />
        </div>
        <button type="submit" className="btn btn-primary w-100 btn-animate">Sign Up</button>
        <Link to="/login" className="btn btn-secondary w-100 mt-3 btn-animate">Already a User</Link>
      </form>
    </div>
  );
}
