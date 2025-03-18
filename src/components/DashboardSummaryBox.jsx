import React, { useEffect, useState } from 'react';
import API from '../services/api';

const DashboardSummaryBox = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    API.get('reporting/dashboard-summary/').then((res) => setSummary(res.data));
  }, []);

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="card bg-primary text-white p-3">
          <h6>Total Scans</h6><h4>{summary.total_scans}</h4>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card bg-success text-white p-3">
          <h6>Blocked IPs</h6><h4>{summary.blocked_ips}</h4>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card bg-warning text-dark p-3">
          <h6>Linked Websites</h6><h4>{summary.linked_websites}</h4>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card bg-dark text-white p-3">
          <h6>Subscription Status</h6><h4>{summary.subscription}</h4>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummaryBox;
