const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const path = require("path");
const db = require("./database/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Use the cors middleware
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.send("Welcome");
});

app.get("/user/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public/signup.html"));
});

app.get("/user/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public/login.html"));
});

app.post("/user/signup", (req, res) => {
    const { username, email, password } = req.body;
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    db.query(sql, [username, email, password], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error creating user");
        } else {
            res.sendStatus(201);
        }
    });
});

app.post("/user/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error during login");
        } else {
            if (result.length > 0) {
                res.sendStatus(200)
            } else {
                res.redirect("/login");
            }
        }
    });
});

app.get('/dashboard', (req, res) => {
    res.send("Welcome to the dashboard");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
