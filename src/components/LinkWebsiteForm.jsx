import React, { useState } from 'react';
import API from '../services/api';

const LinkWebsiteForm = () => {
  const [url, setUrl] = useState('');
  const [domain, setDomain] = useState('');
  const [ip, setIp] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');

  const handleLink = () => {
    API.post('subscription/link-website/', { url, domain, ip_address: ip, email }).then((res) => {
      setSuccess('✅ Website linked successfully');
      setUrl(''); setDomain(''); setIp(''); setEmail('');
    });
  };

  return (
    <div className="card p-3">
      <h5>🔗 Link Your Website</h5>
      {success && <p className="text-success">{success}</p>}
      <input className="form-control mb-2" placeholder="Website URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <input className="form-control mb-2" placeholder="Domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
      <input className="form-control mb-2" placeholder="IP Address" value={ip} onChange={(e) => setIp(e.target.value)} />
      <input className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={handleLink}>Link Now</button>
    </div>
  );
};

export default LinkWebsiteForm;
