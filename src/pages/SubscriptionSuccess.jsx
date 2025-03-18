import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';
import Layout from '../services/Layout';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa'; 

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await API.post(
          '/subscription/verify-payment',
          { session_id: sessionId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data.success) {
          throw new Error('Payment verification failed');
        }

        setIsLoading(false);
      } catch (err) {
        setError('Failed to verify payment. Please contact support.');
        console.error('Payment verification error:', err);
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      setError('Invalid session ID.');
    }
  }, [sessionId, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-5">
          <div className="card shadow p-4 text-center">
            <h2 className="fw-bold text-primary mb-4">
              <FaSpinner className="me-2 spin" /> Verifying Payment...
            </h2>
            <p className="text-muted mb-0">
              Please wait while we verify your payment.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container py-5">
          <div className="card shadow p-4 text-center">
            <h2 className="fw-bold text-danger mb-4">Payment Verification Failed</h2>
            <p className="text-muted mb-4">{error}</p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/pricing')}
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg p-4 text-center">
              <div className="text-success mb-4">
                <FaCheckCircle size={64} />
              </div>
              <h2 className="fw-bold text-success mb-4">Payment Successful!</h2>
              <p className="text-muted mb-4">
                Thank you for purchasing the Pro Plan. You now have access to all
                pro features.
              </p>
              <p className="text-muted mb-4">
                Session ID: <code>{sessionId}</code>
              </p>
              <button
                className="btn btn-primary btn-lg px-5"
                onClick={() => navigate('/pro-feature')}
              >
                Go to Pro Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubscriptionSuccess;