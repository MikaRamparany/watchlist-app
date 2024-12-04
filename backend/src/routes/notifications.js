const express = require('express');
const router = express.Router();
const pool = require('../db');
const nodemailer = require('nodemailer');
const { authenticateUser } = require('../middleware/auth');

// Configurer les préférences de notification
router.post('/configure', authenticateUser, async (req, res) => {
  const { frequency, contentPreferences } = req.body;
  const userId = req.user.id;

  try {
    await pool.query(
      'INSERT INTO notifications (user_id, frequency, content_preferences) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET frequency = $2, content_preferences = $3',
      [userId, frequency, contentPreferences]
    );
    res.json({ message: 'Notifications configurées avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la configuration des notifications.' });
  }
});

// Exemple d’envoi d’un email (tester avec une tâche planifiée plus tard)
router.post('/send', authenticateUser, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await pool.query('SELECT email FROM users WHERE id = $1', [userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.rows[0].email,
      subject: 'Notification Watchlist',
      text: 'Ceci est une notification test.',
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email envoyé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l’envoi de l’email.' });
  }
});

module.exports = router;
