import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRestaurants } from '../api/api';
import '../App.css';

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalRestaurant, setModalRestaurant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getRestaurants(token);

      if (Array.isArray(response.data)) {
        setRestaurants(response.data);
      } else if (Array.isArray(response.data.restaurants)) {
        setRestaurants(response.data.restaurants);
      } else {
        setRestaurants([]);
        console.error('Το response δεν είναι πίνακας:', response.data);
      }
    } catch (error) {
      console.error('Σφάλμα στη λήψη εστιατορίων:', error);
      alert('Απέτυχε η φόρτωση εστιατορίων.');
    }
  };

  const handleReserve = (restaurant) => {
    navigate('/reserve', { state: restaurant });
  };

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Διαθέσιμα Εστιατόρια</h2>

      <input
        type="text"
        placeholder="Αναζήτηση με όνομα ή τοποθεσία..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {filteredRestaurants.length === 0 ? (
        <p style={{ color: '#fff', marginTop: 30 }}>Δεν βρέθηκαν αποτελέσματα.</p>
      ) : (
        <div className="grid">
          {filteredRestaurants.map((r) => (
            <div key={r.restaurant_id} className="card">
              <h3>{r.name}</h3>
              <p><strong>Τοποθεσία:</strong> {r.location}</p>
              <p>{r.description.slice(0, 100)}...</p>

              <button onClick={() => handleReserve(r)}>Κάνε Κράτηση</button>
              <button onClick={() => setModalRestaurant(r)} style={{ marginTop: '0.5rem', background: '#555', color: '#fff' }}>
                Πληροφορίες Καταστήματος
              </button>
            </div>
          ))}
        </div>
      )}

      {modalRestaurant && (
        <div className="modal-backdrop" onClick={() => setModalRestaurant(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modalRestaurant.name}</h3>
            <p><b>Τοποθεσία:</b> {modalRestaurant.location}</p>
            <p>{modalRestaurant.description}</p>
            <button onClick={() => setModalRestaurant(null)}>Κλείσιμο</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
