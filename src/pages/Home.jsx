// 📁 src/pages/Home.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import BlockedIPsChart from '../components/BlockedIPsChart';
import AutomationHistoryTable from '../components/AutomationHistoryTable';
import LinkWebsiteForm from '../components/LinkWebsiteForm';
import ScanUsageChart from '../components/ScanUsageChart';
import DashboardSummaryBox from '../components/DashboardSummaryBox';
import SubscriptionStatusCard from '../components/SubscriptionStatusCard';
import TotalTrafficBox from '../components/TotalTrafficBox';

const Home = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <h2 className="mb-4 text-primary">📊 Dashboard Overview</h2>
        <DashboardSummaryBox />
        <div className="row mt-4">
          <div className="col-md-6"><BlockedIPsChart /></div>
          <div className="col-md-6"><ScanUsageChart /></div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6"><LinkWebsiteForm /></div>
          <div className="col-md-6"><SubscriptionStatusCard /></div>
        </div>
        <div className="row mt-4"><div className="col-12"><AutomationHistoryTable /></div></div>
        <div className="row mt-4"><div className="col-12"><TotalTrafficBox /></div></div>
      </div>
    </div>
  );
};

export default Home;
