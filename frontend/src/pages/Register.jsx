import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AlertCircle, User, Mail, Lock, UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Password and Confirm Password must match.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.fullName,
      email: formData.email,
      mobile: '9876543210', // Default mobile for schema validation
      password: formData.password,
      role: 'admin'
    };

    const result = await register(payload);
    setIsSubmitting(false);

    if (result && result.success) {
      // Ensure user is logged out after registration so they proceed through login flow
      logout();
      navigate('/', { state: { message: 'Registration successful. Please login.' } });
    } else {
      setErrorMsg(result?.message || 'Registration failed. Duplicate email or invalid details.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-9 col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
              <div className="text-center mb-4">
                <h4 className="fw-bold mb-1" style={{ color: '#1b365d' }}>
                  Village Panchayat Digital Management System
                </h4>
                <p className="text-muted small fw-medium m-0">Admin Registration</p>
              </div>

              {errorMsg && (
                <div className="alert alert-danger d-flex align-items-center gap-2 small py-2 px-3 mb-3">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary mb-1">
                    Full Name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted border-end-0">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 bg-light ps-0"
                      placeholder="Admin Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary mb-1">
                    Email / Admin ID
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted border-end-0">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      className="form-control border-start-0 bg-light ps-0"
                      placeholder="admin@panchayat.gov.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary mb-1">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted border-end-0">
                      <Lock size={16} />
                    </span>
                    <input
                      type="password"
                      className="form-control border-start-0 bg-light ps-0"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary mb-1">
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted border-end-0">
                      <Lock size={16} />
                    </span>
                    <input
                      type="password"
                      className="form-control border-start-0 bg-light ps-0"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold mt-2"
                  style={{ backgroundColor: '#1b365d', borderColor: '#1b365d' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </form>

              <div className="mt-3 text-center small">
                <span className="text-muted">Already have an account? </span>
                <Link to="/" className="fw-semibold text-primary text-decoration-none">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
