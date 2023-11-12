const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const path=require("path");
const db = require("./database/db");
const signupRoute=require('./routes/usersignupRoute'); // Register
const loginRoute = require('./routes/userLoginRoute');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Use the cors middleware
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send("Welcome");
});

app.use(signupRoute);

app.use(loginRoute)





app.get('/user/dashboard', (req, res) => {
   res.sendFile(path.join(__dirname,"views/dashboard.html"))
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
