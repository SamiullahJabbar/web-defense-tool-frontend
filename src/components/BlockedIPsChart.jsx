import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Bar } from 'react-chartjs-2';

const BlockedIPsChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    API.get('reporting/blocked-ips/')
      .then((res) => {
        const labels = res.data.map((entry) => entry.date);
        const values = res.data.map((entry) => entry.count);
        setChartData({
          labels,
          datasets: [{
            label: 'Blocked IPs',
            data: values,
            backgroundColor: '#0d6efd'
          }]
        });
      });
  }, []);

  return (
    <div className="card p-3">
      <h5>📌 Blocked IPs (Daily)</h5>
      <Bar data={chartData} />
    </div>
  );
};

export default BlockedIPsChart;
