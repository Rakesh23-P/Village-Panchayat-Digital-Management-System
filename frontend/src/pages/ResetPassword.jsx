import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Lock, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    const res = await resetPassword(token, newPassword);
    setIsSubmitting(false);

    if (res && res.success) {
      setSuccessMsg('Your password has been reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } else {
      setErrorMsg(res?.message || 'Password reset failed. Token may be invalid or expired.');
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
              <h3 className="fw-bold text-primary" style={{ color: '#1b365d' }}>Reset Password</h3>
              <p className="text-muted small">Enter your new password below</p>
            </div>

            {errorMsg && (
              <div className="alert alert-danger d-flex align-items-center gap-2 small mb-3">
                <AlertCircle size={18} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="alert alert-success d-flex align-items-center gap-2 small mb-3">
                <CheckCircle2 size={18} className="flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-medium">New Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><Lock size={18} /></span>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Minimum 6 characters" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium">Confirm New Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><Lock size={18} /></span>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Repeat new password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-gov-primary w-100 py-2 fw-semibold mb-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating Password...' : 'Reset Password'}
              </button>

              <div className="text-center small border-top pt-3">
                <Link to="/login" className="text-decoration-none text-primary">Back to Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
