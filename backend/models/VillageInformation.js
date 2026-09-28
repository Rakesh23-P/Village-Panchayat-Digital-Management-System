const mongoose = require('mongoose');

const VillageInformationSchema = new mongoose.Schema(
  {
    villageName: {
      type: String,
      default: 'Rampur'
    },
    panchayatName: {
      type: String,
      default: 'Rampur Gram Panchayat'
    },
    district: {
      type: String,
      default: 'Sadar District'
    },
    state: {
      type: String,
      default: 'Karnataka'
    },
    population: {
      type: String,
      default: '4,850'
    },
    wards: {
      type: Number,
      default: 12
    },
    contactNumber: {
      type: String,
      default: '+91 98765 43210'
    },
    email: {
      type: String,
      default: 'grampanchayat.rampur@gov.in'
    },
    officeAddress: {
      type: String,
      default: 'Gram Panchayat Secretariat Main Road, Rampur Village - 560001'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('VillageInformation', VillageInformationSchema);
