import React from 'react';
import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../services/Layout'; // Import the Layout component
import { FaShieldAlt, FaChartLine, FaUsers, FaLightbulb, FaHandshake, FaCogs } from 'react-icons/fa'; // Import icons
import featureIcon1 from '../assets/Mission.jpg';
import featureIcon2 from '../assets/Vision.jpg';
const About_Us = () => {
  return (
    <Layout>
      <div className="bg-light min-vh-100 d-flex flex-column">
        {/* Main Content */}
        <main className="container flex-grow-1 py-5">
          <h2 className="text-center fw-bold mb-5 text-primary" style={{ fontSize: '2.5rem' }}>About Us</h2>

          {/* Mission Section */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
            <img src={featureIcon1} alt="AI Detection" className="img-fluid rounded shadow-sm" />
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold text-dark mb-4" style={{ fontSize: '1.75rem' }}>Our Mission</h4>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                At Web Defense Tool, our mission is to provide cutting-edge cybersecurity solutions that protect businesses and individuals from online threats. We aim to make the internet a safer place by offering advanced tools and technologies that detect, prevent, and mitigate cyberattacks.
              </p>
            </div>
          </div>

          {/* Vision Section */}
          <div className="row align-items-center mb-5 flex-md-row-reverse">
            <div className="col-md-6">
              <img src={featureIcon2} alt="AI Detection" className="img-fluid rounded shadow-sm" />
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold text-dark mb-4" style={{ fontSize: '1.75rem' }}>Our Vision</h4>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                We envision a world where every website is secure, and no one has to worry about cyber threats. By leveraging artificial intelligence and machine learning, we strive to create a future where cybersecurity is accessible, affordable, and effective for everyone.
              </p>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="text-center mb-5">
            <h4 className="fw-bold text-dark mb-4" style={{ fontSize: '1.75rem' }}>Why Choose Us?</h4>
            <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
              We are committed to delivering the best cybersecurity solutions with a focus on innovation, reliability, and customer satisfaction.
            </p>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="p-4 shadow rounded bg-white h-100 text-center" style={{ backgroundColor: '#f7f9fc', borderRadius: '15px', transition: 'transform 0.3s' }}>
                  <FaShieldAlt size={40} className="mb-3 text-primary" />
                  <h5 className="fw-bold text-dark mb-3">Advanced Protection</h5>
                  <p className="text-muted">Our tools provide state-of-the-art protection against all types of cyber threats.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 shadow rounded bg-white h-100 text-center" style={{ backgroundColor: '#f7f9fc', borderRadius: '15px', transition: 'transform 0.3s' }}>
                  <FaChartLine size={40} className="mb-3 text-primary" />
                  <h5 className="fw-bold text-dark mb-3">Real-Time Analytics</h5>
                  <p className="text-muted">Get real-time insights into your website's security and traffic patterns.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 shadow rounded bg-white h-100 text-center" style={{ backgroundColor: '#f7f9fc', borderRadius: '15px', transition: 'transform 0.3s' }}>
                  <FaUsers size={40} className="mb-3 text-primary" />
                  <h5 className="fw-bold text-dark mb-3">Expert Team</h5>
                  <p className="text-muted">Our team of cybersecurity experts is dedicated to keeping your website safe.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center mb-5">
            <h4 className="fw-bold text-dark mb-4" style={{ fontSize: '1.75rem' }}>Our Core Values</h4>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="p-4 shadow rounded bg-white h-100 text-center" style={{ backgroundColor: '#f7f9fc', borderRadius: '15px', transition: 'transform 0.3s' }}>
                  <FaLightbulb size={40} className="mb-3 text-primary" />
                  <h5 className="fw-bold text-dark mb-3">Innovation</h5>
                  <p className="text-muted">We constantly innovate to stay ahead of emerging threats and provide the best solutions.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 shadow rounded bg-white h-100 text-center" style={{ backgroundColor: '#f7f9fc', borderRadius: '15px', transition: 'transform 0.3s' }}>
                  <FaHandshake size={40} className="mb-3 text-primary" />
                  <h5 className="fw-bold text-dark mb-3">Integrity</h5>
                  <p className="text-muted">We are committed to honesty, transparency, and ethical practices in everything we do.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 shadow rounded bg-white h-100 text-center" style={{ backgroundColor: '#f7f9fc', borderRadius: '15px', transition: 'transform 0.3s' }}>
                  <FaCogs size={40} className="mb-3 text-primary" />
                  <h5 className="fw-bold text-dark mb-3">Customer Focus</h5>
                  <p className="text-muted">Our customers are at the heart of everything we do. We strive to exceed their expectations.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default About_Us;