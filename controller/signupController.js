const db = require("../database/db");
const path = require("path");
const util = require("util");
const bcrypt = require("bcrypt");
const query = util.promisify(db.query).bind(db);

exports.userSignUpPost = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const checkDuplicateEmailQuery = "SELECT * FROM users WHERE email = ?";
    const duplicateEmailResult = await query(checkDuplicateEmailQuery, [email]);

    if (duplicateEmailResult.length > 0) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        await query(insertUserQuery, [username, email, hashedPassword]);
        res.status(201).json({ message: "User created successfully" });
      } catch (hashError) {
        console.error("Error hashing password:", hashError);
        res.status(500).json({ message: "Error creating user" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.userSignupGet = async (req, res) => {
  try {
    await res.sendFile(path.join(__dirname, "../views/signup.html"));
  } catch (fileError) {
    console.error("Error sending file:", fileError);
    res.status(500).json({ message: "Error sending file" });
  }
};
