const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
const {AdminModel}=require("../models/Admin.model")

const router = express.Router();

router.get("/",async(req,res)=>{
  console.log("get user working")
  try {
    const Users = await UserModel.find();
    res.send(Users);
  } catch (error) {
    res.send({message:"Cannot get Users",error:error.message})
  }
})
router.get("/allusers",async(req,res)=>{
  console.log("get user working")
  try {
    const Users = await UserModel.find();
    console.log("this is all the user in backend",Users)
    res.send(Users);
  } catch (error) {
    res.send({message:"Cannot get Users",error:error.message})
  }
})




router.post("/register1",async(req,res)=>{

const {name,username,email,password}=req.body;
console.log("admin details",req.body);
try {
  bcrypt.hash(password,5,async(err,hash)=>{
    console.log(hash);
    if(err){
      res.send({error:err.message});
    }
    else{
      const admin = new AdminModel({
        name,
        username,
        email,
        password: hash,
       
      });
      console.log(password,"admin is created",admin);
      await admin.save();
      res.send({ message: "Admin has been registered successfully" });
    }
  });
  
} catch (error) {
  res.send({ message:"Something went wrong",error: error.message });
}


});



router.post("/register", async (req, res) => {
  
  const { name, username, email, password, phone, gender } = req.body;
  console.log("req body is ",req.body)
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      console.log(hash);

      if (err) {
        res.send({ error: err.message });
      } else {
        const User = new UserModel({
          name,
          username,
          email,
          password: hash,
          phone,
          gender
        });
        console.log(password," user is created ",User)
        await User.save();
        res.send({ message: "User has been registered successfully" });
      }
    });
  } catch (error) {
    res.send({ message:"Something went wrong",error: error.message });
  }
});

router.post("/login1", async (req, res) => {
  const {email,password}=req.body;
  try {
    const User = await AdminModel.find({email});
    if(User.length>0){
      bcrypt.compare(password,User[0].password,(err, result)=> {
      if(err){
          console.log({error:err.message});
      }else if(result){
         const token = jwt.sign({UserId:User[0]._id},"anysecretkey");
         res.send({message:"User has been login successfully",token:token, userDetails:User[0]});
      }else{
          res.send({message:"Wrong Credentials"});
      }
      });
    }  
  } catch (error) {
    res.send({ message:"Something went wrong",error: error.message });  
  }
});



router.post("/login", async (req, res) => {
    const {email,password}=req.body;
    try {
      const User = await UserModel.find({email});
      if(User.length>0){
        bcrypt.compare(password,User[0].password,(err, result)=> {
        if(err){
            console.log({error:err.message});
        }else if(result){
           const token = jwt.sign({UserId:User[0]._id},"anysecretkey");
           console.log("//////////",User[0])
           res.send({message:"User has been login successfully",token:token, userDetails:User[0]});
        }else{
            res.send({message:"Wrong Credentials"});
        }
        });
      }  
    } catch (error) {
      res.send({ message:"Something went wrong",error: error.message });  
    }
});

module.exports=router