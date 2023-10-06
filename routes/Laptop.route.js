const express=require("express")

// const ProductModel=require("../models/product.model")
const LaptopModel=require("../models/Laptop.model")
const Supplier=require("../models/Lead.model")
const nodemailer = require('nodemailer');

const router=express.Router()

// router.get("/", async (req, res) => {
//     const query = req.query
//     const q = query.q || ""
    
    
//     const sort = query._sort || null
//     const order = query._order || null
//     const limit = query._limit || null
//     const page = query._page || 1
//     let discount = query.discount || 0
//     let rating = query.rating || 0
    
//     delete query.q
//     delete query._sort
//     delete query._order
//     delete query._limit
//     delete query.discount
//     delete query.rating
    
//     let _sorting = {}
//     _sorting[`${sort}`] = order
    
//     let Skip;
//     if(page==1){
//       Skip = 0
//     }
//     else{
//      Skip= (page-1)*limit
//     }
//     try {
//     const ProductData = await ProductModel.find({name:{$regex:q},...query,discount:{$gte:+discount},rating:{$gte:+rating}}).sort(_sorting).skip(Skip).limit(limit)
//      res.send(ProductData) 
//     } catch (error) {
//      res.send({message:"Cannot get the products data",error:error.message}) 
//     }
//     });
    
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'marques.dibbert18@ethereal.email',
    pass: '998hc3MYvfU2U7n7VV',
  },
});   

   
router.get("/",async(req,res)=>{
    
    try{
      const product= await LaptopModel.find()
    //   console.log("this is all the laptop",product)
      res.send(product)
    }catch(err){
      res.send({"eroor":err.message})
    }
   })


   router.get("/leads",async(req,res)=>{
    
    try{
      const lead= await Supplier.find()
      console.log("this is all the lead",lead)
      res.send(lead)
    }catch(err){
      res.send({"eroor":err.message})
    }
   })



   ////////////////////////////////////////////get the product by id/////////////////////

  router.get('/laptop:_id',async(req,res)=>{
    const laptopId=req.params._id;
      

    try{
        const laptop=await LaptopModel.findById(laptopId);
        if(!laptop){
            return res.status(404).josn({message:'Laptop not found'});
        }
        res.json(laptop);
    }
    catch(error){
        console.log("error fetching data 1234567 ",error);
        res.status(500).json({error:"An error accoured while feching data"})
    }
  });



   /////////////////////////////////////////////////////////////////////////////////

  
   router.get('/sortlaptop/:sort/:order', async (req, res) => {
    // console.log("33333",req.params.order)
    // const sort = req.query.sort || 'price';
    // const order = req.query.order || 'asc';
    const sort = req.params.sort;
    const check=req.params.order;
   
    let order = 'asc';
    if(check==='1'){
        console.log("???????????????",check)
        order='desc';
    }
    try {
        const laptops = await LaptopModel.find().sort({ [sort]: order });
        res.json(laptops);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
});


router.get('/filterlaptops/:brand', async (req, res) => {
    const brand = req.params.brand;

    try {
        const laptops = await LaptopModel.find({ brand: brand });
        res.json(laptops);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
});


router.post('/suppliers',async (req,res)=>{
    const { number,Id,image,title,price,brand}=req.body;
    const lead=new Supplier({
      number:number,
      productId: Id,
      title: title,
      image: image,
      price: price,
      brand: brand,
    });
    const Lead=await lead.save()
    .then(() => {
      res.status(201).json({ message: 'Supplier data saved successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
})




router.post('/email',async(req,res)=>{

  try {
    const {Id,image,title,brand,number,price}=req.body;
    const mailOption={
      from:'araj6205444@gmail.com',
      to:'araj914306@gmail.com',
      subject:'Enquiry of laptop',
      text:`product details:
      ID: ${Id}
      Image: ${image}
      Title: ${title}
      Price: ${price}
      Brand: ${brand}
      Number: ${number}
      `
    };
    const info=await transporter.sendMail(mailOption);
    console.log("email sent",info.messageId);


    res.status(201).json({message:`email sent successfully`})

  } catch (error) {
    console.log('Error in sending email',error);
    res.status(500).json({message:'internal server error'});
  }
 
   
});


/////////marques.dibbert18@ethereal.email
// 998hc3MYvfU2U7n7VV
   
    
    
    router.post("/add", async (req, res) => {
      try {
        // console.log("new pro is ",req.body)
        const ProductData = await LaptopModel.insertMany(req.body);
      
        res.send({ message: "Product has been added successfully" });
      } catch (error) {
        res.send({ message: "Cannot add product", error: error.message });
      }
    });
    
   
    
    module.exports = router
    
    