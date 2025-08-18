const prisma = require('../db');

// @desc    Get all cars for a vendor
// @route   GET /api/cars
// @access  Private
const getCars = async (req, res) => {
  try {
    const cars = await prisma.car.findMany({
      where: {
        vendorId: req.user.vendorId,
      },
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get a single car
// @route   GET /api/cars/:id
// @access  Private
const getCar = async (req, res) => {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: req.params.id,
        vendorId: req.user.vendorId,
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

// @desc    Create a car
// @route   POST /api/cars
// @access  Private
const createCar = async (req, res) => {
  const { make, model, year, price, mileage, description } = req.body;
  try {
    const car = await prisma.car.create({
      data: {
        make,
        model,
        year,
        price,
        mileage,
        description,
        vendorId: req.user.vendorId,
      },
    });
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private
const updateCar = async (req, res) => {
  try {
    const car = await prisma.car.update({
      where: {
        id: req.params.id,
        vendorId: req.user.vendorId,
      },
      data: req.body,
    });
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private
const deleteCar = async (req, res) => {
  try {
    await prisma.car.delete({
      where: {
        id: req.params.id,
        vendorId: req.user.vendorId,
      },
    });
    res.json({ message: 'Car removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
