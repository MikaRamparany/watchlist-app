import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Watchlist {
  id: number;
  name: string;
  status: string;
}

const Watchlists: React.FC = () => {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [newWatchlist, setNewWatchlist] = useState<string>('');

  const fetchWatchlists = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/watchlists', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWatchlists(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createWatchlist = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/watchlists',
        { name: newWatchlist },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewWatchlist('');
      fetchWatchlists();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWatchlists();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mes Watchlists</h1>
      <div className="flex mb-4">
        <input
          className="flex-1 p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Nouvelle watchlist"
          value={newWatchlist}
          onChange={(e) => setNewWatchlist(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 ml-2 rounded hover:bg-green-600"
          onClick={createWatchlist}
        >
          Ajouter
        </button>
      </div>
      <ul>
        {watchlists.map((watchlist) => (
          <li key={watchlist.id} className="p-2 border-b">
            {watchlist.name} - {watchlist.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlists;
