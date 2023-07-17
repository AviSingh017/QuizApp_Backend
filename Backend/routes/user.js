const express = require("express");
const userRoute = express.Router();
const {Usermodel} = require("../models/user.model");

userRoute.post("/signup", async(req,res) => {
    try {
      const {username,email} = req.body;
      const UserisPresent = await Usermodel.findOne({email});
      if(UserisPresent) {
        return res.send({ success: true });
      }
      const User = new Usermodel({username,email});
      await User.save();
      res.send({ success: true });
    }
    catch(error){
      res.status(404).send({ success: false, "error": error.message});
    }
  }); 

module.exports={
    userRoute
}