const express = require('express');
const {
  createWatchlist,
  getWatchlists,
  addItemToWatchlist,
  getItemsFromWatchlist,
} = require('../controllers/watchlistController');

const router = express.Router();

// Routes pour les watchlists
router.post('/', createWatchlist); // Créer une watchlist
router.get('/', getWatchlists); // Récupérer toutes les watchlists de l'utilisateur
router.post('/:id/items', addItemToWatchlist); // Ajouter un élément à une watchlist
router.get('/:id/items', getItemsFromWatchlist); // Récupérer les éléments d'une watchlist

module.exports = router;
