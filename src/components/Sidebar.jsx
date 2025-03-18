import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white p-4" style={{ minHeight: '100vh', width: '250px' }}>
      <h4 className="mb-4">🛡 WebDefense</h4>
      <ul className="list-unstyled">
        <li><Link to="/home" className="text-white text-decoration-none d-block mb-2">🏠 Dashboard</Link></li>
        <li><Link to="/pricing" className="text-white text-decoration-none d-block mb-2">💳 Pricing</Link></li>
        <li><Link to="/features" className="text-white text-decoration-none d-block mb-2">🚀 Features</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
