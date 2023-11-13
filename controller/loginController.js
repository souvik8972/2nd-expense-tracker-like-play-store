const db = require("../database/db");
const path = require("path");
const util = require("util");
const bcrypt = require("bcrypt");
const query = util.promisify(db.query).bind(db);

exports.userloginPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email=?";

    const result = await query(sql, [email]);

    if (result.length > 0) {
      const user = result[0];
      //bycrpt compare
      try {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          res.status(200).json({ message: "Login successful", redirect: "/user/dashboard" });
        } else {
          res.status(401).json({ message: "Unauthorized: Incorrect username or password" });
        }
      } catch (bcryptError) {
        console.error("Error comparing passwords:", bcryptError);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.userloginget = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
};
