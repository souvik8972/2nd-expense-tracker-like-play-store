const controller=require("../controller/signupController")
const express=require("express")
const route=express.Router()
const path = require("path");

route.post("/user/signup",controller.userSignUpPost )
route.get("/user/signup", controller.userSignupGet)



module.exports=route