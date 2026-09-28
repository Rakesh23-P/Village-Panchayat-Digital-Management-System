import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardSidebar from '../components/DashboardSidebar';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';

const SubmitComplaint = () => {
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Water',
    description: ''
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!formData.subject.trim() || !formData.description.trim()) {
      setErrorMsg('Please enter complaint subject and detailed description.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post('/api/complaints', formData);
      if (res.data && res.data.success) {
        setSuccessMsg('Grievance complaint submitted successfully!');
        setTimeout(() => {
          navigate('/citizen/my-complaints');
        }, 1500);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to submit complaint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-3">
          <DashboardSidebar />
        </div>

        <div className="col-lg-9">
          <div className="card-gov p-4 shadow-sm">
            <h4 className="fw-bold text-primary mb-2" style={{ color: '#1b365d' }}>
              <AlertCircle size={22} className="me-2 text-danger" /> Lodge Civic Grievance Complaint
            </h4>
            <p className="text-muted small mb-4">
              Submit civic issue complaints directly to Gram Panchayat staff. You will receive an official Complaint Reference ID to track resolution progress.
            </p>

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
                <label className="form-label fw-semibold">Complaint Category</label>
                <select 
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Water">Water Supply Issue</option>
                  <option value="Electricity">Electricity & Power Supply</option>
                  <option value="Roads">Road Maintenance & Potholes</option>
                  <option value="Sanitation">Sanitation & Garbage Disposal</option>
                  <option value="Street Lights">Street Lights Repair</option>
                  <option value="Drainage">Drainage & Sewage Overflow</option>
                  <option value="Other">Other Village Issue</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Complaint Subject</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Broken water pipe near Main Street Ward 2"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Detailed Description</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  placeholder="Provide complete details including location landmark and duration of the problem..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-gov-primary py-2 px-4 fw-semibold d-inline-flex align-items-center gap-2"
                disabled={isSubmitting}
              >
                <Send size={16} /> {isSubmitting ? 'Lodging Complaint...' : 'Submit Complaint'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
