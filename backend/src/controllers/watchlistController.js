const pool = require('../config/db');
const authenticateToken = require('../middleware/authenticateToken'); // Import du middleware

// Créer une watchlist
const createWatchlist = async (req, res) => {
  const { name, status } = req.body;
  const userId = req.userId; // Utilise l'ID utilisateur extrait du token

  try {
    const result = await pool.query(
      'INSERT INTO watchlists (name, user_id, status) VALUES ($1, $2, $3) RETURNING *',
      [name, userId, status || 'En cours']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer toutes les watchlists d'un utilisateur
const getWatchlists = async (req, res) => {
  const userId = req.userId; // Utilise l'ID utilisateur extrait du token

  try {
    const result = await pool.query(
      'SELECT * FROM watchlists WHERE user_id = $1',
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ajouter un élément à une watchlist
const addItemToWatchlist = async (req, res) => {
  const { title, type, status } = req.body;
  const watchlistId = req.params.id;

  try {
    const result = await pool.query(
      'INSERT INTO watchlist_items (watchlist_id, title, type, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [watchlistId, title, type, status || 'À ajouter']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les éléments d'une watchlist
const getItemsFromWatchlist = async (req, res) => {
  const watchlistId = req.params.id;

  try {
    const result = await pool.query(
      'SELECT * FROM watchlist_items WHERE watchlist_id = $1',
      [watchlistId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createWatchlist,
  getWatchlists,
  addItemToWatchlist,
  getItemsFromWatchlist,
};
