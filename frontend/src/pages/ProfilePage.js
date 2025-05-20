import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import {
  getUserReservations,
  deleteReservation,
  updateReservation,
} from '../api/api';

const ProfilePage = () => {
  const [reservations, setReservations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ date: '', time: '', people_count: 1 });
  const navigate = useNavigate();

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getUserReservations(token);

      if (Array.isArray(response.data)) {
        setReservations(response.data);
      } else {
        setReservations([]);
        console.error('Το response δεν είναι πίνακας:', response.data);
      }
    } catch (error) {
      console.error('Σφάλμα στην fetchReservations:', error);
      alert('Σφάλμα κατά την ανάκτηση των κρατήσεων.');
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Να διαγραφεί η κράτηση;');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await deleteReservation(id, token);
      alert('Η κράτηση διαγράφηκε.');
      fetchReservations();
    } catch (error) {
      console.error(error);
      alert('Αποτυχία διαγραφής.');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await updateReservation(id, editData, token);
      alert('Η κράτηση ενημερώθηκε.');
      setEditingId(null);
      fetchReservations();
    } catch (error) {
      console.error(error);
      alert('Αποτυχία ενημέρωσης.');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Οι Κρατήσεις Μου</h2>

      {reservations.length === 0 ? (
        <p>Δεν υπάρχουν κρατήσεις.</p>
      ) : (
        <ul style={styles.list}>
          {reservations.map((r) => (
            <li key={r.reservation_id} style={styles.card}>
              <p><b>Εστιατόριο:</b> {r.restaurant_name || r.restaurant_id}</p>

              {editingId === r.reservation_id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <input
                    type="date"
                    value={editData.date}
                    onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                  />
                  <input
                    type="time"
                    value={editData.time}
                    onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                  />
                  <input
                    type="number"
                    min="1"
                    value={editData.people_count}
                    onChange={(e) => setEditData({ ...editData, people_count: e.target.value })}
                  />
                  <button onClick={() => handleUpdate(r.reservation_id)}>Αποθήκευση</button>
                  <button onClick={() => setEditingId(null)}>Άκυρο</button>
                </div>
              ) : (
                <>
                  <p><b>Ημερομηνία:</b> {r.date}</p>
                  <p><b>Ώρα:</b> {r.time}</p>
                  <p><b>Άτομα:</b> {r.people_count}</p>
                  <button onClick={() => {
                    setEditingId(r.reservation_id);
                    setEditData({
                      date: r.date,
                      time: r.time,
                      people_count: r.people_count,
                    });
                  }}>
                    Επεξεργασία
                  </button>
                  <button onClick={() => handleDelete(r.reservation_id)} style={styles.deleteBtn}>
                    Διαγραφή
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate('/home')} style={styles.backBtn}>Επιστροφή</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: '50px auto',
    padding: 20,
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    textAlign: 'left',
  },
  deleteBtn: {
    marginTop: 10,
    padding: 8,
    fontSize: 14,
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
  backBtn: {
    marginTop: 30,
    padding: 10,
    fontSize: 16,
    cursor: 'pointer',
  },
};

export default ProfilePage;
