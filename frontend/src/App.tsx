import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Watchlists from './pages/Watchlists';
import WatchlistDetails from './pages/WatchlistDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil par défaut */}
        <Route path="/" element={<Home />} />
        
        {/* Page de connexion / inscription */}
        <Route path="/auth" element={<Auth />} />
        
        {/* Tableau de bord de l'utilisateur, accessible seulement si connecté */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/watchlists" element={<Watchlists />} />
        <Route path="/watchlist/:id" element={<WatchlistDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
