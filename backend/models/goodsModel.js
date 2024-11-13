// backend/models/goodsModel.js
const mongoose = require('mongoose');

const goodsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  stockAmount: { type: Number, required: true }
});

const Goods = mongoose.model('Goods', goodsSchema);

module.exports = Goods;

