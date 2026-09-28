const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      required: true,
      unique: true
    },
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    subject: {
      type: String,
      required: [true, 'Please enter complaint subject']
    },
    category: {
      type: String,
      enum: ['Water', 'Electricity', 'Roads', 'Sanitation', 'Street Lights', 'Drainage', 'Other'],
      required: [true, 'Please select category']
    },
    description: {
      type: String,
      required: [true, 'Please provide detailed description']
    },
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
      default: 'Pending'
    },
    response: {
      type: String,
      default: ''
    },
    assignedStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', ComplaintSchema);
