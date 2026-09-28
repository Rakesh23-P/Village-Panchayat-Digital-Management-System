import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AlertCircle, CheckCircle2, Lock, Mail } from 'lucide-react';

const Home = () => {
  const { user, login, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(location.state?.message || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If authenticated admin opens /, redirect to /admin/dashboard
  useEffect(() => {
    if (!loading && user && user.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    const result = await login(email, password, 'admin');
    setIsSubmitting(false);

    if (result && result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setErrorMsg('Access denied. Only Panchayat Administrators can log in here.');
      }
    } else {
      setErrorMsg(result?.message || 'Invalid email or password');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-9 col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
              <div className="text-center mb-4">
                <h4 className="fw-bold mb-1" style={{ color: '#1b365d' }}>
                  Village Panchayat Digital Management System
                </h4>
                <p className="text-muted small fw-medium m-0">Admin Login</p>
              </div>

              {successMsg && (
                <div className="alert alert-success d-flex align-items-center gap-2 small py-2 px-3 mb-3">
                  <CheckCircle2 size={16} className="flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="alert alert-danger d-flex align-items-center gap-2 small py-2 px-3 mb-3">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label small fw-semibold text-secondary mb-0">
                      Password
                    </label>
                    <Link to="/forgot-password" className="small text-primary text-decoration-none">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted border-end-0">
                      <Lock size={16} />
                    </span>
                    <input
                      type="password"
                      className="form-control border-start-0 bg-light ps-0"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  {isSubmitting ? 'Logging in...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-3 text-center small">
                <span className="text-muted">Don't have an admin account? </span>
                <Link to="/register" className="fw-semibold text-primary text-decoration-none">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
