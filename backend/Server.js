const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API running 🚀' });
});

// Student Routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

console.log('Connecting to:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { family: 4 })
  .then(() => {
    console.log('✅ MongoDB Connected!');
    app.listen(5000, () => console.log('🚀 Server running on port 5000'));
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
  });