import React, { useState } from 'react';
import API from '../services/api';
import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserPlus, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAuth } from '../services/AuthContext'; // ✅ Corrected Import

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ No more "useAuth is not defined" error

  const handleRegister = async () => {
    setError('');
    setSuccess('');

    // Form validation
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await API.post('monitor/register/', {
        username,
        email,
        password,
      });

      if (response && response.data) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.detail ||
          'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="text-center mb-4">
          <img src={logo} alt="Tool Logo" style={{ height: '50px' }} />
          <h3 className="mt-3 fw-bold text-primary">Register Your Account</h3>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}

        <div className="form-group mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a secure password"
              required
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <FaSpinner className="spinner" /> Registering...
            </>
          ) : (
            <>
              <FaUserPlus /> Register
            </>
          )}
        </button>

        <div className="text-center mt-3">
          <p className="mb-0">
            Already have an account?{' '}
            <Link to="/login" className="text-decoration-none">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
