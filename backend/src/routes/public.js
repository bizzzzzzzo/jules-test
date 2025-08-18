const express = require('express');
const {
  listCars,
  getCarDetails,
  getVendorCars,
} = require('../controllers/publicController');

const router = express.Router();

router.get('/cars', listCars);
router.get('/cars/:id', getCarDetails);
router.get('/vendors/:subdomain/cars', getVendorCars);

module.exports = router;
