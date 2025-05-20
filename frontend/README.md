# SAPiOS – Εφαρμογή Διαχείρισης Κρατήσεων Εστιατορίων

Μια πλήρως λειτουργική web εφαρμογή για κρατήσεις εστιατορίων, με frontend σε HTML/CSS/JavaScript και backend σε Node.js/Express, και βάση δεδομένων MariaDB.

---

## 🛠 Προαπαιτούμενα

Πριν ξεκινήσεις, βεβαιώσου ότι έχεις εγκαταστήσει τα παρακάτω:

- [Node.js & npm](https://nodejs.org/)
- [MariaDB](https://mariadb.org/)
- [HeidiSQL (προαιρετικά)](https://www.heidisql.com/)
- [Postman (για δοκιμές API - προαιρετικό)](https://www.postman.com/)

---

## 📦 Βήματα Εκτέλεσης

### 1️⃣ Κλωνοποίησε το αποθετήριο

```bash
git clone https://github.com/username/sapios.git
cd sapios
```

### 2️⃣ Ρύθμισε τη βάση δεδομένων

1. Άνοιξε το MariaDB ή το HeidiSQL.
2. Δημιούργησε μια νέα βάση δεδομένων (π.χ. `sapios_db`).
3. Εκτέλεσε τα SQL scripts που παρέχονται ή άφησε τον Sequelize να δημιουργήσει τους πίνακες αυτόματα με το sync.

> ⚠️ Αν έχεις αρχείο `.env`, ρύθμισε εκεί τα στοιχεία σύνδεσης με τη βάση.

### 3️⃣ Εγκατάσταση εξαρτήσεων

```bash
npm install
```

### 4️⃣ Εκκίνηση backend server

```bash
npm start
```

Ο server ξεκινά στο `http://localhost:3000`

---

## 🌐 Εκκίνηση Frontend

1. Άνοιξε τον φάκελο `frontend/` (αν υπάρχει ξεχωριστός).
2. Άνοιξε το `index.html` με τον browser σου (π.χ. Chrome).
3. Χρησιμοποίησε την εφαρμογή για εγγραφή, σύνδεση και κρατήσεις.

---

## 🔐 Περιβάλλον `.env` (παράδειγμα)

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=sapios_db
JWT_SECRET=mysecret
PORT=3000
```

---

## 🧪 Δοκιμές API (με Postman)

- POST `/register` – Εγγραφή χρήστη
- POST `/login` – Σύνδεση χρήστη
- GET `/restaurants` – Λίστα εστιατορίων
- POST `/reservations` – Νέα κράτηση

---


