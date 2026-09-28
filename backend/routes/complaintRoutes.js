const express = require('express');
const router = express.Router();
const { getComplaints, getComplaintById, createComplaint, updateComplaint, deleteComplaint } = require('../controllers/complaintController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getComplaints)
  .post(protect, createComplaint);

router.route('/:id')
  .get(protect, getComplaintById)
  .put(protect, authorize('admin', 'staff'), updateComplaint)
  .delete(protect, authorize('admin'), deleteComplaint);

module.exports = router;
