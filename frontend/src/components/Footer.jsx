import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const location = useLocation();

  if (location.pathname === '/' || location.pathname === '/register') {
    return null;
  }
  return (
    <footer className="gov-footer">
      <div className="container">
        <div className="row g-4">
          {/* Column 1: About */}
          <div className="col-lg-4 col-md-6">
            <h5>Village Panchayat Digital Portal</h5>
            <p className="small text-slate-300">
              An integrated e-governance platform designed for transparent, fast, and accountable village administration.
            </p>
            <div className="d-flex align-items-center gap-2 mt-3 text-warning small">
              <ShieldCheck size={18} />
              <span>Department of Panchayati Raj & Rural Development</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5>Quick Links</h5>
            <ul className="list-unstyled small mb-0">
              <li className="mb-2"><Link to="/">Home Portal</Link></li>
              <li className="mb-2"><Link to="/about">About Gram Panchayat</Link></li>
              <li className="mb-2"><Link to="/village-info">Village Statistics</Link></li>
              <li className="mb-2"><Link to="/schemes">Government Schemes</Link></li>
              <li className="mb-2"><Link to="/notices">Notice Board</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="col-lg-3 col-md-6">
            <h5>Citizen Services</h5>
            <ul className="list-unstyled small mb-0">
              <li className="mb-2"><Link to="/login">Residence Certificate Request</Link></li>
              <li className="mb-2"><Link to="/login">Income & Caste Certificates</Link></li>
              <li className="mb-2"><Link to="/login">Submit Grievance / Complaint</Link></li>
              <li className="mb-2"><Link to="/login">Track Application Status</Link></li>
              <li className="mb-2"><Link to="/contact">Panchayat Office Directory</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="col-lg-3 col-md-6">
            <h5>Gram Panchayat Secretariat</h5>
            <ul className="list-unstyled small text-slate-300">
              <li className="d-flex gap-2 mb-2">
                <MapPin size={18} className="flex-shrink-0 text-warning" />
                <span>Gram Panchayat Main Office</span>
              </li>
              <li className="d-flex gap-2 mb-2">
                <Phone size={16} className="flex-shrink-0 text-warning" />
                <span> </span>
              </li>
              <li className="d-flex gap-2 mb-2">
                <Mail size={16} className="flex-shrink-0 text-warning" />
                <span> </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="gov-footer-bottom">
          <p className="mb-1">
            © {new Date().getFullYear()} Village Panchayat Digital Management System.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
