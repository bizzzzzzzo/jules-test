const express = require('express');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
const publicRoutes = require('./routes/public');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/public', publicRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
