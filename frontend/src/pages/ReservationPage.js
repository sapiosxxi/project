import React, { useEffect, useState } from 'react';
// Εισάγουμε τις συναρτήσεις API για εστιατόρια και κρατήσεις
import { getRestaurants, createReservation } from '../api/api';
import { useNavigate } from 'react-router-dom'; // Hook για πλοήγηση
import '../App.css';

const ReservationPage = () => {
  // Κατάσταση για τα διαθέσιμα εστιατόρια
  const [restaurants, setRestaurants] = useState([]);

  // Κατάσταση για το ID του επιλεγμένου εστιατορίου
  const [restaurantId, setRestaurantId] = useState('');

  // Κατάσταση για τα δεδομένα της φόρμας (ημερομηνία, ώρα, αριθμός ατόμων)
  const [formData, setFormData] = useState({ date: '', time: '', people_count: 1 });

  // Hook για πλοήγηση
  const navigate = useNavigate();

  // useEffect: εκτελείται μία φορά όταν φορτωθεί το component
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Παίρνουμε το token του χρήστη από το localStorage
        const token = localStorage.getItem('token');

        // Κάνουμε αίτημα για να φέρουμε τη λίστα με τα εστιατόρια
        const response = await getRestaurants(token);

        // Ελέγχουμε τη δομή της απάντησης και ενημερώνουμε το state
        if (Array.isArray(response.data)) {
          setRestaurants(response.data);
        } else if (Array.isArray(response.data.restaurants)) {
          setRestaurants(response.data.restaurants);
        } else {
          console.error('Το response δεν είναι πίνακας:', response.data);
        }
      } catch (error) {
        // Διαχείριση σφάλματος αν αποτύχει το fetch
        console.error('Σφάλμα φόρτωσης εστιατορίων:', error);
        alert('Απέτυχε η φόρτωση εστιατορίων.');
      }
    };

    fetchRestaurants(); // Καλούμε τη συνάρτηση όταν φορτωθεί η σελίδα
  }, []);

  // Συνάρτηση που καλείται όταν ο χρήστης υποβάλει τη φόρμα
  const handleReservation = async (e) => {
    e.preventDefault(); // Ακυρώνουμε την προεπιλεγμένη συμπεριφορά της φόρμας

    // Έλεγχος για συμπλήρωση όλων των πεδίων
    if (!restaurantId || !formData.date || !formData.time || !formData.people_count) {
      alert('Συμπλήρωσε όλα τα πεδία.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Παίρνουμε το token από localStorage

      // Κάνουμε POST αίτημα για δημιουργία κράτησης
      await createReservation(
        {
          restaurant_id: restaurantId,
          date: formData.date,
          time: formData.time,
          people_count: formData.people_count,
        },
        token
      );

      alert('Η κράτηση καταχωρήθηκε επιτυχώς!');
      navigate('/profile'); // Μεταφορά στη σελίδα με τις κρατήσεις

      // Επαναφέρουμε τη φόρμα στα αρχικά της δεδομένα (προαιρετικό μετά το navigate)
      setRestaurantId('');
      setFormData({ date: '', time: '', people_count: 1 });
    } catch (error) {
      console.error('Σφάλμα κράτησης:', error);
      alert('Απέτυχε η καταχώρηση της κράτησης.');
    }
  };

  return (
    <div className="container">
      <h2>Νέα Κράτηση</h2>

      <form onSubmit={handleReservation}>
        {/* Επιλογή εστιατορίου */}
        <label>Εστιατόριο:</label>
        <select
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
          required
        >
          <option value="">-- Επιλέξτε Εστιατόριο --</option>
          {restaurants.map((r) => (
            <option key={r.restaurant_id} value={r.restaurant_id}>
              {r.name} – {r.location}
            </option>
          ))}
        </select>

        {/* Επιλογή ημερομηνίας */}
        <label>Ημερομηνία:</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />

        {/* Επιλογή ώρας */}
        <label>Ώρα:</label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
        />

        {/* Επιλογή αριθμού ατόμων */}
        <label>Άτομα:</label>
        <input
          type="number"
          min="1"
          value={formData.people_count}
          onChange={(e) => setFormData({ ...formData, people_count: e.target.value })}
          required
        />

        {/* Κουμπί υποβολής */}
        <button type="submit">Καταχώρηση Κράτησης</button>
      </form>
    </div>
  );
};

export default ReservationPage;
