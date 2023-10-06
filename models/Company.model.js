const mongoose = require('mongoose');

// Define the company schema
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gst: {
    type: String,
    required: true,
  },
});

// Create a Company model from the schema
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
