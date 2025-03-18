import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Layout from '../services/Layout';// Import the Layout component

const Purchase = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  // Handle the purchase process
  const handlePurchase = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token'); // Get the access token
      if (!token) {
        navigate('/login'); // Redirect to login if no token is found
        return;
      }

      // Call the API to create a checkout session
      const response = await API.post(
        '/subscription/create-checkout-session', // API endpoint
        {}, // Empty body (if no data is required)
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the access token to the headers
          },
        }
      );

      // Check if the response contains the checkout URL
      if (!response.data?.checkout_url) {
        throw new Error('Checkout URL not found in response');
      }

      const { checkout_url } = response.data;

      // Redirect the user to the Stripe checkout page
      window.location.href = checkout_url;
    } catch (err) {
      // Display a specific error message if available
      setError(
        err.response?.data?.error ||
          'Failed to initiate the payment process. Please try again.'
      );
      console.error('Payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg p-4">
              <h2 className="fw-bold text-primary mb-4 text-center">
                Purchase Pro Plan
              </h2>
              <p className="text-muted mb-4 text-center">
                Unlock all pro features by purchasing the Pro Plan. Click the
                button below to proceed to payment.
              </p>

              {/* Pricing Card */}
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-body text-center">
                  <h3 className="card-title fw-bold text-success">$14.99/month</h3>
                  <p className="card-text text-muted">
                    Includes all premium features:
                  </p>
                  <ul className="list-unstyled text-start mx-auto" style={{ maxWidth: '200px' }}>
                    <li className="mb-2">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Advanced Security
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Priority Support
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Unlimited Access
                    </li>
                  </ul>
                </div>
              </div>

              {error && <div className="alert alert-danger mb-4">{error}</div>}

              <div className="text-center">
                <button
                  className="btn btn-primary btn-lg px-5"
                  onClick={handlePurchase}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    'Purchase Pro Plan'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Purchase;