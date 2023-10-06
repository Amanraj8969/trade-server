const express = require("express");
const Order = require('../models/Order.model')

const router = express.Router();

router.get("/", async (req, res) => {
//   const user = req.body.user;

    try {
      const orderdetails = await Order.find();
      res.send({"msg":"success",data:orderdetails});
    } catch (error) {
      res.send({ message: "Cannot get users address", error: error.message });
    }
});



router.get("/allorder", async (req, res) => {
  //   const user = req.body.user;
  
      try {
        const orderdetails = await Order.find();
        // console.log(orderdetails)
        res.send({"msg":"success",data:orderdetails});
      } catch (error) {
        res.send({ message: "Cannot get users address", error: error.message });
      }
  });
  

//////////////////////////////////////////fetching all the address from database////////////

// router.post('/orderdetails', async (req, res) => {
//     try {

//         const {
//             User,
//             Id,
//             Price,
//             Img,
//             Quantity,
//             Title,
//             Name,
//             Mobile,
//             Pincode,
//             State,
//             City,
//             Category,
//             Address,
//           } = req.body;

//           const order = new Order({
//             user: User,
//             id: Id,
//             price: Price,
//             image:Img,
//             quantity: Quantity,
//             title: Title,
//             name: Name,
//             mobile: Mobile,
//             pincode: Pincode,
//             state: State,
//             city: City,
//             category: Category,
//             address: Address,
//           });
  
//       const savedOrder = await order.save();
  
//       res.status(201).json({ message: 'Order placed successfully', savedOrder });
//     } catch (error) {
//       console.log("errir  ",error.message)
//       res.status(500).json({ error: 'An error sdflkjsdflkdsjflsk occurred' });
//     }
//   });


router.post('/orderdetails', async (req, res) => {
  // console.log("inside the order detils")
  try {
    const orderDetailsArray = req.body;

    // Ensure that orderDetailsArray is an array
    if (!Array.isArray(orderDetailsArray)) {
      return res.status(400).json({ error: 'Invalid order details format' });
    }

    const savedOrders = [];

    for (const orderDetails of orderDetailsArray) {
      const {
        User,
        Id,
        Price,
        Img,
        Quantity,
        Title,
        Name,
        Mobile,
        Pincode,
        State,
        City,
        Category,
        Address,
      } = orderDetails;

      const order = new Order({
        user: User,
        id: Id,
        price: Price,
        image: Img,
        quantity: Quantity,
        title: Title,
        name: Name,
        mobile: Mobile,
        pincode: Pincode,
        state: State,
        city: City,
        category: Category,
        address: Address,
      });

      const savedOrder = await order.save();
      savedOrders.push(savedOrder);
    }

    res.status(201).json({ message: 'Orders placed successfully', savedOrders });
  } catch (error) {
    console.error('Error placing orders:', error);
    res.status(500).json({ error: 'An error occurred while placing orders' });
  }
});




  router.get('/details', async (req, res) => {
    const { userId } = req.query;
    
    // {console.log("12345",userId)}
  
    try {
      const orders = await Order.find({ user:userId });
      // console.log("first")
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });




module.exports=router