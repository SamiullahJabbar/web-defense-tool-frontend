import { useNavigate } from 'react-router-dom';
import API from '../services/api'; // your axios wrapper

const handleSubscription = async () => {
  try {
    // 1. Call backend to create Stripe checkout session
    const response = await API.post('subscription/create-checkout-session/');
    
    if (response && response.data.checkout_url) {
      // 2. Redirect user to Stripe Checkout Page
      window.location.href = response.data.checkout_url;
    } else {
      alert("⚠ Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Failed to initiate subscription. Make sure you're logged in.");
  }
};
