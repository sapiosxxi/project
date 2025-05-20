// Σύνδεση με τη βάση δεδομένων
const db = require("../config/db");

// Εισαγωγή bcrypt για hash password
const bcrypt = require("bcryptjs");

// Εισαγωγή JWT για δημιουργία token
const jwt = require("jsonwebtoken");

// Λειτουργία εγγραφής χρήστη
const registerUser = async (req, res) => {
  const { name, email, password } = req.body; // Παίρνουμε τα δεδομένα από το request body

  try {
    // Κρυπτογράφηση του password με salt rounds 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query για εισαγωγή του χρήστη στη βάση δεδομένων
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        // Αν υπάρξει σφάλμα στη βάση (π.χ. duplicate email)
        console.error("DB insert error:", err);
        return res.status(500).json({ error: err.sqlMessage || "Database error" });
      }

      // Επιστρέφουμε επιτυχία
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    // Γενικό σφάλμα server (π.χ. πρόβλημα με το hash)
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Λειτουργία login χρήστη
const loginUser = (req, res) => {
  const { email, password } = req.body; // Παίρνουμε email & password

  // SQL query για έλεγχο αν υπάρχει ο χρήστης με αυτό το email
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      // Αν δεν βρέθηκε χρήστης ή υπήρξε σφάλμα, επιστρέφουμε λάθος credentials
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0];

    // Συγκρίνουμε το password που έδωσε ο χρήστης με το hashed password στη βάση
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Αν δεν ταιριάζει, λάθος credentials
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Αν είναι σωστό, δημιουργούμε JWT token με user_id
    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Ισχύει για 1 ώρα
    );

    // Στέλνουμε το token πίσω στον client
    res.json({ token });
  });
};

// Εξαγωγή των functions για χρήση στα routes
module.exports = {
  registerUser,
  loginUser,
};
