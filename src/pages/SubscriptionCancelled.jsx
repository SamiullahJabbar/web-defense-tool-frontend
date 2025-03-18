import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="card shadow p-4 text-center">
        <h2 className="fw-bold text-danger mb-4">Payment Cancelled</h2>
        <p className="text-muted mb-4">
          Your payment was cancelled. You can try again by clicking the button below.
        </p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/purchase')}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCancelled;