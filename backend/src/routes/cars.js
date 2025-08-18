const express = require('express');
const {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getCars).post(protect, createCar);
router
  .route('/:id')
  .get(protect, getCar)
  .put(protect, updateCar)
  .delete(protect, deleteCar);

module.exports = router;
