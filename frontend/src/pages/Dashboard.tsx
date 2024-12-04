import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token pour déconnecter
    navigate('/'); // Redirection vers la page d'accueil
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur votre tableau de bord</h1>
      <p className="mb-4">Gérez vos séries, mangas et animés favoris ici.</p>
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
