require('dotenv').config();
const express = require('express');
const path = require('path');

const authRoutes = require('./routes/auth');

const app = express();

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', authRoutes);

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`🚀 App running at http://localhost:${PORT}`)
);
