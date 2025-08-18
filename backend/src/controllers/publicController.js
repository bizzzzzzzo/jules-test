const prisma = require('../db');

// @desc    List all cars with filtering
// @route   GET /api/public/cars
// @access  Public
const listCars = async (req, res) => {
  const { make, model, minPrice, maxPrice, minYear, maxYear } = req.query;

  const where = {};

  if (make) {
    where.make = { contains: make, mode: 'insensitive' };
  }
  if (model) {
    where.model = { contains: model, mode: 'insensitive' };
  }
  if (minPrice) {
    where.price = { ...where.price, gte: parseFloat(minPrice) };
  }
  if (maxPrice) {
    where.price = { ...where.price, lte: parseFloat(maxPrice) };
  }
  if (minYear) {
    where.year = { ...where.year, gte: parseInt(minYear) };
  }
  if (maxYear) {
    where.year = { ...where.year, lte: parseInt(maxYear) };
  }

  try {
    const cars = await prisma.car.findMany({
      where,
      include: {
        vendor: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get a single car's details
// @route   GET /api/public/cars/:id
// @access  Public
const getCarDetails = async (req, res) => {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        vendor: {
          select: {
            name: true,
            subdomain: true,
          },
        },
      },
    });

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all cars for a specific vendor
// @route   GET /api/public/vendors/:subdomain/cars
// @access  Public
const getVendorCars = async (req, res) => {
  try {
    const cars = await prisma.car.findMany({
      where: {
        vendor: {
          subdomain: req.params.subdomain,
        },
      },
      include: {
        vendor: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listCars,
  getCarDetails,
  getVendorCars,
};
