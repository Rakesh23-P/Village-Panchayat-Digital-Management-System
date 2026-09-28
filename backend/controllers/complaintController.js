const Complaint = require('../models/Complaint');

// GET /api/complaints
const getComplaints = async (req, res) => {
  try {
    let query = {};

    // Citizens only see their own complaints
    if (req.user.role === 'citizen') {
      query.citizen = req.user._id;
    }

    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.category) {
      query.category = req.query.category;
    }

    const complaints = await Complaint.find(query)
      .populate('citizen', 'name email mobile wardNumber address')
      .populate('assignedStaff', 'name email mobile')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: complaints.length, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/complaints/:id
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('citizen', 'name email mobile wardNumber address')
      .populate('assignedStaff', 'name email mobile');

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }
    res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/complaints
const createComplaint = async (req, res) => {
  try {
    const count = await Complaint.countDocuments();
    const complaintId = `CMP-${String(count + 101).padStart(4, '0')}`;

    const complaint = await Complaint.create({
      complaintId,
      citizen: req.user._id,
      subject: req.body.subject,
      category: req.body.category,
      description: req.body.description
    });

    res.status(201).json({ success: true, message: 'Complaint submitted successfully', data: complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/complaints/:id
const updateComplaint = async (req, res) => {
  try {
    const { status, response, assignedStaff } = req.body;
    let updateFields = {};

    if (status) updateFields.status = status;
    if (response !== undefined) updateFields.response = response;
    if (assignedStaff) updateFields.assignedStaff = assignedStaff;

    const complaint = await Complaint.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true
    }).populate('citizen', 'name email mobile').populate('assignedStaff', 'name email');

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    res.status(200).json({ success: true, message: 'Complaint status updated successfully', data: complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/complaints/:id
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }
    res.status(200).json({ success: true, message: 'Complaint deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getComplaints, getComplaintById, createComplaint, updateComplaint, deleteComplaint };
