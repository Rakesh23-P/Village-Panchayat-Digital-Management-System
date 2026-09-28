const express = require('express');
const router = express.Router();
const { getVillageInfo, updateVillageInfo } = require('../controllers/villageController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getVillageInfo)
  .put(protect, authorize('admin'), updateVillageInfo);

module.exports = router;
