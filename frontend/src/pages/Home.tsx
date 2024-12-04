import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur votre site de Watchlist</h1>
      <p className="text-xl mb-4">Suivez vos mangas, animés et séries préférées en toute simplicité.</p>
      
      {/* Vérification si l'utilisateur est déjà connecté */}
      {localStorage.getItem('token') ? (
        <div>
          <p className="mb-4">Vous êtes déjà connecté.</p>
          <Link to="/dashboard">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Accéder au tableau de bord
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/auth">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Se connecter / S'inscrire
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
