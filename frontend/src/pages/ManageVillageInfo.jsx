import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardSidebar from '../components/DashboardSidebar';
import { Building2, Save, CheckCircle2 } from 'lucide-react';

const ManageVillageInfo = () => {
  const [formData, setFormData] = useState({
    villageName: '',
    panchayatName: '',
    district: '',
    state: '',
    population: '',
    wards: 12,
    contactNumber: '',
    email: '',
    officeAddress: ''
  });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  const fetchVillage = async () => {
    try {
      const res = await axios.get('/api/village');
      if (res.data.success && res.data.data) {
        setFormData(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load village info:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVillage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await axios.put('/api/village', formData);
      if (res.data.success) {
        setMsg('Gram Panchayat information updated successfully!');
      }
    } catch (err) {
      alert('Failed to update village information.');
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-3">
          <DashboardSidebar />
        </div>

        <div className="col-lg-9">
          <div className="card-gov p-4 shadow-sm">
            <h4 className="fw-bold text-primary mb-3" style={{ color: '#1b365d' }}>
              <Building2 size={22} className="me-2" /> Update Village Demographic Information
            </h4>

            {msg && (
              <div className="alert alert-success d-flex align-items-center gap-2 small mb-3">
                <CheckCircle2 size={18} />
                <span>{msg}</span>
              </div>
            )}

            {loading ? (
              <p className="text-muted small">Loading records...</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Village Name</label>
                    <input type="text" className="form-control" value={formData.villageName} onChange={(e) => setFormData({...formData, villageName: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Gram Panchayat Name</label>
                    <input type="text" className="form-control" value={formData.panchayatName} onChange={(e) => setFormData({...formData, panchayatName: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">District</label>
                    <input type="text" className="form-control" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">State</label>
                    <input type="text" className="form-control" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Total Population</label>
                    <input type="text" className="form-control" value={formData.population} onChange={(e) => setFormData({...formData, population: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Number of Wards</label>
                    <input type="number" className="form-control" value={formData.wards} onChange={(e) => setFormData({...formData, wards: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Helpline Contact Number</label>
                    <input type="text" className="form-control" value={formData.contactNumber} onChange={(e) => setFormData({...formData, contactNumber: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Official Email Address</label>
                    <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Panchayat Secretariat Office Address</label>
                    <textarea className="form-control" rows="2" value={formData.officeAddress} onChange={(e) => setFormData({...formData, officeAddress: e.target.value})} required></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-gov-primary py-2 px-4 fw-semibold d-inline-flex align-items-center gap-2">
                      <Save size={16} /> Save Official Record
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageVillageInfo;
