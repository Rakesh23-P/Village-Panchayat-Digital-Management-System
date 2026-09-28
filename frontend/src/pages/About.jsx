import React from 'react';
import { Building, ShieldCheck, Target, Award, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="container py-4">
      {/* Page Header */}
      <div className="card-gov p-4 mb-4">
        <h2 className="fw-bold text-primary mb-2" style={{ color: '#1b365d' }}>About Gram Panchayat Administration</h2>
        <p className="text-muted mb-0">
          The Gram Panchayat is the foundational pillar of local self-government in rural India under the 73rd Constitutional Amendment Act.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card-gov p-4 mb-4">
            <h4 className="fw-bold text-primary mb-3">Our Mission & Objectives</h4>
            <p className="text-secondary">
              The primary objective of the **Village Panchayat Digital Management System** is to digitize traditional manual rural administrative procedures, ensuring transparency, eliminating bureaucratic delays, and delivering citizen-centric services directly to villagers' fingertips.
            </p>

            <h5 className="fw-bold mt-4 mb-3">Key Functional Responsibilities</h5>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item d-flex gap-2">
                <CheckCircle size={18} className="text-success flex-shrink-0 mt-1" />
                <span>Issuance of essential statutory certificates (Residence, Income, Caste, Birth & Death).</span>
              </li>
              <li className="list-group-item d-flex gap-2">
                <CheckCircle size={18} className="text-success flex-shrink-0 mt-1" />
                <span>Prompt registration and resolution of village civic complaints (water, roads, sanitation, lighting).</span>
              </li>
              <li className="list-group-item d-flex gap-2">
                <CheckCircle size={18} className="text-success flex-shrink-0 mt-1" />
                <span>Implementation and monitoring of State and Central welfare schemes.</span>
              </li>
              <li className="list-group-item d-flex gap-2">
                <CheckCircle size={18} className="text-success flex-shrink-0 mt-1" />
                <span>Publication of Gram Sabha decisions, notices, and financial transparency records.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card-gov p-4">
            <h5 className="fw-bold text-primary mb-3">Administrative Hierarchy</h5>
            <div className="mb-3 border-bottom pb-2">
              <strong className="d-block text-dark">Gram Sarpanch / President</strong>
              <span className="text-muted small">Elected Head of Gram Panchayat</span>
            </div>
            <div className="mb-3 border-bottom pb-2">
              <strong className="d-block text-dark">Panchayat Development Officer (PDO)</strong>
              <span className="text-muted small">Government Administrative Officer</span>
            </div>
            <div className="mb-3 border-bottom pb-2">
              <strong className="d-block text-dark">Gram Panchayat Executive Staff</strong>
              <span className="text-muted small">Verification & Revenue Processing Staff</span>
            </div>
            <div className="mb-0">
              <strong className="d-block text-dark">Ward Members (Panchs)</strong>
              <span className="text-muted small">Elected Representatives of Wards 1 to 12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
