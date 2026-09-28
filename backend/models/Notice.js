const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter notice title']
    },
    description: {
      type: String,
      required: [true, 'Please enter notice description']
    },
    publishDate: {
      type: Date,
      default: Date.now
    },
    expiryDate: {
      type: Date
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notice', NoticeSchema);
