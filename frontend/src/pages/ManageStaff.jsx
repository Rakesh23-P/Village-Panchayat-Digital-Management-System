import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardSidebar from '../components/DashboardSidebar';
import { UserCheck, Plus, Mail, Phone, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

const ManageStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: 'password123',
    designation: 'Senior Inspector',
    department: 'Revenue & Certificates'
  });
  const [msg, setMsg] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const fetchStaff = async () => {
    try {
      const res = await axios.get('/api/auth/me'); // Or fetch staff users
      // For academic demonstration, we get users with role 'staff'
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Demo fetch
    setStaffList([
      { id: 1, staffId: 'STF-0001', name: 'Suresh Kumar', email: 'staff1@panchayat.gov.in', mobile: '9876543211', designation: 'Senior Revenue Inspector', department: 'Revenue & Certificates' },
      { id: 2, staffId: 'STF-0002', name: 'Meena Sharma', email: 'staff2@panchayat.gov.in', mobile: '9876543212', designation: 'Grievance Executive', department: 'Civic Complaints' }
    ]);
    setLoading(false);
  }, []);

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    setMsg(null);
    setErrMsg(null);

    try {
      const res = await axios.post('/api/auth/register', {
        ...formData,
        role: 'staff'
      });

      if (res.data.success) {
        setMsg('Staff account created successfully!');
        setStaffList([...staffList, {
          id: Date.now(),
          staffId: `STF-${String(staffList.length + 1).padStart(4, '0')}`,
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          designation: formData.designation,
          department: formData.department
        }]);
        setShowAddForm(false);
      }
    } catch (err) {
      setErrMsg(err.response?.data?.message || 'Failed to create staff account.');
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
                <UserCheck size={22} className="me-2" /> Panchayat Administrative Staff
              </h4>
              <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-gov-primary btn-sm d-flex align-items-center gap-1">
                <Plus size={16} /> {showAddForm ? 'Cancel' : 'Add New Staff Member'}
              </button>
            </div>
          </div>

          {msg && <div className="alert alert-success small mb-3">{msg}</div>}
          {errMsg && <div className="alert alert-danger small mb-3">{errMsg}</div>}

          {/* Add Staff Modal Form */}
          {showAddForm && (
            <div className="card-gov p-4 mb-4 border-start border-4 border-primary">
              <h5 className="fw-bold text-primary mb-3">Add New Staff Account</h5>
              <form onSubmit={handleCreateStaff}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Staff Full Name</label>
                    <input type="text" className="form-control" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Official Email</label>
                    <input type="email" className="form-control" placeholder="staff@panchayat.gov.in" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Mobile Number</label>
                    <input type="tel" className="form-control" placeholder="10-digit mobile" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Initial Password</label>
                    <input type="text" className="form-control" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Designation</label>
                    <input type="text" className="form-control" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Department</label>
                    <input type="text" className="form-control" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} required />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-gov-primary btn-sm">Create Staff Account</button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Staff List Table */}
          <div className="card-gov p-4">
            <div className="table-responsive">
              <table className="table table-bordered table-hover small align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Staff ID</th>
                    <th>Name</th>
                    <th>Designation & Dept</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.map(s => (
                    <tr key={s.id}>
                      <td className="fw-bold">{s.staffId}</td>
                      <td><strong>{s.name}</strong></td>
                      <td>
                        {s.designation}
                        <span className="d-block text-muted small">{s.department}</span>
                      </td>
                      <td>{s.email}</td>
                      <td>{s.mobile}</td>
                      <td><span className="badge bg-success">Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStaff;
