const mysql=require("mysql2")
const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"712123@daS",
    database:"expenses"

})


module.exports=db