const mongoose = require('mongoose');

// Define MongoDB Schema
const supplierSchema = new mongoose.Schema({
  number: Number,
  productId: String,
  title: String,
  image: String,
  price: Number,
  brand: String,
});

// Create MongoDB Model
const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
