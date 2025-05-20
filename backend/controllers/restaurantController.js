const db = require("../config/db");

const getAllRestaurants = (req, res) => {
  const sql = "SELECT * FROM restaurants";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ restaurants: results });
  });
};

module.exports = {
  getAllRestaurants,
};
