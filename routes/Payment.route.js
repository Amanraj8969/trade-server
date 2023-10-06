const express = require("express");
const Razorpay=require('razorpay')
const router = express.Router();



var instance = new Razorpay({
    key_id: "rzp_test_AxF6sbI9BuYymp",
    key_secret:"QaGHP9OWSO9ITO64V7ywQDHS",
  });


  router.post("/process-payment", async (req, res) => {
    try {
      // Extract payment details from the request body
      const { amount, currency, User } = req.body;
  
      // Create an order using Razorpay API
      const order = await instance.orders.create({
        amount,
        currency,
        User,
      });
  
      // Send the order ID to the client
      res.status(200).json({ orderId: order.id });
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(500).json({ error: "An error occurred while processing the payment." });
    }
  });





























module.exports=router