const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const authMiddleware = require('./middleware/authMiddleware');
app.use('/api/watchlists', authMiddleware, require('./routes/watchlistRoutes'));

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/watchlists', require('./routes/watchlistRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
