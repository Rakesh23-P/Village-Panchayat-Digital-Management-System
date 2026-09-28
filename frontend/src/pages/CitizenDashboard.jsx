import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import DashboardSidebar from '../components/DashboardSidebar';
import { AlertCircle, FileText, Bell, PlusCircle, ArrowRight } from 'lucide-react';

const CitizenDashboard = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cmpRes, noticeRes] = await Promise.all([
          axios.get('/api/complaints'),
          axios.get('/api/notices')
        ]);

        if (cmpRes.data.success) setComplaints(cmpRes.data.data);
        if (noticeRes.data.success) setNotices(noticeRes.data.data);
      } catch (err) {
        console.error('Error loading citizen dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container py-4">
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-lg-3">
          <DashboardSidebar />
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          {/* Welcome Card */}
          <div className="card-gov p-4 mb-4" style={{ borderLeft: '5px solid #15803d' }}>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h3 className="fw-bold text-primary mb-1" style={{ color: '#1b365d' }}>
                  Welcome, {user?.name}!
                </h3>
                <p className="text-muted mb-0">
                  Citizen Portal | Gram Panchayat Rampur | {user?.wardNumber || 'Ward 1'}
                </p>
              </div>
              <div>
                <Link to="/citizen/submit-complaint" className="btn btn-gov-orange btn-sm d-flex align-items-center">
                  <AlertCircle size={15} className="me-1" /> Submit Complaint
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="card card-gov p-3 text-center border-start border-4 border-primary">
                <span className="text-muted small">My Complaints</span>
                <h2 className="fw-bold text-primary m-0">{complaints.length}</h2>
                <span className="text-secondary small mt-1">
                  {complaints.filter(c => c.status === 'Pending').length} Pending Resolution
                </span>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card card-gov p-3 text-center border-start border-4 border-warning">
                <span className="text-muted small">Active Notices</span>
                <h2 className="fw-bold text-warning m-0">{notices.length}</h2>
                <span className="text-secondary small mt-1">Gram Sabha Announcements</span>
              </div>
            </div>
          </div>

          {/* Recent Complaint Status */}
          <div className="card-gov p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-primary m-0">Recent Complaint Trackings</h5>
              <Link to="/citizen/my-complaints" className="small text-primary text-decoration-none">
                View All Complaints <ArrowRight size={14} />
              </Link>
            </div>

            {loading ? (
              <p className="text-muted small">Loading complaints...</p>
            ) : complaints.length === 0 ? (
              <div className="p-3 bg-light rounded text-center text-muted small">
                No complaints submitted yet. Click "Submit Complaint" to lodge a civic grievance.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover small">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Subject</th>
                      <th>Category</th>
                      <th>Submitted Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.slice(0, 5).map(c => (
                      <tr key={c._id}>
                        <td className="fw-bold">{c.complaintId}</td>
                        <td>{c.subject}</td>
                        <td>{c.category}</td>
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

export default CitizenDashboard;
