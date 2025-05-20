const express = require("express");
const router = express.Router();
const db = require('../config/db'); 
const authenticateToken = require("../middleware/authMiddleware");

// Δημιουργία νέας κράτησης
router.post("/reservations", authenticateToken, (req, res) => {
  const userId = req.user.user_id;
  const { restaurant_id, date, time, people_count } = req.body;

  if (!restaurant_id || !date || !time || !people_count) {
    return res.status(400).json({ error: "Όλα τα πεδία είναι απαραίτητα." });
  }

  const sql = `INSERT INTO reservations (user_id, restaurant_id, date, time, people_count)
               VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [userId, restaurant_id, date, time, people_count], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Σφάλμα κατά την αποθήκευση της κράτησης." });
    }
    res.status(201).json({ message: "Η κράτηση καταχωρήθηκε επιτυχώς." });
  });
});

// Λήψη κρατήσεων χρήστη
router.get("/user/reservations", authenticateToken, (req, res) => {
  const userId = req.user.user_id;

  const sql = `SELECT r.*, res.name AS restaurant_name
               FROM reservations r
               JOIN restaurants res ON r.restaurant_id = res.restaurant_id
               WHERE r.user_id = ?`;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Σφάλμα κατά την ανάκτηση κρατήσεων." });
    }
    res.json(results); // Επιστρέφει πίνακα κρατήσεων
  });
});

//  Ενημέρωση κράτησης
router.put("/reservations/:id", authenticateToken, (req, res) => {
  const reservationId = req.params.id;
  const { date, time, people_count } = req.body;

  const sql = `UPDATE reservations
               SET date = ?, time = ?, people_count = ?
               WHERE reservation_id = ?`;

  db.query(sql, [date, time, people_count, reservationId], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Σφάλμα κατά την ενημέρωση." });
    }
    res.json({ message: "Η κράτηση ενημερώθηκε επιτυχώς." });
  });
});

// Διαγραφή κράτησης
router.delete("/reservations/:id", authenticateToken, (req, res) => {
  const reservationId = req.params.id;

  const sql = "DELETE FROM reservations WHERE reservation_id = ?";

  db.query(sql, [reservationId], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Σφάλμα κατά τη διαγραφή κράτησης." });
    }
    res.json({ message: "Η κράτηση διαγράφηκε." });
  });
});

module.exports = router;
