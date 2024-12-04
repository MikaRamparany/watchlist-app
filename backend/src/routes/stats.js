const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateUser } = require('../middleware/auth');

// Obtenir des statistiques pour l'utilisateur
router.get('/user', authenticateUser, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `
      SELECT
        COUNT(*) AS total_watchlists,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_count,
        SUM(CASE WHEN status = 'ongoing' THEN 1 ELSE 0 END) AS ongoing_count
      FROM watchlists
      WHERE user_id = $1
      `,
      [userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques.' });
  }
});

module.exports = router;
