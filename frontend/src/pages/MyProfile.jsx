import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import DashboardSidebar from '../components/DashboardSidebar';
import { User, Mail, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-3">
          <DashboardSidebar />
        </div>

        <div className="col-lg-9">
          <div className="card-gov p-4">
            <h4 className="fw-bold text-primary mb-3 border-bottom pb-2" style={{ color: '#1b365d' }}>
              <User size={22} className="me-2" /> Citizen Official Profile
            </h4>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-muted small mb-1">Full Name</label>
                <input type="text" className="form-control bg-light" value={user?.name || ''} readOnly />
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted small mb-1">Registered Email</label>
                <input type="text" className="form-control bg-light" value={user?.email || ''} readOnly />
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted small mb-1">Mobile Number</label>
                <input type="text" className="form-control bg-light" value={user?.mobile || ''} readOnly />
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted small mb-1">Ward Number</label>
                <input type="text" className="form-control bg-light" value={user?.wardNumber || 'Ward 1'} readOnly />
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted small mb-1">Village Panchayat</label>
                <input type="text" className="form-control bg-light" value={user?.village || 'Rampur'} readOnly />
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted small mb-1">Account Role</label>
                <input type="text" className="form-control bg-light text-capitalize" value={user?.role || 'Citizen'} readOnly />
              </div>

              <div className="col-12">
                <label className="form-label text-muted small mb-1">Residential Address</label>
                <textarea className="form-control bg-light" rows="2" value={user?.address || 'Rampur Village'} readOnly></textarea>
              </div>
            </div>

            <div className="p-3 bg-light rounded border mt-4 d-flex align-items-center gap-2 small">
              <ShieldCheck size={20} className="text-success flex-shrink-0" />
              <span className="text-muted">
                Your profile is verified with Gram Panchayat Revenue Department. To update address or mobile number, please visit Panchayat office.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
