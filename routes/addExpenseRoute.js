const controller=require("../controller/addExpenseController")
const express=require("express")
const route=express.Router()
const path=require("path")



route.get('/user/addExpense', controller.getaddaExpenses)

route.post('/user/addExpense', controller.postAddExpense)

module.exports=route

 