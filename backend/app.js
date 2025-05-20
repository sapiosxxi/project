// Εισάγουμε το express framework για να φτιάξουμε web server
const express = require("express");

// Εισάγουμε το cors middleware για να επιτρέπουμε αιτήματα από άλλα origins (π.χ. frontend)
const cors = require("cors");

// Εισάγουμε τα routes για authentication, εστιατόρια και κρατήσεις
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

// Δημιουργούμε το express app
const app = express();

// Ενεργοποιούμε το CORS για να δέχεται requests από frontend
app.use(cors());

// Ενεργοποιούμε parsing για JSON bodies στα αιτήματα (req.body)
app.use(express.json());

// Χρησιμοποιούμε τα routes που φτιάξαμε, όλα με prefix /api
app.use("/api", authRoutes);
app.use("/api", restaurantRoutes);
app.use("/api", reservationRoutes);

// Εξάγουμε το app για χρήση στο index.js ή server.js (π.χ. app.listen)
module.exports = app;

// Μήνυμα για debugging - επιβεβαιώνει ότι το app.js φορτώθηκε και συνδέθηκαν τα routes
console.log("app.js loaded and routes attached");
