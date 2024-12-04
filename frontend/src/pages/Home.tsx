import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      {/* Titre de la page */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Bienvenue sur votre site de Watchlist
      </h1>
      
      {/* Description */}
      <p className="text-xl text-center text-gray-600 mb-8">
        Suivez vos mangas, animés et séries préférées en toute simplicité.
      </p>
      
      {/* Vérification si l'utilisateur est déjà connecté */}
      {localStorage.getItem('token') ? (
        <div className="text-center">
          <p className="mb-4 text-gray-700">Vous êtes déjà connecté.</p>
          <Link to="/dashboard">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
              Accéder au tableau de bord
            </button>
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <Link to="/auth">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
              Se connecter / S'inscrire
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
