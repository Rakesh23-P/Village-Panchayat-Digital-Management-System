const Notice = require('../models/Notice');

// GET /api/notices (Public)
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({})
      .populate('createdBy', 'name role')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: notices.length, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/notices
const createNotice = async (req, res) => {
  try {
    const notice = await Notice.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json({ success: true, message: 'Notice published successfully', data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/notices/:id
const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }
    res.status(200).json({ success: true, message: 'Notice updated', data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/notices/:id
const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }
    res.status(200).json({ success: true, message: 'Notice deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getNotices, createNotice, updateNotice, deleteNotice };
