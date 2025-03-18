import React from 'react';
import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Layout from '../services/Layout'; // Import the Layout component

const Pricing = () => {
  return (
    <Layout>
      <div className="page-wrapper bg-light" style={{ minHeight: '100vh' }}>
        <div className="container py-5">
          {/* Pricing Section */}
          <h2 className="text-center fw-bold mb-5 text-primary" style={{ fontSize: '2.5rem' }}>Choose Your Plan</h2>

          {/* Pricing Cards */}
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="card text-center border-0 shadow-sm p-4 h-100" style={{ backgroundColor: '#f0f4ff', borderRadius: '15px', transition: 'transform 0.3s' }}>
                <h3 className="fw-bold mb-3 text-primary" style={{ fontSize: '1.75rem' }}>Free Plan</h3>
                <p className="text-dark mb-4" style={{ fontSize: '1.1rem' }}>Basic features to explore website risks.</p>
                <ul className="list-group list-group-flush mb-4">
                  <li className="list-group-item bg-transparent text-dark">✔ Basic Website Scan</li>
                  <li className="list-group-item bg-transparent text-muted">❌ Real-time Monitoring</li>
                  <li className="list-group-item bg-transparent text-muted">❌ AI Attack Detection</li>
                  <li className="list-group-item bg-transparent text-muted">❌ Email Alerts</li>
                  <li className="list-group-item bg-transparent text-muted">❌ IP Auto-Blocking</li>
                  <li className="list-group-item bg-transparent text-muted">❌ Traffic Tracking</li>
                </ul>
                <h4 className="fw-bold text-dark mb-4" style={{ fontSize: '1.5rem' }}>$0 /month</h4>
                <button className="btn btn-outline-primary px-4 py-2" style={{ fontSize: '1rem', fontWeight: '600' }}>
                  Get Started
                </button>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card text-center border-0 shadow-sm p-4 h-100" style={{ backgroundColor: '#e9f0fe', borderRadius: '15px', transition: 'transform 0.3s' }}>
                <h3 className="fw-bold mb-3 text-success" style={{ fontSize: '1.75rem' }}>Pro Plan</h3>
                <p className="text-dark mb-4" style={{ fontSize: '1.1rem' }}>Advanced AI-based full protection & analytics.</p>
                <ul className="list-group list-group-flush mb-4">
                  <li className="list-group-item bg-transparent text-dark">✔ Full Website Scanning</li>
                  <li className="list-group-item bg-transparent text-dark">✔ Real-time Monitoring</li>
                  <li className="list-group-item bg-transparent text-dark">✔ AI Attack Detection</li>
                  <li className="list-group-item bg-transparent text-dark">✔ Email Notifications</li>
                  <li className="list-group-item bg-transparent text-dark">✔ IP Auto-Blocking</li>
                  <li className="list-group-item bg-transparent text-dark">✔ Traffic Tracking & Insights</li>
                </ul>
                <h4 className="fw-bold text-dark mb-4" style={{ fontSize: '1.5rem' }}>$14 /month</h4>
                <Link to="/purchase" className="btn btn-success mt-2 px-4">
                  Subscribe Now
                </Link>
              </div>
            </div>
          </div>

          {/* Feature Overview */}
          <h3 className="text-center text-primary fw-bold mb-5" style={{ fontSize: '2rem' }}>Key Features of Web Defense Tool</h3>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 shadow rounded bg-white h-100 text-center" style={{ backgroundColor: '#f7f9fc', borderRadius: '15px', transition: 'transform 0.3s' }}>
                <h5 className="fw-bold text-dark mb-3">AI-Powered Threat Detection</h5>
                <p className="text-muted">Detect unusual activity and potential attacks automatically using machine learning models.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 shadow rounded bg-white h-100 text-center" style={{ backgroundColor: '#f7f9fc', borderRadius: '15px', transition: 'transform 0.3s' }}>
                <h5 className="fw-bold text-dark mb-3">Real-Time Monitoring</h5>
                <p className="text-muted">Track incoming requests and traffic patterns to catch threats instantly.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 shadow rounded bg-white h-100 text-center" style={{ backgroundColor: '#f7f9fc', borderRadius: '15px', transition: 'transform 0.3s' }}>
                <h5 className="fw-bold text-dark mb-3">Smart IP Blocking</h5>
                <p className="text-muted">Automatically block IPs that trigger suspicious activity or brute-force attempts.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 shadow rounded bg-white h-100 text-center" style={{ backgroundColor: '#f7f9fc', borderRadius: '15px', transition: 'transform 0.3s' }}>
                <h5 className="fw-bold text-dark mb-3">Email Alerts</h5>
                <p className="text-muted">Receive real-time email alerts for every threat or unusual activity on your site.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 shadow rounded bg-white h-100 text-center" style={{ backgroundColor: '#f7f9fc', borderRadius: '15px', transition: 'transform 0.3s' }}>
                <h5 className="fw-bold text-dark mb-3">Daily Traffic Reports</h5>
                <p className="text-muted">Analyze daily traffic with detailed analytics to make smarter defense decisions.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 shadow rounded bg-white h-100 text-center" style={{ backgroundColor: '#f7f9fc', borderRadius: '15px', transition: 'transform 0.3s' }}>
                <h5 className="fw-bold text-dark mb-3">Deep Risk Scanning</h5>
                <p className="text-muted">Scan for open ports, DNS issues, and vulnerable points on your domain.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;