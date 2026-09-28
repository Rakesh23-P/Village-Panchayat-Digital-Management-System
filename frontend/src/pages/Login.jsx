import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail, Shield, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
    role: 'citizen'
  });
  const [localError, setLocalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setIsSubmitting(true);

    const result = await login(formData.emailOrUsername, formData.password, formData.role);
    setIsSubmitting(false);

    if (result && result.success) {
      const userRole = result.user.role;
      if (userRole === 'admin') navigate('/admin/dashboard');
      else if (userRole === 'staff') navigate('/staff/dashboard');
      else navigate('/citizen/dashboard');
    } else {
      setLocalError(result?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card-gov p-4 shadow-sm">
            <div className="text-center mb-4">
              <div className="d-inline-flex p-3 bg-light text-primary rounded-circle mb-2" style={{ color: '#1b365d' }}>
                <Shield size={32} />
              </div>
              <h3 className="fw-bold text-primary" style={{ color: '#1b365d' }}>Portal Login</h3>
              <p className="text-muted small">Sign in to access Citizen, Staff, or Admin Portal</p>
            </div>

            {localError && (
              <div className="alert alert-danger d-flex align-items-center gap-2 small mb-3">
                <AlertCircle size={18} className="flex-shrink-0" />
                <span>{localError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-medium">Select Portal User Role</label>
                <select 
                  className="form-select"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="citizen">Citizen / Villager</option>
                  <option value="staff">Panchayat Staff</option>
                  <option value="admin">Panchayat Administrator</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><Mail size={18} /></span>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Registered Email Address" 
                    value={formData.emailOrUsername}
                    onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label fw-medium mb-0">Password</label>
                  <Link to="/forgot-password" className="text-decoration-none small text-primary">Forgot Password?</Link>
                </div>
                <div className="input-group mt-1">
                  <span className="input-group-text bg-white"><Lock size={18} /></span>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter Password" 
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-gov-primary w-100 py-2 fw-semibold mb-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Logging in...</span>
                ) : (
                  <>
                    <LogIn size={18} className="me-2" /> Sign In
                  </>
                )}
              </button>

              <div className="text-center small border-top pt-3">
                <span className="text-muted">Don't have a villager account? </span>
                <Link to="/register" className="fw-semibold text-primary">Register Here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
