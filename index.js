const express=require("express")
const cors=require("cors")
const connection=require("./db")
const productRouter=require("./routes/product.route")
const cartRouter=require("./routes/Cart.routes")
const addressRouter=require("./routes/Address.route")
const userRouter=require("./routes/User.routes")
const authorization=require("./middleware/auth.middleware")
const orderRouter=require('./routes/Order.route')
const laptopRouter=require("./routes/Laptop.route")
const Razorpay=require('razorpay')
const CompanyRouter=require("./routes/Company.route")
const paymentRouter=require('./routes/Payment.route')
require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome")
})

var instance = new Razorpay({
    key_id: "rzp_test_AxF6sbI9BuYymp",
    key_secret:"QaGHP9OWSO9ITO64V7ywQDHS",
  });





app.use("/user",userRouter)
app.use("/data",userRouter)
app.use("/dataproduct",productRouter)
app.use("/orders",orderRouter)
app.use("/orderspage",orderRouter)
app.use("/allorders",orderRouter)
// app.use("/orderlist",orderRouter)
app.use("/alladdress",addressRouter)
app.use("/laptops",laptopRouter)
app.use("/alllaptop",laptopRouter)
app.use("/",laptopRouter)
app.use("/details",laptopRouter)
app.use("/findlaptop",laptopRouter)
app.use("/all",laptopRouter)
app.use("/pay",paymentRouter)
app.use("/send",laptopRouter)
app.use("/admin",userRouter)
app.use("/product",productRouter)
app.use("/address",authorization,addressRouter)
app.use("/cart",authorization,cartRouter)
app.use("/add",CompanyRouter)
app.use("/all",CompanyRouter)
app.use("/details",CompanyRouter)
app.use("/companyproduct",CompanyRouter)

app.use("/company",CompanyRouter)

const port =process.env.port||5000

app.listen(port,async()=>{

    try{
        await connection
        console.log('connected to BharatMart db');
    }catch(err){
        console.log({msg:"Not connected to db","error":err.message});
    }
    console.log(`server is running in port ${port}`);
})