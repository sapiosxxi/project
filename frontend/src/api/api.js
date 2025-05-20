// Εισάγουμε τη βιβλιοθήκη axios για να κάνουμε HTTP αιτήματα
import axios from 'axios';

// Ορίζουμε τη βασική διεύθυνση του API backend
const API_URL = 'http://localhost:5000/api';

// Συνάρτηση για login χρήστη
export const login = (data) =>
  axios.post(`${API_URL}/login`, data);
// Στέλνει POST αίτημα με τα στοιχεία σύνδεσης (email/κωδικός)

// Συνάρτηση για εγγραφή νέου χρήστη
export const register = (data) =>
  axios.post(`${API_URL}/register`, data);
// Στέλνει POST αίτημα με τα στοιχεία εγγραφής

// Συνάρτηση για λήψη λίστας εστιατορίων
export const getRestaurants = (token) =>
  axios.get(`${API_URL}/restaurants`, {
    headers: { Authorization: `Bearer ${token}` }, // Χρήση token για έλεγχο ταυτότητας
  });

// Συνάρτηση για δημιουργία νέας κράτησης
export const createReservation = (data, token) =>
  axios.post(`${API_URL}/reservations`, data, {
    headers: { Authorization: `Bearer ${token}` }, // Περνάμε token του χρήστη
  });

// Συνάρτηση για λήψη των κρατήσεων του χρήστη
export const getUserReservations = (token) =>
  axios.get(`${API_URL}/user/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Συνάρτηση για διαγραφή συγκεκριμένης κράτησης
export const deleteReservation = (id, token) =>
  axios.delete(`${API_URL}/reservations/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Συνάρτηση για ενημέρωση κράτησης
export const updateReservation = (id, data, token) =>
  axios.put(`${API_URL}/reservations/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
