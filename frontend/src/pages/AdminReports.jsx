import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardSidebar from '../components/DashboardSidebar';
import { BarChart3, Printer, Download } from 'lucide-react';

const AdminReports = () => {
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-3 d-print-none">
          <DashboardSidebar />
        </div>

        <div className="col-lg-9">
          <div className="card-gov p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h4 className="fw-bold text-primary m-0" style={{ color: '#1b365d' }}>
                  <BarChart3 size={22} className="me-2" /> Panchayat Administrative Reports
                </h4>
                <p className="text-muted small m-0">Performance summary and service delivery analytics.</p>
              </div>
              <button onClick={handlePrint} className="btn btn-gov-primary btn-sm d-print-none d-flex align-items-center gap-1">
                <Printer size={15} /> Print Summary Report
              </button>
            </div>
          </div>

          <div className="card-gov p-4 bg-white">
            <div className="text-center pb-3 border-bottom mb-4">
              <h4 className="fw-bold text-uppercase m-0">Gram Panchayat Rampur - Performance Report</h4>
            </div>
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="p-3 bg-light rounded border">
                  <h6 className="fw-bold text-primary mb-2">Grievance Redressal Breakdown</h6>
                  <ul className="list-group list-group-flush small">
                    <li className="list-group-item d-flex justify-content-between bg-transparent">
                      <span>Pending Complaints:</span>
                      <strong className="text-warning">{stats?.complaints?.pending || 0}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between bg-transparent">
                      <span>In Progress Complaints:</span>
                      <strong className="text-primary">{stats?.complaints?.inProgress || 0}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between bg-transparent">
                      <span>Resolved Complaints:</span>
                      <strong className="text-success">{stats?.complaints?.resolved || 0}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between bg-transparent fw-bold border-top">
                      <span>Total Grievances Registered:</span>
                      <span>{stats?.complaints?.total || 0}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-3 bg-light rounded border text-muted small">
              <strong>Academic Note:</strong> This report represents empirical data calculated dynamically from the underlying MongoDB database models (`User`, `Complaint`, `CertificateRequest`).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
