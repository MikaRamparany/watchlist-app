const passport = require('passport');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');

const router = express.Router();

// Route pour Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback Google OAuth
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard');
});

// Inscription
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'inscription.' });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la connexion.' });
  }
});

// 2FA : Envoi du code de vérification
router.post('/2fa', async (req, res) => {
  const { email } = req.body;
  try {
    const secret = speakeasy.generateSecret();
    await pool.query('UPDATE users SET two_factor_secret = $1 WHERE email = $2', [secret.base32, email]);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Votre code 2FA',
      text: `Votre code de vérification est : ${secret.otpauth_url}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
      res.json({ message: 'Code envoyé.' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la génération du code 2FA.' });
  }
});

module.exports = router;
