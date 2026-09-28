const User = require('../models/User');
const Citizen = require('../models/Citizen');
const Staff = require('../models/Staff');
const Complaint = require('../models/Complaint');
const GovernmentScheme = require('../models/GovernmentScheme');

// GET /api/stats/dashboard
const getDashboardStats = async (req, res) => {
  try {
    const totalCitizens = await User.countDocuments({ role: 'citizen' });
    const totalStaff = await User.countDocuments({ role: 'staff' });
    
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const inProgressComplaints = await Complaint.countDocuments({ status: 'In Progress' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    const totalComplaints = await Complaint.countDocuments();

    const activeSchemes = await GovernmentScheme.countDocuments({ status: 'Active' });

    res.status(200).json({
      success: true,
      data: {
        totalCitizens,
        totalStaff,
        complaints: {
          pending: pendingComplaints,
          inProgress: inProgressComplaints,
          resolved: resolvedComplaints,
          total: totalComplaints
        },
        activeSchemes
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboardStats };
