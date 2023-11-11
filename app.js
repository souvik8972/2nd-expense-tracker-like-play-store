const express=require("express")
const app=express()
const path=require("path")
const db=require("./database/db")
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.get('/',(req,res)=>{
    res.send("Welcome")
})

app.get("/signup",(req,res)=>{
    res.sendFile(__dirname+"/public/signup.html")
})

app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/public/login.html")
})

app.post("/signup",(req,res)=>{
    const {username,email,password} = req.body
    const sql="insert into users(username,email,password) values(?,?,?)"
    db.query(sql,[username,email,password],(err)=>{
        if(err){
            console.log(err)
            
        }
        else{
            res.redirect('/login')
        }
    })



})

app.post("/login",(req,res)=>{
    const {email,password} = req.body
    const sql="select * from users where email=? and password=?"
    db.query(sql,[email,password],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            if(result.length>0){
                
                res.redirect("/dashboard")
            }
            else{
               
                res.redirect("/login")
            }
        }
    })
})
 app.get('/dashboard',(req,res)=>{
    res.send("welcom to dashboard")
 })



app.listen(8080,()=>{
    console.log("server is running 8080")
})