// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/Warehouse_new';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import Goods model
const Goods = require('./models/goodsModel');

// Example Route for Scanning Goods
app.post('/scan-goods', (req, res) => {
  const { scannedData } = req.body;
  console.log('Scanned data:', scannedData);
  res.status(200).json({ message: 'Scanned data received', data: scannedData });
});

// Import Goods
app.post('/import', async (req, res) => {
  try {
    console.log('Import request received:', req.body);

    const { name, weight, expiryDate, stockAmount } = req.body;
    const parsedExpiryDate = new Date(expiryDate);

    if (!name || weight == null || isNaN(parsedExpiryDate.getTime()) || stockAmount == null) {
      return res.status(400).json({ message: 'All fields are required and must be valid' });
    }

    const newGoods = new Goods({ name, weight, expiryDate: parsedExpiryDate, stockAmount });
    const result = await newGoods.save();
    console.log('Goods saved:', result);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error saving goods:', err);
    res.status(500).json({ message: 'Error saving goods', error: err });
  }
});

// Export Goods
app.post('/export', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name field is required' });
  }

  try {
    const result = await Goods.findOneAndDelete({ name });
    if (!result) {
      return res.status(404).json({ message: 'Goods not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error('Error deleting goods:', err);
    res.status(500).json({ message: 'Error deleting goods', error: err });
  }
});

// Get Goods
app.get('/api/goods', async (req, res) => {
  try {
    const goods = await Goods.find();
    res.status(200).json(goods);
  } catch (err) {
    console.error('Error fetching goods:', err);
    res.status(500).json({ message: 'Error fetching goods' });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
