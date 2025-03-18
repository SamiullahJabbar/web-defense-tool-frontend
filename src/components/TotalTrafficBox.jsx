import React, { useEffect, useState } from 'react';
import API from '../services/api';

const TotalTrafficBox = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    API.get('reporting/total-traffic/').then((res) => setTotal(res.data.total_traffic));
  }, []);

  return (
    <div className="card p-3 text-center mt-3">
      <h5>🌐 Total Daily Traffic</h5>
      <h3>{total} Requests</h3>
    </div>
  );
};

export default TotalTrafficBox;
