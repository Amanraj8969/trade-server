const express=require("express")
const mongoose = require('mongoose');

const Company=require("../models/Company.model")
const CompanyProduct=require("../models/Companyproduct.model")
const CompanyCart =require("../models/CompanyProductLead.model")

const router=express.Router()




router.get('/companies', async (req, res) => {
    try {
      const companies = await Company.find();
      console.log(">>>>>",companies)
      res.json(companies);
    } catch (error) {
      console.error('Error fetching companies:', error);
      res.status(500).json({ error: 'An error occurred while fetching companies.' });
    }
  });








  // Example Express.js route for fetching company details
router.get('/companies/:companyId', async (req, res) => {
  try {
    const companyId = req.params.companyId;
    // console.log(req.params)
   
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});












router.post('/company', async (req, res) => {
    const { name, description, image, mobileNumber, email, gst } = req.body;
    console.log(name, description);
  
    try {
      const company = new Company({
        name: name,
        description: description,
        image: image,
        mobileNumber: mobileNumber,
        email: email,
        gst: gst,
      });
  
      const savedCompany = await company.save();
      res.status(201).json({ message: 'Company data saved successfully', company: savedCompany });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });


  /////////////////////////////////////////////////////////company product add api here
  // router.post('/products',async(req,res)=>{

  //   const { productType,
  //     imageUrl,
  //     title,
  //     description,
  //     price,
  //     companyId}=req.body
  //     try {
  //       const companyproduct=new CompanyProduct({
  //         imageUrl:imageUrl,
  //         title:title,
  //         description:description,
  //         price:price,
  //         companyId:companyId
  //       });
  //       const savedproduct=await companyproduct.save();
  //       res.status(201).json({message:"company product added seccessfull",companyproduct:savedproduct});
        
  //     } catch (error) {
  //       console.error("error in add product in backend",error)
  //     }

  // });

  router.post('/product', async (req, res) => {
    const {
      productType,
      imageUrl,
      title,
      description,
      price,
      companyId,
    } = req.body;
    // console.log("444444444444",companyId,productType,imageUrl)
    try {
      if (!mongoose.Types.ObjectId.isValid(companyId)) {
        return res.status(400).json({ error: 'Invalid companyId' });
      }
      const companyproduct = new CompanyProduct({
        productType: productType, // Include productType in the object
        imageUrl: imageUrl,
        title: title,
        description: description,
        price: price,
        companyId: companyId
      });
  
      const savedproduct = await companyproduct.save();
      res.status(201).json({
        message: "Company product added successfully",
        companyproduct: savedproduct
      });
  
    } catch (error) {
      console.error("Error in add product in backend", error);
      res.status(500).json({
        error: "Internal server error"
      });
    }
  });


  // router.get('/Allproducts/:companyId', async (req, res) => {
  //   const companyId = req.params.companyId;
  
  //   try {
  //     const companyProduct = await CompanyProduct.find({ companyId }); 
  //      res.json(companyProduct);
  //     console.log("i am insde the get router",req.params.companyId,companyProduct)
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Server error' });
  //   }
  // });
  

  router.get('/Allproducts/:companyId', async (req, res) => {
    const companyId = req.params.companyId;
  
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ error: 'Invalid companyId' });
    }
  
    try {
      const companyProduct = await CompanyProduct.find({ companyId });
      res.json(companyProduct);
      console.log("i am insde the get router", req.params.companyId, companyProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


//////////////////////////////////////////Lead of the company Product////////////////////////////////////////
router.post('/lead', async (req, res) => {
  try {
    // Create a new Cart instance with the data from the request
    const companycartdata = new CompanyCart({
      companyId: req.body.companyId,
      companyProductId: req.body.companyProductId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    });

    // Save the data to MongoDB
    await companycartdata.save();

    res.status(201).json({ message: 'Cart data saved successfully' });
  } catch (error) {
    console.error('Error saving cart data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router