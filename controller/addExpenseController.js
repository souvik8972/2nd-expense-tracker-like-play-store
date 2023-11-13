const db = require("../database/db");
const path=require("path")
const util = require("util");
const bcrypt = require("bcrypt");
const query = util.promisify(db.query).bind(db);


exports.getaddaExpenses = async (req, res) => {
    try {
        const sql = "SELECT * FROM expenses_of_user";
        const result = await query(sql);
        res.sendFile(path.join(__dirname, "../views/addExpense.html"));
    } catch (error) {
        console.error("Error retrieving expenses:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.postAddExpense = async (req, res) => {
    try {
        const { amount, description, category } = req.body;
        const sql = "INSERT INTO expenses_of_user (amount, description, category) VALUES (?, ?, ?)";
        const result = await query(sql, [amount, description, category]);

        if (result) {
            res.redirect("/user/addExpense");
        } else {
            res.status(500).json({ message: "Error inserting expense data" });
        }
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
