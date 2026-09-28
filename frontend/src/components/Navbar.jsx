import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, Shield, User, LogIn, UserPlus, Phone, Home as HomeIcon, FileText, Bell, Info, LogOut, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  if (location.pathname === '/' || location.pathname === '/register') {
    return null;
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'staff') return '/staff/dashboard';
    return '/citizen/dashboard';
  };

  return (
    <header className="gov-header-wrapper">
      {/* 1. Top Mini Portal Bar */}
      <div className="top-gov-header">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <span className="me-3">
              <Shield size={14} className="me-1 text-warning" />
              Official Portal of Gram Panchayat Administration
            </span>
            <span className="d-none d-md-inline text-slate-300">
              Department of Panchayat
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="d-none d-sm-inline">
              <Phone size={13} className="me-1" /> 
            </span>
            <span className="badge bg-warning text-dark px-2 py-1">Panchayat Portal System</span>
          </div>
        </div>
      </div>

      {/* 2. Middle Brand Title Banner */}
      <div className="gov-brand-strip">
        <div className="container">
          <div className="brand-container justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded p-2" style={{ width: '48px', height: '48px', backgroundColor: '#1b365d' }}>
                <Building2 size={30} />
              </div>
              <div>
                <h1 className="gov-title-main m-0">Village Panchayat Digital Management System</h1>
                <p className="gov-subtitle m-0">Gram Panchayat Administrative Portal & Citizen Services Gateway</p>
              </div>
            </div>

            {user && (
              <div className="d-none d-md-flex align-items-center gap-2 bg-light p-2 rounded border">
                <User size={20} className="text-primary" />
                <div>
                  <strong className="d-block text-dark small">{user.name}</strong>
                  <span className={`badge ${user.role === 'admin' ? 'bg-danger' : user.role === 'staff' ? 'bg-primary' : 'bg-success'} text-capitalize`}>
                    {user.role} Account
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Main Navigation Links */}
      <nav className="navbar navbar-expand-lg portal-navbar p-0">
        <div className="container">
          <button 
            className="navbar-toggler my-2 bg-white" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#panchayatNavbar"
            aria-controls="panchayatNavbar" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="panchayatNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/')}`} to="/">
                  <HomeIcon size={16} className="me-1" /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/about')}`} to="/about">
                  <Info size={16} className="me-1" /> About Panchayat
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/village-info')}`} to="/village-info">
                  <Building2 size={16} className="me-1" /> Village Information
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/schemes')}`} to="/schemes">
                  <FileText size={16} className="me-1" /> Government Schemes
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/notices')}`} to="/notices">
                  <Bell size={16} className="me-1" /> Public Notices
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/contact')}`} to="/contact">
                  <Phone size={16} className="me-1" /> Contact Us
                </Link>
              </li>
            </ul>

            <div className="d-flex gap-2 py-2 py-lg-0 align-items-center">
              {user ? (
                <>
                  <Link to={getDashboardPath()} className="btn btn-sm btn-warning d-flex align-items-center text-dark fw-semibold">
                    <LayoutDashboard size={15} className="me-1" /> My Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn btn-sm btn-outline-light d-flex align-items-center">
                    <LogOut size={15} className="me-1" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-sm btn-outline-light d-flex align-items-center">
                    <LogIn size={15} className="me-1" /> Login
                  </Link>
                  <Link to="/register" className="btn btn-sm btn-warning d-flex align-items-center text-dark fw-semibold">
                    <UserPlus size={15} className="me-1" /> New Registration
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
