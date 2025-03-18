import React, { useEffect, useState } from 'react';
import API from '../services/api';

const AutomationHistoryTable = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get('reporting/automation-history/').then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="card p-3">
      <h5>📝 Automation History</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th><th>Action</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, i) => (
            <tr key={i}><td>{item.date}</td><td>{item.action}</td><td>{item.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AutomationHistoryTable;
