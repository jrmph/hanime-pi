const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// Proxy API requests to hanime-ph.up.railway.app:8080
const API_BASE = 'http://hanime-ph.up.railway.app:8080';

// Trending endpoint
app.get('/trending/:time/:page', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/trending/${req.params.time}/${req.params.page}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying trending:', error.message);
    res.status(500).json({ error: 'Hindi ma-load ang trending videos' });
  }
});

// Tags endpoint
app.get('/tags', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/tags`);
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying tags:', error.message);
    res.status(500).json({ error: 'Hindi ma-load ang mga tag' });
  }
});

// Watch video endpoint
app.get('/watch/:id', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/watch/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying watch:', error.message);
    res.status(500).json({ error: 'Hindi ma-load ang video' });
  }
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});