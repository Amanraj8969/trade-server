const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Reference to the Company model if applicable
  },
  companyProductId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyProduct', // Reference to the CompanyProduct model
  },
  name: String,
  email: String,
  phone: String,
  address: String,
  // Add any other fields you need
});

const CompanyCart = mongoose.model('companyCart', cartSchema);

module.exports = CompanyCart;
