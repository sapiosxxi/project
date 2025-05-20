import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';
import '../App.css';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);

      // Μικρή καθυστέρηση για να διαβαστεί σωστά το token από το App
      setTimeout(() => {
        navigate('/home');
      }, 100);
    } catch (err) {
      alert('Σφάλμα σύνδεσης. Έλεγξε τα στοιχεία σου.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Σύνδεση</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Κωδικός"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Σύνδεση</button>
      </form>
      <p>Δεν έχεις λογαριασμό; <span style={{ color: '#6c63ff', cursor: 'pointer' }} onClick={() => navigate('/register')}>Εγγραφή</span></p>
    </div>
  );
};

export default LoginPage;
