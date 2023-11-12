const db = require("../database/db");
const path = require("path");
const util= require("util");
const query = util.promisify(db.query).bind(db);

exports.userloginPost=(req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error during login");
        } else {
            if (result.length > 0) {
                res.redirect('/user/dashboard')
            } else {
                res.redirect("/user/login");
            }
        }
    });
}
exports.userloginget= (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
}
exports.userSignUpPost = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const checkDuplicateEmailQuery = "SELECT * FROM users WHERE email = ?";
      const duplicateEmailResult = await query(checkDuplicateEmailQuery, [email]);
  
      if (duplicateEmailResult.length > 0) {
        res.sendStatus(400); // Email already exists
      } else {
        const insertUserQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        await query(insertUserQuery, [username, email, password]);
        res.sendStatus(201);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating user");
    }
  };
exports.userSignupGet=(req, res) => {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
}