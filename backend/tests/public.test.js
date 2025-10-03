const request = require('supertest');
const express = require('express');
const publicRoutes = require('../src/routes/public');
const app = express();

// We need to use the json middleware if our controllers expect to parse json bodies
app.use(express.json());
app.use('/api/public', publicRoutes);

// Mock the prisma client from ../src/db
jest.mock('../src/db', () => ({
  car: {
    findMany: jest.fn().mockResolvedValue([
      { id: '1', make: 'Toyota', model: 'Camry', year: 2020, price: 25000, vendor: { name: 'Test Vendor' } },
      { id: '2', make: 'Honda', model: 'Accord', year: 2021, price: 27000, vendor: { name: 'Test Vendor' } },
    ]),
    findUnique: jest.fn().mockResolvedValue(
        { id: '1', make: 'Toyota', model: 'Camry', year: 2020, price: 25000, vendor: { name: 'Test Vendor', subdomain: 'test' } }
    )
  },
}));

describe('Public Car Routes', () => {
  it('GET /api/public/cars - should fetch a list of cars', async () => {
    const res = await request(app).get('/api/public/cars');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
    expect(res.body[0].make).toEqual('Toyota');
  });

  it('GET /api/public/cars/:id - should fetch a single car', async () => {
    const res = await request(app).get('/api/public/cars/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.make).toEqual('Toyota');
  });
});
