const mongoose = require('mongoose');

const GovernmentSchemeSchema = new mongoose.Schema(
  {
    schemeName: {
      type: String,
      required: [true, 'Please enter scheme name'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please enter scheme description']
    },
    eligibility: {
      type: String,
      required: [true, 'Please enter eligibility criteria']
    },
    benefits: {
      type: String,
      required: [true, 'Please enter scheme benefits']
    },
    requiredDocuments: {
      type: String,
      required: [true, 'Please state required documents']
    },
    applicationProcess: {
      type: String,
      required: [true, 'Please describe application process']
    },
    status: {
      type: String,
      enum: ['Active', 'Closed'],
      default: 'Active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('GovernmentScheme', GovernmentSchemeSchema);
