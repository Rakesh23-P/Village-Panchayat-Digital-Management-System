import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  AlertCircle, 
  FileText, 
  Bell, 
  Building2, 
  BarChart3, 
  User, 
  LogOut,
  FilePlus
} from 'lucide-react';

const DashboardSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active bg-primary text-white fw-bold' : 'text-dark';

  if (!user) return null;

  return (
    <div className="bg-white border rounded shadow-sm p-3 mb-4">
      {/* User Info Header */}
      <div className="text-center pb-3 mb-3 border-bottom">
        <div className="d-inline-flex p-3 bg-light text-primary rounded-circle mb-2" style={{ color: '#1b365d' }}>
          <User size={28} />
        </div>
        <h6 className="fw-bold text-primary m-0" style={{ color: '#1b365d' }}>{user.name}</h6>
        <span className={`badge mt-1 ${user.role === 'admin' ? 'bg-danger' : user.role === 'staff' ? 'bg-primary' : 'bg-success'} text-capitalize`}>
          {user.role} Account
        </span>
      </div>

      {/* Role Based Navigation Items */}
      <div className="nav flex-column nav-pills gap-1 small">
        {/* ADMIN ROLE */}
        {user.role === 'admin' && (
          <>
            <Link to="/admin/dashboard" className={`nav-link ${isActive('/admin/dashboard')}`}>
              <LayoutDashboard size={16} className="me-2" /> Admin Dashboard
            </Link>
            <Link to="/admin/citizens" className={`nav-link ${isActive('/admin/citizens')}`}>
              <Users size={16} className="me-2" /> Manage Citizens
            </Link>
            <Link to="/admin/staff" className={`nav-link ${isActive('/admin/staff')}`}>
              <UserCheck size={16} className="me-2" /> Manage Staff
            </Link>
            <Link to="/admin/complaints" className={`nav-link ${isActive('/admin/complaints')}`}>
              <AlertCircle size={16} className="me-2" /> Manage Complaints
            </Link>
            <Link to="/admin/schemes" className={`nav-link ${isActive('/admin/schemes')}`}>
              <FileText size={16} className="me-2" /> Manage Schemes
            </Link>
            <Link to="/admin/notices" className={`nav-link ${isActive('/admin/notices')}`}>
              <Bell size={16} className="me-2" /> Manage Notices
            </Link>
            <Link to="/admin/village" className={`nav-link ${isActive('/admin/village')}`}>
              <Building2 size={16} className="me-2" /> Village Information
            </Link>
            <Link to="/admin/reports" className={`nav-link ${isActive('/admin/reports')}`}>
              <BarChart3 size={16} className="me-2" /> Reports & Analytics
            </Link>
          </>
        )}

        {/* STAFF ROLE */}
        {user.role === 'staff' && (
          <>
            <Link to="/staff/dashboard" className={`nav-link ${isActive('/staff/dashboard')}`}>
              <LayoutDashboard size={16} className="me-2" /> Staff Dashboard
            </Link>
            <Link to="/staff/complaints" className={`nav-link ${isActive('/staff/complaints')}`}>
              <AlertCircle size={16} className="me-2" /> Assigned Complaints
            </Link>
            <Link to="/staff/citizens" className={`nav-link ${isActive('/staff/citizens')}`}>
              <Users size={16} className="me-2" /> Citizen Records
            </Link>
          </>
        )}

        {/* CITIZEN ROLE */}
        {user.role === 'citizen' && (
          <>
            <Link to="/citizen/dashboard" className={`nav-link ${isActive('/citizen/dashboard')}`}>
              <LayoutDashboard size={16} className="me-2" /> Citizen Dashboard
            </Link>
            <Link to="/citizen/submit-complaint" className={`nav-link ${isActive('/citizen/submit-complaint')}`}>
              <FilePlus size={16} className="me-2" /> Submit Complaint
            </Link>
            <Link to="/citizen/my-complaints" className={`nav-link ${isActive('/citizen/my-complaints')}`}>
              <AlertCircle size={16} className="me-2" /> My Complaints
            </Link>
            <Link to="/citizen/profile" className={`nav-link ${isActive('/citizen/profile')}`}>
              <User size={16} className="me-2" /> My Profile
            </Link>
          </>
        )}

        <hr className="my-2" />
        <button onClick={logout} className="nav-link text-danger border-0 bg-transparent text-start">
          <LogOut size={16} className="me-2" /> Logout Account
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
