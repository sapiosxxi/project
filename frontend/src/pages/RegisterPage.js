import React, { useState } from 'react';
import { register } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);
      alert('Εγγραφή επιτυχής!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Σφάλμα κατά την εγγραφή.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Εγγραφή</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Όνομα"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Κωδικός"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Εγγραφή</button>
      </form>
      <p>Έχεις ήδη λογαριασμό; <a href="/login">Σύνδεση</a></p>
    </div>
  );
};

export default RegisterPage;
