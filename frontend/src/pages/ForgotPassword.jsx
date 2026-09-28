import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Mail, KeyRound, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [resetTokenData, setResetTokenData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { forgotPassword } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrorMsg(null);
    setIsSubmitting(true);

    const res = await forgotPassword(email);
    setIsSubmitting(false);

    if (res && res.success) {
      setMessage(res.message);
      setResetTokenData(res);
    } else {
      setErrorMsg(res?.message || 'Failed to generate reset link.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card-gov p-4 shadow-sm">
            <div className="text-center mb-4">
              <div className="d-inline-flex p-3 bg-light text-primary rounded-circle mb-2" style={{ color: '#1b365d' }}>
                <KeyRound size={32} />
              </div>
              <h3 className="fw-bold text-primary" style={{ color: '#1b365d' }}>Forgot Password</h3>
              <p className="text-muted small">Enter your registered email to receive a password reset token.</p>
            </div>

            {errorMsg && (
              <div className="alert alert-danger d-flex align-items-center gap-2 small mb-3">
                <AlertCircle size={18} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {message && (
              <div className="alert alert-success small mb-3">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                  <strong>{message}</strong>
                </div>
                {resetTokenData && resetTokenData.resetToken && (
                  <div className="bg-white p-3 rounded border mt-2">
                    <span className="text-muted d-block small mb-1">Development / Viva Demo Reset Link:</span>
                    <Link to={`/reset-password/${resetTokenData.resetToken}`} className="btn btn-sm btn-outline-primary w-100 fw-bold">
                      Proceed to Reset Password Page
                    </Link>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-medium">Registered Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><Mail size={18} /></span>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-gov-primary w-100 py-2 fw-semibold mb-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Request...' : 'Generate Reset Token'}
              </button>

              <div className="text-center small border-top pt-3">
                <Link to="/login" className="text-decoration-none text-secondary d-inline-flex align-items-center">
                  <ArrowLeft size={16} className="me-1" /> Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
