import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardSidebar from '../components/DashboardSidebar';
import { Bell, Plus, Trash2, Calendar } from 'lucide-react';

const ManageNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    expiryDate: ''
  });

  const fetchNotices = async () => {
    try {
      const res = await axios.get('/api/notices');
      if (res.data.success) {
        setNotices(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load notices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/notices', formData);
      setShowAddForm(false);
      fetchNotices();
    } catch (err) {
      alert('Failed to publish notice.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this public notice announcement?')) {
      try {
        await axios.delete(`/api/notices/${id}`);
        fetchNotices();
      } catch (err) {
        alert('Failed to delete notice.');
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
                <Bell size={22} className="me-2 text-warning" /> Gram Panchayat Notice Board Management
              </h4>
              <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-gov-primary btn-sm d-flex align-items-center gap-1">
                <Plus size={16} /> {showAddForm ? 'Cancel' : 'Publish New Notice'}
              </button>
            </div>
          </div>

          {showAddForm && (
            <div className="card-gov p-4 mb-4 border-start border-4 border-warning">
              <h5 className="fw-bold text-primary mb-3">Publish Official Notice</h5>
              <form onSubmit={handleCreateNotice}>
                <div className="row g-3">
                  <div className="col-md-8">
                    <label className="form-label fw-medium">Notice Title</label>
                    <input type="text" className="form-control" placeholder="Notice Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-medium">Expiry Date</label>
                    <input type="date" className="form-control" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Notice Content</label>
                    <textarea className="form-control" rows="3" placeholder="Provide notice announcement description..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-gov-primary btn-sm">Publish Notice</button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="card-gov p-4">
            {loading ? (
              <p className="text-muted small">Loading notices...</p>
            ) : notices.length === 0 ? (
              <div className="p-4 bg-light rounded text-center text-muted small">
                No active notices posted.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover small align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Notice Title & Content</th>
                      <th>Publish Date</th>
                      <th>Expiry Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notices.map(n => (
                      <tr key={n._id}>
                        <td>
                          <strong className="text-primary">{n.title}</strong>
                          <p className="text-muted m-0 small">{n.description}</p>
                        </td>
                        <td>{new Date(n.publishDate).toLocaleDateString()}</td>
                        <td>{n.expiryDate ? new Date(n.expiryDate).toLocaleDateString() : 'N/A'}</td>
                        <td>
                          <button onClick={() => handleDelete(n._id)} className="btn btn-sm btn-outline-danger p-1">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageNotices;
