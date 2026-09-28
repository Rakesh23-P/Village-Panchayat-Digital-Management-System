import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardSidebar from '../components/DashboardSidebar';
import { AlertCircle, Search, CheckCircle2, MessageSquare, Edit3 } from 'lucide-react';

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('In Progress');
  const [updateResponse, setUpdateResponse] = useState('');

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('/api/complaints');
      if (res.data.success) {
        setComplaints(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/complaints/${editingComplaint._id}`, {
        status: updateStatus,
        response: updateResponse
      });
      setEditingComplaint(null);
      fetchComplaints();
    } catch (err) {
      alert('Failed to update complaint status.');
    }
  };

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.complaintId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.citizen?.name && c.citizen.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter ? c.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-3">
          <DashboardSidebar />
        </div>

        <div className="col-lg-9">
          <div className="card-gov p-4 mb-4">
            <h4 className="fw-bold text-primary mb-3" style={{ color: '#1b365d' }}>
              <AlertCircle size={22} className="me-2 text-danger" /> Manage Civic Complaints & Grievances
            </h4>

            {/* Filter Search */}
            <div className="row g-2">
              <div className="col-md-7">
                <div className="input-group">
                  <span className="input-group-text bg-white"><Search size={18} /></span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by ID, citizen name, or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <select 
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Edit Modal / Inline Panel */}
          {editingComplaint && (
            <div className="card-gov p-4 mb-4 border-start border-4 border-warning">
              <h5 className="fw-bold text-primary mb-3">
                Update Complaint #{editingComplaint.complaintId}
              </h5>
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label fw-medium">Update Status</label>
                  <select 
                    className="form-select"
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-medium">Panchayat Official Response</label>
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Enter official action details taken or resolution note..."
                    value={updateResponse}
                    onChange={(e) => setUpdateResponse(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-gov-success btn-sm">Save Resolution</button>
                  <button type="button" onClick={() => setEditingComplaint(null)} className="btn btn-secondary btn-sm">Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className="card-gov p-4">
            {loading ? (
              <p className="text-muted small">Loading complaints...</p>
            ) : filteredComplaints.length === 0 ? (
              <div className="p-4 bg-light rounded text-center text-muted small">
                No complaints found matching filter criteria.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover small align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Citizen</th>
                      <th>Category & Subject</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Response</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map(c => (
                      <tr key={c._id}>
                        <td className="fw-bold">{c.complaintId}</td>
                        <td>
                          <strong>{c.citizen?.name || 'Villager'}</strong>
                          <span className="d-block text-muted small">{c.citizen?.wardNumber || 'Ward'}</span>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border mb-1">{c.category}</span>
                          <strong className="d-block text-dark">{c.subject}</strong>
                          <span className="text-muted small">{c.description}</span>
                        </td>
                        <td>{new Date(c.date).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${
                            c.status === 'Resolved' ? 'bg-success' :
                            c.status === 'In Progress' ? 'bg-primary' :
                            c.status === 'Rejected' ? 'bg-danger' : 'bg-warning text-dark'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="small">{c.response || '—'}</td>
                        <td>
                          <button 
                            onClick={() => {
                              setEditingComplaint(c);
                              setUpdateStatus(c.status);
                              setUpdateResponse(c.response || '');
                            }}
                            className="btn btn-sm btn-outline-primary p-1"
                          >
                            <Edit3 size={15} /> Resolve
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

export default ManageComplaints;
