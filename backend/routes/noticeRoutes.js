const express = require('express');
const router = express.Router();
const { getNotices, createNotice, updateNotice, deleteNotice } = require('../controllers/noticeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getNotices)
  .post(protect, authorize('admin', 'staff'), createNotice);

router.route('/:id')
  .put(protect, authorize('admin', 'staff'), updateNotice)
  .delete(protect, authorize('admin'), deleteNotice);

module.exports = router;
