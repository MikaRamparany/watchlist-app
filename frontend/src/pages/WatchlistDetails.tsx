import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Item {
  id: number;
  name: string;
  description: string;
}

const WatchlistDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/watchlists/${id}/items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Éléments de la Watchlist</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="p-2 border-b">
            {item.name} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchlistDetails;
