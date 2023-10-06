const mongoose = require('mongoose');

// Define a schema for the product
const companyproductSchema = new mongoose.Schema({
  productType: String,
  imageUrl: String,
  title: String,
  description: String,
  price: String,
  // Add a reference to the company that this product belongs to
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
});

// Create the Product model
const CompanyProduct = mongoose.model('CompanyProduct', companyproductSchema);

module.exports = CompanyProduct;

