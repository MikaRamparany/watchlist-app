import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface Item {
  id: number;
  title: string;
  type: string;
  status: string;
}

const WatchlistDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth'); // Redirige vers la page de connexion si pas de token
        return;
      }

      try {
        const response = await axios.get(`/api/watchlists/${id}/items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [id, navigate]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Éléments de la Watchlist</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="p-2 border-b">
            <strong>{item.title}</strong> ({item.type}) - {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchlistDetails;
