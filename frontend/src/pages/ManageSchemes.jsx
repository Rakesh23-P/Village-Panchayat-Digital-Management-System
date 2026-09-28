import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardSidebar from '../components/DashboardSidebar';
import { FileText, Plus, Trash2, Edit3, CheckCircle2 } from 'lucide-react';

const ManageSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    schemeName: '',
    description: '',
    eligibility: '',
    benefits: '',
    requiredDocuments: '',
    applicationProcess: '',
    status: 'Active'
  });

  const fetchSchemes = async () => {
    try {
      const res = await axios.get('/api/schemes');
      if (res.data.success) {
        setSchemes(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load schemes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const handleCreateScheme = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/schemes', formData);
      setShowAddForm(false);
      fetchSchemes();
    } catch (err) {
      alert('Failed to add scheme.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this welfare scheme record?')) {
      try {
        await axios.delete(`/api/schemes/${id}`);
        fetchSchemes();
      } catch (err) {
        alert('Failed to delete scheme.');
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-3">
          <DashboardSidebar />
        </div>

        <div className="col-lg-9">
          <div className="card-gov p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <h4 className="fw-bold text-primary m-0" style={{ color: '#1b365d' }}>
                <FileText size={22} className="me-2" /> Government Welfare Schemes
              </h4>
              <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-gov-primary btn-sm d-flex align-items-center gap-1">
                <Plus size={16} /> {showAddForm ? 'Cancel' : 'Add New Scheme'}
              </button>
            </div>
          </div>

          {showAddForm && (
            <div className="card-gov p-4 mb-4 border-start border-4 border-success">
              <h5 className="fw-bold text-primary mb-3">Add New Welfare Scheme</h5>
              <form onSubmit={handleCreateScheme}>
                <div className="row g-3">
                  <div className="col-md-8">
                    <label className="form-label fw-medium">Scheme Name</label>
                    <input type="text" className="form-control" placeholder="Scheme Name" value={formData.schemeName} onChange={(e) => setFormData({...formData, schemeName: e.target.value})} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-medium">Status</label>
                    <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Description</label>
                    <textarea className="form-control" rows="2" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Eligibility Criteria</label>
                    <input type="text" className="form-control" value={formData.eligibility} onChange={(e) => setFormData({...formData, eligibility: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Benefits Provided</label>
                    <input type="text" className="form-control" value={formData.benefits} onChange={(e) => setFormData({...formData, benefits: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Required Documents</label>
                    <input type="text" className="form-control" value={formData.requiredDocuments} onChange={(e) => setFormData({...formData, requiredDocuments: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Application Process</label>
                    <input type="text" className="form-control" value={formData.applicationProcess} onChange={(e) => setFormData({...formData, applicationProcess: e.target.value})} required />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-gov-success btn-sm">Save & Publish Scheme</button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="card-gov p-4">
            {loading ? (
              <p className="text-muted small">Loading schemes...</p>
            ) : schemes.length === 0 ? (
              <div className="p-4 bg-light rounded text-center text-muted small">
                No welfare schemes registered.
              </div>
            ) : (
              <div className="row g-3">
                {schemes.map(s => (
                  <div key={s._id} className="col-md-6">
                    <div className="card card-gov h-100 p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold text-primary m-0">{s.schemeName}</h6>
                        <button onClick={() => handleDelete(s._id)} className="btn btn-sm btn-outline-danger p-1">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-muted small mb-2">{s.description}</p>
                      <div className="bg-light p-2 rounded small text-secondary">
                        <div><strong>Benefits:</strong> {s.benefits}</div>
                        <div><strong>Eligibility:</strong> {s.eligibility}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSchemes;
