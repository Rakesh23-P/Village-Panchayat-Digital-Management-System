import React from 'react';
import { Bell, Calendar, User, FileText } from 'lucide-react';

const NoticesPublic = () => {
  const demoNotices = [
    {
      id: 1,
      title: 'Gram Sabha General Assembly Body Meeting Notice',
      description: 'All villagers are hereby requested to attend the upcoming Gram Sabha meeting to review annual Panchayat budget allocation and approve beneficiary lists for PMAY housing.',
      publishDate: '2026-09-10',
      expiryDate: '2026-09-25',
      createdBy: 'Panchayat Development Officer (PDO)'
    },
    {
      id: 2,
      title: 'Special Health & Immunization Vaccination Camp',
      description: 'Primary Health Center (PHC) will conduct a free health checkup and pulse polio vaccination drive at Panchayat Community Hall.',
      publishDate: '2026-09-08',
      expiryDate: '2026-09-20',
      createdBy: 'Village Health Worker / Staff'
    },
    {
      id: 3,
      title: 'Property Tax & Water Tariff Payment Deadline Announcement',
      description: 'Citizens are informed to clear their annual village property tax and drinking water supply charges before the end of this month to avoid penalty.',
      publishDate: '2026-09-01',
      expiryDate: '2026-09-30',
      createdBy: 'Panchayat Revenue Staff'
    }
  ];

  return (
    <div className="container py-4">
      <div className="card-gov p-4 mb-4">
        <h2 className="fw-bold text-primary mb-2" style={{ color: '#1b365d' }}>Gram Panchayat Official Notice Board</h2>
        <p className="text-muted mb-0">Public circulars, meeting schedules, statutory announcements, and government orders.</p>
      </div>

      <div className="row g-4">
        {demoNotices.map((notice) => (
          <div key={notice.id} className="col-12">
            <div className="card card-gov p-4">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="fw-bold text-primary m-0 d-flex align-items-center">
                  <Bell size={20} className="me-2 text-warning" />
                  {notice.title}
                </h5>
                <span className="badge bg-primary">Official Announcement</span>
              </div>
              <p className="text-dark my-3">{notice.description}</p>

              <div className="d-flex flex-wrap gap-4 border-top pt-3 small text-muted">
                <div className="d-flex align-items-center gap-1">
                  <Calendar size={15} />
                  <span>Published: {notice.publishDate}</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <Calendar size={15} />
                  <span>Valid Until: {notice.expiryDate}</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <User size={15} />
                  <span>Issued By: {notice.createdBy}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticesPublic;
