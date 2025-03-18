import React, { useState } from 'react';
import API from '../services/api';
import Layout from '../services/Layout'; // Import the Layout component
import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { FaLink, FaShieldAlt, FaSearch, FaEnvelope, FaEye, FaBan, FaChartLine, FaTools } from 'react-icons/fa';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const response = await API.post('scanner/scan/', { url });
      if (response && response.data) {
        setResult(response.data);
      }
    } catch (err) {
      setError('Failed to scan website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout> {/* Wrap the entire content with the Layout component */}
      <div className="page-wrapper bg-light" style={{ minHeight: '100vh' }}>
        <div className="container py-5">
          {/* Website Scan Section */}
          <div className="card border-0 shadow text-center" style={{ backgroundColor: '#f4efff', borderRadius: '15px' }}>
            <div className="card-body py-5">
              <h2 className="fw-bold text-purple mb-3">Website Vulnerability Scanner</h2>
              <p className="text-secondary mb-4">Paste your website URL below to scan for risks, threats and weak points!</p>
              <div className="input-group justify-content-center w-75 mx-auto">
                <span className="input-group-text bg-white border-0 px-3"><FaLink className="text-secondary" /></span>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your website URL here..."
                  className="form-control border-0 shadow-sm px-4 py-3 rounded-start"
                />
                <button className="btn btn-primary px-4 rounded-end" onClick={handleScan}>Scan Now</button>
              </div>
              {loading && <div className="mt-3 text-primary"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div> <span className="ms-2">Searching for vulnerabilities...</span></div>}
              {error && <p className="text-danger mt-3 fw-semibold">{error}</p>}
            </div>
          </div>

          {/* Scan Result Section */}
          {!loading && result && (
            <div className="card mt-4 shadow-sm border-0 p-4" style={{ backgroundColor: '#eaf4ff' }}>
              <h3 className="mb-3 text-primary">🔍 Scan Result</h3>
              <p><strong>Domain:</strong> {result.domain}</p>
              <p><strong>IP Address:</strong> {result.ip_address}</p>
              <p><strong>Risk Score:</strong> {result.risk_score}</p>

              <h5 className="mt-3">🔓 Open Ports:</h5>
              <ul>{result.open_ports?.map((port, i) => <li key={i}>Port {port}</li>)}</ul>

              <h5 className="mt-3">⚠ Weak Points:</h5>
              <ul>{result.weak_points?.map((point, i) => <li key={i}>{point}</li>)}</ul>

              <h5 className="mt-3">🛡 Defense Suggestions:</h5>
              <ul>{result.defense_suggestions?.map((tip, i) => <li key={i}>{tip}</li>)}</ul>

              <h5 className="mt-3">📑 Domain Info:</h5>
              <pre className="bg-white p-3 rounded shadow-sm" style={{ whiteSpace: 'pre-wrap' }}>{result.domain_info}</pre>
            </div>
          )}

          {/* Pricing Plans */}
          <div className="row mt-5 g-4">
            <div className="col-md-6">
              <div className="card text-center border border-white rounded shadow-sm p-4 h-100" style={{ backgroundColor: '#f0f4ff' }}>
                <h3 className="fw-bold mb-2 text-primary">Free Plan</h3>
                <p className="text-dark mb-3">Basic features to explore website risks.</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item bg-transparent text-dark">✔ Basic Website Scan</li>
                  <li className="list-group-item bg-transparent text-muted">❌ Real-time Monitoring</li>
                  <li className="list-group-item bg-transparent text-muted">❌ AI Attack Detection</li>
                  <li className="list-group-item bg-transparent text-muted">❌ Email Alerts</li>
                  <li className="list-group-item bg-transparent text-muted">❌ IP Auto-Blocking</li>
                  <li className="list-group-item bg-transparent text-muted">❌ Traffic Tracking</li>
                </ul>
                <h4 className="fw-bold text-dark">$0 /month</h4>
                <button className="btn btn-outline-primary mt-2 px-4">Get Started</button>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card text-center border border-white rounded shadow-sm p-4 h-100" style={{ backgroundColor: '#e9f0fe' }}>
                <h3 className="fw-bold mb-2 text-success">Pro Plan</h3>
                <p className="text-dark mb-3">Advanced AI-based full protection & analytics.</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item bg-transparent text-dark">✔ Full Website Scanning</li>
                  <li className="list-group-item bg-transparent text-dark">✔ Real-time Monitoring</li>
                  <li className="list-group-item bg-transparent text-dark">✔ AI Attack Detection</li>
                  <li className="list-group-item bg-transparent text-dark">✔ Email Notifications</li>
                  <li className="list-group-item bg-transparent text-dark">✔ IP Auto-Blocking</li>
                  <li className="list-group-item bg-transparent text-dark">✔ Traffic Tracking & Insights</li>
                </ul>
                <h4 className="fw-bold text-dark">$14 /month</h4>
                <Link to="/purchase" className="btn btn-success mt-2 px-4">
                  Subscribe Now
                </Link>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="row mt-5 text-center">
            <h2 className="fw-bold mb-4">Key Features of Web Defense Tool</h2>
            <div className="col-md-4 mb-4"><FaShieldAlt size={40} className="mb-2 text-primary" /><h5 className="fw-bold">AI-Powered Threat Detection</h5><p>Detect cyber threats in real-time using intelligent anomaly detection models.</p></div>
            <div className="col-md-4 mb-4"><FaSearch size={40} className="mb-2 text-primary" /><h5 className="fw-bold">Deep Website Scanning</h5><p>Scan websites deeply to find open ports, DNS issues, and backend weaknesses.</p></div>
            <div className="col-md-4 mb-4"><FaEnvelope size={40} className="mb-2 text-primary" /><h5 className="fw-bold">Email Alerts</h5><p>Receive daily email alerts about unusual activity and potential security risks.</p></div>
            <div className="col-md-4 mb-4"><FaEye size={40} className="mb-2 text-primary" /><h5 className="fw-bold">Real-Time Monitoring</h5><p>Our tool monitors your website traffic and detects sudden suspicious behavior.</p></div>
            <div className="col-md-4 mb-4"><FaBan size={40} className="mb-2 text-primary" /><h5 className="fw-bold">IP Auto Blocking</h5><p>Automatically block malicious IPs attempting attacks or sending abnormal requests.</p></div>
            <div className="col-md-4 mb-4"><FaChartLine size={40} className="mb-2 text-primary" /><h5 className="fw-bold">Traffic Analytics</h5><p>View comprehensive analytics of traffic, IP trends, and user activity patterns.</p></div>
            <div className="col-md-4 mb-4"><FaTools size={40} className="mb-2 text-primary" /><h5 className="fw-bold">Smart Defense Automation</h5><p>Automated defense response system to reduce attack impact and downtime risk.</p></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;