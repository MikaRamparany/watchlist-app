const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateUser } = require('../middleware/auth');

// Créer une watchlist
router.post('/', authenticateUser, async (req, res) => {
  const { name, status } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO watchlists (user_id, name, status) VALUES ($1, $2, $3) RETURNING *',
      [userId, name, status]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de la watchlist.' });
  }
});

// Lire toutes les watchlists d’un utilisateur
router.get('/', authenticateUser, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query('SELECT * FROM watchlists WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des watchlists.' });
  }
});

// Mettre à jour une watchlist
router.put('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'UPDATE watchlists SET name = $1, status = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [name, status, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Watchlist non trouvée ou accès refusé.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la watchlist.' });
  }
});

// Supprimer une watchlist
router.delete('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'DELETE FROM watchlists WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Watchlist non trouvée ou accès refusé.' });
    }

    res.json({ message: 'Watchlist supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la watchlist.' });
  }
});

module.exports = router;
