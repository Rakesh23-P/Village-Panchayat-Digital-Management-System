import React from 'react';
import { Building2, MapPin, Users, Phone, Mail, FileText, Layers } from 'lucide-react';

const VillageInfoPublic = () => {
  const villageData = {
    villageName: 'Rampur',
    panchayatName: 'Rampur Gram Panchayat',
    district: 'Sadar District',
    state: 'Karnataka',
    population: '4,850',
    wards: 12,
    contactNumber: '+91 98765 43210',
    email: 'grampanchayat.rampur@gov.in',
    officeAddress: 'Gram Panchayat Secretariat Main Road, Rampur Village - 560001'
  };

  return (
    <div className="container py-4">
      <div className="card-gov p-4 mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="p-3 bg-primary text-white rounded">
            <Building2 size={32} />
          </div>
          <div>
            <h2 className="fw-bold text-primary mb-1" style={{ color: '#1b365d' }}>{villageData.panchayatName}</h2>
            <p className="text-muted mb-0">Official Demographic and Governance Profile</p>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Stats Cards */}
        <div className="col-md-6">
          <div className="card-gov p-4 h-100">
            <h5 className="fw-bold text-primary mb-3 border-bottom pb-2">Administrative Particulars</h5>
            <table className="table table-bordered table-hover small">
              <tbody>
                <tr>
                  <th className="bg-light w-40">Village Name:</th>
                  <td>{villageData.villageName}</td>
                </tr>
                <tr>
                  <th className="bg-light">Gram Panchayat:</th>
                  <td>{villageData.panchayatName}</td>
                </tr>
                <tr>
                  <th className="bg-light">District:</th>
                  <td>{villageData.district}</td>
                </tr>
                <tr>
                  <th className="bg-light">State:</th>
                  <td>{villageData.state}</td>
                </tr>
                <tr>
                  <th className="bg-light">Total Wards:</th>
                  <td>{villageData.wards} Electoral Wards</td>
                </tr>
                <tr>
                  <th className="bg-light">Estimated Population:</th>
                  <td>{villageData.population} Residents</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Contact Info */}
        <div className="col-md-6">
          <div className="card-gov p-4 h-100">
            <h5 className="fw-bold text-primary mb-3 border-bottom pb-2">Secretariat & Office Contact</h5>
            <div className="mb-3">
              <label className="text-muted small d-block">Office Address:</label>
              <strong>{villageData.officeAddress}</strong>
            </div>
            <div className="mb-3">
              <label className="text-muted small d-block">Helpline / Phone Number:</label>
              <strong>{villageData.contactNumber}</strong>
            </div>
            <div className="mb-3">
              <label className="text-muted small d-block">Official Email:</label>
              <strong>{villageData.email}</strong>
            </div>
            <div className="p-3 bg-light rounded border text-muted small mt-4">
              <strong className="d-block text-dark mb-1">Public Office Hours:</strong>
              Monday to Saturday: 10:00 AM to 5:00 PM (Closed on Sundays and Public Holidays).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillageInfoPublic;
