import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Watchlists from './pages/Watchlists';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/watchlists" element={<Watchlists />} />
      </Routes>
    </Router>
  );
};

export default App;
