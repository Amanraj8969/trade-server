const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: String,
  id: String,
  price: Number,
  image:String,
  quantity: Number,
  title: String,
  name: String,
  mobile: String,
  pincode: String,
  state: String,
  city: String,
  category: String,
  address:String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
