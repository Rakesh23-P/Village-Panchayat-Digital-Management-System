import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DashboardSidebar from '../components/DashboardSidebar';
import { Users, UserCheck, AlertCircle, Award, FileText, Bell, Building2, TrendingUp, CheckCircle2 } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/stats/dashboard');
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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
              Panchayat Administrator Control Panel
            </h3>
            <p className="text-muted mb-0">Overview of Gram Panchayat citizens, staff, grievances, and welfare schemes.</p>
          </div>

          {loading ? (
            <p className="text-muted small">Loading dashboard metrics...</p>
          ) : (
            <>
              {/* Stat Cards Grid */}
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div className="card card-gov p-3 text-center border-start border-4 border-primary">
                    <span className="text-muted small">Registered Citizens</span>
                    <h2 className="fw-bold text-primary my-1">{stats?.totalCitizens || 0}</h2>
                    <Link to="/admin/citizens" className="small text-primary text-decoration-none">Manage Citizens →</Link>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card card-gov p-3 text-center border-start border-4 border-info">
                    <span className="text-muted small">Panchayat Staff</span>
                    <h2 className="fw-bold text-info my-1">{stats?.totalStaff || 0}</h2>
                    <Link to="/admin/staff" className="small text-info text-decoration-none">Manage Staff →</Link>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card card-gov p-3 text-center border-start border-4 border-warning">
                    <span className="text-muted small">Pending </span>
                    <h2 className="fw-bold text-warning my-1">{stats?.complaints?.pending || 0}</h2>
                    <Link to="/admin/complaints" className="small text-warning text-decoration-none">Resolve Complaints →</Link>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card card-gov p-3 text-center border-start border-4 border-success">
                    <span className="text-muted small">Resolved Complaints</span>
                    <h2 className="fw-bold text-success my-1">{stats?.complaints?.resolved || 0}</h2>
                    <span className="text-muted small">Out of {stats?.complaints?.total || 0} total</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-gov p-3 text-center border-start border-4 border-secondary">
                    <span className="text-muted small">Active Welfare Schemes</span>
                    <h2 className="fw-bold text-secondary my-1">{stats?.activeSchemes || 0}</h2>
                    <Link to="/admin/schemes" className="small text-secondary text-decoration-none">Manage Schemes →</Link>
                  </div>
                </div>
              </div>

              {/* Quick Actions Strip */}
              <div className="card-gov p-4 mb-4">
                <h5 className="fw-bold text-primary mb-3">Quick Administrative Actions</h5>
                <div className="d-flex flex-wrap gap-2">
                  <Link to="/admin/staff" className="btn btn-gov-primary btn-sm">Add New Staff</Link>
                  <Link to="/admin/notices" className="btn btn-gov-orange btn-sm">Publish Notice</Link>
                  <Link to="/admin/schemes" className="btn btn-gov-success btn-sm">Add Welfare Scheme</Link>
                  <Link to="/admin/village" className="btn btn-outline-primary btn-sm">Update Village Info</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
