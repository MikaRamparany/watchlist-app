const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../config/db');

// Configuration de la stratégie OAuth Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5001/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await pool.query('SELECT * FROM users WHERE google_id = $1', [profile.id]);
        if (user.rows.length === 0) {
          // Créer un nouvel utilisateur
          const newUser = await pool.query(
            'INSERT INTO users (google_id, email, name) VALUES ($1, $2, $3) RETURNING *',
            [profile.id, profile.emails[0].value, profile.displayName]
          );
          return done(null, newUser.rows[0]);
        }
        return done(null, user.rows[0]);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Sérialisation et désérialisation des utilisateurs
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
  } catch (error) {
    done(error, null);
  }
});
