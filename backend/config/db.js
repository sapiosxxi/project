// Εισάγουμε το mysql2 package για σύνδεση με MySQL/MariaDB
const mysql = require("mysql2");

// Φορτώνουμε τις μεταβλητές περιβάλλοντος από το αρχείο .env
require("dotenv").config();

// Δημιουργούμε ένα connection pool για αποδοτικότερη διαχείριση πολλαπλών συνδέσεων
const db = mysql.createPool({
  host: process.env.DB_HOST,           // Διεύθυνση του database server (συνήθως localhost)
  port: process.env.DB_PORT || 3306,   // Πόρτα σύνδεσης (προεπιλογή 3306 αν δεν οριστεί)
  user: process.env.DB_USER,           // Όνομα χρήστη για την βάση δεδομένων
  password: process.env.DB_PASSWORD,   // Κωδικός πρόσβασης χρήστη DB
  database: process.env.DB_NAME,       // Όνομα της βάσης δεδομένων που θέλουμε να χρησιμοποιήσουμε
});

// Εξάγουμε το connection pool ώστε να μπορούμε να το χρησιμοποιούμε σε άλλα αρχεία
module.exports = db;
