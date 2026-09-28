const GovernmentScheme = require('../models/GovernmentScheme');

// GET /api/schemes (Publicly accessible)
const getSchemes = async (req, res) => {
  try {
    const schemes = await GovernmentScheme.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: schemes.length, data: schemes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/schemes
const createScheme = async (req, res) => {
  try {
    const scheme = await GovernmentScheme.create(req.body);
    res.status(201).json({ success: true, message: 'Welfare scheme added successfully', data: scheme });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/schemes/:id
const updateScheme = async (req, res) => {
  try {
    const scheme = await GovernmentScheme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Scheme not found' });
    }
    res.status(200).json({ success: true, message: 'Scheme updated successfully', data: scheme });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/schemes/:id
const deleteScheme = async (req, res) => {
  try {
    const scheme = await GovernmentScheme.findByIdAndDelete(req.params.id);
    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Scheme not found' });
    }
    res.status(200).json({ success: true, message: 'Scheme deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSchemes, createScheme, updateScheme, deleteScheme };
