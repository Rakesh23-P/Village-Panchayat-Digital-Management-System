import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import DashboardSidebar from '../components/DashboardSidebar';
import { AlertCircle, ArrowRight } from 'lucide-react';

const StaffDashboard = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cmpRes = await axios.get('/api/complaints');
        if (cmpRes.data.success) setComplaints(cmpRes.data.data);
      } catch (err) {
        console.error('Failed to load staff dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-3">
          <DashboardSidebar />
        </div>

        <div className="col-lg-9">
          <div className="card-gov p-4 mb-4">
            <h3 className="fw-bold text-primary mb-1" style={{ color: '#1b365d' }}>
              Panchayat Executive Staff Portal
            </h3>
            <p className="text-muted mb-0">Welcome {user?.name}! Process assigned civic grievances.</p>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-12">
              <div className="card card-gov p-3 border-start border-4 border-warning">
                <span className="text-muted small">Assigned Complaints</span>
                <h2 className="fw-bold text-warning my-1">{complaints.length}</h2>
                <Link to="/staff/complaints" className="small text-warning text-decoration-none">
                  Process Grievances →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick List */}
          <div className="card-gov p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-primary m-0">Recent Assigned Complaints</h5>
              <Link to="/staff/complaints" className="small text-primary text-decoration-none">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            {loading ? (
              <p className="text-muted small">Loading...</p>
            ) : complaints.length === 0 ? (
              <div className="p-3 bg-light rounded text-center text-muted small">
                No assigned complaints found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover small align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Category</th>
                      <th>Subject</th>
                      <th>Submitted Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.slice(0, 5).map(c => (
                      <tr key={c._id}>
                        <td className="fw-bold">{c.complaintId}</td>
                        <td>{c.category}</td>
                        <td>{c.subject}</td>
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

export default StaffDashboard;
