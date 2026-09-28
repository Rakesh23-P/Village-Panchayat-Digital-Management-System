import React, { useState } from 'react';
import { Search, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

const SchemesPublic = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const demoSchemes = [
    {
      id: 1,
      schemeName: 'Pradhan Mantri Awas Yojana (PMAY-G)',
      description: 'Provides financial housing assistance to poor homeless households for building pucca houses with basic amenities.',
      eligibility: 'Homeless or living in kutcha/dilapidated houses as per SECC 2011 data.',
      benefits: 'Financial grant up to ₹1,20,000 in plain areas and ₹1,30,000 in hilly areas.',
      requiredDocuments: 'Aadhaar Card, Bank Passbook, Job Card, Land documents.',
      applicationProcess: 'Apply online through Gram Panchayat PDO or Citizen Portal.',
      status: 'Active'
    },
    {
      id: 2,
      schemeName: 'MGNREGA Rural Employment Scheme',
      description: 'Guarantees 100 days of wage employment per financial year to adult members of rural households.',
      eligibility: 'All adult residents willing to perform unskilled manual labor.',
      benefits: 'Guaranteed daily wage directly deposited to bank account.',
      requiredDocuments: 'Job Card Application, Aadhaar Card, Passport Photograph.',
      applicationProcess: 'Submit Job Card application at Gram Panchayat Office.',
      status: 'Active'
    },
    {
      id: 3,
      schemeName: 'PM Kisan Samman Nidhi Yojana',
      description: 'Direct income support scheme providing guaranteed financial assistance to small and marginal farmers.',
      eligibility: 'Small and marginal landholder farmer families.',
      benefits: '₹6,000 per year paid in three equal installments of ₹2,000.',
      requiredDocuments: 'Land Ownership Record (RTC/Khata), Aadhaar, Bank Details.',
      applicationProcess: 'Self-registration online or through Panchayat Common Service Center.',
      status: 'Active'
    },
    {
      id: 4,
      schemeName: 'Subsidized Solar Agriculture Pump Scheme',
      description: 'Provides high subsidy for installing solar-powered irrigation pumps for agricultural land.',
      eligibility: 'Farmers having valid agricultural land with water source.',
      benefits: 'Up to 60% government subsidy on solar pump unit.',
      requiredDocuments: 'Electricity bill/NOC, Land Khata Extract, Bank Passbook.',
      applicationProcess: 'Online application with endorsement from Panchayat Agriculture Officer.',
      status: 'Active'
    }
  ];

  const filteredSchemes = demoSchemes.filter(s => 
    s.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="card-gov p-4 mb-4">
        <h2 className="fw-bold text-primary mb-2" style={{ color: '#1b365d' }}>Government Welfare Schemes</h2>
        <p className="text-muted mb-3">Explore active Central and State Government development welfare schemes available in Gram Panchayat.</p>
        
        {/* Search Bar */}
        <div className="row">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white"><Search size={18} /></span>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search scheme by name or key topic..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="col-md-6">
            <div className="card card-gov h-100 p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="fw-bold text-primary m-0">{scheme.schemeName}</h5>
                <span className="badge bg-success">{scheme.status}</span>
              </div>
              <p className="text-muted small mb-3">{scheme.description}</p>
              
              <div className="bg-light p-3 rounded border mb-3 small">
                <div className="mb-2">
                  <strong className="text-dark">Eligibility:</strong> <span className="text-secondary">{scheme.eligibility}</span>
                </div>
                <div className="mb-2">
                  <strong className="text-dark">Benefits:</strong> <span className="text-success fw-medium">{scheme.benefits}</span>
                </div>
                <div className="mb-0">
                  <strong className="text-dark">Required Documents:</strong> <span className="text-secondary">{scheme.requiredDocuments}</span>
                </div>
              </div>

              <div className="mt-auto pt-2 border-top d-flex justify-content-between align-items-center small">
                <span className="text-muted">Process: {scheme.applicationProcess}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemesPublic;
