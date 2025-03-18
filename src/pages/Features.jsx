import React from 'react';
import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import featureIcon1 from '../assets/Attack.jpg';
import featureIcon2 from '../assets/Real.jpg';
import featureIcon3 from '../assets/Blocking.jpg';
import featureIcon4 from '../assets/Analytics.webp';
import Layout from '../services/Layout'; // Import the Layout component

const Features = () => {
  return (
    <Layout>
      <div className="bg-light min-vh-100 d-flex flex-column">
        {/* Main Content */}
        <main className="container flex-grow-1 py-5">
          <h2 className="text-center fw-bold mb-5 text-primary" style={{ fontSize: '2.5rem' }}>Explore Our Web Defense Features</h2>

          {/* Feature Block 1 */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <img src={featureIcon1} alt="AI Detection" className="img-fluid rounded shadow-sm" />
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold text-dark mb-4" style={{ fontSize: '1.75rem' }}>AI-Powered Attack Detection</h4>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                Automatically detect and prevent cyberattacks using advanced ML algorithms to protect your website in real-time.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">✔ Behavioral Analysis</li>
                <li className="mb-2">✔ Pattern Matching</li>
                <li className="mb-2">✔ High Accuracy Models</li>
              </ul>
            </div>
          </div>

          {/* Feature Block 2 */}
          <div className="row align-items-center mb-5 flex-md-row-reverse">
            <div className="col-md-6">
              <img src={featureIcon2} alt="Monitoring" className="img-fluid rounded shadow-sm" />
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold text-dark mb-4" style={{ fontSize: '1.75rem' }}>Real-Time Monitoring</h4>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                Continuously monitor incoming traffic and detect any anomalies or suspicious activity.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">✔ Instant Alerts</li>
                <li className="mb-2">✔ Live Traffic Tracking</li>
                <li className="mb-2">✔ Automated Analysis</li>
              </ul>
            </div>
          </div>

          {/* Feature Block 3 */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <img src={featureIcon3} alt="IP Blocking" className="img-fluid rounded shadow-sm" />
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold text-dark mb-4" style={{ fontSize: '1.75rem' }}>Smart IP Auto-Blocking</h4>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                Identify and block harmful IP addresses based on real-time analysis and traffic behavior.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">✔ Temporary Blocking</li>
                <li className="mb-2">✔ Permanent Defense</li>
                <li className="mb-2">✔ IP Location Insights</li>
              </ul>
            </div>
          </div>

          {/* Feature Block 4 */}
          <div className="row align-items-center mb-5 flex-md-row-reverse">
            <div className="col-md-6">
              <img src={featureIcon4} alt="Analytics" className="img-fluid rounded shadow-sm" />
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold text-dark mb-4" style={{ fontSize: '1.75rem' }}>Advanced Risk Analytics</h4>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                Get comprehensive insights into your website's health, potential vulnerabilities, and attack history.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">✔ Daily Traffic Reports</li>
                <li className="mb-2">✔ Weak Point Analysis</li>
                <li className="mb-2">✔ Defense Optimization Tips</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Features;