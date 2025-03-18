import React, { useState } from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in initially
  const navigate = useNavigate();

  const footerStyle = {
    background: 'linear-gradient(135deg, #1e0c4d, #0a0433)',
    color: 'white',
    padding: '3rem 0',
    marginTop: '5rem',
  };

  const handleLogout = () => {
    // Perform logout actions (e.g., clear token, session, etc.)
    localStorage.removeItem('token'); // Example: Remove token from localStorage
    setIsLoggedIn(false); // Update login state
    navigate('/'); // Redirect to home page
  };

  return (
    <>
      {/* Header */}
      <header
        className="d-flex justify-content-between align-items-center px-4 py-3 sticky-top"
        style={{ backgroundColor: '#1e0c4d', borderBottom: '2px solid #000' }}
      >
        <div className="d-flex align-items-center gap-3">
          <img src={logo} alt="Tool Logo" style={{ height: '35px' }} />
          <span className="text-white fw-bold fs-5">Web Defense Tool</span>
        </div>
        <nav className="d-flex gap-4 align-items-center">
          <Link to="/" className="text-white text-decoration-none fw-semibold">
            Home
          </Link>
          <Link to="/pro-feature" className="text-white text-decoration-none fw-semibold">
            ProFeature
          </Link>
          <Link to="/pricing" className="text-white text-decoration-none fw-semibold">
            Pricing
          </Link>
          <Link to="/features" className="text-white text-decoration-none fw-semibold">
            Features
          </Link>
          <Link to="/About_Us" className="text-white text-decoration-none fw-semibold">
            About Us
          </Link>

          {/* Conditional rendering for Register/Login or Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline-light btn-sm px-4 fw-semibold rounded-pill"
              aria-label="Logout"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/register" className="btn btn-outline-light btn-sm px-4 fw-semibold rounded-pill">
                Register
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-sm px-4 fw-semibold rounded-pill">
                Log in
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer style={footerStyle}>
        <div className="container">
          <div className="row">
            {/* Quick Links */}
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="text-white text-decoration-none">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="text-white text-decoration-none">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-white text-decoration-none">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/About_Us" className="text-white text-decoration-none">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white text-decoration-none">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold mb-3">Subscribe to Our Newsletter</h5>
              <form>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    aria-label="Email"
                    aria-describedby="subscribe-button"
                  />
                  <button className="btn btn-primary" type="button" id="subscribe-button">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            {/* Social Media Links */}
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold mb-3">Follow Us</h5>
              <div className="d-flex gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                  aria-label="Twitter"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="mailto:support@webdefense.ai"
                  className="text-white text-decoration-none"
                  aria-label="Email"
                >
                  <FaEnvelope size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-4 pt-3 border-top">
            <p className="mb-1">© 2025 Web Defense AI Tool. All rights reserved.</p>
            <p>
              Contact:{' '}
              <a href="mailto:support@webdefense.ai" className="text-white">
                support@webdefense.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;