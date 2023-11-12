const db = require("../database/db");
const path = require("path");
const util = require("util");
const query = util.promisify(db.query).bind(db);

exports.userloginPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email=?";
   

    const result = await query(sql, [email]);
   

    if (result.length > 0) {
      const user = result[0];
     
      // Note: In a production environment, you should use a secure password hashing library like bcrypt.
      if (user.password == password) {
        res.status(200).redirect("/user/dashboard");
      } else {
        res.status(401).json({meassage:"Unauthorized: Incorrect username or password"});
      }
    } else {
      res.status(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

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