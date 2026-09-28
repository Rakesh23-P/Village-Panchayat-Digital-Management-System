const Citizen = require('../models/Citizen');
const User = require('../models/User');

// GET /api/citizens
const getCitizens = async (req, res) => {
  try {
    const { search, wardNumber } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { citizenId: { $regex: search, $options: 'i' } }
      ];
    }

    if (wardNumber) {
      query.wardNumber = wardNumber;
    }

    const citizens = await Citizen.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: citizens.length, data: citizens });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/citizens/:id
const getCitizenById = async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.params.id);
    if (!citizen) {
      return res.status(404).json({ success: false, message: 'Citizen record not found' });
    }
    res.status(200).json({ success: true, data: citizen });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/citizens
const createCitizen = async (req, res) => {
  try {
    const count = await Citizen.countDocuments();
    const citizenId = `CIT-${String(count + 101).padStart(4, '0')}`;

    const citizen = await Citizen.create({
      ...req.body,
      citizenId
    });

    res.status(201).json({ success: true, message: 'Citizen record created successfully', data: citizen });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/citizens/:id
const updateCitizen = async (req, res) => {
  try {
    const citizen = await Citizen.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!citizen) {
      return res.status(404).json({ success: false, message: 'Citizen record not found' });
    }
    res.status(200).json({ success: true, message: 'Citizen updated successfully', data: citizen });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/citizens/:id
const deleteCitizen = async (req, res) => {
  try {
    const citizen = await Citizen.findByIdAndDelete(req.params.id);
    if (!citizen) {
      return res.status(404).json({ success: false, message: 'Citizen record not found' });
    }
    res.status(200).json({ success: true, message: 'Citizen record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCitizens, getCitizenById, createCitizen, updateCitizen, deleteCitizen };
