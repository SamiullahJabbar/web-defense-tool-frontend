import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../services/Layout'; // Import the Layout component
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProFeature = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({ domain: '', ip_address: '', url: '', email: '' });
  const [message, setMessage] = useState('');
  const [linkedWebsites, setLinkedWebsites] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState({ plan: '', status: '', subscribed_on: '', expires_on: '' });
  const [scanUsageLogs, setScanUsageLogs] = useState([]);
  const [dashboardSummary, setDashboardSummary] = useState({
    total_requests: 0,
    total_anomalies: 0,
    total_blocked_ips: 0,
    today_scans: 0,
  });
  const [automationHistory, setAutomationHistory] = useState([]);
  const [blockedIPs, setBlockedIPs] = useState([]);

  // Clear all data when a new user logs in
  const clearPreviousUserData = () => {
    setLinkedWebsites([]);
    setScanUsageLogs([]);
    setDashboardSummary({
      total_requests: 0,
      total_anomalies: 0,
      total_blocked_ips: 0,
      today_scans: 0,
    });
    setAutomationHistory([]);
    setBlockedIPs([]);
    setFormData({ domain: '', ip_address: '', url: '', email: '' });
    setMessage('');
    setEditIndex(null);
    setShowForm(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/');
      return;
    } else {
      setIsAuthenticated(true);
      clearPreviousUserData(); // Clear previous user's data
    }

    const fetchSubscriptionStatus = async () => {
      try {
        const response = await API.get('subscription/subscription-status/');
        const { plan, status, is_pro, subscribed_on, expires_on } = response?.data || {};
        setSubscriptionDetails({ plan, status, subscribed_on, expires_on });
        if ((is_pro === true) || (plan?.toLowerCase() === 'pro' && status?.toLowerCase() === 'active')) {
          setIsPro(true);
          fetchLinkedWebsites();
          fetchScanUsageLogs();
          fetchDashboardSummary();
          fetchAutomationHistory();
          fetchBlockedIPs();
        }
      } catch (err) {
        console.error("Failed to fetch subscription status:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchLinkedWebsites = async () => {
      try {
        const res = await API.get('subscription/link-website/');
        if (res.data && Array.isArray(res.data.websites)) {
          setLinkedWebsites(res.data.websites);
        }
      } catch (err) {
        console.error("Failed to fetch linked websites:", err);
      }
    };

    const fetchScanUsageLogs = async () => {
      try {
        const res = await API.get('subscription/scan-usage-logs/');
        if (res.data) {
          setScanUsageLogs(Array.isArray(res.data) ? res.data : [res.data]);
        }
      } catch (err) {
        console.error("Failed to fetch scan usage logs:", err);
      }
    };

    const fetchDashboardSummary = async () => {
      try {
        const res = await API.get('subscription/dashboard-summary/');
        if (res.data) {
          setDashboardSummary(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard summary:", err);
      }
    };

    const fetchAutomationHistory = async () => {
      try {
        const res = await API.get('monitor/automation-history/');
        if (res.data && Array.isArray(res.data)) {
          setAutomationHistory(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch automation history:", err);
      }
    };

    const fetchBlockedIPs = async () => {
      try {
        const res = await API.get('monitor/blocked-ips/');
        if (res.data && Array.isArray(res.data)) {
          setBlockedIPs(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch blocked IPs:", err);
      }
    };

    fetchSubscriptionStatus();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex === null && linkedWebsites.length >= 1) {
        setMessage('❌ Only one website can be linked per user.');
        return;
      }

      const endpoint = 'subscription/link-website/';
      const method = editIndex !== null ? 'put' : 'post';

      const response = await API[method](endpoint, formData);
      if (response.status === 200 || response.status === 201) {
        setMessage(editIndex !== null ? '✅ Website updated successfully!' : '✅ Website successfully linked!');
        setFormData({ domain: '', ip_address: '', url: '', email: '' });
        setShowForm(false);
        setEditIndex(null);
        const refresh = await API.get('subscription/link-website/');
        if (refresh.data && Array.isArray(refresh.data.websites)) {
          setLinkedWebsites(refresh.data.websites);
        }
      }
    } catch (err) {
      setMessage('❌ Failed to submit. Please try again.');
    }
  };

  const handleDelete = async (site) => {
    try {
      const response = await API.delete('subscription/link-website/', { data: { domain: site.domain } });
      if (response.status === 200) {
        setMessage('✅ Website deleted successfully.');
        const refresh = await API.get('subscription/link-website/');
        if (refresh.data && Array.isArray(refresh.data.websites)) {
          setLinkedWebsites(refresh.data.websites);
          setShowForm(false);
        }
      }
    } catch (err) {
      setMessage('❌ Failed to delete website.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Clear the token
    clearPreviousUserData(); // Clear all data
    navigate('/'); // Redirect to home page
  };

  if (!isAuthenticated) return null;
  if (isLoading) return <p className="text-center py-5">🔄 Checking access...</p>;

  // Prepare data for the chart
  const chartData = {
    labels: scanUsageLogs.map(log => log.date),
    datasets: [
      {
        label: 'Total Scans Today',
        data: scanUsageLogs.map(log => log.total_scans_today),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Anomalies Detected',
        data: scanUsageLogs.map(log => log.anomalies_detected),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Scan Usage Logs',
      },
    },
  };

  return (
    <Layout>
      <div className="container py-5 flex-grow-1">
        <div className="row">
          <div className="col-lg-9">
            <h2 className="fw-bold text-primary mb-4">🔐 Pro Feature Access</h2>
            {!isPro ? (
              <div className="alert alert-warning text-center">
                🚫 Access Denied: Please choose a Pro plan to unlock this feature.
              </div>
            ) : (
              <>
                {/* 🚀 Dashboard Summary Section */}
                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title text-primary">Total Requests</h5>
                        <p className="card-text fs-4 fw-bold">{dashboardSummary.total_requests}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title text-danger">Total Anomalies</h5>
                        <p className="card-text fs-4 fw-bold">{dashboardSummary.total_anomalies}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title text-warning">Blocked IPs</h5>
                        <p className="card-text fs-4 fw-bold">{dashboardSummary.total_blocked_ips}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title text-success">Today's Scans</h5>
                        <p className="card-text fs-4 fw-bold">{dashboardSummary.today_scans}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 🔗 Linked Websites Section */}
                {linkedWebsites.length > 0 && !showForm ? (
                  <div className="card shadow p-4 mb-4">
                    <h4 className="mb-3">🔗 Linked Website Details</h4>
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Domain</th>
                          <th>IP Address</th>
                          <th>URL</th>
                          <th>Contact Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {linkedWebsites.map((site, index) => (
                          <tr key={index}>
                            <td>{site.domain}</td>
                            <td>{site.ip_address}</td>
                            <td>{site.url}</td>
                            <td>{site.email}</td>
                            <td>
                              <button className="btn btn-sm btn-warning me-2" onClick={() => {
                                setFormData(site);
                                setEditIndex(index);
                                setShowForm(true);
                              }}>Edit</button>
                              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(site)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center mb-4">
                    <button className="btn btn-outline-success" onClick={() => setShowForm(true)}>+ Add Website</button>
                  </div>
                )}

                {showForm && (
                  <div className="card shadow p-4">
                    <h4 className="mb-3">{editIndex !== null ? '✏️ Update Linked Website' : '🔗 Link Your Website'}</h4>
                    <p className="text-muted">{editIndex !== null ? 'Modify website details below:' : 'Add your website to activate full protection.'}</p>
                    {message && <div className="alert alert-info fw-semibold">{message}</div>}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="domain" className="form-label">Domain</label>
                        <input
                          type="text"
                          className="form-control"
                          id="domain"
                          name="domain"
                          value={formData.domain}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="ip_address" className="form-label">IP Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="ip_address"
                          name="ip_address"
                          value={formData.ip_address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="url" className="form-label">URL</label>
                        <input
                          type="text"
                          className="form-control"
                          id="url"
                          name="url"
                          value={formData.url}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Contact Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        {editIndex !== null ? 'Update Website' : 'Add Website'}
                      </button>
                    </form>
                  </div>
                )}

                {/* 📊 Scan Usage Logs */}
                <div className="card shadow p-4 mt-5">
                  <h4 className="mb-3">📊 Scan Usage Logs</h4>
                  {scanUsageLogs.length > 0 ? (
                    <>
                      <Bar data={chartData} options={chartOptions} />
                      <table className="table table-bordered mt-4">
                        <thead className="table-light">
                          <tr>
                            <th>Date</th>
                            <th>IP Address</th>
                            <th>Total Scans Today</th>
                            <th>Anomalies Detected</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scanUsageLogs.map((log, index) => (
                            <tr key={index}>
                              <td>{log.date}</td>
                              <td>{log.ip_address}</td>
                              <td>{log.total_scans_today}</td>
                              <td>{log.anomalies_detected}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  ) : <p>No scan usage logs found.</p>}
                </div>
              </>
            )}
          </div>

          {/* Subscription Status Card */}
          <div className="col-lg-3">
            <div className="card shadow p-4 mb-4">
              <h4 className="mb-3">📅 Subscription Status</h4>
              <div>
                <p><strong>Plan:</strong> {subscriptionDetails.plan}</p>
                <p><strong>Status:</strong> {subscriptionDetails.status}</p>
                <p><strong>Subscribed On:</strong> {subscriptionDetails.subscribed_on}</p>
                <p><strong>Expires On:</strong> {subscriptionDetails.expires_on}</p>
              </div>
            </div>

            {/* 🚀 Automation History Card */}
            <div className="card shadow p-4 mb-4">
              <h4 className="mb-3">🤖 Automation History</h4>
              {automationHistory.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Task Name</th>
                        <th>Status</th>
                        <th>Message</th>
                        <th>Executed At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {automationHistory.map((history, index) => (
                        <tr key={index}>
                          <td>{history.task_name}</td>
                          <td>
                            <span className={`badge ${history.status === 'Success' ? 'bg-success' : 'bg-danger'}`}>
                              {history.status}
                            </span>
                          </td>
                          <td>{history.message}</td>
                          <td>{history.executed_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No automation history found.</p>
              )}
            </div>

            {/* 🚫 Blocked IPs Card */}
            <div className="card shadow p-4">
              <h4 className="mb-3">🚫 Blocked IPs</h4>
              {blockedIPs.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>IP Address</th>
                        <th>Blocked At</th>
                        <th>Block Reason</th>
                        <th>Unblock At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blockedIPs.map((ip, index) => (
                        <tr key={index}>
                          <td>{ip.ip_address}</td>
                          <td>{ip.blocked_at}</td>
                          <td>{ip.block_reason}</td>
                          <td>{ip.unblock_at || 'Permanent'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No blocked IPs found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProFeature;