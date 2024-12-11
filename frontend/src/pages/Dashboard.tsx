import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

interface Watchlist {
  id: number;
  name: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const navigate = useNavigate();

  // Vérification de l'authentification et récupération des watchlists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth'); // Si non authentifié, rediriger vers la page de login
    } else {
      fetchWatchlists();
    }
  }, [navigate]);

  // Fonction pour récupérer les watchlists de l'utilisateur
  const fetchWatchlists = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/watchlists', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWatchlists(response.data); // Stocker les watchlists dans l'état
    } catch (error) {
      console.error('Erreur lors de la récupération des watchlists:', error);
    }
  };

  // Déconnexion de l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token pour déconnecter
    navigate('/'); // Redirection vers la page d'accueil
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur votre tableau de bord</h1>
      <p className="mb-4">Gérez vos séries, mangas et animés favoris ici.</p>
      
      {/* Liste des Watchlists */}
      <div className="mb-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-2">Mes Watchlists</h2>
        {watchlists.length > 0 ? (
          <ul>
            {watchlists.map((watchlist) => (
              <li key={watchlist.id} className="flex justify-between items-center p-2 border-b">
                <span>{watchlist.name} - {watchlist.status}</span>
                <Link to={`/watchlist/${watchlist.id}`}>
                  <button className="text-blue-500">Voir les éléments</button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune watchlist trouvée. Créez une nouvelle watchlist pour commencer.</p>
        )}
      </div>

      {/* Lien vers la page Watchlists.tsx pour gérer les watchlists */}
      <div className="mb-6">
        <Link to="/watchlists">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Gérer mes Watchlists
          </button>
        </Link>
      </div>

      {/* Lien pour ajouter une nouvelle Watchlist */}
      <div className="mb-6">
        <Link to="/create-watchlist">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Ajouter une nouvelle Watchlist
          </button>
        </Link>
      </div>

      {/* Bouton de déconnexion */}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Se déconnecter
      </button>
    </div>
  );
};

export default Dashboard;
