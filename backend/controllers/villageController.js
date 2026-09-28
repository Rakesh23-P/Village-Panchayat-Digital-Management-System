const VillageInformation = require('../models/VillageInformation');

// GET /api/village
const getVillageInfo = async (req, res) => {
  try {
    let info = await VillageInformation.findOne({});
    if (!info) {
      info = await VillageInformation.create({
        villageName: 'Rampur',
        panchayatName: 'Rampur Gram Panchayat',
        district: 'Sadar District',
        state: 'Karnataka',
        population: '4,850',
        wards: 12,
        contactNumber: '+91 98765 43210',
        email: 'grampanchayat.rampur@gov.in',
        officeAddress: 'Gram Panchayat Secretariat Main Road, Rampur Village - 560001'
      });
    }
    res.status(200).json({ success: true, data: info });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/village
const updateVillageInfo = async (req, res) => {
  try {
    let info = await VillageInformation.findOne({});
    if (!info) {
      info = await VillageInformation.create(req.body);
    } else {
      info = await VillageInformation.findByIdAndUpdate(info._id, req.body, { new: true, runValidators: true });
    }
    res.status(200).json({ success: true, message: 'Village information updated successfully', data: info });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getVillageInfo, updateVillageInfo };
