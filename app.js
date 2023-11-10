const express=require("express")
const app=express()
const path=require("path")
const db=require("./database/db")
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/signup.html")
})

app.post("/",(req,res)=>{
    const {username,email,password} = req.body
    const sql="insert into users(username,email,password) values(?,?,?)"
    db.query(sql,[username,email,password],(err)=>{
        if(err){
            console.log(err)
            
        }
        else{
            res.sendFile(__dirname+"/public/login.html")
        }
    })



})



app.listen(8080,()=>{
    console.log("server is running 8080")
})