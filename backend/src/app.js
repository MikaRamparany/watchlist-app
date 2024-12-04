// backend/src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialisation de l'app Express
const app = express();

// Middleware CORS (pour gérer les requêtes Cross-Origin)
app.use(cors());

// Middleware pour analyser les corps des requêtes JSON
app.use(express.json());

// Routes d'authentification et de gestion des watchlists
const authRoutes = require('./routes/authRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const apiController = require('./controllers/apiControllers');

// Routes d'API
app.use('/api/auth', authRoutes);
app.use('/api/watchlists', require('./middleware/authMiddleware'), watchlistRoutes);
app.get('/api/search/anime', apiController.searchAniList);

// Définir le port d'écoute du serveur
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
