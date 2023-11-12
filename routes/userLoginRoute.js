const controller=require("../controller/userController")
const express=require("express")
const route=express.Router()


route.post("/user/login",controller.userloginPost )
route.get("/user/login",controller.userloginget)




module.exports=route