import React, { useState } from 'react';
import API from '../services/api';
import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignInAlt, FaSpinner } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');

    // Form validation
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await API.post('monitor/login/', {
        username,
        password,
      });

      if (response && response.data) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        navigate('/'); // Redirect to dashboard after successful login
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.detail ||
          'Login failed. Please check your credentials and try again.'
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
          <h3 className="mt-3 fw-bold text-primary">Login to Your Account</h3>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
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

        <div className="form-group mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <FaSpinner className="spinner" /> Logging In...
            </>
          ) : (
            <>
              <FaSignInAlt /> Log In
            </>
          )}
        </button>

        <div className="text-center mt-3">
          <p className="mb-0">
            Don't have an account?{' '}
            <Link to="/register" className="text-decoration-none">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;