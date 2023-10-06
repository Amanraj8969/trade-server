const mongoose = require("mongoose");
const adminSchema = mongoose.Schema(
    {
      name:{type:String,required:true},
      username:{type:String,required:true,unique:true},
      email:{type:String,required:true,unique:true},
      password:{type:String,required:true,min:6,max:10},
      user:String
    },
    { versionKey: false }
  );
  
  const AdminModel = mongoose.model("admin", adminSchema);
  
  module.exports = { AdminModel };