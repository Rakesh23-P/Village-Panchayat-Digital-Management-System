import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardSidebar from '../components/DashboardSidebar';
import { AlertCircle, Search, Clock, CheckCircle2, XCircle, MessageSquare } from 'lucide-react';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.complaintId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchTerm.toLowerCase());
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
              <AlertCircle size={22} className="me-2 text-danger" /> My Submitted Grievance Complaints
            </h4>

            {/* Filter controls */}
            <div className="row g-2">
              <div className="col-md-7">
                <div className="input-group">
                  <span className="input-group-text bg-white"><Search size={18} /></span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by Complaint ID, Subject, or Category..."
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

          <div className="card-gov p-4">
            {loading ? (
              <p className="text-muted small">Loading complaints...</p>
            ) : filteredComplaints.length === 0 ? (
              <div className="p-4 bg-light rounded text-center text-muted small">
                No complaints found matching criteria.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover small align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Complaint ID</th>
                      <th>Category</th>
                      <th>Subject</th>
                      <th>Submitted Date</th>
                      <th>Status</th>
                      <th>Official Staff Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map(c => (
                      <tr key={c._id}>
                        <td className="fw-bold">{c.complaintId}</td>
                        <td><span className="badge bg-light text-dark border">{c.category}</span></td>
                        <td>
                          <strong>{c.subject}</strong>
                          <p className="text-muted mb-0 small">{c.description}</p>
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
                        <td>
                          {c.response ? (
                            <div className="p-2 bg-light rounded text-dark small border">
                              <MessageSquare size={13} className="me-1 text-primary" />
                              {c.response}
                            </div>
                          ) : (
                            <span className="text-muted italic">Awaiting staff action</span>
                          )}
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

export default MyComplaints;
