import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import WebsiteScanner from './pages/WebsiteScanner';
import LinkWebsite from './components/LinkWebsiteForm';
import SubscriptionPage from './components/SubscriptionStatusCard';
import './styles/global.css'; // 👈 Your main global CSS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scanner" element={<WebsiteScanner />} />
        <Route path="/link-website" element={<LinkWebsite />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
      </Routes>
    </Router>
  );
}

export default App;