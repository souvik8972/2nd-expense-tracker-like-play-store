//import section

const express = require("express");
const cors = require("cors"); 
const app = express();



//routes
const signupRoute=require('./routes/usersignupRoute'); 
const loginRoute = require('./routes/userLoginRoute');
const addExpenseRoute=require('./routes/addExpenseRoute');


//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); 
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send("Welcome");
});

app.use(signupRoute);
app.use(addExpenseRoute);
app.use(loginRoute)



app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
