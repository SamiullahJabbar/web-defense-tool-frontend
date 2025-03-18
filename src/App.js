import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import WebsiteScanner from './pages/WebsiteScanner';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import Home from './pages/Home';
import ProFeature from './pages/ProFeature';
import Purchase from './pages/Purchase';
import SubscriptionCancelled from './pages/SubscriptionCancelled';
import SubscriptionSuccess from './pages/SubscriptionSuccess';
import About_Us from './pages/About_Us';
import paymentPages from './pages/paymentPages';

// Components
import LinkWebsite from './components/LinkWebsiteForm';
import SubscriptionPage from './components/SubscriptionStatusCard';


// Styles
import './styles/global.css';

function App() {
  return (
    <Router>
      {/* Wrap the entire app with AuthProvider */}
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/About_Us" element={<About_Us />} />

          {/* Protected Routes (Require Authentication) */}
          <Route path="/scanner" element={<WebsiteScanner />} />
          <Route path="/link-website" element={<LinkWebsite />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/pro-feature" element={<ProFeature />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/paymentPages" element={<paymentPages />} /> {/* Fixed PaymentPage route */}
          <Route path="/subscription-success" element={<SubscriptionSuccess />} />
          <Route path="/subscription-cancelled" element={<SubscriptionCancelled />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;