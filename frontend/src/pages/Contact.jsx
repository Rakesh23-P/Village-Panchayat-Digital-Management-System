import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container py-4">
      <div className="card-gov p-4 mb-4">
        <h2 className="fw-bold text-primary mb-2" style={{ color: '#1b365d' }}>Contact Gram Panchayat Office</h2>
        <p className="text-muted mb-0">Reach out for official queries, public grievance assistance, or administrative inquiries.</p>
      </div>

      <div className="row g-4">
        <div className="col-md-5">
          <div className="card-gov p-4 h-100">
            <h5 className="fw-bold text-primary mb-3 border-bottom pb-2">Office Directory</h5>
            
            <div className="mb-4 d-flex gap-3">
              <MapPin size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="d-block text-dark">Gram Panchayat Main Office</strong>
                <span className="text-muted small">Panchayat Secretariat Building, Village Rampur, District Sadar, State - 560001</span>
              </div>
            </div>

            <div className="mb-4 d-flex gap-3">
              <Phone size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="d-block text-dark">Telephone Helpline</strong>
                <span className="text-muted small">+91 98765 43210 / 011-23456789</span>
              </div>
            </div>

            <div className="mb-4 d-flex gap-3">
              <Mail size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="d-block text-dark">Official Email</strong>
                <span className="text-muted small">grampanchayat.rampur@gov.in</span>
              </div>
            </div>

            <div className="d-flex gap-3">
              <Clock size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="d-block text-dark">Working Hours</strong>
                <span className="text-muted small">10:00 AM - 5:00 PM (Monday to Saturday)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card-gov p-4">
            <h5 className="fw-bold text-primary mb-3 border-bottom pb-2">Send Message / General Inquiry</h5>
            <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! (Demo Mode)'); }}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-medium">Your Name</label>
                  <input type="text" className="form-control" placeholder="Full Name" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium">Mobile Number</label>
                  <input type="tel" className="form-control" placeholder="10-digit mobile" required />
                </div>
                <div className="col-12">
                  <label className="form-label fw-medium">Email Address</label>
                  <input type="email" className="form-control" placeholder="email@example.com" required />
                </div>
                <div className="col-12">
                  <label className="form-label fw-medium">Subject / Topic</label>
                  <input type="text" className="form-control" placeholder="Inquiry topic" required />
                </div>
                <div className="col-12">
                  <label className="form-label fw-medium">Message Details</label>
                  <textarea className="form-control" rows="4" placeholder="Write your query here..." required></textarea>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-gov-primary w-100 d-flex align-items-center justify-content-center gap-2">
                    <Send size={16} /> Send Inquiry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
