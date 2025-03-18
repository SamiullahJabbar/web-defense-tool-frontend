import React, { useEffect, useState } from 'react';
import API from '../services/api';

const SubscriptionStatusCard = () => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    API.get('subscription/status/').then((res) => {
      setStatus(res.data.subscription_status);
    });
  }, []);

  return (
    <div className="card text-center p-4">
      <h5>Subscription Status</h5>
      <h4 className={status === 'Pro' ? 'text-success' : 'text-danger'}>{status}</h4>
    </div>
  );
};

export default SubscriptionStatusCard;
