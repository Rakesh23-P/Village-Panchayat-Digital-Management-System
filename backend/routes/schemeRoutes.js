const express = require('express');
const router = express.Router();
const { getSchemes, createScheme, updateScheme, deleteScheme } = require('../controllers/schemeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getSchemes)
  .post(protect, authorize('admin', 'staff'), createScheme);

router.route('/:id')
  .put(protect, authorize('admin', 'staff'), updateScheme)
  .delete(protect, authorize('admin'), deleteScheme);

module.exports = router;
