const mongoose = require('mongoose');

const CitizenSchema = new mongoose.Schema(
  {
    citizenId: {
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
      required: [true, 'Please enter citizen full name']
    },
    fatherName: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Male'
    },
    dateOfBirth: {
      type: Date
    },
    mobile: {
      type: String,
      required: [true, 'Please enter mobile number']
    },
    email: {
      type: String,
      required: [true, 'Please enter email address']
    },
    address: {
      type: String,
      required: [true, 'Please enter residential address']
    },
    village: {
      type: String,
      default: 'Rampur'
    },
    wardNumber: {
      type: String,
      required: [true, 'Please select ward number'],
      default: 'Ward 1'
    },
    occupation: {
      type: String,
      default: 'Agriculture / General Resident'
    },
    registrationDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Citizen', CitizenSchema);
