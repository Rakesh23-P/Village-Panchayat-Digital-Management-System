import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardSidebar from '../components/DashboardSidebar';
import { Users, Search, Trash2, Phone, Mail, MapPin } from 'lucide-react';

const ManageCitizens = () => {
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [wardFilter, setWardFilter] = useState('');

  const fetchCitizens = async () => {
    try {
      const res = await axios.get(`/api/citizens?search=${search}&wardNumber=${wardFilter}`);
      if (res.data.success) {
        setCitizens(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load citizens:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitizens();
  }, [search, wardFilter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this citizen record?')) {
      try {
        await axios.delete(`/api/citizens/${id}`);
        fetchCitizens();
      } catch (err) {
        alert('Failed to delete citizen record.');
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-3">
          <DashboardSidebar />
        </div>

        <div className="col-lg-9">
          <div className="card-gov p-4 mb-4">
            <h4 className="fw-bold text-primary mb-3" style={{ color: '#1b365d' }}>
              <Users size={22} className="me-2" /> Registered Villagers & Citizens
            </h4>

            {/* Filter Search */}
            <div className="row g-2">
              <div className="col-md-7">
                <div className="input-group">
                  <span className="input-group-text bg-white"><Search size={18} /></span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by name, email, mobile, or ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <select 
                  className="form-select" 
                  value={wardFilter}
                  onChange={(e) => setWardFilter(e.target.value)}
                >
                  <option value="">All Wards</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={`Ward ${i + 1}`}>Ward No. {i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="card-gov p-4">
            {loading ? (
              <p className="text-muted small">Loading citizen directory...</p>
            ) : citizens.length === 0 ? (
              <div className="p-4 bg-light rounded text-center text-muted small">
                No citizens found matching search parameters.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover small align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Citizen ID</th>
                      <th>Name & Occupation</th>
                      <th>Ward</th>
                      <th>Contact Info</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citizens.map(c => (
                      <tr key={c._id}>
                        <td className="fw-bold">{c.citizenId}</td>
                        <td>
                          <strong>{c.name}</strong>
                          <span className="d-block text-muted small">{c.occupation || 'Resident'}</span>
                        </td>
                        <td><span className="badge bg-light text-dark border">{c.wardNumber}</span></td>
                        <td>
                          <div><Phone size={12} className="me-1 text-primary" />{c.mobile}</div>
                          <div><Mail size={12} className="me-1 text-secondary" />{c.email}</div>
                        </td>
                        <td className="small text-muted">{c.address}</td>
                        <td>
                          <button onClick={() => handleDelete(c._id)} className="btn btn-sm btn-outline-danger p-1">
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCitizens;
