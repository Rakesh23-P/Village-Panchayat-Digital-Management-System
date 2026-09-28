const express = require('express');
const router = express.Router();
const { getCitizens, getCitizenById, createCitizen, updateCitizen, deleteCitizen } = require('../controllers/citizenController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getCitizens)
  .post(protect, authorize('admin', 'staff'), createCitizen);

router.route('/:id')
  .get(protect, getCitizenById)
  .put(protect, authorize('admin', 'staff'), updateCitizen)
  .delete(protect, authorize('admin'), deleteCitizen);

module.exports = router;
