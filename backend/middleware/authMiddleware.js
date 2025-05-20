// Εισάγουμε το jwt package για επαλήθευση των tokens
const jwt = require("jsonwebtoken");

// Middleware για έλεγχο αν ο χρήστης έχει έγκυρο token
const authenticateToken = (req, res, next) => {
  // Παίρνουμε το Authorization header από το request
  const authHeader = req.headers["authorization"];

  // Αν δεν υπάρχει header ή δεν ξεκινά με 'Bearer ', επιστρέφουμε 401 Unauthorized
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // Παίρνουμε το token από το header (μετά το 'Bearer ')
  const token = authHeader.split(" ")[1];

  try {
    // Επαληθεύουμε το token χρησιμοποιώντας το μυστικό μας (JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Αν το token είναι έγκυρο, αποθηκεύουμε τα στοιχεία του χρήστη στο req.user
    req.user = decoded; // π.χ. { user_id: 1, username: 'nikos' }

    // Προχωράμε στο επόμενο middleware ή route handler
    next();
  } catch (err) {
    // Αν το token δεν είναι έγκυρο ή έχει λήξει, επιστρέφουμε 403 Forbidden
    return res.status(403).json({ error: "Invalid token" });
  }
};

// Εξάγουμε το middleware για χρήση στα προστατευμένα routes
module.exports = authenticateToken;
