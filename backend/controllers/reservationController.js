// Εισάγουμε το module για σύνδεση με τη βάση δεδομένων
const db = require("../config/db");

// ===========================
// Προβολή κρατήσεων χρήστη
// ===========================
const getUserReservations = (req, res) => {
  // Παίρνουμε το ID του συνδεδεμένου χρήστη από το request
  const userId = req.user.user_id;

  // SQL ερώτημα για όλες τις κρατήσεις του χρήστη
  const sql = "SELECT * FROM reservations WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      // Αν υπάρξει σφάλμα κατά την εκτέλεση του query
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Επιστροφή των κρατήσεων σε μορφή JSON
    res.json({ reservations: results });
  });
};

// ===========================
// Δημιουργία νέας κράτησης
// ===========================
const createReservation = (req, res) => {
  // Παίρνουμε το ID του χρήστη και τα στοιχεία της κράτησης από το σώμα του αιτήματος
  const userId = req.user.user_id;
  const { restaurant_id, date, time, people_count } = req.body;

  // SQL εντολή για εισαγωγή νέας κράτησης
  const sql = `
    INSERT INTO reservations (user_id, restaurant_id, date, time, people_count)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [userId, restaurant_id, date, time, people_count], (err, result) => {
    if (err) {
      // Αν υπάρξει σφάλμα κατά την εισαγωγή
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Επιστροφή επιβεβαίωσης επιτυχίας
    res.status(201).json({ message: "Reservation created successfully" });
  });
};

// ===========================
// Επεξεργασία υπάρχουσας κράτησης
// ===========================
const updateReservation = (req, res) => {
  // Παίρνουμε το ID της κράτησης από τα παραμέτρους της διαδρομής
  const reservationId = req.params.id;
  const userId = req.user.user_id;
  const { date, time, people_count } = req.body;

  // SQL για ενημέρωση κράτησης εφόσον ανήκει στον χρήστη
  const sql = `
    UPDATE reservations
    SET date = ?, time = ?, people_count = ?
    WHERE reservation_id = ? AND user_id = ?
  `;

  db.query(sql, [date, time, people_count, reservationId, userId], (err, result) => {
    if (err) {
      // Αν υπάρξει σφάλμα κατά την ενημέρωση
      console.error("Update error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Επιστροφή μηνύματος επιτυχίας
    res.json({ message: "Reservation updated successfully" });
  });
};

// ===========================
// Διαγραφή κράτησης
// ===========================
const deleteReservation = (req, res) => {
  // Παίρνουμε το ID της κράτησης και του χρήστη
  const reservationId = req.params.id;
  const userId = req.user.user_id;

  // SQL εντολή για διαγραφή κράτησης που ανήκει στον χρήστη
  const sql = `
    DELETE FROM reservations
    WHERE reservation_id = ? AND user_id = ?
  `;

  db.query(sql, [reservationId, userId], (err, result) => {
    if (err) {
      // Αν υπάρξει σφάλμα κατά τη διαγραφή
      console.error("Delete error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Επιστροφή επιβεβαίωσης διαγραφής
    res.json({ message: "Reservation deleted successfully" });
  });
};

// Εξαγωγή όλων των συναρτήσεων για χρήση σε άλλες αρθρώσεις της εφαρμογής
module.exports = {
  getUserReservations,
  createReservation,
  updateReservation,
  deleteReservation,
};
