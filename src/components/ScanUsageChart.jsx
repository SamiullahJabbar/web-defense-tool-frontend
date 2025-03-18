import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Line } from 'react-chartjs-2';

const ScanUsageChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    API.get('reporting/scan-usage-logs/').then((res) => {
      const labels = res.data.map(entry => entry.date);
      const counts = res.data.map(entry => entry.count);
      setChartData({
        labels,
        datasets: [{
          label: 'Scan Usage Logs',
          data: counts,
          fill: true,
          borderColor: '#198754',
          backgroundColor: 'rgba(25, 135, 84, 0.3)'
        }]
      });
    });
  }, []);

  return (
    <div className="card p-3">
      <h5>📈 Scan Usage Logs</h5>
      <Line data={chartData} />
    </div>
  );
};

export default ScanUsageChart;
