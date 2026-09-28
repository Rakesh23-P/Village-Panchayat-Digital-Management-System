const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: [true, 'Please enter staff name']
    },
    designation: {
      type: String,
      required: [true, 'Please enter designation']
    },
    department: {
      type: String,
      default: 'Administration & Revenue'
    },
    mobile: {
      type: String,
      required: [true, 'Please enter staff mobile number']
    },
    email: {
      type: String,
      required: [true, 'Please enter staff email']
    },
    joiningDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'On Leave'],
      default: 'Active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Staff', StaffSchema);
